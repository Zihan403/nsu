'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function News() {
  // News articles data
  const featuredArticle = {
    id: 1,
    title: "NSU alumna awarded prestigious John NSU Scholarship for 2026",
    description: "NSU University congratulates alumna Georgia Leak, who has been named among 18 Australians awarded 2026 John NSU Scholarships, valued at up to $250,000 over two years for study at Oxford University.",
    image: "/api/img/800/400",
    category: "ALUMNI NEWS",
    url: "/news/john-nsu-scholarship-2026"
  }

  const newsArticles = [
    {
      id: 2,
      title: "NSU University, Indonesia to welcome undergraduate students in 2026",
      description: "NSU University is set to grow its Indonesia campus with the introduction of bachelor programs in 2026.",
      image: "/api/img/400/250",
      category: "UNIVERSITY NEWS",
      url: "/news/indonesia-campus-2026"
    },
    {
      id: 3,
      title: "The discomfort of difficult discussions – the NSU Brave Conversations Project",
      description: "Two NSU researchers recognising the difficulties in having civil discussions about sometimes fraught issues, created a program designed to teach students and academics about how to hold these brave conversations.",
      image: "/api/img/400/250", 
      category: "ARTS & CULTURE",
      url: "/news/brave-conversations"
    },
    {
      id: 4,
      title: "History made! NSU student Claudia Hollingsworth smashes 800m Aussie record in Silesia thriller",
      description: "NSU University student Claudia Hollingsworth has stormed into the history books at the Silesia Diamond League, becoming the fastest Australian woman to run the 800m sprint.",
      image: "/api/img/400/250",
      category: "ALUMNI NEWS", 
      url: "/news/claudia-record"
    },
    {
      id: 5,
      title: "NSU University to build Australian-first supercomputer MAVERIC with global technology partners",
      description: "NSU University is developing and deploying MAVERIC, in collaboration with NVIDIA, Dell Technologies and the CDC Data Centres.",
      image: "/api/img/400/250",
      category: "UNIVERSITY NEWS",
      url: "/news/maveric-supercomputer"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - NSU LIFE */}
      <section className="relative h-96 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/api/img/1200/400"
            alt="NSU Campus Life"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">NSU LIFE</h1>
            <p className="text-xl mb-6 leading-relaxed">
              Research and insight from NSU and our global alumni and donor community.
            </p>
            <Link 
              href="/about"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold transition-colors"
            >
              Read NSU Life
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Latest news</h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              From research breakthroughs and notable visitors, to remarkable achievements by alumni - this is the spot to stay updated.
              Not hearing from us? <Link href="/contact" className="text-blue-600 underline">Update your details.</Link>
            </p>
          </div>

          {/* Featured Article */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
              <div>
                <div className="mb-4">
                  <span className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                    {featuredArticle.category}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-blue-600 mb-4 hover:text-blue-800 transition-colors cursor-pointer">
                  <Link href={featuredArticle.url}>
                    {featuredArticle.title}
                  </Link>
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {featuredArticle.description}
                </p>
              </div>
            </div>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <div key={article.id} className="group cursor-pointer">
                <div className="mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="mb-3">
                  <span className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                    {article.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-blue-600 mb-3 group-hover:text-blue-800 transition-colors leading-tight">
                  <Link href={article.url}>
                    {article.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-sm">
                  {article.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
