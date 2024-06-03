"use client"
import Link from "next/link";
import Navbar from "../components/navbar";
import { UserContextProvider, useUserContext } from "@/context/userContext";
import Profile from "../components/profile";
import Image from "next/image";
import Login from "../components/login"


export default function Home() {
    const user = useUserContext()
    console.log(user)
    
    return(
        <UserContextProvider>
        <main>
              <Navbar/>
              <Profile/>
        </main>
      </UserContextProvider> 
    )
}