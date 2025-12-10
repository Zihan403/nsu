'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebaseConfig'

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

export default function News() {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  // Fallback data in case Firestore is empty or fails
  const fallbackArticles: NewsArticle[] = [
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
  ]

  // Fetch news articles from Firestore
  useEffect(() => {
    const fetchNews = async () => {
      if (!db) {
        console.error('Firebase not initialized, using fallback data')
        setNewsArticles(fallbackArticles)
        setLoading(false)
        return
      }

      try {
        const newsQuery = query(collection(db, 'news'), orderBy('publishDate', 'desc'))
        const querySnapshot = await getDocs(newsQuery)
        
        const newsData: NewsArticle[] = []
        querySnapshot.forEach((doc) => {
          newsData.push({
            id: doc.id,
            ...doc.data()
          } as NewsArticle)
        })
        
        // Use Firestore data if available, otherwise use fallback
        setNewsArticles(newsData.length > 0 ? newsData : fallbackArticles)
      } catch (error) {
        console.error('Error fetching news:', error)
        setNewsArticles(fallbackArticles)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Hero Section - Melbourne NSUers Life */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-24 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/images/news/convocation.jpg')" }}
        ></div>
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/75 via-blue-800/70 to-blue-900/75"></div>
        
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in-up text-white drop-shadow-lg">
            Melbourne NSUers Life
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-up animation-delay-200 drop-shadow-md max-w-4xl mx-auto">
            Celebrating our community's achievements, milestones, and inspiring stories. Stay connected with featured news, success stories, and important announcements from Melbourne NSUers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
              <span className="font-semibold">Featured News</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
              <span className="font-semibold">Success Stories</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
              <span className="font-semibold">Community Events</span>
            </div>
          </div>
        </div>
      </div>

      {/* Latest News Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Latest News & Updates</h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              From community achievements and featured events, to inspiring success stories and important announcements - stay connected with what's happening in our Melbourne NSUers community.
              Want to stay updated? <Link href="/contact" className="text-blue-600 underline hover:text-blue-800">Subscribe to our newsletter.</Link>
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
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
            /* News Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles.map((article) => (
              <a 
                key={article.id}
                href={article.url}
                target={article.external ? "_blank" : "_self"}
                rel={article.external ? "noopener noreferrer" : ""}
                className="group cursor-pointer block"
              >
                <div className="mb-4 overflow-hidden rounded-lg">
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
                  <span className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                    {article.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-blue-600 mb-3 group-hover:text-blue-800 transition-colors leading-tight">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-sm">
                  {article.description}
                </p>
              </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
