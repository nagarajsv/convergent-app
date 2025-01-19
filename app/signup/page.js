'use client';

import NavBar from "@/components/NavBar";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { app, db } from "@/firebaseInit"
import Footer from "@/components/footer";
import Link from "next/link";
import { doc, setDoc } from "firebase/firestore"

export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidden, setHidden] = useState(true);
    const router = useRouter();
    const auth = getAuth(app);

    const handleSubmit = () => {
        if(!(email === "") && !(password === "")) {
            createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
                await setDoc(doc(db, "users", userCredential.user.uid), {favorites: []});
                router.push('/account');
            });
        }
    }
    return <>
            <NavBar transparentBG={false}/>
            <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
                <div className="border border-gray-300 rounded-xl p-8 shadow-md flex flex-col gap-4 w-1/5">
                     <div className="text-3xl font-bold">
                        Sign Up
                     </div>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            placeholder="Email"
                            className="border border-black rounded-md p-2 px-3"
                        />
                     <div className="w-full border border-black rounded-md relative flex items-center">
                        <input 
                            type={hidden ? "password" : "text"} 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            placeholder="Password"
                            className="rounded-md p-2 px-3 w-full"
                        />
                        <button className="absolute right-0 transition-all" onClick={e => setHidden(prev => !prev)}>
                            {hidden ? 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            }
                        </button>
                     </div>
                     <button className="p-4 bg-cyan-200 rounded-full hover:bg-cyan-300 transition-colors mt-6" onClick={handleSubmit}>
                        Sign Up
                     </button>
                </div>
                <div>
                    Have an account? <Link href="/login" className="text-cyan-600 hover:underline transition-all">Sign in</Link>
                </div>
            </div>
            <Footer />
        </>
}