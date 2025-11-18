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
            AFTER THE HILLTOP
          </h1>
          <p className="text-xl sm:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto drop-shadow-md animate-fade-in-up animation-delay-300">
            Find your next NSU moment—reunions, watch parties, networking, and more. 
            Explore upcoming alumni events near you.
          </p>
          <Link 
            href="/events"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all transform hover:scale-105 shadow-xl animate-fade-in-up animation-delay-400"
          >
            FIND AN EVENT
          </Link>
        </div>
      </section>

      {/* We are NSU Alumni Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                We are <span className="italic">NSU alumni</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600 text-lg leading-relaxed">
                <div>
                  <p className="mb-6">
                    For everyone who leaves the campus, the story continues. We are a community of doers and 
                    dreamers who stay curious, push forward and look out for one another. Keep your connection strong 
                    by updating your contact info so you never miss the moments that matter.
                  </p>
                  <p>
                    Plug into your local network and meet fellow NSU graduates in your city for reunions, watch 
                    parties, service projects and career meetups.
                  </p>
                </div>
                <div>
                  <p className="mb-6">
                    Grow with alumni mentors and share your experience to help the next generation. Join an affinity or regional 
                    group that fits your interests and find a place that feels like home.
                  </p>
                  <p>
                    Lead as a volunteer or class ambassador, or support a cause you love to power 
                    scholarships, research and student success. <strong className="text-gray-900">We are NSU alumni.</strong>
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
          src="/api/img/1200/400"
          alt="NSU Campus"
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
                  src="/api/img/600/400"
                  alt="Golden Mustang Tailgate"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Golden Mustang Tailgate</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Reconnect with classmates, share stories, and make new memories at 
                the Golden Mustang Tailgate—food, friends, and school spirit in a setting 
                made for you.
              </p>
              <div className="flex items-center justify-between">
                <Link 
                  href="/events/tailgate"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  REGISTER NOW
                </Link>
                <span className="text-gray-500 text-sm">NOVEMBER 22, 2025</span>
              </div>
            </div>

            {/* Event 2 */}
            <div className="group cursor-pointer">
              <div className="aspect-video mb-6 overflow-hidden rounded-lg">
                <Image
                  src="/api/img/600/400"
                  alt="Celebration of Lights"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Celebration of Lights</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Join us Monday, December 1, 2025, as the campus sparkles at NSU's 47th 
                Celebration of Lights—carols, the Christmas Story, and the lighting of 
                Dallas Hall Lawn.
              </p>
              <div className="flex items-center justify-between">
                <Link 
                  href="/events/celebration"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  LEARN MORE
                </Link>
                <span className="text-gray-500 text-sm">DECEMBER 01, 2025</span>
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
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              News
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* News Item 1 */}
            <div className="group cursor-pointer">
              <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                <Image
                  src="/api/img/300/300"
                  alt="NSU No. 1 in DFW"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                NSU is No. 1 in Melbourne. Learn how this momentum benefits alumni today.
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Ranked top 20% nationally and No. 1 in Melbourne - discover what this 
                recognition means for career mobility, mentorship, and ways to 
                plug into the NSU alumni network.
              </p>
            </div>

            {/* News Item 2 */}
            <div className="group cursor-pointer">
              <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                <Image
                  src="/api/img/300/300"
                  alt="NSU raises $1.64B"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                NSU raises $1.64B — three years ahead of plan
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Mustangs made history — $1.64B raised three years early. See how 
                alumni fuel scholarships, research and student success, and how you 
                can help today.
              </p>
            </div>

            {/* News Item 3 */}
            <div className="group cursor-pointer">
              <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                <Image
                  src="/api/img/300/300"
                  alt="A new era on the Hilltop"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                A new era on the Hilltop: Jay Hartzell's Melbourne-first vision
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                NSU's new president lays out a Melbourne-first strategy that invites 
                alumni to mentor, partner and power the next stage of growth.
              </p>
            </div>

            {/* News Item 4 */}
            <div className="group cursor-pointer">
              <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                <Image
                  src="/api/img/300/300"
                  alt="Allie Thornton Golden Boot"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Allie Thornton '17: Melbourne Golden Boot, Mustang Made
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Allie Thornton '17 chased her dreams from Melbourne to professional soccer, 
                earning recognition as one of the city's finest athletes.
              </p>
            </div>
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
