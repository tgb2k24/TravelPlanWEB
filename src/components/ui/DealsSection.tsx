import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const deals = [
    {
        id: 1,
        title: "Summer in Maldives",
        description: "5 Nights / 6 Days starting @ $999",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2000&auto=format&fit=crop",
        tag: "Trending"
    },
    {
        id: 2,
        title: "Explore Dubai",
        description: "Special Shopping Festival Offers",
        image: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=2000&auto=format&fit=crop",
        tag: "Best Seller"
    },
    {
        id: 3,
        title: "Bali Getaway",
        description: "Luxury villas with private pool",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop",
        tag: "Honeymoon"
    }
];

export function DealsSection() {
    return (
        <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900">Exclusive Offers</h2>
                        <p className="text-slate-600 mt-2">Handpicked packages just for you.</p>
                    </div>
                    <Link href="/packages" className="text-primary font-semibold flex items-center hover:underline">
                        View All Offers <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {deals.map((deal) => (
                        <div key={deal.id} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white cursor-pointer">
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={deal.image}
                                    alt={deal.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 uppercase tracking-wider">
                                    {deal.tag}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{deal.title}</h3>
                                <p className="text-slate-600">{deal.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
