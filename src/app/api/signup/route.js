import { createUserWithEmailAndPassword } from 'firebase/auth';
import { prisma } from '@/app/backend/db/dbClient';
import { auth } from '@/app/firebase'
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const res = await request.json();
        const email = res.email, password = res.password;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = await prisma.user.create({
            data: {
                email: email,
                uid: userCredential.user.uid
            }
        })
        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.log(error.message)
        return new NextResponse(error.message, { status: 500 });
    }
}
