'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { baseURL } from '@/util';

export default function Example() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const router = useRouter();
    const signup = async () => {
        try {
            const res = await fetch(baseURL() + '/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            // console.log(res);
            if (!res.ok) {
                alert('Sign up failed!\nError: ' + await res.text());
                return;
            }
            alert('Sign up successful');
            router.push('/signin');
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign up an account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="input input-bordered w-full"
                                    placeholder='Password'
                                />
                            </div>
                            <div className="mt-2">
                                <input
                                    id="passwordAgain"
                                    name="passwordAgain"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={(e) => setPasswordAgain(e.target.value)}
                                    required
                                    className="input input-bordered w-full"
                                    placeholder='Confirm Password'
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type='button'
                                disabled={(!email || !password || !passwordAgain) || (password !== passwordAgain)}
                                onClick={signup}
                                className="btn btn-primary btn-block"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
