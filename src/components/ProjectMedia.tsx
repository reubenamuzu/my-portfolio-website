"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  /** Tells the browser how wide the image is drawn, so it downloads the right size. */
  sizes: string;
  className?: string;
  children?: React.ReactNode;
};

/** 16:9 project image with a shimmer skeleton until it has loaded. */
export default function ProjectMedia({ src, alt, sizes, className = "", children }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`media ${className}`} data-loaded={loaded}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
      {children}
    </div>
  );
}
