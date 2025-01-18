'use client'

import { useState } from "react";
import Link from "next/link";

export default function SearchInput() {
    const [query, setQuery] = useState("");

    return (
          <div 
            tabIndex={0} 
            className="w-1/2 px-3 py-3 rounded-2xl text-white focus-within:outline-none bg-transparent border border-white focus-within:bg-white focus-within:text-black transition-all backdrop-blur-3xl flex items-center justify-between"> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 transition-colors ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search by make or model" 
              className="h-full bg-transparent appearance-none border-none outline-none flex-grow pl-4"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <Link 
                className={(query && "cursor-pointer hover:bg-cyan-600") + " cursor-not-allowed rounded-xl border-white border h-full w-[4.5rem] text-xl transition-colors py-5"}
                href={`/query/${query}`} 
                onClick={(e) => !query && e.preventDefault()}
            >
              GO
            </Link>
          </div>
    );
}