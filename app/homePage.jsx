'use client';

import Card from "@/components/card";
import Footer from "@/components/footer";
import NavBar from "@/components/NavBar";
import { useState } from "react";

export default function HomePage({ carsData }) {
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState("pasc");
    const [selectedMakes, setSelectedMakes] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(999999);

    const makes = [...new Set(carsData.map(car => car.make))]

    const display = [...carsData]
    .filter((car) => 
        (selectedMakes.length === 0 || selectedMakes.includes(car.make)) &&
        (car.make.toUpperCase().includes(query.toUpperCase()) || car.model.toUpperCase().includes(query.toUpperCase())) &&
        (car.price >= minPrice && car.price <= maxPrice)
    )
    .sort((a, b) => 
        sort === "pasc"
            ? a.price - b.price
            : sort === "pdesc"
            ? b.price - a.price
            : sort === "yasc"
            ? a.year - b.year
            : b.year - a.year
    );
    
    const handleMakeChange = (make) => {
        setSelectedMakes((prev) => {
            return prev.includes(make) ? prev.filter((item) => item !== make) : [...prev, make]
        })
    }

    return (
        <>
            <NavBar transparentBG={true}/>
            <div 
                className="text-center backdrop text-white flex flex-col gap-14 items-center py-48"
                style={{
                backgroundImage: "url(https://t3.ftcdn.net/jpg/07/48/59/38/360_F_748593837_mWVU6MyzgP9yeAdDJW6UkReK7GGGTSbH.jpg)", 
                backgroundRepeat: "no-repeat", 
                backgroundBlendMode:"overlay", 
                backgroundSize:"cover", 
                backdropFilter: "blur(5px)", 
                backgroundColor: "rgba(0, 0, 0, 0.6)"
                }}>
                <span className="text-8xl">
                    Find your perfect car
                </span>
                <div 
                    tabIndex={0} 
                    className="w-1/2 px-3 py-3 rounded-2xl text-white focus-within:outline-none bg-transparent border border-white focus-within:bg-white focus-within:text-black transition-all backdrop-blur-3xl flex items-center justify-between"> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 transition-colors ml-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input 
                    type="text" 
                    placeholder="Search by make or model" 
                    className="h-[72px] bg-transparent appearance-none border-none outline-none flex-grow pl-4"
                    value={query}
                    onChange={e => {
                        setQuery(e.target.value);
                    }}
                    />
                </div>         
            </div>
            <div>
                <div className="text-center pt-8 text-5xl">
                    {query === "" ? "All Cars" : `"${query}" search results`}
                </div>
                <div className={(display.length <= 4 ? "gap-[2.65rem]" : "gap-2") + " py-8 flex items-start"}>
                    <div className="border border-gray-300 rounded-xl w-fit ml-8">
                        <div className="px-8 py-4 border-b border-gray-300 flex justify-between items-center">
                            <h1 className="text-xl">
                                Filters
                            </h1>
                            <button className="hover:bg-red-400 rounded-md px-2 py-1 transition-colors border border-red-400" onClick={() => {setSelectedMakes([]); setSort("pasc"); setMinPrice(0); setMaxPrice(999999)}}>
                                Clear
                            </button>
                        </div>
                        <div className="px-8 py-2">
                            <h1 className="mb-1">
                                Sort By:
                            </h1>
                            <select className="border border-black rounded-lg px-2 py-1 mb-1" value={sort} onChange={e => setSort(e.target.value)}>
                                <option value="pasc">Price (Ascending)</option>
                                <option value="pdesc">Price (Descending)</option>
                                <option value ="yasc">Year (Ascending)</option>
                                <option value="ydesc">Year (Descending)</option>
                            </select>
                        </div>
                        <div className="px-8 border-t border-gray-300 pb-2">
                            <h1 className="mt-2">
                                Make:
                            </h1>
                            <div className="flex flex-col flex-nowrap text-nowrap">
                                {makes.map(make => 
                                    <div className="flex gap-1" key={make}>
                                        <input type="checkbox" id={make} value={make} checked={selectedMakes.includes(make)} onChange={() => handleMakeChange(make)}/>
                                        <label htmlFor={make}>{make}</label>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="px-8 border-t border-gray-300 py-2">
                            <div className="mb-4">
                                <p>Min Price:</p>
                                <div className="flex gap-1 items-center">
                                    $ <input 
                                        className="border border-gray-300 rounded-xl px-2 py-1"
                                        type="number"
                                        defaultValue={0}
                                        value={minPrice}
                                        min={0}
                                        onChange={e => setMinPrice(e.target.value)}
                                        />
                                </div>
                            </div>
                            <div className="mb-2">
                                <p>Max Price:</p>
                                <div className="flex gap-1 items-center">
                                    $ <input 
                                        className="border border-gray-300 rounded-xl px-2 py-1"
                                        type="number"
                                        value={maxPrice}
                                        max={999999}
                                        onChange={e => setMaxPrice(e.target.value)}
                                        />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-wrap gap-8 justify-center">
                            {display.length === 0 ? 
                                <div className="flex flex-col items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                                    </svg>
                                    <div className="text-2xl">
                                        No Results...
                                    </div>
                                </div>
                                : 
                                display.map(car => <Card key={car.id} car={car}/>)
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-[120px]" />
            <Footer/>
        </>
    );
}