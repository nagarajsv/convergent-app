'use client';

import NavBar from "@/components/NavBar";
import { app } from "@/firebaseInit";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebaseInit";
import Card from "@/components/card";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";

export default function AccountPage() {
    const auth = getAuth(app);
    const [curUser, setCurUser] = useState(auth.currentUser);
    const [cars, setCars] = useState([]);
    const router = useRouter();
    
    onAuthStateChanged(auth, (user) => {
        if(user) {
            setCurUser(user);
        }
    });

    useEffect(() => {
        async function fetchData() {
                        const userDoc = await getDoc(doc(db, "users", curUser?.uid));
                        if(userDoc.exists()) {
                            const res = await fetch("https://dealership.naman.zip/cars/sort?" + new URLSearchParams({direction: "asc", key:"price"}));
                            const data = await res.json();
                            const display = data.filter(car => userDoc.data().favorites.includes(car.id));
                            setCars(display);
                        }
                    }
                if(curUser) {
                    fetchData();
                }
    }, [curUser]);

    const handleSignOut = async () => {
        signOut(auth).then(router.push("/"));
    }

    return (
        <>
            <NavBar transparentBG={false}/>
            <div className="h-[104px]"/>
            <h1 className="text-center text-5xl p-8">
                Account information
            </h1>
            <div className="text-center text-2xl">
                Email: {curUser?.email}
            </div>
            <h1 className="text-center text-5xl p-8">
                Your favorite cars:
            </h1>
            <div className="flex flex-wrap gap-8 justify-center">
                {cars.map((car) => <Card key={car.id} car={car} displayLike={false}/>)}
            </div>
            <div className="text-center">
                <button className="p-4 bg-cyan-200 rounded-full hover:bg-cyan-300 transition-colors my-6" onClick={handleSignOut}>
                    Sign Out
                </button>
            </div>
            <div className="h-[120px]" />
            <Footer />
        </>
    );
}