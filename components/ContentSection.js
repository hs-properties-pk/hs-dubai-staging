"use client";
import Image from "next/image";
import Link from "next/link";

export default function ContentSection({
  data,
  imageUrl,
  imageAlt,
  imagePosition = "right",
  imageOverlay = null,
  className = "",
}) {
  const { subtitle, title, description, ctaText, ctaHref, ctaButtons } = data;

  const textBlock = (
    <div className="flex w-full min-w-0 flex-col justify-center gap-8 bg-neutral-200 px-6 py-12 text-center font-custom2 md:w-1/2 md:px-12 md:py-16 md:text-left">
      {subtitle && (
        <p className="font-semibold tracking-wider text-neutral-600">
          {subtitle}
        </p>
      )}

      {title && (
        <h2 className="font-custom text-3xl font-semibold text-black md:text-4xl">
          {title}
        </h2>
      )}

      {description && (
        <p className="tracking-wider text-neutral-600">{description}</p>
      )}

      {ctaText && ctaHref && (
        <Link
          href={ctaHref}
          className="mx-auto w-fit rounded-full border border-transparent bg-black px-4 py-3 text-sm font-medium capitalize tracking-wider text-white transition duration-500 hover:border-black hover:bg-white hover:text-black md:mx-0"
        >
          {ctaText}
        </Link>
      )}

      {ctaButtons && ctaButtons.length > 0 && (
        <div className="flex w-full flex-wrap justify-center gap-2 md:justify-start md:gap-3">
          {ctaButtons.map((btn, idx) => (
            <Link
              key={idx}
              href={btn.href}
              className={`rounded-full px-4 py-3 text-xs font-medium capitalize tracking-wider transition duration-500 md:text-sm ${
                btn.variant === "secondary"
                  ? "border border-black bg-white text-black hover:bg-black hover:text-white"
                  : "border border-transparent bg-black text-white hover:border-black hover:bg-white hover:text-black"
              }`}
            >
              {btn.text}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  const imageBlock = (
    <div className="relative min-h-[320px] w-full min-w-0 bg-neutral-200 md:min-h-[480px] md:w-1/2 lg:min-h-[520px]">
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        loading="lazy"
        quality={75}
      />
      {imageOverlay}
    </div>
  );

  return (
    <section
      className={`mx-auto max-w-screen-2xl px-4 font-custom2 md:px-6 ${className}`}
    >
      <div className="flex w-full flex-col overflow-hidden rounded-2xl bg-neutral-200 shadow-sm ring-1 ring-black/5 md:min-h-[480px] md:flex-row lg:min-h-[520px]">
        {imagePosition === "right" ? (
          <>
            {textBlock}
            {imageBlock}
          </>
        ) : (
          <>
            {imageBlock}
            {textBlock}
          </>
        )}
      </div>
    </section>
  );
}
