import NavBar from "@/components/NavBar";

export default async function CarPage({ params }) {
    const id = (await params).id;
    const res = await fetch(`https://dealership.naman.zip/car/${id}`);
    const car = await res.json();
    return (
        <>
            <NavBar />
            {car.condition}
        </>
    )
}