import CarPageClient from "./carPageClient";

export default async function CarPage({ params }) {
    const id = (await params).id;
    const res = await fetch(`https://dealership.naman.zip/car/${id}`);
    const car = await res.json();
    return (
        <CarPageClient car={car}/>
    )
}