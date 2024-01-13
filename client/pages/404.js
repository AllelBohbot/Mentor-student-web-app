import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/router"
import Head from 'next/head'

const NotFound = () => {
    const router = useRouter();

    useEffect(() =>{
        setTimeout(()=>{
            router.push('/')
        }, 3000)
    },[])
    return ( 
        <> 
            <Head>
                <title>Collaborate coding | 404</title>
            </Head>
            <div className="not-found">
                <h1>Ooops...</h1>
                <h2>The page you are looking for cannot be found</h2>
                <p>Go back to the <Link href="/">Homepage</Link></p>
            </div>
        </>
    );
}
 
export default NotFound;
