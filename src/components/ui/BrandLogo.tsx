import Image from "next/image";
import { BUSINESS_CONFIG } from "@/config/business";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  /**
   * Set true when rendered over a dark photographic backdrop regardless of theme
   * (e.g. transparent navbar over the cinematic hero at scroll = 0).
   */
  forceDarkSurface?: boolean;
  className?: string;
  priority?: boolean;
}

export function BrandLogo({
  forceDarkSurface = false,
  className,
  priority = false,
}: BrandLogoProps) {
  const { logoDark, logoLight } = BUSINESS_CONFIG.assets;

  if (forceDarkSurface) {
    return (
      <span
        className={cn(
          "relative inline-block aspect-[872/320] h-9 shrink-0 select-none",
          className
        )}
      >
        <Image
          src={logoDark}
          alt="INFINITY BRIGHT — إنفينيتي برايت"
          fill
          sizes="160px"
          priority={priority}
          className="object-contain"
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "relative inline-block aspect-[872/320] h-9 shrink-0 select-none",
        className
      )}
    >
      <Image
        src={logoLight}
        alt="INFINITY BRIGHT — إنفينيتي برايت"
        fill
        sizes="160px"
        priority={priority}
        className="block object-contain dark:hidden"
      />
      <Image
        src={logoDark}
        alt="INFINITY BRIGHT — إنفينيتي برايت"
        fill
        sizes="160px"
        priority={priority}
        className="hidden object-contain dark:block"
      />
    </span>
  );
}
