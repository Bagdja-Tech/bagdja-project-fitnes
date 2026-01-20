"use client";

interface GoogleMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  locationName?: string;
  address?: string;
  className?: string;
}

export default function GoogleMap({
  lat,
  lng,
  zoom = 15,
  locationName = "Location",
  address,
  className = "",
}: GoogleMapProps) {
  // Google Maps Embed URL - using coordinates directly
  // This format works reliably without API key
  const mapUrl = `https://www.google.com/maps?q=${lat},${lng}&hl=en&z=${zoom}&output=embed`;

  // Direct Google Maps link for fallback
  const directLink = address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    : `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <div className={`relative h-full w-full overflow-hidden rounded-lg bg-gray-900 ${className}`}>
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={mapUrl}
        title={locationName}
        className="h-full w-full"
      />
      {/* Fallback link overlay */}
      <div className="absolute bottom-4 right-4 z-10">
        <a
          href={directLink}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-lg transition-colors hover:bg-gray-100"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}
