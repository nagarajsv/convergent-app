import Card from "@/components/card";
import NavBar from "@/components/NavBar";
import SearchInput from "@/components/searchInput";

export default async function Home() {
  const res = await fetch("https://dealership.naman.zip/cars/sort?" + new URLSearchParams({direction: "asc", key:"price"}), {cache: "no-store"});
  const cars = await res.json();
    
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
          <SearchInput />
     </div>
      <div className="flex flex-wrap gap-8 items-center justify-center py-16">
        {cars.map(car => <Card key={car.id} car={car}/>)}
      </div>
    </>
  );
}
