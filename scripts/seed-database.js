// This is a one-time script to populate Firestore with the existing static data
// Run this in the browser console on a page with Firebase initialized

const seedNewsData = async () => {
  const newsArticles = [
    {
      title: "মেলবোর্নে নর্থ সাউথ ইউনিভার্সিটির অ্যালুমনির পুনর্মিলনী 'সিনেগালা' অনুষ্ঠিত",
      description: "Watch our community in action as Melbourne NSUers makes headlines on SBS News, showcasing the vibrant NSU alumni network in Australia.",
      image: "https://i.ytimg.com/vi/ZQmbPMaeV9s/maxresdefault.jpg",
      category: "MEDIA COVERAGE",
      url: "https://www.youtube.com/watch?v=ZQmbPMaeV9s",
      external: true,
      publishDate: new Date('2024-11-15'),
      author: "Admin"
    },
    {
      title: "Cinegala 2024 - SBS Bangla Coverage",
      description: "SBS Bangla covers Melbourne NSUers' spectacular Cinegala event, celebrating Bengali cinema and culture in the heart of Melbourne.",
      image: "https://images.sbs.com.au/dims4/default/61fbbd2/2147483647/strip/true/crop/7639x4297+0+393/resize/1280x720!/quality/90/?url=http%3A%2F%2Fsbs-au-brightspot.s3.amazonaws.com%2F01%2F19%2F660db93f475a802d1fe93e69c048%2Fdsc-2544.jpg",
      category: "EVENTS",
      url: "https://www.sbs.com.au/language/bangla/bn/article/cinagala-noa-blank/yyz99e20x",
      external: true,
      publishDate: new Date('2024-11-10'),
      author: "Admin"
    },
    {
      title: "Cinegala 2024: Melbourne's NSU Alumni Revisit Golden Age of Cinema",
      description: "The Daily Star features Melbourne NSUers' Cinegala 2024, a grand celebration revisiting the golden age of Bengali cinema with the alumni community.",
      image: "https://tds-images.thedailystar.net/sites/default/files/styles/big_202/public/images/2024/11/03/3423d5f2-8a0a-4313-8913-4e66a41c20a7.jpg",
      category: "EVENTS",
      url: "https://www.thedailystar.net/entertainment/theatre-arts/news/cinegala-2024-melbournes-nsu-alumni-revisit-golden-age-cinema-3743526",
      external: true,
      publishDate: new Date('2024-11-03'),
      author: "Admin"
    }
  ];

  // Add to Firestore (assuming Firebase is initialized)
  // This should be run in browser console where Firebase is available
  for (const article of newsArticles) {
    try {
      await db.collection('news').add(article);
      console.log('Added news article:', article.title);
    } catch (error) {
      console.error('Error adding news:', error);
    }
  }
};

const seedBenefitsData = async () => {
  const benefits = [
    {
      title: "The Hopkins Group",
      discount: "10% OFF",
      description: "Financial planning & accounting benefits for alumni. Enjoy 10% off professional financial, tax, and wealth advisory services through our official partner.",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop",
      color: "blue",
      link: "/join",
      isExternal: false,
      status: "active",
      contactEmail: "arashedi@thehopkinsgroup.com.au",
      instructions: "Contact us directly for your exclusive alumni discount",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "RRAE Pty Ltd (Operator of Subway Skye)",
      discount: "10% OFF",
      description: "Exclusive 10% in-store discount for verified alumni members. Enjoy quality food and great savings at Subway Skye with your NSUers membership.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
      color: "green",
      link: "/join",
      isExternal: false,
      status: "active",
      instructions: "Show your NSUers membership card in-store",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "More Partners Coming Soon",
      discount: "COMING SOON",
      description: "Exciting new partnerships across dining, automotive, retail, and lifestyle sectors. More exclusive member benefits arriving soon!",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop",
      color: "purple",
      link: "/join",
      isExternal: false,
      status: "coming-soon",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // Add to Firestore (assuming Firebase is initialized)
  // This should be run in browser console where Firebase is available
  for (const benefit of benefits) {
    try {
      await db.collection('benefits').add(benefit);
      console.log('Added benefit:', benefit.title);
    } catch (error) {
      console.error('Error adding benefit:', error);
    }
  }
};

console.log('Seed scripts ready. Call seedNewsData() or seedBenefitsData() to populate database.');
console.log('Make sure you are on a page where Firebase is initialized (like admin panel).');