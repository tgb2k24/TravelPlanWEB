import { FlightSearchForm } from "@/components/flight/FlightSearchForm";

export function HeroSection() {
    return (
        <section className="relative">
            <div className="h-[500px] w-full bg-gradient-to-r from-blue-900 to-primary relative overflow-hidden">
                {/* Abstract Background or Image */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-black/20"></div>

                <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10 text-center pb-20">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-md">
                        Explore the World with Us
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 max-w-2xl drop-shadow-sm">
                        Unbeatable deals on flights, hotels, and holiday packages.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-12">
                <FlightSearchForm />
            </div>
        </section>
    );
}
