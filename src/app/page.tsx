import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import HeroCarousel from '@/components/home/HeroCarousel';
import CareersSection from '@/components/home/CareersSection';
import { getImageUrl } from '@/lib/utils';

export default async function Home() {
  const categories = await prisma.category.findMany({
    orderBy: { id: 'asc' },
  });

  return (
    <div> {/* Add padding for fixed navbar on mobile if needed */}

      {/* Hero Section */}
      <div className="w-full">
        <HeroCarousel />
      </div>

      {/* Our Services Section */}
      <section className="py-20 px-6 sm:px-12 md:px-20 lg:px-32 max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-tighter text-gray-900 mb-6 uppercase leading-[0.95]">
            Our <span className="text-orange-500">Services</span>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl max-w-3xl mx-auto text-gray-500 font-medium leading-relaxed">
            We are passionate about what we do, delivering scalable, high-impact software solutions.
            Below are our core competencies.
          </p>
        </div>

        {/* Dynamic Categories Grid - Optimized for Mobile Stacking */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {categories.map((service, index) => (
            <div
              key={service.id}
              className="flex items-center p-6 min-h-[90px] rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-orange-200 group relative overflow-hidden"
            >
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mr-4 group-hover:text-orange-500 transition-colors">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-sm sm:text-base font-bold text-gray-900 tracking-tight transition-all duration-300 group-hover:text-orange-500 text-left line-clamp-2 pr-4">
                {service.name}
              </span>
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-gray-50 group-hover:bg-orange-500 transition-all duration-500" />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/services"
            className="inline-flex items-center px-10 py-5 bg-black text-white text-sm font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-gray-200 transition-all duration-300 hover:scale-[1.05] hover:bg-orange-500 hover:shadow-orange-500/20"
          >
            Explore Portfolio
            <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Banner Section - Optimized for Mobile Aspect Ratio */}
      <section className="relative min-h-[400px] md:min-h-[500px] w-full overflow-hidden">
        <Image
          src={getImageUrl('code.png')}
          alt="Banner"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center px-6 py-12">
          <div className="max-w-5xl text-center text-white">
            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-black mb-6 uppercase tracking-tight">World’s Proficient Software Agency</h2>
            <p className="text-sm sm:text-lg md:text-xl font-medium text-white/80 leading-relaxed max-w-4xl mx-auto">
              Primeline IT Services LLC, a USA-based and fully registered software company, is recognized as one of the leading agencies in Asia. Our mission is to build tailored solutions that empower businesses and generate measurable impact.
            </p>
          </div>
        </div>
      </section>

      {/* Text + Stats Section */}
      <section className="py-24 px-6 sm:px-12 md:px-20 lg:px-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-[clamp(2rem,5vw,3rem)] font-black text-black mb-8 uppercase leading-[0.95] tracking-tighter">Translating technology <br /><span className="text-orange-500">into impact</span></h2>
            <p className="text-sm sm:text-lg text-gray-600 mb-8 leading-relaxed font-medium">
              Our approach allows us to deliver exceptional experiences that drive growth and success for all stakeholders. Let’s rise to new heights with the power of digital transformation.
            </p>
            <Link href="/about" className="inline-block px-8 py-4 bg-white border-2 border-black text-black text-sm font-black uppercase tracking-widest rounded-xl transition-all hover:bg-black hover:text-white transform hover:scale-105 active:scale-95">LEARN MORE</Link>
          </div>
          <div className="grid grid-cols-2 gap-8 text-left">
            {[
              { val: "48+", text: "Years of excellence" },
              { val: "7700+", text: "Change makers" },
              { val: "16+", text: "Countries" },
              { val: "300+", text: "Active clients" },
            ].map((stat, i) => (
              <div key={i} className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-2xl sm:text-4xl font-black text-black mb-1">{stat.val}</h3>
                <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-widest">{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Logos - Swipeable on Mobile */}
      {/* Partner Logos - Continuous Ticker */}
      <section className="py-20 bg-gray-50/50 overflow-hidden border-y border-gray-100">
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

      {/* Contact Banner - Responsive Optimization */}
      <section className="relative min-h-[400px] md:min-h-[450px] flex items-center justify-center w-full overflow-hidden">
        <Image
          src={getImageUrl('quote.png')}
          alt="Banner"
          fill
          className="object-cover object-center grayscale-[50%] scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
          <div className="max-w-4xl w-full">
            <div className="space-y-4 mb-12">
              <p className="text-[clamp(1.2rem,5vw,2.5rem)] text-white font-black uppercase tracking-tighter leading-none">We’re Here Whenever You Need</p>
              <p className="text-[clamp(1.2rem,5vw,2.5rem)] text-orange-500 font-black uppercase tracking-tighter leading-none">Contact Our Team</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl p-4 md:p-6 rounded-[2rem] border border-white/10 group transition-all hover:bg-white/10 hover:border-orange-500/50">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  <Image src={getImageUrl('email.svg')} alt="Email" width={24} height={24} className="md:w-8 md:h-8" />
                </div>
                <div className="text-left">
                  <span className="block text-orange-400 font-black uppercase text-[10px] tracking-[0.2em] mb-1">Mail Now</span>
                  <span className="text-white font-bold text-sm md:text-lg break-all selection:bg-orange-500">primelinetech@gmail.com</span>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl p-4 md:p-6 rounded-[2rem] border border-white/10 group transition-all hover:bg-white/10 hover:border-orange-500/50">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  <Image src={getImageUrl('call.svg')} alt="Call" width={24} height={24} className="md:w-8 md:h-8" />
                </div>
                <div className="text-left">
                  <span className="block text-orange-400 font-black uppercase text-[10px] tracking-[0.2em] mb-1">Call Now</span>
                  <span className="text-white font-bold text-sm md:text-lg selection:bg-orange-500">+92 335 3948753</span>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <Link href="/contact" className="inline-flex items-center px-10 py-4 bg-orange-500 text-white text-xs md:text-sm font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-orange-500/40 transform transition-all hover:scale-105 active:scale-95 hover:bg-orange-600">Get a Quote</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section - Swipeable on Mobile */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="px-6 text-center mb-16">
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-black tracking-tighter uppercase mb-4 leading-none">What People <span className="text-orange-500">Say</span></h1>
          <p className="text-sm sm:text-lg text-gray-500 font-medium max-w-2xl mx-auto">
            Our clients’ words reflect the value we deliver. Helping businesses
            transform ideas into impactful solutions.
          </p>
        </div>

        <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-6 px-6 pb-8 md:justify-center">
          {[
            { author: "Ali Khan", text: "This team transformed our business idea into reality. Truly professional!" },
            { author: "Sara Ahmed", text: "Excellent communication and top-notch delivery." },
            { author: "David Smith", text: "Our website is now faster and more scalable thanks to them." },
            { author: "Fatima Noor", text: "Amazing design sense and problem-solving skills." },
            { author: "John Wilson", text: "Delivered the project before deadline with great quality." },
          ].map((t, i) => (
            <div key={i} className="flex-shrink-0 w-[280px] sm:w-[350px] snap-center bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col justify-between">
              <p className="italic text-base sm:text-lg font-medium text-gray-800 leading-relaxed">&quot;{t.text}&quot;</p>
              <h3 className="mt-8 font-black text-[10px] uppercase tracking-[0.2em] text-orange-500">{t.author}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Careers Section */}
      <div className="w-full">
        <CareersSection />
      </div>

    </div>
  );
}
