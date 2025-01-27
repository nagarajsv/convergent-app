import { app, db } from "@/firebaseInit";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Card( { car, displayLike } ) {
    const auth = getAuth(app)
    const [selected, setSelected] = useState(false);
    const [curUser, setCurUser] = useState(auth.currentUser);
    const router = useRouter();

    onAuthStateChanged(auth, (user) => {
        if(user) {
            setCurUser(user);
        }
    })

    useEffect(() => {
        async function fetchData() {
                const userDoc = await getDoc(doc(db, "users", curUser?.uid));
                if(userDoc.exists()) {
                    setSelected(userDoc.data().favorites?.includes(car.id));
                }
            }
        if(curUser) {
            fetchData();
        }
    }, [curUser, car.id])

    const handleClick = async (e) => {
        e.preventDefault();
        if(curUser) {
            curUser.getIdToken().then(async token => {
                await fetch("/api/user", {
                    method: selected ? "DELETE" : "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }, 
                    body: JSON.stringify({
                        id: car.id
                    })
                })
            });
            setSelected(prev => !prev);
        } else {
            router.push("/login");
        }
    }

    return (
            <Link 
                className="rounded-3xl border border-gray-100 max-w-sm overflow-hidden shadow-md hover:shadow-2xl transition-all"
                href={"/car/" + car.id}
            > 
                <div className="relative">
                    <img
                        src={car.image}
                        className="h-64 w-80 object-cover"
                    />
                    {displayLike && 
                        <button className="hover:text-red-500 hover:scale-110 transition-all absolute right-4 top-4 bg-white rounded-full p-1 flex items-center justify-center" onClick={e => handleClick(e)}>
                            {selected ? 
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="size-6">
                                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg> 
                            }
                        </button>
                    }
                </div>
                <div className="px-4 pt-4 font-medium">
                    {car.year} {car.make}
                </div>
                <div className="text-xl px-4 pb-4 font-bold text-cyan-600">
                    {car.model}
                </div>
                <div className="ml-4">
                    MSRP
                </div>
                <div className="ml-4 text-2xl pb-4 flex justify-start bold gap-[0.15rem] font-bold">
                    <span className="text-base">
                        $
                    </span>
                    {car.price.toLocaleString()}
                </div>
            </Link>
    );
}