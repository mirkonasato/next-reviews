import { NextRequest, NextResponse } from 'next/server';
import { searchReviews } from '@/lib/reviews';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('query');
  const reviews = await searchReviews(query);
  return NextResponse.json(reviews);
}
