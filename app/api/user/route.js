import { db } from "@/firebaseInit";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { firebaseAdmin } from "@/firebaseServer";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

export async function PUT(request) {
    const token = (await headers())?.get("Authorization")?.split("Bearer ")[1];

    if(!token) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const res = await request.json();

    try {
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
        const userRef = doc(db, "users", decodedToken.uid);
        await updateDoc(userRef, {
            favorites: arrayUnion(res.id)
        });
        return NextResponse.json({status: 200});
    } catch (err) {
        console.log("ERROR: " + err);
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }
}

export async function DELETE(request) {
    const token = (await headers())?.get("Authorization")?.split("Bearer ")[1];

    if(!token) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const res = await request.json();

    try{
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
        const userRef = doc(db, "users", decodedToken.uid);
        await updateDoc(userRef, {
            favorites: arrayRemove(res.id)
        });
        return NextResponse.json({status: 200});
    } catch (err) {
        console.log("ERROR: " + err);
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }
}