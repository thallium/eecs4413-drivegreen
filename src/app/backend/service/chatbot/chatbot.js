import OpenAI from 'openai';
import { getInstruction} from './prompts';



const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const getAssistant = async () => {
    const assistantId = process.env.ASSISTANT_ID;

    let assistant; 
    if(!assistantId) {
      // Upload a file to use as the examples for the assistant.
      const file = await openai.files.create({
        file: fs.createReadStream('Q&A.docx'),
        purpose: 'assistants',
      });

      assistant = await openai.beta.assistants.create({
        name: 'Electric Vehicle Store Assistant',
        instructions: getInstruction(),
        tools: [{ type: 'retrieval' }],
        model: process.env.BOT_MODEL,
        file_ids: [file.id],
      });
      
    } else {
        assistant = await openai.beta.assistants.retrieve(assistantId);
    }

    return assistant;
}


const getThread = async (threadId) => {
    let thread;

    if(threadId) {
        thread = await openai.beta.threads.retrieve(threadId);
    }
   
    if(!thread){
        thread = await openai.beta.threads.create();
    }

    return thread;
}


const getRun = async (threadId, assistantId, userName) => {
    let name = userName || 'Dear Customer';
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    //   instructions:
    //     'Please address the user as' + name,
    });

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
    } while (check.status != 'completed');
};


export const getResponse = async (threadId, userInput, userName) => {
    const thread = await getThread(threadId);
    const assistant = await getAssistant();

    const user = await openai.beta.threads.messages.create(thread.id, {
        role: 'user',
        content: userInput,
    });

    let run = await getRun(thread.id, assistant.id, userName);

    if (run.status != 'completed') {
        await runCheck(run.id, thread.id);
    }

    const messages = await openai.beta.threads.messages.list(thread.id);
    
    const new_message = messages.data[0].content[0].text.value;

    return new_message;
}