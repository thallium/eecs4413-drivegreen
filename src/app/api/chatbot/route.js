import { NextResponse } from 'next/server';
import { getResponse } from '@/app/backend/service/chatbot/chatbot';


export async function POST(request) {
    const req = await request.json();
    const { threadId, userInput, userName } = req;

    if (!userInput) {
        return NextResponse.json(
            { message: 'Please ask a question.' },
            { status: 400 }
        );
    }
    
    const response = await getResponse(threadId, userInput, userName);

    if(!response){
        return NextResponse.json(
            { message: 'Something went wrong.' },
            { status: 500 }
        );
    }

    return NextResponse.json({ answer: response }, { status: 200 });
}