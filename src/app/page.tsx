'use client'

import Image from "next/image";
import Navbar from "./components/navbar";
import Login from "./components/login"
import { UserContextProvider } from "@/context/userContext";
import Profile from "./components/profile";

export default function Home() {
  return (
    <UserContextProvider>
      <main>
            <Navbar/>
            <h2>Welcome home. Login if you haven't already.</h2>
      </main>
    </UserContextProvider>
  );
}
