import Image from "next/image";
import Link from "next/link";

const MarketInsightsCard = ({ id, image, subtitle, date, title }) => {
  return (
    <Link
      href={`/market-insights/${id}`}
      className="flex flex-col sm:flex-row mb-6 sm:mb-8 font-custom2"
    >
      <Image
        width={0}
        height={0}
        sizes="100vw"
        src={image}
        alt={title}
        className="w-full sm:w-52 h-48 sm:h-56 object-cover rounded-lg "
        loading="lazy"
      />
      <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col gap-2 justify-between">
        <div className="flex  justify-between items-center text-gray-500 text-sm mt-2 ">
          <span className="border border-black rounded-full px-2 py-1 mr-2">
            {subtitle}
          </span>
          <span>{date}</span>
        </div>
        <h3 className="text-lg font-semibold mt-4 sm:mt-0">{title}</h3>
        <p className="text-gray-500 mt-4">Read more</p>
      </div>
    </Link>
  );
};

export default MarketInsightsCard;
