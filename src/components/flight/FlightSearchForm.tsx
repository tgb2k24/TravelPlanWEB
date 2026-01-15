"use client";

import { useState } from "react";
import { Plane, Calendar, User, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function FlightSearchForm() {
    const router = useRouter();
    const [tripType, setTripType] = useState("oneWay");
    const [passengers, setPassengers] = useState(1);
    const [flightClass, setFlightClass] = useState("economy");
    const [showDropdown, setShowDropdown] = useState(false);

    const classes = [
        { label: "Economy", value: "economy" },
        { label: "Premium Economy", value: "premium_economy" },
        { label: "Business", value: "business" },
        { label: "First", value: "first" },
    ];

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const params = new URLSearchParams();
        const from = formData.get("from") as string;
        const to = formData.get("to") as string;
        const date = formData.get("date") as string;

        if (from) params.set("from", from);
        if (to) params.set("to", to);
        if (date) params.set("date", date);
        if (tripType === "roundTrip") {
            const returnDate = formData.get("returnDate") as string;
            if (returnDate) params.set("returnDate", returnDate);
        }

        params.set("cabin", flightClass);
        params.set("passengers", passengers.toString());

        router.push(`/flights?${params.toString()}`);
    }

    return (
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 max-w-5xl mx-auto -mt-32 relative z-10 border border-slate-100">
            <div className="flex space-x-6 mb-6">
                <label className="flex items-center space-x-2 cursor-pointer bg-slate-100 px-4 py-1 rounded-full hover:bg-slate-200 transition-colors">
                    <input
                        type="radio"
                        name="tripType"
                        value="oneWay"
                        checked={tripType === "oneWay"}
                        onChange={() => setTripType("oneWay")}
                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary accent-primary"
                    />
                    <span className="text-sm font-semibold text-slate-700">One Way</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer bg-slate-100 px-4 py-1 rounded-full hover:bg-slate-200 transition-colors">
                    <input
                        type="radio"
                        name="tripType"
                        value="roundTrip"
                        checked={tripType === "roundTrip"}
                        onChange={() => setTripType("roundTrip")}
                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary accent-primary"
                    />
                    <span className="text-sm font-semibold text-slate-700">Round Trip</span>
                </label>
            </div>

            <form onSubmit={handleSearch} className="relative">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                    {/* From - To */}
                    <div className="md:col-span-5 grid grid-cols-2 bg-white border border-slate-300 rounded-lg overflow-hidden">
                        <div className="p-3 border-r border-slate-300 hover:bg-blue-50 transition-colors cursor-text relative group">
                            <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">From</span>
                            <input name="from" type="text" defaultValue="DEL" className="w-full bg-transparent font-bold text-2xl text-slate-800 outline-none placeholder:text-slate-300 group-hover:text-primary transition-colors uppercase" />
                            <p className="text-xs text-slate-500 truncate group-hover:text-slate-700">City or Airport</p>
                        </div>
                        <div className="p-3 hover:bg-blue-50 transition-colors cursor-text relative group">
                            <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">To</span>
                            <input name="to" type="text" defaultValue="BOM" className="w-full bg-transparent font-bold text-2xl text-slate-800 outline-none placeholder:text-slate-300 group-hover:text-primary transition-colors uppercase" />
                            <p className="text-xs text-slate-500 truncate group-hover:text-slate-700">City or Airport</p>
                        </div>
                    </div>

                    {/* Dates */}
                    <div className={cn("grid bg-white border border-slate-300 rounded-lg overflow-hidden", tripType === "roundTrip" ? "grid-cols-2 md:col-span-4" : "grid-cols-1 md:col-span-3")}>
                        <div className="p-3 border-r border-slate-300 hover:bg-blue-50 transition-colors relative group">
                            <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Departure</span>
                            <input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full bg-transparent font-bold text-lg text-slate-800 outline-none" />
                        </div>
                        {tripType === "roundTrip" ? (
                            <div className="p-3 hover:bg-blue-50 transition-colors relative group">
                                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Return</span>
                                <input name="returnDate" type="date" className="w-full bg-transparent font-bold text-lg text-slate-800 outline-none" />
                            </div>
                        ) : null}
                    </div>

                    {/* Travelers & Class */}
                    <div className={cn("relative bg-white border border-slate-300 rounded-lg p-3 hover:bg-blue-50 transition-colors cursor-pointer group", tripType === "roundTrip" ? "md:col-span-3" : "md:col-span-4")}>
                        <div onClick={() => setShowDropdown(!showDropdown)} className="h-full">
                            <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Travellers & Class</span>
                            <div className="flex items-baseline space-x-1">
                                <span className="text-2xl font-bold text-slate-800 group-hover:text-primary transition-colors">{passengers}</span>
                                <span className="text-sm font-medium text-slate-600">Traveller(s)</span>
                            </div>
                            <p className="text-xs text-slate-500 truncate group-hover:text-slate-700">
                                {classes.find(c => c.value === flightClass)?.label}
                            </p>
                        </div>

                        {/* Dropdown */}
                        {showDropdown && (
                            <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-slate-200 z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
                                {/* Triangle arrow */}
                                <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-t border-l border-slate-200 transform rotate-45"></div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Cabin Class</label>
                                        <div className="space-y-2">
                                            {classes.map((c) => (
                                                <label key={c.value} className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-slate-50">
                                                    <input
                                                        type="radio"
                                                        name="class"
                                                        value={c.value}
                                                        checked={flightClass === c.value}
                                                        onChange={() => setFlightClass(c.value)}
                                                        className="w-4 h-4 text-primary focus:ring-primary accent-primary"
                                                    />
                                                    <span className="text-sm font-medium text-slate-700">{c.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="border-t pt-4">
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Travellers</label>
                                        <div className="flex items-center justify-between bg-slate-50 rounded-lg p-2 border border-slate-200">
                                            <button
                                                type="button"
                                                onClick={() => setPassengers(Math.max(1, passengers - 1))}
                                                className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-slate-600 hover:text-primary disabled:opacity-50 font-bold text-lg"
                                                disabled={passengers <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="font-bold text-slate-800">{passengers}</span>
                                            <button
                                                type="button"
                                                onClick={() => setPassengers(Math.min(9, passengers + 1))}
                                                className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-slate-600 hover:text-primary font-bold text-lg"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setShowDropdown(false)}
                                        className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm"
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Backdrop to close dropdown */}
                        {showDropdown && (
                            <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)}></div>
                        )}
                    </div>
                </div>

                <div className="absolute -bottom-14 left-0 right-0 flex justify-center">
                    <button type="submit" className="bg-gradient-to-r from-primary to-blue-600 text-white font-bold py-3 px-12 rounded-full text-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center space-x-2 uppercase">
                        <span>Search Flights</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
