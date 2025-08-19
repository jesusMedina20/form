import Image from "next/image";
import { bannerConfig } from "@/utils/bannerConfig";
import Link from "next/link";


export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-black/50 z-10" />

      <Image
        src={bannerConfig.src}
        alt="Travel landscape"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-6 sm:text-5xl lg:text-6xl">
           {bannerConfig.title}
          </h1>

          <p className="text-lg text-gray-200 mb-8 sm:text-xl lg:text-2xl lg:mb-12">
            {bannerConfig.subtitle}
          </p>

          <Link
            href="/form"
            className="primary-button"
          >
            {bannerConfig.button}
          </Link>
        </div>
      </div>
    </div>
  );
}
