import Link from "next/link";

export default function Card( { car } ) {
    return (
            <Link 
                className="rounded-3xl border border-gray-100 max-w-sm overflow-hidden shadow-md hover:shadow-2xl transition-all"
                href={"/car/" + car.id}
            > 
                <div className="relative">
                    <img
                        src={car.image}
                        className="h-64 w-96 object-cover"
                    />
                    <button className="hover:text-red-500 hover:scale-110 transition-all absolute right-4 top-4 bg-white rounded-full p-1 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg> 
                    </button>
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