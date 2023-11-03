export function baseURL() {
    console.log(process.env.NODE_ENV);
    return process.env.NODE_ENV !== 'production'
        ? process.env.LOCAL_URL
        : "https://" + process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL
}
