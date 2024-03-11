'use client'
import React,{useState, useEffect} from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
export default function User() {
    const [loggedIn, setLoggedIn] = useState(false)
    const router = useRouter()
    useEffect(() => {
        // Check if a token exists in the cookie
        const token = Cookies.get('token');
        const role = Cookies.get('role');
    
        // If a token exists, redirect the user to the appropriate page
        if (token && role) {
          // const decodedToken = jwt_decode(token);
       
          if(role=='user'){
            setLoggedIn(true)
          }
          else{

              router.push('/login')
          }
    
        }
      }, []);
      if(!loggedIn){
        return(
            <div>Loading</div>
        )
      }
  return (
    <div><span>user panel</span> 
        </div>
  )
}
