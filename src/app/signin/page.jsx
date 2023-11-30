'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { baseURL } from '@/util';
import { useRouter } from 'next/navigation';

async function doSignIn(email, password) {
    const res = await signIn('credentials', { email, password, redirect: false })
    if (res.ok) {
        const res = await fetch(baseURL() + '/api/watchlist/check')
        const hotdeal = await res.json()
        if (hotdeal.length > 0) {
            const cars = hotdeal.join(', ')
            alert(`The ${cars} you're watching is in a hot deal! Check it out!`)
        }
        return true;
    } else {
        alert('Wrong email or password');
        return false;
    }
}

export default function Example() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
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
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
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
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type='button'
                                onClick={async () => {
                                    if (await doSignIn(email, password)) {
                                        router.push("/")
                                    }
                                }}
                                disabled={!email || !password}
                                // className="btn flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                className="btn btn-primary btn-block"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
