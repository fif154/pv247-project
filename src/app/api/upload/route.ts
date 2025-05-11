import { put } from '@vercel/blob';
import { randomUUID } from 'crypto';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), {
        status: 400,
      });
    }

    const ext = file.name.split('.').pop();
    const filename = `${randomUUID()}.${ext}`;

    console.log('Uploading file:', filename);

    const blob = await put(filename, file, { access: 'public' });
    console.log('Blob URL:', blob.url);

    return Response.json(blob);
  } catch (err) {
    console.error('Upload error:', err);
    return new Response(JSON.stringify({ error: 'Upload failed' }), {
      status: 500,
    });
  }
}
