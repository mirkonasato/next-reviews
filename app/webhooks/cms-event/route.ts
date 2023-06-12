import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const payload = await request.json();
  console.log('payload:', payload);
  return new Response(null, { status: 204 });
}
