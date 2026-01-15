import { Plane } from "lucide-react";
import { format } from "date-fns";
import { Flight } from "@/types/flight";

interface FlightCardProps {
    flight: Flight;
}

export function FlightCard({ flight }: FlightCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-4 hover:shadow-md transition-shadow flex flex-col md:flex-row items-center justify-between">
            {/* Airline Info */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0 w-full md:w-1/4">
                {/* Placeholder Logo */}
                {/* Airline Logo */}
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full border border-slate-100 overflow-hidden">
                    {flight.airlineLogo ? (
                        <img
                            src={flight.airlineLogo}
                            alt={flight.airline}
                            className="w-full h-full object-contain p-2"
                        />
                    ) : (
                        <div className="w-full h-full bg-red-50 flex items-center justify-center text-red-600 font-bold">
                            {flight.airlineCode}
                        </div>
                    )}
                </div>
                <div>
                    <p className="font-bold text-slate-900">{flight.airline}</p>
                    <p className="text-xs text-slate-500">{flight.airlineCode}-{flight.flightNumber}</p>
                </div>
            </div>

            {/* Flight Timing */}
            <div className="flex items-center w-full md:w-2/4 justify-between px-4 mb-4 md:mb-0">
                <div className="text-left">
                    <p className="text-xl font-bold text-slate-800">{format(new Date(flight.departureTime), "HH:mm")}</p>
                    <p className="text-xs text-slate-500 font-medium">{flight.from}</p>
                </div>

                <div className="flex flex-col items-center px-4 w-full">
                    <p className="text-xs text-slate-400 mb-1">{flight.duration}</p>
                    <div className="w-full flex items-center">
                        <div className="h-[1px] w-full bg-slate-300"></div>
                        <Plane className="h-4 w-4 text-slate-300 mx-2 transform rotate-90" />
                        <div className="h-[1px] w-full bg-slate-300"></div>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{flight.stops === 0 ? "Non-stop" : `${flight.stops} Stop(s)`}</p>
                </div>

                <div className="text-right">
                    <p className="text-xl font-bold text-slate-800">{format(new Date(flight.arrivalTime), "HH:mm")}</p>
                    <p className="text-xs text-slate-500 font-medium">{flight.to}</p>
                </div>
            </div>

            {/* Price & Action */}
            <div className="flex flex-col items-end w-full md:w-1/4 pl-4 md:border-l border-slate-100">
                <p className="text-2xl font-bold text-slate-900 mb-1">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: flight.currency, maximumFractionDigits: 0 }).format(flight.price)}
                </p>
                <p className="text-xs text-slate-500 mb-3">per traveller</p>
                <button className="bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600 transition-colors w-full md:w-auto shadow-sm">
                    Book Now
                </button>
            </div>
        </div>
    );
}
