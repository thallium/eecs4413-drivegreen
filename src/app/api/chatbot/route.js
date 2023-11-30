import { NextResponse } from 'next/server';
import { getResponse } from '@/app/backend/service/chatbot/chatbot';


export async function POST(request) {
    const req = await request.json();
    const { threadId, userInput, userEmail } = req;

    if (!userInput) {
        return NextResponse.json(
            { message: 'Please ask a question.' },
            { status: 400 }
        );
    }
    
    const response = await getResponse(threadId, userInput, userEmail);

    if(!response){
        return NextResponse.json(
            { message: 'Failed to get response.' },
            { status: 500 }
        );
    }

    return NextResponse.json(response, { status: 200 });
}