import Image from "next/image";
import React from "react";
import { awardShowsNoOneBadge } from "@/data/awards-history-data";

const AchievementCard = ({ image, name, details, year }) => {
  return (
    <div className="flex h-full flex-shrink-0 px-1.5 sm:px-2">
      <div className="flex h-full min-h-[420px] w-full flex-col rounded-2xl border border-neutral-200/90 bg-white p-4 shadow-sm transition-[box-shadow,border-color] duration-300 hover:border-neutral-300 hover:shadow-md md:min-h-[440px] md:p-5">
        <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-50/90">
          <Image
            src={image}
            alt={`${name} — ${details}`}
            fill
            className="object-contain p-3"
            sizes="(max-width: 768px) 88vw, (max-width: 1024px) 40vw, 360px"
            quality={75}
          />
          {awardShowsNoOneBadge(details) && (
            <span className="absolute top-2 right-2 rounded bg-neutral-950 px-2 py-1 font-custom2 text-[9px] font-semibold uppercase tracking-wider text-white">
              No. 1
            </span>
          )}
        </div>
        <p className="mb-1 font-custom3 text-xs tabular-nums text-neutral-500">
          {year}
        </p>
        <p className="mb-2 line-clamp-2 font-custom2 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-950 sm:text-xs">
          {name}
        </p>
        <p className="line-clamp-4 flex-1 font-custom3 text-sm leading-snug text-neutral-800">
          {details}
        </p>
      </div>
    </div>
  );
};

export default AchievementCard;
