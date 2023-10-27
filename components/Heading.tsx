import type { ReactNode } from 'react';
import { orbitron } from '@/app/fonts';

export interface HeadingProps {
  children: ReactNode;
}

export default function Heading({ children }: HeadingProps) {
  return (
    <h1 className={`font-bold pb-3 text-2xl ${orbitron.className}`}>
      {children}
    </h1>
  );
}
