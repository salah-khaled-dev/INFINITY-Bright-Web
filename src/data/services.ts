import type { ServiceItem } from "@/types";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "ppf",
    index: "01",
    image: "/images/services/ppf-installation.webp",
    video: "/videos/Installer_applying_film_to_car_1099074e_1080p.mp4",
    videoPoster: "/images/services/ppf-installation.webp",
    category: "ppf",
    featured: true,
  },
  {
    id: "heat-insulation",
    index: "02",
    image: "/images/services/heat-insulation.webp",
    secondaryImage: "/images/services/window-tinting.webp",
    video: "/videos/Technician_installing_window_film_ae402102_1080p.mp4",
    videoPoster: "/images/services/window-tinting.webp",
    category: "thermal",
    featured: true,
  },
  {
    id: "ceramic-coating",
    index: "03",
    image: "/images/services/ceramic-coating.webp",
    video: "/videos/Technician_applying_ceramic_coating_401d402c_1080p.mp4",
    videoPoster: "/images/services/ceramic-coating.webp",
    category: "ceramic",
    featured: true,
  },
  {
    id: "car-detailing",
    index: "04",
    image: "/images/services/car-detailing.webp",
    video: "/videos/Detailer_polishing_car_hood_4c33bcd6_1080p.mp4",
    videoPoster: "/videos/hero-mobile-detailer-poster.webp",
    category: "detailing",
    featured: true,
  },
];
