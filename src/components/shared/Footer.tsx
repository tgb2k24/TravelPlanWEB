import { siteConfig } from "@/config/siteConfig";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-200 py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">{siteConfig.name}</h2>
                    <p className="text-sm text-slate-400">
                        {siteConfig.description}
                    </p>
                    <div className="flex space-x-4">
                        <Link href={siteConfig.social.twitter} className="hover:text-white"><Twitter className="h-5 w-5" /></Link>
                        <Link href={siteConfig.social.facebook} className="hover:text-white"><Facebook className="h-5 w-5" /></Link>
                        <Link href={siteConfig.social.instagram} className="hover:text-white"><Instagram className="h-5 w-5" /></Link>
                        <Link href={siteConfig.social.linkedin} className="hover:text-white"><Linkedin className="h-5 w-5" /></Link>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-semibold text-white mb-4">Company</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                        <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                        <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="font-semibold text-white mb-4">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
                        <li><Link href="/legal/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/legal/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
                        <li><Link href="/legal/refund" className="hover:text-primary transition-colors">Refund Policy</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-semibold text-white mb-4">Contact</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start space-x-3">
                            <Phone className="h-5 w-5 text-primary shrink-0" />
                            <span>{siteConfig.contact.phone}</span>
                        </li>
                        <li className="flex items-start space-x-3">
                            <Mail className="h-5 w-5 text-primary shrink-0" />
                            <span>{siteConfig.contact.email}</span>
                        </li>
                        <li className="flex items-start space-x-3">
                            <MapPin className="h-5 w-5 text-primary shrink-0" />
                            <span>{siteConfig.contact.address}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
                © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </div>
        </footer>
    );
}
