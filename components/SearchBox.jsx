'use client';

import { Combobox } from '@headlessui/react';

export default function SearchBox() {
  return (
    <Combobox>
      <Combobox.Input placeholder="Search…" />
    </Combobox>
  );
}
