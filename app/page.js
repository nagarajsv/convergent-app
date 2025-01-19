import HomePage from "./homePage";

export default async function Home() {
  const res = await fetch("https://dealership.naman.zip/cars/sort?" + new URLSearchParams({direction: "asc", key:"price"}), {cache: "no-store"});
  const cars = await res.json();
    
  return (
    <HomePage carsData={cars}/>
  );
}
