import { Flight } from "@/types/flight";

const DUFFEL_API_KEY = process.env.DUFFEL_API_KEY;
const DUFFEL_API_URL = process.env.DUFFEL_API_URL || "https://api.duffel.com/air/offer_requests";

function parseDuration(isoDuration: string) {
    const matches = isoDuration.match(/PT(\d+H)?(\d+M)?/);
    if (!matches) return isoDuration;

    const hours = matches[1] ? matches[1].replace('H', 'h') : '';
    const minutes = matches[2] ? matches[2].replace('M', 'm') : '';

    return `${hours} ${minutes}`.trim();
}

export async function fetchFlights(from: string, to: string, date: string, passengers: number = 1, cabin: string = 'economy'): Promise<Flight[]> {
    try {
        console.log(`Fetching flights: ${from} -> ${to} on ${date}`);
        const response = await fetch(`${DUFFEL_API_URL}?return_offers=true`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Duffel-Version': 'v2',
                'Authorization': `Bearer ${DUFFEL_API_KEY}`,
                'Accept-Encoding': 'gzip'
            },
            body: JSON.stringify({
                data: {
                    slices: [
                        {
                            origin: from,
                            destination: to,
                            departure_date: date
                        }
                    ],
                    passengers: Array(passengers).fill({ type: 'adult' }),
                    cabin_class: cabin
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Duffel API Error:", response.status, errorText);
            // Fallback to empty array or throw
            return [];
        }

        const data = await response.json();
        const offers = data.data.offers;

        return offers.map((offer: any) => {
            const slice = offer.slices[0];
            const segments = slice.segments;
            const firstSegment = segments[0];
            const lastSegment = segments[segments.length - 1];
            const owner = offer.owner;
            const carrierCode = owner.iata_code || (firstSegment.operating_carrier ? firstSegment.operating_carrier.iata_code : "XX");
            const logoUrl = owner.logo_symbol_url || `https://assets.duffel.com/img/airlines/for-light-background/${carrierCode}.svg`;

            return {
                id: offer.id,
                airline: owner.name,
                airlineCode: carrierCode,
                airlineLogo: logoUrl,
                flightNumber: firstSegment.operating_carrier_flight_number,
                from: slice.origin.iata_code,
                to: slice.destination.iata_code,
                departureTime: firstSegment.departing_at,
                arrivalTime: lastSegment.arriving_at,
                duration: parseDuration(slice.duration),
                price: convertToINR(parseFloat(offer.total_amount), offer.total_currency),
                currency: "INR",
                stops: segments.length - 1,
                seatsAvailable: 9
            };
        });
    } catch (error) {
        console.error("Flight Fetch Service Error:", error);
        return [];
    }
}

function convertToINR(amount: number, currency: string): number {
    const rates: { [key: string]: number } = {
        'GBP': 108,
        'USD': 86,
        'EUR': 92,
        'INR': 1
    };
    const rate = rates[currency] || 86; // Default to USD rate if unknown or assume ~86
    return Math.round(amount * rate);
}
