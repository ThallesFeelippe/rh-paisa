'use server';

import prisma from '@/lib/db';

export async function getDashboardStats() {
  try {
    const [jobsCount, candidatesCount, newsCount] = await Promise.all([
      prisma.job.count({ where: { status: 'PUBLICO' } }),
      prisma.application.count(),
      prisma.news.count(),
    ]);

    // Fetch recent items for the table
    const recentJobs = await prisma.job.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    const recentNews = await prisma.news.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    return {
      stats: {
        jobs: jobsCount,
        candidates: candidatesCount,
        news: newsCount,
      },
      recentJobs,
      recentNews,
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      stats: { jobs: 0, candidates: 0, news: 0 },
      recentJobs: [],
      recentNews: [],
    };
  }
}
