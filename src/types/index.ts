export type Locale = "en" | "ar";

export type ThemeMode = "dark" | "light";

export type ServiceSlug =
  | "ppf"
  | "window-tinting"
  | "heat-insulation"
  | "ceramic-coating"
  | "paint-protection"
  | "car-detailing"
  | "color-change";

export type GalleryCategory =
  | "all"
  | "before-after"
  | "ppf"
  | "thermal"
  | "ceramic"
  | "detailing";

export interface ServiceItem {
  id: ServiceSlug;
  index: string;
  image: string;
  secondaryImage?: string;
  video?: string;
  videoPoster?: string;
  category: Exclude<GalleryCategory, "all" | "before-after">;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  src: string;
  width: number;
  height: number;
  category: Exclude<GalleryCategory, "all">;
  aspect: "wide" | "tall" | "square";
  translationKey: string;
}
