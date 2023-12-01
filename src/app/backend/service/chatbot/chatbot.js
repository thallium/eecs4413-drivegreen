import OpenAI from 'openai';
import { getInstruction, runInstruction, initPrompt} from './prompts';
import { getVehiclesFunc, getOrdersByEmail, getHotdeals, getOptionsFunc, addToShoppingCartFunc } from './funtionDescriptions';
import { getOrders } from '@/app/backend/service/order/orderService.js';
import { addToShoppingCart } from '@/app/backend/service/shoppingCart/shoppingCartService.js';
import { getVehicles, getDeals } from '@/app/backend/models/Vehicle.js';



const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const getAssistant = async () => {
    const assistantId = process.env.ASSISTANT_ID;

    let assistant; 
    if(!assistantId) {
      // Upload a file to use as the examples for the assistant.
      const file = await openai.files.create({
        file: fs.createReadStream('public/customer_support/Q&A.docx'),
        purpose: 'assistants',
      });

      assistant = await openai.beta.assistants.create({
        name: 'Electric Vehicle Store Assistant',
        instructions: getInstruction(),
        tools: [
            {"type": 'retrieval' },
            {"type": "function","function": getVehiclesFunc},
            {"type": "function","function": getOrdersByEmail},
            {"type": "function","function": getHotdeals},
            {"type": "function","function": getOptionsFunc},
            {"type": "function","function": addToShoppingCartFunc},
        ],
        model: process.env.BOT_MODEL,
        file_ids: [file.id],
      });
      
    } else {
        assistant = await openai.beta.assistants.retrieve(assistantId);
    }

    return assistant;
}


const getThread = async (threadId, userEmail) => {
    let thread;

    if(threadId) {
        thread = await openai.beta.threads.retrieve(threadId);
    }
   
    if(!thread){

        thread = await openai.beta.threads.create();

        const vehicles = await getVehicles();
        const hotdeals = await getDeals();
        let orders;
        if (userEmail) {
          orders = await getOrders(userEmail);
        }

        let sys1 = await openai.beta.threads.messages.create(thread.id, {
            role: 'user',
            content: initPrompt,
        });

        let sys2 = await openai.beta.threads.messages.create(thread.id, {
            role: 'user',
            content: getInstruction(vehicles, hotdeals),
        });

        let sys3 = await openai.beta.threads.messages.create(thread.id, {
            role: 'user',
            content:  runInstruction(userEmail, orders),
        });
    }
    

    return thread;
}


const getRun = async (threadId, assistantId) => {
    
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId
    });
    // console.log(run);
   return run;
}


const wait = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}


const runCheck = async (runId, threadId) => {
    let check;
    do {
      await wait(500);
      check = await openai.beta.threads.runs.retrieve(threadId, runId);
    } while (check.status === 'queued' || check.status === 'in_progress');
};


export const getResponse = async (threadId, userInput, userEmail) => {
    const thread = await getThread(threadId, userEmail);
    const assistant = await getAssistant();

    const user = await openai.beta.threads.messages.create(thread.id, {
        role: 'user',
        content: userInput,
    });

    let run = await getRun(thread.id, assistant.id);

    if (run.status === 'queued' || run.status === 'in_progress') {
        await runCheck(run.id, thread.id);
    }

    let options;
    while (run.status === 'requires_action' && run.required_action) {
        const functionCall =
          run.required_action.submit_tool_outputs.tool_calls[0].function.name;

        const arugments = JSON.parse(
          run.required_action.submit_tool_outputs.tool_calls[0].function
            .arguments
        );

        let result;
        if (functionCall === 'getVehicles') {
            result = await getVehicles();
        } else if (functionCall === 'getOrdersByEmail') {
            result = await getOrders(arugments.email);
        } else if (functionCall === 'getHotdeals') {
            result = await getDeals();
        } else if (functionCall === 'getOptionsFunc') {
            options = getOptions(arugments);
            result = 'options generated';
        } else if (functionCall === 'addToShoppingCartFunc') {
            try {
                await addToShoppingCart(arugments.vid, arugments.email);
            }
            catch(err) {
                result = "Sorry, we can't add this vehicle to your shopping cart, please try again later";
            }
            result = "Vehicle has been added to your shopping cart, view your shopping cart to checkout";
        }

        if (result) {
            await openai.beta.threads.runs.submitToolOutputs(thread.id, run.id, {
                tool_outputs: [
                {
                    tool_call_id: run.required_action.submit_tool_outputs.tool_calls[0].id,
                    output: result,
                },
                ],
            });
        }
        await runCheck(run.id, thread.id); // complete or requires_action
    }

    // run is complete, get the latest message
    const messages = await openai.beta.threads.messages.list(thread.id);
    let new_message;
    // console.log(JSON.stringify(messages));
    // console.log(JSON.stringify(messages.data[0]));
    if( messages.data[0].role === 'assistant') {
        new_message = messages.data[0].content[0].text.value;
    }

    if (!new_message || new_message === userInput){
        new_message = "Sorry, I don't understand your question.";
    }

    return {answer:new_message, thread_id:thread.id, options:options};
}



// functions
// provide options to user, view an order, view a vehicle, view hot deals, 
// add a vehicle to shopping cart, checkout, payment etc.
const getOptions = ({vid, oid, hotdeal, add_vid, login}) => {
    let options = {};

    if(vid) {
        options['view_vehicle'] = vid;
    }

    if(oid) {
        options['view_order'] = oid;
    }

    if(hotdeal) {
        options['view_hotdeals'] = true;
    }

    if(add_vid) {
        options['add_vehicle_to_shoppingCart'] = add_vid;
    }

    if(login) {
        options['login'] = true;
    }

    return options;
};
