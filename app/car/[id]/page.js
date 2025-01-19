import Footer from "@/components/footer";
import NavBar from "@/components/NavBar";
import Link from "next/link";

export default async function CarPage({ params }) {
    const id = (await params).id;
    const res = await fetch(`https://dealership.naman.zip/car/${id}`);
    const car = await res.json();
    return (
        <>
            <NavBar />
            <div className="flex w-screen items-center justify-center pt-[104px]">
                <div className="w-[80vw] shadow-lg">
                    <div className="p-6 border-b border-gray-300">
                        <Link href="/" className="hover:text-cyan-600 transition-colors">All Cars </Link>
                        &gt; 
                        <Link href="/" className="hover:text-cyan-600 transition-colors"> {car.make} </Link>
                        &gt; 
                        <Link href="/" className="hover:text-cyan-600 transition-colors"> {car.model}</Link>
                    </div>
                    <div className="p-8 gap-12 flex flex-row border-b border-gray-300">
                        <div className="w-[60%]">
                            <img src={car.image} className="rounded-3xl"/>
                        </div>
                        <div className=" rounded-3xl p-8 text-black flex-grow">
                            <h1 className="text-3xl font-bold mb-1">
                                {car.year} {car.make} {car.model}
                            </h1>
                            <div className="font-medium text-xl mb-1">
                                {car.mileage === 0 ? "NEW" : "USED"} • {car.mileage.toLocaleString()} miles
                            </div>
                            <div className="mb-8">
                                VIN: {car.vin}
                            </div>
                            <div className="text-3xl font-bold mb-8">
                               ${car.price.toLocaleString()}
                            </div>
                            <button className="w-full p-4 bg-cyan-200 rounded-full hover:bg-cyan-300 transition-colors">
                                Purchase Now
                            </button>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-4xl text-center py-12 font-medium">
                            VEHICLE DETAILS
                        </h1>
                        <div className="flex justify-center gap-12">
                            <div className="flex flex-col items-center">
                                <img src="https://assets.fastly.carvana.io/merchui/svgs/vehicle-details/droplets-56px.svg"/>
                                <p className="text-md text-gray-500">Color</p>
                                <p className="text-lg font-medium">{car.color}</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <img src="https://assets.fastly.carvana.io/merchui/svgs/vehicle-details/transmission-56px.svg"/>
                                <p className="text-md text-gray-500">Tranmission</p>
                                <p className="text-lg font-medium">{car.transmission}</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <img src="https://assets.fastly.carvana.io/merchui/svgs/vehicle-details/gas-pump-56px.svg"/>
                                <p className="text-md text-gray-500">Gas Type</p>
                                <p className="text-lg font-medium">{car.fuel_type}</p>
                            </div>
                        </div>
                        <div className="text-4xl text-center pt-12 pb-8 font-medium">
                            DESCRIPTION
                        </div>
                        <div className="px-48 text-lg text-center pb-8">
                            {car.description}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}