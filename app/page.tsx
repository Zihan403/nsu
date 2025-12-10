'use client'

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { db } from '@/lib/firebaseConfig'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'

interface Event {
  id: string
  date: string
  time: string
  title: string
  description: string
  location: string
  locationUrl?: string
  category: string
  image: string
}

interface NewsArticle {
  id: string
  title: string
  description: string
  image: string
  category: string
  url: string
  external: boolean
  publishDate?: string
  author?: string
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [upcomingEvent, setUpcomingEvent] = useState<Event | null>(null);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);

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

  // Fallback news data
  const fallbackNews: NewsArticle[] = [
    {
      id: '1',
      title: "মেলবোর্নে নর্থ সাউথ ইউনিভার্সিটির অ্যালুমনির পুনর্মিলনী 'সিনেগালা' অনুষ্ঠিত",
      description: "Watch our community in action as Melbourne NSUers makes headlines on SBS News, showcasing the vibrant NSU alumni network in Australia.",
      image: "https://i.ytimg.com/vi/ZQmbPMaeV9s/maxresdefault.jpg",
      category: "MEDIA COVERAGE",
      url: "https://www.youtube.com/watch?v=ZQmbPMaeV9s",
      external: true
    },
    {
      id: '2',
      title: "Cinegala 2024 - SBS Bangla Coverage",
      description: "SBS Bangla covers Melbourne NSUers' spectacular Cinegala event, celebrating Bengali cinema and culture in the heart of Melbourne.",
      image: "https://images.sbs.com.au/dims4/default/61fbbd2/2147483647/strip/true/crop/7639x4297+0+393/resize/1280x720!/quality/90/?url=http%3A%2F%2Fsbs-au-brightspot.s3.amazonaws.com%2F01%2F19%2F660db93f475a802d1fe93e69c048%2Fdsc-2544.jpg",
      category: "EVENTS",
      url: "https://www.sbs.com.au/language/bangla/bn/article/cinagala-noa-blank/yyz99e20x",
      external: true
    },
    {
      id: '3',
      title: "Cinegala 2024: Melbourne's NSU Alumni Revisit Golden Age of Cinema",
      description: "The Daily Star features Melbourne NSUers' Cinegala 2024, a grand celebration revisiting the golden age of Bengali cinema with the alumni community.",
      image: "https://tds-images.thedailystar.net/sites/default/files/styles/big_202/public/images/2024/11/03/3423d5f2-8a0a-4313-8913-4e66a41c20a7.jpg",
      category: "EVENTS",
      url: "https://www.thedailystar.net/entertainment/theatre-arts/news/cinegala-2024-melbournes-nsu-alumni-revisit-golden-age-cinema-3743526",
      external: true
    }
  ];

  // Fetch latest upcoming event
  useEffect(() => {
    const fetchLatestEvent = async () => {
      if (!db) {
        console.error('Firebase not initialized');
        setLoadingEvent(false);
        return;
      }

      try {
        const eventsQuery = query(
          collection(db, 'events'),
          orderBy('date', 'desc'),
          limit(1)
        );
        const querySnapshot = await getDocs(eventsQuery);
        
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setUpcomingEvent({
            id: doc.id,
            ...doc.data()
          } as Event);
        }
      } catch (error) {
        console.error('Error fetching latest event:', error);
      } finally {
        setLoadingEvent(false);
      }
    };

    fetchLatestEvent();
  }, []);

  // Fetch latest news from Firestore
  useEffect(() => {
    const fetchNews = async () => {
      if (!db) {
        console.error('Firebase not initialized, using fallback news');
        setNewsArticles(fallbackNews);
        setLoadingNews(false);
        return;
      }

      try {
        const newsQuery = query(
          collection(db, 'news'),
          orderBy('publishDate', 'desc'),
          limit(3)
        );
        const querySnapshot = await getDocs(newsQuery);
        
        const newsData: NewsArticle[] = [];
        querySnapshot.forEach((doc) => {
          newsData.push({
            id: doc.id,
            ...doc.data()
          } as NewsArticle);
        });
        
        // Use Firestore data if available, otherwise use fallback
        setNewsArticles(newsData.length > 0 ? newsData : fallbackNews);
      } catch (error) {
        console.error('Error fetching news:', error);
        setNewsArticles(fallbackNews);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

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
        </div>
      </section>

      {/* We are Melbourne NSUers Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                We are <span className="italic">Melbourne NSUers</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600 text-lg leading-relaxed">
                <div className="text-justify">
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
                <div className="text-justify">
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
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Upcoming Events
            </h2>
          </div>

          {loadingEvent ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : upcomingEvent ? (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 mb-8">
              {/* Event Image - Left Side */}
              <div className="lg:col-span-2 h-56 lg:h-64 overflow-hidden">
                <Image
                  src={upcomingEvent.image}
                  alt={upcomingEvent.title}
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {/* Event Content - Right Side */}
              <div className="lg:col-span-3 bg-white border-b-2 border-r-2 border-t-2 border-gray-200 p-5 lg:p-6">
                {/* Date and Time Header */}
                <div className="mb-2 pb-2 border-b border-gray-200">
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                    {formatDate(upcomingEvent.date)} • {formatTime(upcomingEvent.time)}
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                  {upcomingEvent.title}
                </h3>
                
                {/* Location */}
                <div className="mb-2">
                  {upcomingEvent.locationUrl ? (
                    <a 
                      href={upcomingEvent.locationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      📍 {upcomingEvent.location}
                    </a>
                  ) : (
                    <div className="text-xs font-semibold text-gray-700">
                      📍 {upcomingEvent.location}
                    </div>
                  )}
                </div>
                
                {/* Description */}
                <div className="mb-4">
                  <p className="text-gray-600 leading-relaxed text-xs line-clamp-3">
                    {upcomingEvent.description}
                  </p>
                </div>
                
                {/* Action Button */}
                <div className="flex justify-end">
                  <Link
                    href="/events"
                    className="bg-gradient-to-r from-blue-900 to-slate-900 hover:from-blue-800 hover:to-slate-800 text-white font-semibold px-6 py-2 text-xs transition-colors"
                  >
                    LEARN MORE
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No upcoming events at the moment. Check back soon!</p>
            </div>
          )}

          <div className="text-center">
            <Link 
              href="/events"
              className="bg-gradient-to-r from-blue-900 to-slate-900 hover:from-blue-800 hover:to-slate-800 text-white px-6 py-3 font-semibold text-sm transition-all"
            >
              VIEW ALL EVENTS
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Latest News & Updates
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay connected with featured news, success stories, and community highlights
            </p>
          </div>

          {/* Loading State */}
          {loadingNews ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3 mb-3"></div>
                  <div className="h-6 bg-gray-300 rounded w-full mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles.map((article) => (
                <a 
                  key={article.id}
                  href={article.url}
                  target={article.external ? "_blank" : "_self"}
                  rel={article.external ? "noopener noreferrer" : ""}
                  className="group cursor-pointer block"
                >
                  <div className="mb-4 overflow-hidden rounded-lg shadow-md">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="mb-3">
                    <span className="text-sm text-blue-600 uppercase tracking-wide font-medium">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-600 mb-3 group-hover:text-blue-800 transition-colors leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {article.description}
                  </p>
                </a>
              ))}
            </div>
          )}

          {/* View All News Link */}
          <div className="text-center mt-12">
            <Link 
              href="/news"
              className="bg-gradient-to-r from-blue-900 to-slate-900 hover:from-blue-800 hover:to-slate-800 text-white px-6 py-3 font-semibold text-sm transition-all"
            >
              VIEW ALL NEWS
            </Link>
          </div>
        </div>
      </section>

      {/* Hear from Our Alumni Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Hear from Our Alumni
            </h2>
            <p className="text-gray-600">
              Stories of connection, community, and impact
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            {/* Left - Photo with Info Card */}
            <div className="md:w-1/3 flex flex-col">
              <div className="rounded-lg overflow-hidden shadow-md mb-4 flex-grow">
                <Image
                  src="/assets/images/team/mirza.jpeg"
                  alt="Mirza Asif Haider"
                  width={300}
                  height={350}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white rounded-lg p-4">
                <p className="font-bold text-lg mb-1">Mirza Asif Haider</p>
                <p className="text-sm text-blue-100">Ex President, Melbourne NSUers Alumni Association</p>
              </div>
            </div>

            {/* Right - Testimonial */}
            <div className="md:w-2/3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 md:p-8 flex flex-col justify-center">
              <div className="mb-4">
                <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.716-5-7-5S0 3.75 0 5v3c0 1 0 4 2 4h4v3c-1 1-2 0-2 -1v-3c0 1-1 2-2 2s-1.022-1.566-1-2V5c0-1-1-1-1-1z" />
                </svg>
              </div>

              <div className="space-y-4 text-gray-800 text-sm md:text-base leading-relaxed">
                <p>
                  <span className="font-semibold">"Melbourne NSUers has always felt like a tight-knit family to me.</span> I was fortunate to be part of the founding group and serve in the Executive Body."
                </p>

                <p>
                  "One moment I still carry is from 2015, after our first reunion. A young alumni said:"
                </p>

                <div className="bg-white border-l-4 border-blue-600 px-4 py-3 rounded italic text-gray-900 font-medium">
                  "Bhaiya, thank you for arranging this. If not for this event, we wouldn't have realised how rich the NSU legacy is. Meeting senior alumni made me feel truly proud to be an NSUer today."
                </div>

                <p className="text-gray-700">
                  <span className="font-semibold">That's what Melbourne NSUers means —</span> not just a network, but a community where every generation feels valued.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Community CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Join Our Community</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Connect with fellow NSU alumni, grow your network, and unlock exclusive benefits and opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Become a Member Card */}
            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Become a Member</h3>
              <p className="text-blue-100 mb-8 leading-relaxed text-sm">
                Sign up today to access networking events, professional development, and exclusive member perks.
              </p>
              <Link 
                href="/login"
                className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>

            {/* Learn More Card */}
            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Learn More</h3>
              <p className="text-blue-100 mb-8 leading-relaxed text-sm">
                Discover what makes Melbourne NSUers special and explore our mission and values.
              </p>
              <Link 
                href="/about"
                className="inline-block w-full text-center border-2 border-blue-400 text-blue-300 hover:bg-blue-600/20 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
