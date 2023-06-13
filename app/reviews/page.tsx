import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Heading from '@/components/Heading';
import { getReviews } from '@/lib/reviews';

interface ReviewsPageProps {
  searchParams: { page?: string };
}

export const metadata: Metadata = {
  title: 'Reviews',
};

export default async function ReviewsPage({ searchParams }: ReviewsPageProps) {
  const page = parsePageParam(searchParams.page);
  const reviews = await getReviews(6);
  console.log('[ReviewsPage] rendering:', page);
  return (
    <>
      <Heading>Reviews</Heading>
      <div className="flex gap-2 pb-3">
        <Link href={`/reviews?page=${page - 1}`}>&lt;</Link>
        <span>Page {page}</span>
        <Link href={`/reviews?page=${page + 1}`}>&gt;</Link>
      </div>
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review, index) => (
          <li key={review.slug}
            className="bg-white border rounded shadow w-80 hover:shadow-xl">
            <Link href={`/reviews/${review.slug}`}>
              <Image src={review.image} alt="" priority={index === 0}
                width="320" height="180" className="rounded-t"
              />
              <h2 className="font-orbitron font-semibold py-1 text-center">
                {review.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function parsePageParam(paramValue: string): number {
  if (paramValue) {
    const page = parseInt(paramValue);
    if (isFinite(page) && page > 0) {
      return page;
    }
  }
  return 1;
}
