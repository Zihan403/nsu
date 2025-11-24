'use client'

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredAlumni = [
    {
      name: "Sarah Ahmed",
      role: "Software Engineer at Canva",
      year: "CSE '19",
      image: "/api/img/300/300",
      quote: "NSU gave me the foundation, but the Melbourne alumni network helped me thrive in the Australian tech scene.",
      company: "Canva"
    },
    {
      name: "Rahul Khan",
      role: "Financial Analyst at CommBank",
      year: "BBA '18",
      image: "/api/img/300/300", 
      quote: "The mentorship I received through our alumni network was instrumental in landing my dream job.",
      company: "Commonwealth Bank"
    },
    {
      name: "Fatima Rahman",
      role: "Data Scientist at Atlassian",
      year: "CSE '20",
      image: "/api/img/300/300",
      quote: "Being part of this community opened doors I never knew existed in Melbourne's startup ecosystem.",
      company: "Atlassian"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredAlumni.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredAlumni.length]);

  return (
    <div>
      {/* Hero Section with Background Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/icons/heropage.png')" }}
        ></div>
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/75 via-blue-800/70 to-blue-900/75"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          {/* NSUers Theme Line on Top */}
          <div className="mb-6 animate-fade-in-up">
            <span className="inline-block bg-white/20 backdrop-blur-sm px-8 py-3 rounded-full border border-white/30 text-lg font-semibold">
              Melbourne NSUers Alumni Network
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-wide drop-shadow-lg animate-fade-in-up animation-delay-200">
            CONNECTING NSUERS IN MELBOURNE
          </h1>
          <p className="text-xl sm:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto drop-shadow-md animate-fade-in-up animation-delay-300">
            Beyond Borders, Beyond Generations — Join Melbourne's vibrant NSU alumni community for networking, 
            career growth, and unforgettable events.
          </p>
          <Link 
            href="/events"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all transform hover:scale-105 shadow-xl animate-fade-in-up animation-delay-400"
          >
            FIND AN EVENT
          </Link>
        </div>
      </section>

      {/* We are Melbourne NSUers Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                We are <span className="italic">Melbourne NSUers</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600 text-lg leading-relaxed">
                <div>
                  <p className="mb-6">
                    Melbourne NSUers unites North South University graduates in Melbourne to foster connection, professional growth, 
                    and community impact. We create opportunities for alumni to network, support one another, and give back to the 
                    communities in Australia and Bangladesh while proudly representing the NSU spirit beyond borders.
                  </p>
                  <p>
                    Connect with fellow NSUers in Melbourne through reunions, networking events, professional workshops, 
                    and community gatherings. Keep your connection strong by updating your profile so you never miss the moments that matter.
                  </p>
                </div>
                <div>
                  <p className="mb-6">
                    Build meaningful connections through our mentorship programs and career development initiatives. Whether you're 
                    a recent graduate or an experienced professional, there's a place for you in our growing community.
                  </p>
                  <p>
                    Join us in building the strongest overseas chapter of North South University — creating a legacy network that inspires 
                    collaboration, empowers members, and strengthens the global NSU community. <strong className="text-gray-900">We are Melbourne NSUers.</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links Sidebar */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Links</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-blue-600 font-bold text-lg mr-3">01</span>
                  <Link href="/directory" className="text-gray-600 hover:text-blue-600 border-b border-transparent hover:border-blue-600 transition-all">
                    Update your contact information
                  </Link>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 font-bold text-lg mr-3">02</span>
                  <Link href="/events" className="text-gray-600 hover:text-blue-600 border-b border-transparent hover:border-blue-600 transition-all">
                    Find an event
                  </Link>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 font-bold text-lg mr-3">03</span>
                  <Link href="/join" className="text-gray-600 hover:text-blue-600 border-b border-transparent hover:border-blue-600 transition-all">
                    Join NSU Network
                  </Link>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 font-bold text-lg mr-3">04</span>
                  <Link href="/benefits" className="text-gray-600 hover:text-blue-600 border-b border-transparent hover:border-blue-600 transition-all">
                    Member Benefits & Perks
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Image Section */}
      <section className="relative h-96">
        <Image
          src="/assets/icons/collage.png"
          alt="Melbourne NSUers Community"
          fill
          className="object-cover"
        />
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Event 1 */}
            <div className="group cursor-pointer">
              <div className="aspect-video mb-6 overflow-hidden rounded-lg">
                <Image
                  src="/assets/images/events/reconnect.jpg"
                  alt="Annual Networking Night"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Annual Networking Night</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Connect with fellow NSUers, share your professional journey, and build lasting relationships 
                at Melbourne's premier NSU alumni networking event. Food, drinks, and great conversations await!
              </p>
              <div className="flex items-center justify-between">
                <Link 
                  href="/events"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  REGISTER NOW
                </Link>
                <span className="text-gray-500 text-sm">DECEMBER 15, 2025</span>
              </div>
            </div>

            {/* Event 2 */}
            <div className="group cursor-pointer">
              <div className="aspect-video mb-6 overflow-hidden rounded-lg">
                <Image
                  src="/api/img/600/400"
                  alt="Career Development Workshop"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Career Development Workshop</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Join senior alumni professionals for an interactive workshop covering resume building, 
                interview skills, and career advancement strategies tailored for the Australian job market.
              </p>
              <div className="flex items-center justify-between">
                <Link 
                  href="/events"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  LEARN MORE
                </Link>
                <span className="text-gray-500 text-sm">JANUARY 20, 2026</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/events"
              className="bg-black text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all"
            >
              VIEW CALENDAR
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Latest News & Updates
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay connected with featured news, success stories, and community highlights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* News Item 1 */}
            <a 
              href="https://www.youtube.com/watch?v=ZQmbPMaeV9s" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group cursor-pointer block"
            >
              <div className="mb-4 overflow-hidden rounded-lg shadow-md">
                <Image
                  src="https://i.ytimg.com/vi/ZQmbPMaeV9s/maxresdefault.jpg"
                  alt="Melbourne NSUers - SBS News"
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mb-3">
                <span className="text-sm text-blue-600 uppercase tracking-wide font-medium">
                  MEDIA COVERAGE
                </span>
              </div>
              <h3 className="text-xl font-bold text-blue-600 mb-3 group-hover:text-blue-800 transition-colors leading-tight">
                মেলবোর্নে নর্থ সাউথ ইউনিভার্সিটির অ্যালুমনির পুনর্মিলনী 'সিনেগালা' অনুষ্ঠিত
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Watch our community in action as Melbourne NSUers makes headlines on SBS News, showcasing the vibrant NSU alumni network in Australia.
              </p>
            </a>

            {/* News Item 2 */}
            <a 
              href="https://www.sbs.com.au/language/bangla/bn/article/cinagala-noa-blank/yyz99e20x" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group cursor-pointer block"
            >
              <div className="mb-4 overflow-hidden rounded-lg shadow-md">
                <Image
                  src="https://images.sbs.com.au/dims4/default/61fbbd2/2147483647/strip/true/crop/7639x4297+0+393/resize/1280x720!/quality/90/?url=http%3A%2F%2Fsbs-au-brightspot.s3.amazonaws.com%2F01%2F19%2F660db93f475a802d1fe93e69c048%2Fdsc-2544.jpg"
                  alt="Cinegala 2024 - SBS Bangla"
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mb-3">
                <span className="text-sm text-blue-600 uppercase tracking-wide font-medium">
                  EVENTS
                </span>
              </div>
              <h3 className="text-xl font-bold text-blue-600 mb-3 group-hover:text-blue-800 transition-colors leading-tight">
                Cinegala 2024 - SBS Bangla Coverage
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                SBS Bangla covers Melbourne NSUers' spectacular Cinegala event, celebrating Bengali cinema and culture in the heart of Melbourne.
              </p>
            </a>

            {/* News Item 3 */}
            <a 
              href="https://www.thedailystar.net/entertainment/theatre-arts/news/cinegala-2024-melbournes-nsu-alumni-revisit-golden-age-cinema-3743526" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group cursor-pointer block"
            >
              <div className="mb-4 overflow-hidden rounded-lg shadow-md">
                <Image
                  src="https://tds-images.thedailystar.net/sites/default/files/styles/big_202/public/images/2024/11/03/3423d5f2-8a0a-4313-8913-4e66a41c20a7.jpg"
                  alt="Cinegala 2024 - Daily Star"
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mb-3">
                <span className="text-sm text-blue-600 uppercase tracking-wide font-medium">
                  EVENTS
                </span>
              </div>
              <h3 className="text-xl font-bold text-blue-600 mb-3 group-hover:text-blue-800 transition-colors leading-tight">
                Cinegala 2024: Melbourne's NSU Alumni Revisit Golden Age of Cinema
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                The Daily Star features Melbourne NSUers' Cinegala 2024, a grand celebration revisiting the golden age of Bengali cinema with the alumni community.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Your NSU. Your impact.
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Scholarships. Research. The Mustang experience. Your gift keeps NSU moving forward for students 
                today and leaders tomorrow.
              </p>
              
              <div className="space-y-4 mb-8">
                <Link 
                  href="/donate"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all"
                >
                  GIVE NOW
                </Link>
                <div className="mt-4">
                  <p className="text-gray-600 mb-2">Prefer to explore first? <Link href="/giving" className="text-blue-600 underline">See how gifts help</Link></p>
                  <p className="text-gray-600 text-sm">
                    Fast, secure online form. You can direct your gift to the area you care about most.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content - Event Highlight */}
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden relative">
                <Image
                  src="/api/img/600/400"
                  alt="Mustang Tailgates"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8">
                  <div className="text-white">
                    <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full mb-4 inline-block">
                      HAPPENING NOW
                    </span>
                    <h3 className="text-2xl font-bold mb-3">Mustang Tailgates</h3>
                    <p className="text-lg mb-4">
                      Grab your spot, see the schedule, and reconnect on the Boulevard.
                    </p>
                    <Link 
                      href="/events/tailgates"
                      className="inline-block bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
                    >
                      PLAN YOUR TAILGATE
                    </Link>
                    <div className="mt-2">
                      <span className="text-sm">Can't make it? </span>
                      <Link href="/watch-party" className="text-sm text-red-400 underline">Find a watch party</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/join"
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
            >
              APPLY NOW
            </Link>
            <Link 
              href="/visit"
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
            >
              VISIT US
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
