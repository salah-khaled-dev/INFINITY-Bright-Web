import * as THREE from "three";
import type { ThemeMode } from "@/types";

export interface VehicleThemePalette {
  bodyHex: string;
  bodyMetalness: number;
  bodyRoughness: number;
  envMapIntensity: number;
  rimHex: string;
}

/**
 * Art-directed factory automotive finishes calibrated per studio mode:
 * - Dark Mode (Obsidian Studio): Liquid Gunmetal Titanium Metallic (`#2b3240`) with
 *   ultra-glossy PPF clearcoat so long overhead softbox ribbons and `#FBE90A` accents
 *   sculpt every fender crease against the deep black cyclorama.
 * - Light Mode (Alabaster Gallery): Deep Anthracite Metallic (`#323946`) delivering
 *   commanding architectural contrast against the bright white gallery cyclorama.
 */
export const VEHICLE_THEME_PALETTES: Record<ThemeMode, VehicleThemePalette> = {
  dark: {
    bodyHex: "#2b3240",
    bodyMetalness: 0.88,
    bodyRoughness: 0.14,
    envMapIntensity: 2.45,
    rimHex: "#b4bdcd",
  },
  light: {
    bodyHex: "#323946",
    bodyMetalness: 0.85,
    bodyRoughness: 0.16,
    envMapIntensity: 2.1,
    rimHex: "#2d3340",
  },
};

export interface VehicleMaterialRig {
  bodyMaterial: THREE.MeshPhysicalMaterial;
  glassMaterial: THREE.MeshPhysicalMaterial;
  rimMaterial: THREE.MeshStandardMaterial;
  caliperMaterial: THREE.MeshPhysicalMaterial;
  headlightMaterial: THREE.MeshStandardMaterial;
  taillightMaterial: THREE.MeshStandardMaterial;
  dispose: () => void;
}

/**
 * Configures physically based automotive materials across all 17 material slots
 * of `vehicle.glb`:
 * - Ultra-gloss self-healing PPF clearcoat over metallic bodywork
 * - Ultra Core smoked mirror-gloss privacy tint glass
 * - Optical crystal outer headlight cover (`lights`) over blazing LED DRL blades (`leds`)
 * - Fixed `#FBE90A` signature yellow brake calipers (`brakes`) over carbon-ceramic rotors (`brake`)
 * - Forged satin-platinum alloy rims (`rim_*`)
 */
export function setupVehicleMaterialRig(
  sceneRoot: THREE.Object3D,
  theme: ThemeMode,
  enableShadows: boolean
): VehicleMaterialRig {
  const pal = VEHICLE_THEME_PALETTES[theme];

  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    name: "IB_PPF_Metallic_Body_Paint",
    color: new THREE.Color(pal.bodyHex),
    metalness: pal.bodyMetalness,
    roughness: pal.bodyRoughness,
    clearcoat: 1.0,
    clearcoatRoughness: 0.018,
    sheen: 0.08,
    sheenRoughness: 0.22,
    sheenColor: new THREE.Color("#dce6ff"),
    envMapIntensity: pal.envMapIntensity,
    reflectivity: 1.0,
    ior: 1.56,
  });

  // Deep Ultra-Core smoked mirror-gloss window tint (zero milky single-pass transmission artifacts)
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    name: "IB_UltraCore_Smoked_Glass",
    color: new THREE.Color("#04060a"),
    metalness: 0.14,
    roughness: 0.015,
    transparent: true,
    opacity: 0.91,
    ior: 1.52,
    reflectivity: 1.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.01,
    envMapIntensity: 2.5,
  });

  // Crystal-clear optical polycarbonate outer lens over the headlight cluster
  const headlightLensMaterial = new THREE.MeshPhysicalMaterial({
    name: "IB_Optical_Headlight_Cover",
    color: new THREE.Color("#e8f0ff"),
    metalness: 0.05,
    roughness: 0.015,
    transparent: true,
    opacity: 0.28,
    ior: 1.58,
    reflectivity: 1.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.01,
    envMapIntensity: 2.6,
    depthWrite: false,
  });

  const rimMaterial = new THREE.MeshStandardMaterial({
    name: "IB_Forged_Alloy_Rims",
    color: new THREE.Color(pal.rimHex),
    metalness: 0.95,
    roughness: 0.16,
    envMapIntensity: 2.05,
  });

  const rotorMaterial = new THREE.MeshStandardMaterial({
    name: "IB_Carbon_Ceramic_Rotor",
    color: new THREE.Color("#252932"),
    metalness: 0.84,
    roughness: 0.34,
    envMapIntensity: 1.2,
  });

  const chromeMaterial = new THREE.MeshStandardMaterial({
    name: "IB_Mirror_Chrome",
    color: new THREE.Color("#edf2f8"),
    metalness: 1.0,
    roughness: 0.05,
    envMapIntensity: 2.35,
  });

  const darkTrimMaterial = new THREE.MeshStandardMaterial({
    name: "IB_Satin_Black_Aero_Trim",
    color: new THREE.Color("#0b0d12"),
    metalness: 0.34,
    roughness: 0.4,
    envMapIntensity: 0.95,
  });

  const interiorMaterial = new THREE.MeshStandardMaterial({
    name: "IB_Dark_Alcantara_Interior",
    color: new THREE.Color("#0a0b0f"),
    metalness: 0.08,
    roughness: 0.78,
    envMapIntensity: 0.35,
  });

  const caliperMaterial = new THREE.MeshPhysicalMaterial({
    name: "IB_Signature_Yellow_Calipers",
    color: new THREE.Color("#FBE90A"),
    metalness: 0.35,
    roughness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    envMapIntensity: 1.55,
  });

  const headlightMaterial = new THREE.MeshStandardMaterial({
    name: "IB_Xenon_DRL_Blade",
    color: new THREE.Color("#ffffff"),
    emissive: new THREE.Color("#eef6ff"),
    emissiveIntensity: 0.35, // Ignites dramatically as the supercar drives into the studio
    metalness: 0.1,
    roughness: 0.04,
    toneMapped: false,
  });

  const taillightMaterial = new THREE.MeshStandardMaterial({
    name: "IB_Ruby_LED_Taillight",
    color: new THREE.Color("#990814"),
    emissive: new THREE.Color("#ff182c"),
    emissiveIntensity: 0.4,
    metalness: 0.2,
    roughness: 0.08,
    toneMapped: false,
  });

  const tireMaterial = new THREE.MeshStandardMaterial({
    name: "IB_Performance_Tire_Sidewall",
    color: new THREE.Color("#101216"),
    metalness: 0.06,
    roughness: 0.8,
    envMapIntensity: 0.45,
  });

  const carbonMaterial = new THREE.MeshPhysicalMaterial({
    name: "IB_Gloss_Carbon_Diffuser",
    color: new THREE.Color("#14171d"),
    metalness: 0.46,
    roughness: 0.22,
    clearcoat: 0.95,
    clearcoatRoughness: 0.08,
    envMapIntensity: 1.5,
  });

  const createdMaterials: THREE.Material[] = [
    bodyMaterial,
    glassMaterial,
    headlightLensMaterial,
    rimMaterial,
    rotorMaterial,
    chromeMaterial,
    darkTrimMaterial,
    interiorMaterial,
    caliperMaterial,
    headlightMaterial,
    taillightMaterial,
    tireMaterial,
    carbonMaterial,
  ];

  sceneRoot.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;

    mesh.castShadow = enableShadows;
    mesh.receiveShadow = enableShadows;

    const origMat = Array.isArray(mesh.material)
      ? mesh.material[0]
      : mesh.material;
    const matName = (origMat?.name || "").toLowerCase();
    const nodeName = (mesh.name || "").toLowerCase();

    if (matName.includes("body_color") || nodeName === "body") {
      mesh.material = bodyMaterial;
    } else if (matName.includes("glass_gray") || nodeName === "glass") {
      mesh.material = glassMaterial;
      mesh.castShadow = false;
    } else if (nodeName === "lights" || matName.includes("projector_glass")) {
      mesh.material = headlightLensMaterial;
      mesh.castShadow = false;
    } else if (nodeName === "leds" || matName.includes("turn_signal_led")) {
      mesh.material = headlightMaterial;
      mesh.castShadow = false;
    } else if (
      nodeName === "brakes" ||
      nodeName === "centre" ||
      nodeName === "yellow_trim" ||
      nodeName === "steering_centre" ||
      matName.includes("ferrari_yellow")
    ) {
      mesh.material = caliperMaterial;
    } else if (nodeName === "brake") {
      mesh.material = rotorMaterial;
    } else if (
      nodeName === "chrome" ||
      matName.includes("metal_chrome")
    ) {
      mesh.material = chromeMaterial;
    } else if (
      nodeName.startsWith("rim_") ||
      nodeName === "wheel" ||
      nodeName === "metal" ||
      matName === "metal_gray"
    ) {
      mesh.material = rimMaterial;
    } else if (nodeName === "tire" || matName.includes("tires") && nodeName !== "grills" && nodeName !== "wipers") {
      mesh.material = tireMaterial;
    } else if (nodeName.includes("carbon") || matName.includes("carbon")) {
      mesh.material = carbonMaterial;
    } else if (
      nodeName === "lights_red" ||
      nodeName === "steering_red_lights" ||
      matName.includes("taillight")
    ) {
      mesh.material = taillightMaterial;
      mesh.castShadow = false;
    } else if (
      nodeName === "grills" ||
      nodeName === "trim" ||
      nodeName === "plastic_gray" ||
      nodeName === "wipers" ||
      nodeName === "nuts" ||
      matName.includes("plastic_gray")
    ) {
      mesh.material = darkTrimMaterial;
    } else {
      mesh.material = interiorMaterial;
    }
  });

  return {
    bodyMaterial,
    glassMaterial,
    rimMaterial,
    caliperMaterial,
    headlightMaterial,
    taillightMaterial,
    dispose: () => {
      for (const m of createdMaterials) {
        m.dispose();
      }
    },
  };
}
