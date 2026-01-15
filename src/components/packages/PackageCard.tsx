"use client";
import Image from "next/image";
import { Star, MapPin, Clock, ArrowRight, CheckCircle2, ImageOff } from "lucide-react";
import { useState } from "react";

interface Package {
    id: string;
    title: string;
    location: string;
    duration: string;
    price: number;
    image: string;
    rating: number;
    reviews: number;
    amenities: string[];
}

interface PackageCardProps {
    pkg: Package;
}

export function PackageCard({ pkg }: PackageCardProps) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all group flex flex-col h-full">
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                {!imgError ? (
                    <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        onError={() => setImgError(true)}
                        unoptimized
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                        <ImageOff className="w-8 h-8 mb-2" />
                        <span className="text-xs">Image not available</span>
                    </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-900 flex items-center shadow-sm">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                    {pkg.rating}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">{pkg.title}</h3>
                        <div className="flex items-center text-slate-500 text-xs mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {pkg.location}
                        </div>
                    </div>
                </div>

                <div className="flex items-center text-slate-500 text-xs mt-2 mb-4">
                    <Clock className="w-3 h-3 mr-1" />
                    {pkg.duration}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {pkg.amenities.map(amenity => (
                        <span key={amenity} className="text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded-full flex items-center">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> {amenity}
                        </span>
                    ))}
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-slate-400">Starting from</p>
                        <p className="text-lg font-bold text-slate-900">₹ {pkg.price.toLocaleString('en-IN')}</p>
                    </div>
                    <button className="bg-white border border-primary text-primary hover:bg-primary hover:text-white transition-colors px-4 py-2 rounded-full text-sm font-bold flex items-center">
                        View Details <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                </div>
            </div>
        </div>
    );
}
