import { put } from '@vercel/blob';
import { randomUUID } from 'crypto';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return new Response(JSON.stringify({ error: 'No file uploaded' }), {
      status: 400,
    });
  }

  const extension = file.name.split('.').pop();
  const uuidFileName = `${randomUUID().toString()}.${extension}`;

  const blob = await put(uuidFileName, file, {
    access: 'public',
  });

  return Response.json(blob);
}
