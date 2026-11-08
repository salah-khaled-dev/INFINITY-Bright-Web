export interface CameraComposition {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

/**
 * Telephoto automotive commercial camera compositions (`28°` FOV = ~70mm cinema prime lens)
 * paired with `BASE_CAR_YAW = Math.PI + 0.19` for an exact 45° front-3/4 luxury stance:
 * - Shows BOTH the aggressive front nose + Xenon LED blades AND the full sculpted side flank + 2 forged wheels.
 * - Positions the car in the upper-center showcase zone so bottom editorial typography NEVER collides with the car.
 */
const DESKTOP_COMPOSITIONS: Record<"introStart" | "hero", CameraComposition> = {
  introStart: {
    position: [-4.25, 0.76, 5.65],
    target: [-0.48, 0.28, -1.15],
    fov: 31.5,
  },
  hero: {
    position: [-3.18, 0.94, 4.68],
    target: [-0.04, 0.18, 0.04],
    fov: 28.0,
  },
};

export function getResponsiveCameraShot(
  shot: "introStart" | "hero",
  viewportWidth: number,
  viewportHeight: number
): CameraComposition {
  const base = DESKTOP_COMPOSITIONS[shot];
  const safeH = Math.max(viewportHeight, 1);
  const aspect = viewportWidth / safeH;

  // Dedicated Portrait Mobile Composition (< 768px — 430×932, 390×844, 360×800)
  // Shifts target downward (`target.y - 0.34`) so the 3D supercar sits cleanly in the upper showcase half!
  if (viewportWidth < 768) {
    const portraitScale = Math.min(
      1.68,
      Math.max(1.26, 0.88 / Math.max(aspect, 0.42))
    );
    return {
      position: [
        base.position[0] * portraitScale * 0.94,
        base.position[1] * 1.16 + 0.16,
        base.position[2] * portraitScale * 0.96,
      ],
      target: [
        base.target[0] - 0.04,
        base.target[1] - 0.34,
        base.target[2],
      ],
      fov: 34.5,
    };
  }

  // Tablet Composition (768px – 1023px, e.g. 1024×768 / portrait iPad)
  if (viewportWidth < 1024) {
    const tabScale = Math.max(1.08, 1.35 / Math.max(aspect, 0.72));
    return {
      position: [
        base.position[0] * tabScale,
        base.position[1] * 1.05,
        base.position[2] * tabScale,
      ],
      target: [base.target[0], base.target[1] - 0.08, base.target[2]],
      fov: 29.5,
    };
  }

  // Desktop & Laptop (1280×720, 1440×900, 1920×1080+)
  const wideAdjust = aspect > 2.0 ? 0.95 : aspect < 1.45 ? 1.06 : 1.0;
  return {
    position: [
      base.position[0] * wideAdjust,
      base.position[1],
      base.position[2] * wideAdjust,
    ],
    target: [base.target[0], base.target[1] - 0.03, base.target[2]],
    fov: base.fov,
  };
}
