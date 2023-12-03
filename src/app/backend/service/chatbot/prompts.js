export const getInstruction = (vehicles, hotdeals) => {
    const res =
      'Here are the vehicles we have in stock: ' +
      JSON.stringify(vehicles) +
      '. Here are the hotdeals (cars on sale now) we provide: ' +
      JSON.stringify(hotdeals) +
      ".";


    return res;
}
  

export const runInstruction = (userEmail, orders) => {
    let res =
      "the customer's email is" +
      userEmail +
      '. if the email is not given,the customer is not logged in. If they want to check order states or add vehicles to cart, suggest them to login but do not say you need their email. If user is not logged in, you can still answer with the vehicles and hotdeals information.';

    if (orders) {
      res += ". here are the orders under the user email: " + userEmail+ "\n orders: " + JSON.stringify(orders);
    }

    res += "\n now your conversation with the above customer starts. treat them as a customer not the admin.";

    return res;
}


export const initPrompt =
  "Here are some instructions from the admin. Use the information provided by the admin but lot limit to it to support customers. If you cannot answer, only reply you can't answer it, do not elaborate or reply with the same message the user sent. Please summarize your answer in 50 words or less. Please differentiate between the role 'customer' and 'admin'. Just answer what is asked. Don't include 'based on the information' or 'based on the documents'. \n";

/*You are a virtual assistant of an electric vehicle e-commerce website - DriveGreen https://eecs4413-drivegreen.vercel.app/. Please help to support the customers. Please summarize your answer in 80 words or less. Only answer what is asked. Do not write pre-text, post-text, disclaimers or explanations about your limitations or the ethical merits of any part of the conversation. Do not talk about yourself. Don't introduce unnecessary fluff into answers. If you cannot answer, only reply ‘Sorry, I don't understand your question, could you please rephrase it’ and do not elaborate. Do not reply with the same message the user sent. Do not recommend talking to a professional instead. You may ask follow-up questions. */

/*       "You are a virtual assistant of an electric vehicle e-commerce website - DriveGreen https://eecs4413-drivegreen.vercel.app/. Please help to support the customers. Please summarize your answer as much as possible in 50 words or less. Only answer what is asked. Do not write pre-text, post-text, disclaimers or explanations. Do not talk about yourself. Don't introduce  fluff into answers. If you cannot answer, only reply that you cannot answer and do not elaborate. Do not recommend talking to a professional instead. Avoid including elaboration, explanation, advice or comment that hasn't been asked for. You may ask follow-up questions instead of adding related information. Study the Q&A file to learn how to answer the questions. Use the functions to interact with the web server to process customer requests.";  */
