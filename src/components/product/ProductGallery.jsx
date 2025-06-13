import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const ProductGallery = ({ images, name }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isMagnifying, setIsMagnifying] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  if (!images || images.length === 0) {
    return <div className="text-center text-gray-500">No hay imágenes disponibles</div>;
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleMouseMove = (e) => {
    if (!isMagnifying || !isDesktop) return;

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsMagnifying(false);
  };

  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div
        className="relative h-[500px] overflow-hidden bg-[#f8f5f0] rounded-xl shadow group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => isDesktop && setIsMagnifying(true)}
      >
        <img
          src={images[currentImage]}
          alt={`${name} - Imagen principal`}
          className="h-full w-full object-contain transition-transform duration-300 ease-out"
        />

        {/* Magnify Layer */}
        {isMagnifying && isDesktop && (
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-300"
            style={{
              backgroundImage: `url(${images[currentImage]})`,
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              backgroundSize: "200%",
              backgroundRepeat: "no-repeat",
            }}
          />
        )}

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow hover:bg-white transition"
              onClick={prevImage}
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow hover:bg-white transition"
              onClick={nextImage}
              aria-label="Siguiente imagen"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
        {images.map((image, index) => (
          <button
            key={index}
            className={cn(
              "relative w-20 h-20 flex-shrink-0 border-2 rounded-md overflow-hidden transition-all",
              currentImage === index
                ? "border-black ring-2 ring-black"
                : "border-transparent hover:border-gray-300"
            )}
            onClick={() => setCurrentImage(index)}
            aria-label={`Ver imagen ${index + 1} de ${images.length}`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`${name} - Imagen ${index + 1}`}
              className="object-cover w-full h-full transition-transform duration-200 hover:scale-105"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
