"use client";

import Image from "next/image";
import { useState } from "react";

interface MediaFrameProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  focalClass?: string;
  loading?: "eager" | "lazy";
}

export function MediaFrame({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  className,
  focalClass,
  loading = priority ? "eager" : "lazy",
}: MediaFrameProps) {
  const [ready, setReady] = useState(!priority);

  return (
    <figure
      className={`media-frame ${className ?? ""} ${focalClass ?? ""}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <Image
        src={src}
        width={width}
        height={height}
        sizes={sizes ?? "100vw"}
        priority={priority}
        loading={loading}
        className={`media-frame__img ${ready ? "media-frame__img--ready" : ""}`}
        alt={alt}
        onLoad={() => setReady(true)}
      />
      <figcaption className="media-caption media-frame__caption">{alt}</figcaption>
    </figure>
  );
}

