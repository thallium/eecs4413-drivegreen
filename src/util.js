export function baseURL() {
    // console.log(process.env.NODE_ENV);
    if(process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
        return "https://" + process.env.NEXT_PUBLIC_VERCEL_URL;
    }

    if (process.env.NEXT_PUBLIC_VERCEL_ENV ) {// in vercel but not production
      return 'https://' + process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL;
    }
    
    // not in vercel
    return process.env.LOCAL_URL;
      
}
