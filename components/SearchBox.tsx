'use client';

import type { SearchableReview } from '@/lib/reviews';
import { Combobox } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useIsClient } from '@/lib/hooks';

export interface SearchBoxProps {
  reviews: SearchableReview[];
}

export default function SearchBox({ reviews }: SearchBoxProps) {
  const router = useRouter();
  const isClient = useIsClient();
  const [query, setQuery] = useState('');

  const handleChange = (review: SearchableReview) => {
    router.push(`/reviews/${review.slug}`);
  };

  // console.log('[SearchBox] query:', query);
  if (!isClient) {
    return null;
  }
  const filtered = reviews.filter((review) =>
    review.title.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);
  return (
    <div className="relative w-48">
      <Combobox onChange={handleChange}>
        <Combobox.Input placeholder="Search…"
          value={query} onChange={(event) => setQuery(event.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
        <Combobox.Options className="absolute bg-white py-1 w-full">
          {filtered.map((review) => (
            <Combobox.Option key={review.slug} value={review}>
              {({ active }) => (
                <span className={`block px-2 truncate w-full ${
                  active ? 'bg-orange-100' : ''
                }`}>
                  {review.title}
                </span>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
