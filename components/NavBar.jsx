import Link from "next/link"

export default function NavBar({ transparentBG }) {
    return (
        <div className={(transparentBG ? "bg-transparent hover:bg-white hover:text-black text-white" : "bg-white border-b border-gray-300 text-black") + " w-screen flex justify-between py-6 items-center px-48 absolute left-0 top-0 z-10 transition-colors"}>
            <div className="flex flex-row items-center gap-4">
                <Link className="flex items-center gap-1" href="/">
                    <span className="text-3xl">
                       &#128663;
                    </span>
                    <span>
                        Convergent Cars
                    </span>
                </Link>
                <div>
                    <Link href="/">Button</Link>
                </div>
            </div>
        <Link className="flex gap-1 hover:bg-gray-300 rounded-2xl p-4 transition-colors" href="/login">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                Sign in
            </Link>
        </div>
    )
}