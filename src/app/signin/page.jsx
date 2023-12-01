'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { baseURL } from '@/util';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/app/components/NotificationProvider';


export default function Example() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter()

    const dispatch = useNotification();
    async function doSignIn(email, password) {
        const res = await signIn('credentials', { email, password, redirect: false })
        if (res.ok) {
            fetch(baseURL() + '/api/watchlist/check')
                .then(res => res.json())
                .then(hotdeal => {
                    if (hotdeal.length > 0) {
                        const cars = hotdeal.join(', ')
                        // alert(`The ${cars} you're watching is in a hot deal! Check it out!`)
                        dispatch({
                            type: "INFO",
                            message: `The ${cars} you're watching is in a hot deal! Check it out!`,
                        })
                    }
                })
            setErrorMsg('');
            return true;
        } else {
            setErrorMsg('Wrong email or password');
            return false;
        }
    }
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block font-medium leading-6">
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
                                <label htmlFor="password" className="block font-medium leading-6">
                                    Password
                                </label>
                                <div className='text-error'>
                                    {errorMsg}
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
