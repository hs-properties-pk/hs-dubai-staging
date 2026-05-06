import React from "react";
import { FaStar } from "react-icons/fa6";

const ReviewCard = ({ name, date, rating, comment }) => {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-neutral-200/90 bg-white p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:border-neutral-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.09)]">
      <div className="flex min-h-0 flex-1 flex-col gap-4">
        <div className="flex gap-3 md:gap-4">
          <span
            className="shrink-0 font-serif text-[2.75rem] leading-[0.85] text-neutral-700 sm:text-[3.25rem] md:text-[3.5rem] md:leading-[0.8]"
            aria-hidden
          >
            &ldquo;
          </span>
          <p className="min-w-0 flex-1 pt-1 text-base leading-relaxed text-neutral-700 md:text-[17px] md:leading-relaxed font-custom3 tracking-wide">
            {comment}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-neutral-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`h-4 w-4 md:h-[18px] md:w-[18px] ${
                i < rating ? "text-[#D4AF37]" : "text-neutral-200"
              }`}
              aria-hidden
            />
          ))}
        </div>
        <div className="text-left sm:text-right">
          <p className="text-base font-semibold text-neutral-900 font-custom2">
            {name}
          </p>
          {date ? (
            <p className="mt-0.5 text-sm text-neutral-500 font-custom3">{date}</p>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default ReviewCard;
