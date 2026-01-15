import { siteConfig } from "@/config/siteConfig";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="bg-slate-50 min-h-screen py-16">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-slate-900 mb-12">Contact Us</h1>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    <div className="bg-white p-8 rounded-2xl shadow-sm">
                        <h2 className="text-2xl font-bold mb-6 text-slate-900">Get in Touch</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                <input type="text" className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input type="email" className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                                <textarea rows={4} className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-primary transition-colors" placeholder="How can we help you?"></textarea>
                            </div>
                            <button className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">Send Message</button>
                        </form>
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-primary shrink-0">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-lg">Phone</h3>
                                <p className="text-slate-600">{siteConfig.contact.phone}</p>
                                <p className="text-xs text-slate-400 mt-1">Mon-Fri 9am to 6pm</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-primary shrink-0">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-lg">Email</h3>
                                <p className="text-slate-600">{siteConfig.contact.email}</p>
                                <p className="text-xs text-slate-400 mt-1">Online support 24/7</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-primary shrink-0">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-lg">Address</h3>
                                <p className="text-slate-600">{siteConfig.contact.address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
