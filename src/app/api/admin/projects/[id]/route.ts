import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { 
      title, 
      location, 
      date, 
      description, 
      images,
      status,
      category,
      responsible,
      impactTitle,
      impactDescription
    } = body;

    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
        title,
        location,
        date,
        description,
        status,
        category,
        responsible,
        impactTitle,
        impactDescription,
        images: JSON.stringify(images || [])
      }
    });

    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.project.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
