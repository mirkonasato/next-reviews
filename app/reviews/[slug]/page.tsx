import type { Metadata } from 'next';
import Image from 'next/image';
import Heading from '@/components/Heading';
import ShareLinkButton from '@/components/ShareLinkButton';
import { getReview, getSlugs } from '@/lib/reviews';

interface ReviewPageParams {
  slug: string;
}

interface ReviewPageProps {
  params: ReviewPageParams;
}

export const dynamic = 'force-dynamic';

// export async function generateStaticParams(): Promise<ReviewPageParams[]> {
//   const slugs = await getSlugs();
//   // console.log('[ReviewPage] generateStaticParams:', slugs);
//   return slugs.map((slug) => ({ slug }));
// }

export async function generateMetadata({ params: { slug } }: ReviewPageProps): Promise<Metadata> {
  const review = await getReview(slug);
  return {
    title: review.title,
  };
}

export default async function ReviewPage({ params: { slug } }: ReviewPageProps) {
  console.log('[ReviewPage] rendering', slug);
  const review = await getReview(slug);
  return (
    <>
      <Heading>{review.title}</Heading>
      <p className="font-semibold pb-3">
        {review.subtitle}
      </p>
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2">{review.date}</p>
        <ShareLinkButton />
      </div>
      <Image src={review.image} alt="" priority
        width="640" height="360" className="mb-2 rounded"
      />
      <article dangerouslySetInnerHTML={{ __html: review.body }}
        className="max-w-screen-sm prose prose-slate"
      />
    </>
  );
}
