import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import HeroCarousel from '@/components/home/HeroCarousel';
import CareersSection from '@/components/home/CareersSection';
import { getImageUrl } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

export default async function Home() {
  const categories = await prisma.category.findMany({
    orderBy: { id: 'asc' },
  });

  const testimonials = [
    { name: "Ali Khan", role: "CEO, TechFlow", content: "This team transformed our business idea into reality. Truly professional!" },
    { name: "Sara Ahmed", role: "MD, HealthCare Plus", content: "Excellent communication and top-notch delivery." },
    { name: "David Smith", role: "Founder, E-Shop", content: "Our website is now faster and more scalable thanks to them." },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="w-full">
        <HeroCarousel />
      </div>

      {/* Our Services Section */}
      <section id="services" className="py-24 px-6 sm:px-12 md:px-20 lg:px-32 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase tracking-tighter leading-none mb-6"> Our <span className="text-cyan-500">Services</span></h2>
              <p className="text-sm sm:text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
                Empowering your business with cutting-edge technological solutions tailored for growth and efficiency.
              </p>
            </div>
            <Link href="/services" className="group flex items-center gap-2 text-sm font-black uppercase tracking-widest text-cyan-500 hover:text-[#0A2540] transition-colors">
              View All Services
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.slice(0, 6).map((service) => (
              <Link
                key={service.id}
                href={`/services#${service.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                className="group relative bg-white p-6 md:py-8 md:px-10 rounded-[1.5rem] border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-bl-[5rem] -mr-10 -mt-10 transition-all duration-500 group-hover:w-40 group-hover:h-40" />
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#0A2540]">{service.name}</h3>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyan-500 opacity-0 group-hover:opacity-100 transition-all duration-500 shrink-0">
                    Learn More <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Careers In-View Section */}
      <div className="w-full bg-white">
        <CareersSection />
      </div>

      {/* Testimonials Section */}
      <section className="py-24 px-6 sm:px-12 md:px-20 lg:px-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase tracking-tighter leading-none mb-6">What People <span className="text-cyan-500">Say</span></h2>
            <p className="text-sm sm:text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto">
              Our clients&apos; words reflect the value we deliver. Helping businesses thrive through innovation and dedication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/5">
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, idx) => (
                    <svg key={idx} className="w-5 h-5 text-cyan-500 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg text-gray-700 font-medium leading-relaxed mb-10 italic">&quot;{t.content}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center font-black text-cyan-500 text-xl shadow-inner uppercase">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-black uppercase tracking-tight text-[#0A2540]">{t.name}</h4>
                    <p className="text-xs uppercase font-bold tracking-widest text-cyan-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Logos - Continuous Ticker */}
      <section className="py-20 bg-white overflow-hidden border-y border-gray-100">
        <div className="px-6 text-center mb-16">
          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-black uppercase tracking-tighter max-w-3xl mx-auto leading-tight">
            Our Strategic Partner Ecosystem
          </h2>
        </div>

        <div className="relative flex overflow-hidden group">
          <div className="flex animate-scroll hover:[animation-play-state:paused] py-4 gap-12 whitespace-nowrap">
            {[...["acc.png", "AWS.png", "cloudera.png", "GCP.png", "IBM.png", "infosys.png", "MS.png", "SAP.png", "SF.png", "temenso.png", "wipro.png", "zendesk.png"], ...["acc.png", "AWS.png", "cloudera.png", "GCP.png", "IBM.png", "infosys.png", "MS.png", "SAP.png", "SF.png", "temenso.png", "wipro.png", "zendesk.png"]].map((logo, i) => (
              <div key={i} className="inline-block relative h-10 w-32 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 transform hover:scale-110 px-4">
                <Image src={getImageUrl(logo)} alt={logo} fill className="object-contain" sizes="128px" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Banner */}
      <section className="relative min-h-[400px] md:min-h-[450px] flex items-center justify-center w-full overflow-hidden">
        <Image
          src={getImageUrl('quote.png')}
          alt="Banner"
          fill
          className="object-cover object-center grayscale-[50%] scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-4xl w-full">
            <div className="space-y-4 mb-12">
              <p className="text-[clamp(1.2rem,5vw,2.5rem)] text-white font-black uppercase tracking-tighter leading-none">We’re Here Whenever You Need</p>
              <p className="text-[clamp(1.2rem,5vw,2.5rem)] text-cyan-500 font-black uppercase tracking-tighter leading-none">Contact Our Team</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl p-4 md:p-6 rounded-[2rem] border border-white/10 group transition-all hover:bg-white/10 hover:border-cyan-500/50">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  <Image src={getImageUrl('email.svg')} alt="Email" width={24} height={24} className="md:w-8 md:h-8" />
                </div>
                <div className="text-left">
                  <span className="block text-cyan-400 font-black uppercase text-[10px] tracking-[0.2em] mb-1">Mail Now</span>
                  <span className="text-white font-bold text-sm md:text-lg break-all selection:bg-cyan-500">primelinetech@gmail.com</span>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl p-4 md:p-6 rounded-[2rem] border border-white/10 group transition-all hover:bg-white/10 hover:border-cyan-500/50">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  <Image src={getImageUrl('call.svg')} alt="Call" width={24} height={24} className="md:w-8 md:h-8" />
                </div>
                <div className="text-left">
                  <span className="block text-cyan-400 font-black uppercase text-[10px] tracking-[0.2em] mb-1">Call Now</span>
                  <span className="text-white font-bold text-sm md:text-lg selection:bg-cyan-500">+92 335 3948753</span>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <Link href="/contact" className="inline-flex items-center px-10 py-4 bg-cyan-500 text-white text-xs md:text-sm font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-cyan-500/40 transform transition-all hover:scale-105 active:scale-95 hover:bg-cyan-600">Get a Quote</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
