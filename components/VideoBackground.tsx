"use client";

import { useEffect, useRef } from "react";

interface VideoBackgroundProps {
  videoSrc?: string;
  fallbackImage?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  children?: React.ReactNode;
}

export default function VideoBackground({
  videoSrc,
  fallbackImage,
  overlay = true,
  overlayOpacity = 0.4,
  children,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Try to play video
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Video autoplay failed:", error);
        });
      }
    }
  }, []);

  // Default gym/fitness video URLs from Pexels (free stock videos)
  const defaultVideoSrc =
    videoSrc ||
    "https://videos.pexels.com/video-files/4753995/4753995-hd_1920_1080_25fps.mp4";

  // Fallback gradient background if video fails
  const fallbackGradient = "bg-gradient-to-br from-black via-gray-900 to-black";

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 h-full w-full object-cover ${fallbackGradient}`}
        poster={fallbackImage}
        onError={(e) => {
          // If video fails to load, hide it and show gradient
          const target = e.target as HTMLVideoElement;
          target.style.display = "none";
        }}
      >
        <source src={defaultVideoSrc} type="video/mp4" />
        {/* Fallback sources */}
        <source
          src="https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Gradient overlay for better text readability */}
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Additional dark overlay */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity * 0.5 }}
      />

      {/* Content */}
      {children && (
        <div className="relative z-10 h-full w-full">{children}</div>
      )}
    </div>
  );
}
