import { siteConfig } from "@/config/siteConfig";

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 mb-6">About Us</h1>
                    <p className="text-lg text-slate-600">
                        {siteConfig.description}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" alt="Team" className="object-cover w-full h-full" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                            At {siteConfig.name}, we believe that travel is the ultimate way to learn and grow. Our mission is to make travel accessible, affordable, and seamless for everyone. We combine technology with human expertise to curate the best experiences for you.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Whether you are looking for a quick getaway or a month-long expedition, we have got you covered with our extensive network of airline and hotel partners.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
