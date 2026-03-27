import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import HeroCarousel from '@/components/home/HeroCarousel';
import { getImageUrl } from '@/lib/utils';

export default async function Home() {
  const categories = await prisma.category.findMany({
    orderBy: { id: 'asc' },
  });

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-40 overflow-x-hidden">

      {/* Hero Section */}
      <HeroCarousel />

      {/* Our Services Section */}
      <section className="py-20 sm:py-24 md:py-32">
        <div className="text-center mb-16 md:mb-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-gray-900 mb-6 uppercase">
            Our <span className="text-orange-500">Services</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-gray-500 font-medium leading-relaxed">
            We are passionate about what we do, delivering scalable, high-impact software solutions.
            Below are our core competencies, managed through our centralized global infrastructure.
          </p>
        </div>

        {/* Dynamic Categories Grid - Ultra-Minimalist Rectangular Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 max-w-7xl mx-auto">
          {categories.map((service, index) => (
            <div
              key={service.id}
              className="flex items-center p-5 min-h-[80px] rounded-xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-lg hover:border-orange-200 group relative overflow-hidden"
            >
              <span className="text-[9px] font-black text-gray-200 uppercase tracking-widest mr-4 group-hover:text-orange-500 transition-colors">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-xs sm:text-sm font-bold text-gray-900 tracking-tight transition-all duration-300 group-hover:text-orange-500 text-left line-clamp-2">
                {service.name}
              </span>
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-gray-50 group-hover:bg-orange-500 transition-all duration-500" />
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link
            href="/services"
            className="inline-flex items-center px-12 py-5 bg-black text-white text-lg font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-gray-200 transition-all duration-500 hover:scale-[1.05] hover:bg-orange-500 hover:shadow-orange-500/30"
          >
            Explore Portfolio
            <svg className="w-5 h-5 ml-3 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Banner Section */}
      <section className="relative min-h-[30vh] sm:min-h-[10vh] md:min-h-[20vh] lg:min-h-[30vh] w-screen -mx-4 sm:-mx-8 md:-mx-16 lg:-mx-40 overflow-hidden">
        <img src={getImageUrl('code.png')} alt="Banner" className="w-full h-full object-cover absolute inset-0 object-center [object-position:center_30%] max-sm:[object-position:center_20%] max-sm:scale-125" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col sm:flex-row items-center justify-center">
          <div className="flex-1 flex items-center justify-center p-2 sm:p-3 md:p-4">
            <div className="text-center text-white">
              <p className="text-2xl sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold mb-4">World’s Proficient Software Solutions Agency</p>
              <p className="px-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                Primeline IT Services LLC, a USA-based and fully registered software company, is recognized as one of the leading agencies in Asia. Our mission is to build tailored solutions that empower businesses and generate measurable impact. We shape the future of our clients by providing end-to-end software development and advanced technology services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Text + Stats Section */}
      <section className="py-6 sm:py-8 md:py-10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-2 sm:mb-4 md:mb-6">Translating technology into a positive impact</h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-black mb-2 sm:mb-4 md:mb-6">
              Our approach allows us to deliver exceptional experiences that drive growth and success for all stakeholders. Let’s rise to new heights with the power of digital transformation.
            </p>
            <Link href="/about" className="px-3 sm:px-4 md:px-6 py-1 sm:py-2 md:py-3 bg-white text-orange-500 text-sm sm:text-base md:text-lg font-semibold rounded-lg shadow-md transform transition duration-300 hover:scale-[1.02] hover:shadow-lg">LEARN MORE</Link>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6 text-center">
            {[
              { val: "48+", text: "Years of continual excellence" },
              { val: "7700+", text: "Change makers driving revolution" },
              { val: "16+", text: "Countries with our presence and clientele" },
              { val: "300+", text: "Active clients across the globe" },
            ].map((stat, i) => (
              <div key={i}>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-orange-500">{stat.val}</h3>
                <p className="text-xs sm:text-sm md:text-base text-black">{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Logos Carousel */}
      <section className="py-4 sm:py-6">
        <div className="text-center w-full">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-black mb-2 sm:mb-4 md:mb-6 max-w-3xl mx-auto">
            We rethink business growth for you through our collective experience with strategic partner ecosystem.
          </h2>
          <div className="overflow-hidden relative w-full">
            <div className="flex w-max animate-scroll gap-4 sm:gap-6 md:gap-8">
              {["acc.png", "AWS.png", "cloudera.png", "GCP.png", "IBM.png", "infosys.png", "MS.png", "SAP.png", "SF.png", "temenso.png", "wipro.png", "zendesk.png"].map((logo, i) => (
                <img key={i} src={getImageUrl(logo)} alt={logo} className="h-4 sm:h-6 md:h-12 mt-2" />
              ))}
              {/* Duplicated for smooth scroll */}
              {["acc.png", "AWS.png", "cloudera.png", "GCP.png", "IBM.png", "infosys.png", "MS.png", "SAP.png", "SF.png", "temenso.png", "wipro.png", "zendesk.png"].map((logo, i) => (
                <img key={`dup-${i}`} src={getImageUrl(logo)} alt={logo} className="h-4 sm:h-6 md:h-12 mt-2" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Banner */}
      <section className="relative min-h-[50vh] sm:min-h-[40vh] md:min-h-[30vh] lg:min-h-[30vh] w-screen -mx-4 sm:-mx-8 md:-mx-16 lg:-mx-40 overflow-hidden">
        <img src={getImageUrl('quote.png')} alt="Banner" className="w-full h-full object-cover absolute inset-0 object-center [object-position:center_30%] max-sm:[object-position:center_20%] max-sm:scale-125" />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col sm:flex-row space-y-4 sm:space-y-0 items-center justify-center">
          <div className="flex-1 flex items-center justify-center p-2 sm:p-3 md:p-4">
            <div className="text-center text-white">
              <p className="text-2xl sm:text-base md:text-lg lg:text-xl xl:text-4xl font-semibold">We’re Here Whenever You Need</p>
              <p className="text-2xl sm:text-base md:text-lg lg:text-xl xl:text-4xl">Contact Our Team</p>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center p-2 sm:p-3 md:p-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 md:gap-4">
              <div className="flex flex-col items-center">
                <img src={getImageUrl('email.svg')} alt="Email Icon" className="w-5 h-5 sm:w-12 sm:h-12 mb-1" />
                <span className="text-white font-semibold">Mail Now</span>
                <span className="text-white font-semibold">primelinetech@gmail.com</span>
              </div>
              <div className="flex flex-col items-center">
                <img src={getImageUrl('call.svg')} alt="Call Icon" className="w-5 h-5 sm:w-12 sm:h-12 mb-1" />
                <span className="text-white font-semibold">Call Now</span>
                <span className="text-white font-semibold">+92 335 3948753</span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center p-2 sm:p-3 md:p-4">
            <div className="text-center text-white">
              <p className="mt-1 sm:mt-2 mb-2 sm:mb-5 text-lg sm:text-sm md:text-base lg:text-4xl font-semibold">Fill form to get quote.</p>
              <Link href="/contact" className="px-2 sm:px-4 md:px-5 py-1 sm:py-2 md:py-2 bg-white text-black text-lg sm:text-sm md:text-2xl font-semibold rounded-lg shadow-md transform transition duration-300 hover:scale-[1.02] hover:shadow-lg">Get a Quote</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-6 sm:py-8 md:py-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 sm:mb-3 md:mb-4 text-center font-bold">What People Say About Us</h1>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-3 sm:mb-4 md:mb-6 text-center max-w-2xl sm:max-w-3xl mx-auto">
          Our clients’ words reflect the value we deliver. From startups to established enterprises, we’ve helped businesses
          transform ideas into impactful solutions. Here’s what they have to say about working with Primeline IT Services.
        </p>
        <div className="overflow-hidden relative">
          <div className="flex w-max animate-scroll gap-2 sm:gap-3 md:gap-4">
            {[
              { author: "Ali Khan", text: "This team transformed our business idea into reality. Truly professional!" },
              { author: "Sara Ahmed", text: "Excellent communication and top-notch delivery." },
              { author: "David Smith", text: "Our website is now faster and more scalable thanks to them." },
              { author: "Fatima Noor", text: "Amazing design sense and problem-solving skills." },
              { author: "John Wilson", text: "Delivered the project before deadline with great quality." },
              { author: "Ayesha Malik", text: "Reliable team — they understood our vision perfectly." },
              { author: "Michael Brown", text: "I highly recommend their services to any business." },
              { author: "Rabia Sheikh", text: "Our app launch was smooth and successful!" },
              { author: "Chris Evans", text: "Great technical expertise and constant support." },
              { author: "Hina Qureshi", text: "They exceeded our expectations with their work." },
            ].map((t, i) => (
              <div key={i} className="min-w-[200px] sm:min-w-[280px] bg-white p-3 sm:p-5 m-1 rounded-lg shadow-sm">
                <p className="italic text-xs sm:text-base">"{t.text}"</p>
                <h3 className="mt-2 sm:mt-4 font-semibold text-xs sm:text-base">- {t.author}</h3>
              </div>
            ))}
            {/* Duplicated for scroll */}
            {[
              { author: "Ali Khan", text: "This team transformed our business idea into reality. Truly professional!" },
              { author: "Sara Ahmed", text: "Excellent communication and top-notch delivery." },
              { author: "David Smith", text: "Our website is now faster and more scalable thanks to them." },
              { author: "Fatima Noor", text: "Amazing design sense and problem-solving skills." },
              { author: "John Wilson", text: "Delivered the project before deadline with great quality." },
              { author: "Ayesha Malik", text: "Reliable team — they understood our vision perfectly." },
              { author: "Michael Brown", text: "I highly recommend their services to any business." },
              { author: "Rabia Sheikh", text: "Our app launch was smooth and successful!" },
              { author: "Chris Evans", text: "Great technical expertise and constant support." },
              { author: "Hina Qureshi", text: "They exceeded our expectations with their work." },
            ].map((t, i) => (
              <div key={`dup-${i}`} className="min-w-[200px] sm:min-w-[280px] bg-white p-3 sm:p-5 m-1 rounded-lg shadow-sm">
                <p className="italic text-xs sm:text-base">"{t.text}"</p>
                <h3 className="mt-2 sm:mt-4 font-semibold text-xs sm:text-base">- {t.author}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="relative h-screen w-screen -mx-4 sm:-mx-8 md:-mx-16 lg:-mx-40 overflow-hidden">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay muted loop playsInline>
          <source src="/videos/poeple_office.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        <div className="absolute top-1/2 left-2 sm:left-16 transform -translate-y-1/2 text-white z-20 px-4 max-w-[90%] sm:max-w-[60%]">
          <h1 className="text-3xl sm:text-7xl mb-4 leading-tight">Careers at Primeline Technologies</h1>
          <p className="text-sm sm:text-xl">Join Primeline IT Services to innovate, grow, and make an impact in a dynamic tech-driven environment.</p>
          <Link href="/careers" className="mt-6 inline-block px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition">Explore Careers</Link>
        </div>
      </section>

    </div>
  );
}
