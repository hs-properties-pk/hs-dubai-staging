"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Text lockup by default. Pass `logoSrc` (e.g. `/brands-logos/emaar.png`) when the file exists in `public/`.
 */
export default function BrandLogo({ name, logoSrc, className = "" }) {
  const [imgOk, setImgOk] = useState(true);

  if (!logoSrc || !imgOk) {
    return (
      <div
        className={`flex min-h-[5rem] w-full flex-col items-center justify-center rounded-lg border border-neutral-200 bg-gradient-to-br from-neutral-50 to-neutral-100 px-3 py-4 text-center ${className}`}
      >
        <span className="font-custom text-lg font-bold leading-tight tracking-tight text-neutral-900 md:text-xl">
          {name}
        </span>
        <span className="mt-1 font-custom2 text-xs text-neutral-500">
          Dubai off-plan
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative min-h-[5rem] w-full overflow-hidden rounded-lg border border-neutral-200 bg-white ${className}`}
    >
      <Image
        src={logoSrc}
        alt={name}
        fill
        className="object-contain p-3"
        sizes="(max-width: 768px) 100vw, 320px"
        onError={() => setImgOk(false)}
      />
    </div>
  );
}
