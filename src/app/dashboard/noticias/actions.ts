'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getNews() {
  try {
    return await prisma.news.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export async function createNews(formData: FormData) {
  const title = formData.get('title') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const category = (formData.get('category') as string) || 'Geral';
  const status = (formData.get('status') as string) || 'PUBLICO';
  const image = formData.get('image') as string;
  const slug = formData.get('slug') as string;
  const videoUrl = formData.get('videoUrl') as string;
  const gallery = formData.get('gallery') as string;
  const tags = formData.get('tags') as string;
  const authorName = formData.get('authorName') as string;
  const authorAvatar = formData.get('authorAvatar') as string;
  const metaTitle = formData.get('metaTitle') as string;
  const metaDescription = formData.get('metaDescription') as string;
  const publishedAtStr = formData.get('publishedAt') as string;
  const publishedAt = publishedAtStr ? new Date(publishedAtStr) : new Date();

  try {
    // Verificamos se o Slug já existe antes de tentar criar
    const existing = await prisma.news.findUnique({ where: { slug } });
    if (existing) {
      return { success: false, error: 'Este link (slug) já está sendo usado em outra notícia. Mude o título ou o slug manual.' };
    }

    await prisma.news.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        category,
        status,
        image,
        videoUrl,
        gallery,
        tags,
        authorName,
        authorAvatar,
        metaTitle,
        metaDescription,
        publishedAt,
      },
    });

    revalidatePath('/dashboard/noticias');
    revalidatePath('/noticias');
    return { success: true };
  } catch (error: any) {
    console.error('Error creating news:', error);
    return { success: false, error: error.message };
  }
}

export async function updateNews(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const category = (formData.get('category') as string) || 'Geral';
  const status = (formData.get('status') as string) || 'PUBLICO';
  const image = formData.get('image') as string;
  const videoUrl = formData.get('videoUrl') as string;
  const gallery = formData.get('gallery') as string;
  const tags = formData.get('tags') as string;
  const authorName = formData.get('authorName') as string;
  const authorAvatar = formData.get('authorAvatar') as string;
  const metaTitle = formData.get('metaTitle') as string;
  const metaDescription = formData.get('metaDescription') as string;
  const publishedAtStr = formData.get('publishedAt') as string;
  const publishedAt = publishedAtStr ? new Date(publishedAtStr) : new Date();

  try {
    await prisma.news.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        category,
        status,
        image,
        videoUrl,
        gallery,
        tags,
        authorName,
        authorAvatar,
        metaTitle,
        metaDescription,
        publishedAt,
      },
    });

    revalidatePath('/dashboard/noticias');
    revalidatePath('/noticias');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating news:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteNews(id: string) {
  try {
    await prisma.news.delete({
      where: { id },
    });
    revalidatePath('/dashboard/noticias');
    revalidatePath('/noticias');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Ocorreu um erro ao excluir a notícia.' };
  }
}
