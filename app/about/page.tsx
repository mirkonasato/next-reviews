import type { Metadata } from 'next';
import Heading from '@/components/Heading';

export const metadata: Metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <>
      <Heading>About</Heading>
      <p>
        A website created to learn Next.js
      </p>
    </>
  );
}
