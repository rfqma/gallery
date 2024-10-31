/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Gallery } from "next-gallery";
import Link from "next/link";

type ImageProps = {
  src: string;
  aspect_ratio: number;
  pexels_url: string;
};

export default function Home() {
  const [images, setImages] = useState<ImageProps[]>([]);

  const widths = [500, 1000, 1600];
  const ratios = [2.2, 4, 6, 8];

  useEffect(() => {
    const getImages = async () => {
      const results = await fetch("/api/images", {
        method: "GET",
      });

      const data = await results.json();

      const src = data.images.map((image: any) => {
        return {
          src: image.src.original,
          aspect_ratio: image.width / image.height,
          pexels_url: image.url,
        };
      });
      setImages(src);
    };

    getImages();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <Gallery
        widths={widths}
        ratios={ratios}
        images={images}
        lastRowBehavior="fill"
        overlay={(i) => {
          return (
            <Link
              href={images[i].pexels_url}
              target="_blank"
              className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
            >
              {/* <h1 className="text-white text-2xl">{i}</h1> */}
            </Link>
          );
        }}
      />
    </div>
  );
}
