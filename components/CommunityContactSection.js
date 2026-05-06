import Link from "next/link";

export default function CommunityContactSection() {
    return (
        <div className="md:flex justify-between items-center max-w-screen-2xl mx-auto px-4 md:px-6 bg-black text-white md:rounded-lg 2xl:rounded-x p-4 md:p-8">
            <div className="w-full mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 font-custom">Can&apos;t find the right property in the right community?</h2>
                <p className="text-lg text-white leading-relaxed mb-2 font-custom3">Tell us your budget and preferences  our RERA-certified consultants will shortlist the best options for you today, for free.</p>
            </div>
            <div className="w-full mx-auto flex md:justify-end justify-center md:gap-4 gap-2">
                <Link href="/contact" className="bg-white text-black hover:bg-gray-200 duration-300 py-3 px-6 rounded-lg tracking-wider">Contact Us</Link>
                <Link href="https://api.whatsapp.com/send/?phone=971526902884&text=Hello%21%20I%20am%20interested%20in%20Community&type=phone_number&app_absent=0" target="_blank" className="bg-white text-black hover:bg-gray-200 duration-300 py-3 px-6 rounded-lg tracking-wider">WhatsApp</Link>
            </div>
        </div>
    );
}