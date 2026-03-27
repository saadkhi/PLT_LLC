import prisma from '@/lib/prisma';
import ContactForm from '@/components/common/ContactForm';

export default async function ContactPage() {
    const offices = (await (prisma as any).office.findMany({
        orderBy: { is_main: 'desc' }
    })) as any[];

    const mainOffice = offices.find(o => o.is_main);

    return (
        <div className="px-2 sm:px-4 md:px-8 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-4 sm:mt-6 md:mt-8 text-center font-bold">Contact Us</h1>
            <section className="py-6 sm:py-8 md:py-10 bg-gray-100">
                <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                    {/* Contact Details (Left) */}
                    <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-md min-h-[300px] overflow-hidden">
                        <h3 className="text-xl sm:text-3xl font-semibold text-black mb-6">Get in Touch</h3>

                        {mainOffice ? (
                            <div className="space-y-8">
                                <div className="pb-8 border-b border-gray-100">
                                    <h4 className="font-black text-xl mb-4 tracking-tight uppercase">
                                        {mainOffice.name}
                                    </h4>
                                    <div className="space-y-3 text-sm sm:text-base font-medium text-gray-600">
                                        <p><span className="text-[10px] font-black text-gray-300 uppercase tracking-widest block mb-1">Address</span> {mainOffice.address}</p>
                                        <p><span className="text-[10px] font-black text-gray-300 uppercase tracking-widest block mb-1">Phone</span> {mainOffice.phone}</p>
                                        <p><span className="text-[10px] font-black text-gray-300 uppercase tracking-widest block mb-1">Email</span>
                                            <a href={`mailto:${mainOffice.email}`} className="text-orange-500 hover:underline inline-block">{mainOffice.email}</a>
                                        </p>
                                        <p><span className="text-[10px] font-black text-gray-300 uppercase tracking-widest block mb-1">Office Hours</span> {mainOffice.office_hours}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <h4 className="font-black text-xl mb-4 tracking-tight uppercase">USA Head Office</h4>
                                <p className="text-sm sm:text-lg"><span className="font-semibold text-black">Address:</span> 5410 BROOKWAY WILLOW DR, SPRING TX 77379-2840, USA</p>
                                <p className="text-sm sm:text-lg"><span className="font-semibold text-black">Phone:</span> +1 (302) 367-9366</p>
                                <p className="text-sm sm:text-lg"><span className="font-semibold text-black">Email:</span>
                                    <a href="mailto:hr@primeline.com" className="text-blue-600 hover:underline"> hr@primeline.com</a>
                                </p>
                                <p className="text-sm sm:text-lg"><span className="font-semibold text-black">Office Hours:</span> Mon - Fri (9:00 AM - 6:00 PM)</p>
                            </div>
                        )}
                    </div>

                    {/* Contact Form (Right) */}
                    <ContactForm />
                </div>
            </section>
        </div>
    );
}
