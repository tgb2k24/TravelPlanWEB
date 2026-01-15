import { PackageCard } from "@/components/packages/PackageCard";

async function getPackages() {
    return [
        {
            id: "PKG001",
            title: "Magical Maldives",
            location: "Maldives",
            duration: "5 Nights / 6 Days",
            price: 45000,
            image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2000&auto=format&fit=crop",
            rating: 4.8,
            reviews: 120,
            amenities: ["Flight", "Hotel", "Meals", "Transfer"]
        },
        {
            id: "PKG002",
            title: "Dubai Delight",
            location: "Dubai",
            duration: "4 Nights / 5 Days",
            price: 35000,
            image: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=2000&auto=format&fit=crop",
            rating: 4.5,
            reviews: 85,
            amenities: ["Flight", "Hotel", "Sightseeing", "Visa"]
        },
        {
            id: "PKG003",
            title: "Bali Bliss",
            location: "Bali, Indonesia",
            duration: "6 Nights / 7 Days",
            price: 55000,
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop",
            rating: 4.7,
            reviews: 200,
            amenities: ["Flight", "Villa", "Breakfast", "Tours"]
        },
        {
            id: "PKG004",
            title: "Kerala Backwaters",
            location: "Kerala, India",
            duration: "3 Nights / 4 Days",
            price: 18000,
            image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000&auto=format&fit=crop",
            rating: 4.6,
            reviews: 150,
            amenities: ["Houseboat", "Meals", "Transfer"]
        },
        {
            id: "PKG005",
            title: "Spectacular Singapore",
            location: "Singapore",
            duration: "4 Nights / 5 Days",
            price: 42000,
            image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2000&auto=format&fit=crop",
            rating: 4.7,
            reviews: 180,
            amenities: ["Flight", "Hotel", "City Tour", "Sentosa"]
        },
        {
            id: "PKG006",
            title: "Tropical Thailand",
            location: "Phuket & Bangkok",
            duration: "5 Nights / 6 Days",
            price: 38000,
            image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2000&auto=format&fit=crop",
            rating: 4.6,
            reviews: 220,
            amenities: ["Flight", "Beach Hotel", "Breakfast", "Island Tour"]
        },
        {
            id: "PKG007",
            title: "Shimla Serenity",
            location: "Shimla, Himachal Pradesh",
            duration: "3 Nights / 4 Days",
            price: 15000,
            image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=2000&auto=format&fit=crop",
            rating: 4.5,
            reviews: 95,
            amenities: ["Volvo Bus", "Hotel", "Sightseeing", "Meals"]
        },
        {
            id: "PKG008",
            title: "Majestic Manali",
            location: "Manali, Himachal Pradesh",
            duration: "4 Nights / 5 Days",
            price: 18500,
            image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=2000&auto=format&fit=crop",
            rating: 4.8,
            reviews: 140,
            amenities: ["Volvo Bus", "Resort", "Snow Points", "Meals"]
        },
        {
            id: "PKG009",
            title: "New York Highlights",
            location: "New York, USA",
            duration: "6 Nights / 7 Days",
            price: 125000,
            image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=2000&auto=format&fit=crop",
            rating: 4.9,
            reviews: 110,
            amenities: ["Flight", "City Stay", "City Pass", "Visa Assistance"]
        }
    ];
}

export default async function PackagesPage() {
    const packages = await getPackages();

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Holiday Packages</h1>
                    <p className="text-slate-600 max-w-2xl mx-auto">Discover our handpicked holiday packages for your perfect vacation.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {packages.map(pkg => (
                        <PackageCard key={pkg.id} pkg={pkg} />
                    ))}
                </div>
            </div>
        </div>
    );
}
