"use client";
import { Plane } from "lucide-react";
import { format } from "date-fns";
import { Flight } from "@/types/flight";
import { useState } from "react";

interface FlightCardProps {
    flight: Flight;
}

export function FlightCard({ flight }: FlightCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-4 hover:shadow-md transition-shadow flex flex-col md:flex-row items-center justify-between">
            <div className="flex-1 w-full space-y-4">
                {/* Outbound */}
                <FlightLegRow data={flight} label="Outbound" />

                {/* Return */}
                {flight.returnLeg && (
                    <>
                        <div className="h-px bg-slate-100 my-2"></div>
                        <FlightLegRow data={flight.returnLeg} label="Return" />
                    </>
                )}
            </div>

            {/* Price & Action */}
            <div className="flex flex-col items-end w-full md:w-1/4 pl-4 md:border-l border-slate-100 mt-4 md:mt-0 self-center">
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

function FlightLegRow({ data, label }: { data: any, label?: string }) {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
            {/* Airline Info */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0 w-full md:w-1/3">
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full border border-slate-100 overflow-hidden relative">
                    {data.airlineLogo && !imageError ? (
                        <img
                            src={data.airlineLogo}
                            alt={data.airline}
                            className="w-full h-full object-contain p-2"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-600 font-bold text-xs">
                            {data.airlineCode}
                        </div>
                    )}
                </div>
                <div>
                    <p className="font-bold text-slate-900">{data.airline}</p>
                    <div className="flex items-center space-x-2">
                        <span className="text-xs text-slate-500">{data.airlineCode}-{data.flightNumber}</span>
                        {label && <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-medium uppercase tracking-wider">{label}</span>}
                    </div>
                </div>
            </div>

            {/* Flight Timing */}
            <div className="flex items-center w-full md:w-2/3 justify-between px-4">
                <div className="text-left">
                    <p className="text-xl font-bold text-slate-800">{format(new Date(data.departureTime), "HH:mm")}</p>
                    <p className="text-xs text-slate-500 font-medium">{data.from}</p>
                </div>

                <div className="flex flex-col items-center px-4 w-full">
                    <p className="text-xs text-slate-400 mb-1">{data.duration}</p>
                    <div className="w-full flex items-center">
                        <div className="h-[1px] w-full bg-slate-300"></div>
                        <Plane className="h-4 w-4 text-slate-300 mx-2 transform rotate-90" />
                        <div className="h-[1px] w-full bg-slate-300"></div>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{data.stops === 0 ? "Non-stop" : `${data.stops} Stop(s)`}</p>
                </div>

                <div className="text-right">
                    <p className="text-xl font-bold text-slate-800">{format(new Date(data.arrivalTime), "HH:mm")}</p>
                    <p className="text-xs text-slate-500 font-medium">{data.to}</p>
                </div>
            </div>
        </div>
    );
}
