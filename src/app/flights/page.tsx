import { FlightCard } from "@/components/flight/FlightCard";
import { fetchFlights } from "@/lib/flight-service";

export default async function FlightsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }> // NextJS 15 typing
}) {
    const resolvedSearchParams = await searchParams; // Next.js 15 searchParams is a promise

    const from = (resolvedSearchParams?.from as string) || "DEL";
    const to = (resolvedSearchParams?.to as string) || "BOM";
    const cabin = (resolvedSearchParams?.cabin as string) || "economy";
    const passengers = parseInt((resolvedSearchParams?.passengers as string) || "1", 10);
    const returnDate = (resolvedSearchParams?.returnDate as string);

    // Ensure date is valid or default to today (in local time)
    let date = (resolvedSearchParams?.date as string);
    const today = new Date().toLocaleDateString('en-CA');

    if (!date || date < today) {
        date = today;
    }

    const flights = await fetchFlights(from, to, date, passengers, cabin, returnDate);

    return (
        <div className="bg-slate-50 min-h-screen pb-12">
            <div className="bg-blue-900 py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl text-white font-bold">Flights from {from} to {to}</h1>
                    <p className="text-blue-200 text-sm">{date}{returnDate ? ` - ${returnDate}` : ''} | {passengers} Traveller(s) | {cabin.charAt(0).toUpperCase() + cabin.slice(1)}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 flex flex-col md:flex-row gap-6">
                <aside className="hidden md:block w-1/4">
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sticky top-24">
                        <h3 className="font-bold text-slate-800 mb-4">Filters</h3>
                        <div className="mb-6">
                            <p className="font-semibold text-sm text-slate-700 mb-2">Stops</p>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="rounded text-primary focus:ring-primary" defaultChecked />
                                    <span className="text-sm text-slate-600">Non Stop</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                                    <span className="text-sm text-slate-600">1 Stop</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="flex-1">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="font-bold text-slate-800">{flights.length} Flights available</h2>
                    </div>

                    <div className="space-y-4">
                        {flights.length > 0 ? flights.map(flight => (
                            <FlightCard key={flight.id} flight={flight} />
                        )) : (
                            <div className="bg-white p-8 rounded-lg text-center shadow-sm">
                                <p className="text-slate-600">No flights found for this route and date.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
