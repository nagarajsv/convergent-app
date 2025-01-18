import Card from "@/components/card";
import NavBar from "@/components/NavBar";

export default async function Home() {
  const res = await fetch("https://dealership.naman.zip/cars/sort?" + new URLSearchParams({direction: "asc", key:"price"}), {cache: "no-store"});
  const cars = await res.json();
    
  return (
    <>
      <NavBar />
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
              className="h-full bg-transparent appearance-none border-none outline-none flex-grow pl-4"
            />
            <button className={"  rounded-xl border-white border h-full w-[4.5rem] text-xl hover:bg-gray-300 transition-colors py-5"}>
              GO
            </button>
          </div>
      </div>
      <div className="flex flex-wrap gap-8 items-center justify-center py-16">
        {cars.map(car => <Card key={car.id} car={car}/>)}
      </div>
    </>
  );
}
