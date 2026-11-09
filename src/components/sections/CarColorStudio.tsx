"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Bookmark,
  Check,
  Copy,
  Download,
  MoveHorizontal,
  Palette,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  SplitSquareHorizontal,
  Trash2,
} from "lucide-react";
import { buildWhatsAppUrl } from "@/config/business";
import {
  COLOR_STUDIO_SWATCHES,
  hexToRgb,
  isValidHexColor,
  PAINT_CATEGORIES,
  PAINT_FINISHES,
  SAUDI_POPULAR_MODELS,
  type PaintCategoryId,
  type PaintColorSwatch,
  type PaintFinishId,
} from "@/data/colorStudioPalette";
import type { Dictionary } from "@/lib/i18n";
import { localizedHref } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

interface SavedPaintConfig {
  id: string;
  name: string;
  hex: string;
  finish: PaintFinishId;
  vehicle: string;
}

interface CarColorStudioProps {
  locale: Locale;
  dict: Dictionary["colorConfigurator"];
  isStandalonePage?: boolean;
}

interface BrdfParams {
  cLinR: number;
  cLinG: number;
  cLinB: number;
  origMix: number; // 1 = untouched factory black plate, 0 = full intrinsic paint shader
  amb: number;
  diffScale: number;
  gammaE: number;
  specSharpW: number;
  specSatinW: number;
  velvetW: number;
  envW: number;
  flakeW: number;
  detailStrength: number;
}

interface WebGLStudioState {
  gl: WebGL2RenderingContext;
  program: WebGLProgram;
  vao: WebGLVertexArrayObject;
  uniforms: {
    u_colorLin: WebGLUniformLocation | null;
    u_origMix: WebGLUniformLocation | null;
    u_amb: WebGLUniformLocation | null;
    u_diffScale: WebGLUniformLocation | null;
    u_gammaE: WebGLUniformLocation | null;
    u_specSharpW: WebGLUniformLocation | null;
    u_specSatinW: WebGLUniformLocation | null;
    u_velvetW: WebGLUniformLocation | null;
    u_envW: WebGLUniformLocation | null;
    u_flakeW: WebGLUniformLocation | null;
    u_detailStrength: WebGLUniformLocation | null;
    u_compareMode: WebGLUniformLocation | null;
    u_splitX: WebGLUniformLocation | null;
  };
}

interface CpuFallbackState {
  ctx: CanvasRenderingContext2D;
  origPixels: Uint8ClampedArray;
  eb: Float32Array;
  od: Float32Array;
  ss: Float32Array;
  st: Float32Array;
  eyR: Float32Array;
  eyG: Float32Array;
  eyB: Float32Array;
  am: Float32Array;
  flakes: Float32Array;
  outImageData: ImageData;
}

const CANVAS_W = 1408;
const CANVAS_H = 792;
const STORAGE_KEY = "ib-car-color-studio-saved-v1";

function srgbByteToLinear(v255: number): number {
  const c = v255 / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgbByte(lin: number): number {
  const clamped = lin <= 0 ? 0 : lin >= 1 ? 1 : lin;
  const s =
    clamped <= 0.0031308
      ? clamped * 12.92
      : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
  return Math.round(Math.max(0, Math.min(255, s * 255)));
}

function computeTargetBrdf(
  finish: PaintFinishId,
  r: number,
  g: number,
  b: number,
  isOriginal: boolean
): BrdfParams {
  const cLinR = srgbByteToLinear(r);
  const cLinG = srgbByteToLinear(g);
  const cLinB = srgbByteToLinear(b);
  const targetLum = 0.2126 * cLinR + 0.7152 * cLinG + 0.0722 * cLinB;
  const origMix = isOriginal ? 1 : 0;

  switch (finish) {
    case "glossy":
      return {
        cLinR,
        cLinG,
        cLinB,
        origMix,
        amb: 0.025 + 0.035 * targetLum,
        diffScale: 1.08 - 0.1 * targetLum,
        gammaE: 1.35,
        specSharpW: 0.96,
        specSatinW: 0.06,
        velvetW: 0.0,
        envW: 0.78,
        flakeW: 0.0,
        detailStrength: 0.9,
      };
    case "matte":
      return {
        cLinR,
        cLinG,
        cLinB,
        origMix,
        amb: 0.055 + 0.045 * targetLum,
        diffScale: 0.92 - 0.08 * targetLum,
        gammaE: 0.92,
        specSharpW: 0.0,
        specSatinW: 0.14,
        velvetW: 0.22,
        envW: 0.2,
        flakeW: 0.0,
        detailStrength: 0.85,
      };
    case "satin":
      return {
        cLinR,
        cLinG,
        cLinB,
        origMix,
        amb: 0.04 + 0.04 * targetLum,
        diffScale: 1.0 - 0.09 * targetLum,
        gammaE: 1.12,
        specSharpW: 0.1,
        specSatinW: 0.52,
        velvetW: 0.1,
        envW: 0.45,
        flakeW: 0.0,
        detailStrength: 0.88,
      };
    case "metallic":
      return {
        cLinR,
        cLinG,
        cLinB,
        origMix,
        amb: 0.018 + 0.03 * targetLum,
        diffScale: 1.14 - 0.1 * targetLum,
        gammaE: 1.48,
        specSharpW: 0.92,
        specSatinW: 0.22,
        velvetW: 0.0,
        envW: 0.74,
        flakeW: 0.34,
        detailStrength: 0.9,
      };
  }
}

const VERTEX_SHADER_SRC = `#version 300 es
precision highp float;
layout(location = 0) in vec2 a_pos;
out vec2 v_uv;
void main() {
  v_uv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SRC = `#version 300 es
precision highp float;
precision highp int;

in vec2 v_uv;
out vec4 outColor;

uniform sampler2D u_orig;
uniform sampler2D u_shading;
uniform sampler2D u_envMask;

uniform vec3 u_colorLin;
uniform float u_origMix;
uniform float u_amb;
uniform float u_diffScale;
uniform float u_gammaE;
uniform float u_specSharpW;
uniform float u_specSatinW;
uniform float u_velvetW;
uniform float u_envW;
uniform float u_flakeW;
uniform float u_detailStrength;
uniform int u_compareMode;
uniform float u_splitX;

uint pcgHash(uint x, uint y) {
  uint state = x * 374761393u + y * 668265263u + 2654435769u;
  state = (state ^ (state >> 13u)) * 1274126177u;
  return state ^ (state >> 16u);
}

float softCrystalSample(int ix, int iy) {
  uint cx = uint(clamp(ix, 0, 1407));
  uint cy = uint(clamp(iy, 0, 791));
  uint s1 = pcgHash(cx, cy);
  uint s2 = s1 * 747796405u + 2891336453u;
  s2 = (s2 ^ (s2 >> 15u)) * 277803737u;
  s2 = s2 ^ (s2 >> 16u);
  float u2 = float(s2 & 65535u) / 65535.0;
  return clamp((u2 - 0.72) / 0.28, 0.0, 1.0);
}

float metallicFlakeField(vec2 uv) {
  ivec2 px = ivec2(clamp(uv * vec2(1408.0, 792.0), vec2(0.0), vec2(1407.0, 791.0)));
  uint s1 = pcgHash(uint(px.x), uint(px.y));
  float u1 = float(s1 & 65535u) / 65535.0;
  float fineSparkle = pow(clamp((u1 - 0.68) / 0.32, 0.0, 1.0), 1.8);

  float c0 = softCrystalSample(px.x, px.y) * 0.36;
  float c1 = softCrystalSample(px.x - 1, px.y) * 0.16;
  float c2 = softCrystalSample(px.x + 1, px.y) * 0.16;
  float c3 = softCrystalSample(px.x, px.y - 1) * 0.16;
  float c4 = softCrystalSample(px.x, px.y + 1) * 0.16;
  float softGlint = (c0 + c1 + c2 + c3 + c4) * 1.35;

  return clamp(0.65 * fineSparkle + 0.55 * softGlint, 0.0, 1.0);
}

vec3 linearToSrgb(vec3 lin) {
  vec3 c = clamp(lin, 0.0, 1.0);
  vec3 lo = c * 12.92;
  vec3 hi = 1.055 * pow(max(c, vec3(1e-7)), vec3(1.0 / 2.4)) - 0.055;
  return mix(hi, lo, lessThanEqual(c, vec3(0.0031308)));
}

void main() {
  vec3 origSrgb = texture(u_orig, v_uv).rgb;

  if (u_compareMode == 1 && v_uv.x < u_splitX) {
    outColor = vec4(origSrgb, 1.0);
    return;
  }

  if (u_origMix >= 0.999) {
    outColor = vec4(origSrgb, 1.0);
    return;
  }

  vec4 em = texture(u_envMask, v_uv);
  float alpha = em.a * (1.0 - u_origMix);

  if (alpha <= 0.001) {
    outColor = vec4(origSrgb, 1.0);
    return;
  }

  vec4 sh = texture(u_shading, v_uv);
  float eb = sh.r;
  float od = sh.g;
  float ss = sh.b;
  float st = clamp((sh.a - 0.0314) / 0.9686, 0.0, 1.0);
  vec3 ey = pow(max(em.rgb, vec3(0.0)), vec3(2.2));

  float occ = (1.0 - u_detailStrength) + u_detailStrength * od;
  float irr = (u_amb + u_diffScale * pow(max(eb, 1e-4), u_gammaE)) * occ;
  vec3 paintLin = irr * u_colorLin;

  if (u_velvetW > 0.001) {
    float velvet = u_velvetW * pow(max(eb, 1e-4), 2.2) * occ;
    vec3 velvetTint = 0.55 * min(vec3(1.0), u_colorLin * 1.35 + 0.12) + vec3(0.45);
    paintLin += velvet * velvetTint;
  }

  if (u_flakeW > 0.001) {
    float sparkle = metallicFlakeField(v_uv);
    float flakeZone = pow(max(eb, 1e-4), 1.15) * (0.45 + 0.75 * st) * (1.0 - 0.70 * ss) * occ;
    vec3 flakeTint = 0.60 * min(vec3(1.0), u_colorLin * 1.9 + 0.10) + 0.40 * vec3(0.88, 0.90, 0.94);
    paintLin += (u_flakeW * sparkle * flakeZone) * flakeTint;
  }

  vec3 satinTint = 0.35 * min(vec3(1.0), u_colorLin * 1.4 + 0.12) + vec3(0.65);
  paintLin += (u_specSatinW * pow(max(st, 1e-4), 1.15) * occ) * satinTint;

  float targetLum = dot(u_colorLin, vec3(0.2126, 0.7152, 0.0722));
  paintLin += (u_envW * (1.0 - 0.35 * targetLum)) * ey;

  float specWhite = u_specSharpW * pow(max(ss, 1e-4), 1.05);
  paintLin = paintLin * (1.0 - 0.65 * specWhite) + vec3(specWhite);

  vec3 paintSrgb = linearToSrgb(paintLin);
  vec3 finalRgb = mix(origSrgb, paintSrgb, alpha);
  outColor = vec4(finalRgb, 1.0);
}
`;

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function initWebGL2Engine(
  canvas: HTMLCanvasElement,
  origImg: HTMLImageElement,
  shadingImg: HTMLImageElement,
  envMaskImg: HTMLImageElement
): WebGLStudioState | null {
  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: false,
    preserveDrawingBuffer: true,
  });
  if (!gl) return null;

  const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  const vao = gl.createVertexArray();
  const vbo = gl.createBuffer();
  if (!vao || !vbo) return null;

  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW
  );
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.bindVertexArray(null);

  const createTex = (
    unit: number,
    img: HTMLImageElement,
    rawDataPack: boolean
  ) => {
    const tex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.pixelStorei(
      gl.UNPACK_COLORSPACE_CONVERSION_WEBGL,
      rawDataPack ? gl.NONE : gl.BROWSER_DEFAULT_WEBGL
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, img);
  };

  createTex(0, origImg, false);
  createTex(1, shadingImg, true);
  createTex(2, envMaskImg, true);

  gl.useProgram(program);
  gl.uniform1i(gl.getUniformLocation(program, "u_orig"), 0);
  gl.uniform1i(gl.getUniformLocation(program, "u_shading"), 1);
  gl.uniform1i(gl.getUniformLocation(program, "u_envMask"), 2);

  return {
    gl,
    program,
    vao,
    uniforms: {
      u_colorLin: gl.getUniformLocation(program, "u_colorLin"),
      u_origMix: gl.getUniformLocation(program, "u_origMix"),
      u_amb: gl.getUniformLocation(program, "u_amb"),
      u_diffScale: gl.getUniformLocation(program, "u_diffScale"),
      u_gammaE: gl.getUniformLocation(program, "u_gammaE"),
      u_specSharpW: gl.getUniformLocation(program, "u_specSharpW"),
      u_specSatinW: gl.getUniformLocation(program, "u_specSatinW"),
      u_velvetW: gl.getUniformLocation(program, "u_velvetW"),
      u_envW: gl.getUniformLocation(program, "u_envW"),
      u_flakeW: gl.getUniformLocation(program, "u_flakeW"),
      u_detailStrength: gl.getUniformLocation(program, "u_detailStrength"),
      u_compareMode: gl.getUniformLocation(program, "u_compareMode"),
      u_splitX: gl.getUniformLocation(program, "u_splitX"),
    },
  };
}

function initCpuFallback(
  canvas: HTMLCanvasElement,
  origImg: HTMLImageElement,
  shadingImg: HTMLImageElement,
  envMaskImg: HTMLImageElement,
  maskGrayImg: HTMLImageElement
): CpuFallbackState | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const readPixels = (img: HTMLImageElement) => {
    const tmp = document.createElement("canvas");
    tmp.width = CANVAS_W;
    tmp.height = CANVAS_H;
    const tCtx = tmp.getContext("2d", { willReadFrequently: true });
    if (!tCtx) return new Uint8ClampedArray(CANVAS_W * CANVAS_H * 4);
    tCtx.drawImage(img, 0, 0, CANVAS_W, CANVAS_H);
    return tCtx.getImageData(0, 0, CANVAS_W, CANVAS_H).data;
  };

  const origPixels = readPixels(origImg);
  const shPixels = readPixels(shadingImg);
  const envPixels = readPixels(envMaskImg);
  const maskPixels = readPixels(maskGrayImg);

  const total = CANVAS_W * CANVAS_H;
  const eb = new Float32Array(total);
  const od = new Float32Array(total);
  const ss = new Float32Array(total);
  const st = new Float32Array(total);
  const eyR = new Float32Array(total);
  const eyG = new Float32Array(total);
  const eyB = new Float32Array(total);
  const am = new Float32Array(total);
  const flakes = new Float32Array(total);

  for (let y = 0; y < CANVAS_H; y++) {
    for (let x = 0; x < CANVAS_W; x++) {
      const i = y * CANVAS_W + x;
      const idx = i * 4;
      eb[i] = shPixels[idx] / 255;
      od[i] = shPixels[idx + 1] / 255;
      ss[i] = shPixels[idx + 2] / 255;
      st[i] = Math.max(0, Math.min(1, (shPixels[idx + 3] - 8) / 247));
      eyR[i] = Math.pow(envPixels[idx] / 255, 2.2);
      eyG[i] = Math.pow(envPixels[idx + 1] / 255, 2.2);
      eyB[i] = Math.pow(envPixels[idx + 2] / 255, 2.2);
      am[i] = maskPixels[idx] / 255;

      let state =
        (Math.imul(x, 374761393) +
          Math.imul(y, 668265263) +
          0x9e3779b9) >>>
        0;
      state = Math.imul(state ^ (state >>> 13), 1274126177) >>> 0;
      state = (state ^ (state >>> 16)) >>> 0;
      const u1 = (state & 0xffff) / 65535;
      flakes[i] =
        u1 > 0.68 ? Math.pow((u1 - 0.68) / 0.32, 1.65) : 0;
    }
  }

  return {
    ctx,
    origPixels,
    eb,
    od,
    ss,
    st,
    eyR,
    eyG,
    eyB,
    am,
    flakes,
    outImageData: ctx.createImageData(CANVAS_W, CANVAS_H),
  };
}

export function CarColorStudio({
  locale,
  dict,
  isStandalonePage = false,
}: CarColorStudioProps) {
  const defaultSwatch =
    COLOR_STUDIO_SWATCHES.find((s) => s.id === "guards-red") ??
    COLOR_STUDIO_SWATCHES[0];

  const [activeCategory, setActiveCategory] = useState<PaintCategoryId>("all");
  const [selectedSwatchId, setSelectedSwatchId] = useState<string>(
    defaultSwatch.id
  );
  const [customHex, setCustomHex] = useState<string>("#C81422");
  const [hexInputText, setHexInputText] = useState<string>("#C81422");
  const [isCustomColor, setIsCustomColor] = useState<boolean>(false);
  const [finish, setFinish] = useState<PaintFinishId>("glossy");
  const [vehicleModel, setVehicleModel] = useState<string>("");

  // Before / After Comparison Slider State
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [splitPct, setSplitPct] = useState<number>(50);
  const [isDraggingSplit, setIsDraggingSplit] = useState<boolean>(false);

  // Copy & Save Feedback + Saved Configurations
  const [copiedHex, setCopiedHex] = useState<boolean>(false);
  const [savedToast, setSavedToast] = useState<boolean>(false);
  const [savedConfigs, setSavedConfigs] = useState<SavedPaintConfig[]>([]);
  const [assetsReady, setAssetsReady] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const webglRef = useRef<WebGLStudioState | null>(null);
  const cpuFallbackRef = useRef<CpuFallbackState | null>(null);

  const currentParamsRef = useRef<BrdfParams>(
    computeTargetBrdf("glossy", 200, 20, 34, false)
  );
  const animFrameRef = useRef<number | null>(null);
  const immediateNextRef = useRef<boolean>(false);

  // Load saved configurations from localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as SavedPaintConfig[];
        if (Array.isArray(parsed)) {
          setSavedConfigs(parsed.slice(0, 8));
        }
      }
    } catch {
      // Ignore storage read errors
    }
  }, []);

  // Preload & cache intrinsic studio textures once, then initialize WebGL2 shader (with CPU fallback)
  useEffect(() => {
    let cancelled = false;

    const loadImg = (src: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new window.Image();
        img.decoding = "async";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });

    Promise.all([
      loadImg("/images/services/window-tinting.jpg"),
      loadImg("/images/studio/car-shading-pack.png"),
      loadImg("/images/studio/car-env-pack.png"),
      loadImg("/images/studio/car-paint-mask-v3.png"),
    ])
      .then(([origImg, shadingImg, envMaskImg, maskGrayImg]) => {
        if (cancelled || !canvasRef.current) return;

        const glEngine = initWebGL2Engine(
          canvasRef.current,
          origImg,
          shadingImg,
          envMaskImg
        );

        if (glEngine) {
          webglRef.current = glEngine;
        } else {
          cpuFallbackRef.current = initCpuFallback(
            canvasRef.current,
            origImg,
            shadingImg,
            envMaskImg,
            maskGrayImg
          );
        }

        setAssetsReady(true);
      })
      .catch(() => {
        // Fallback handled gracefully by initial image
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const activeSwatch: PaintColorSwatch | null = useMemo(() => {
    if (isCustomColor) return null;
    return (
      COLOR_STUDIO_SWATCHES.find((s) => s.id === selectedSwatchId) ??
      COLOR_STUDIO_SWATCHES[0]
    );
  }, [isCustomColor, selectedSwatchId]);

  const activeHex = isCustomColor
    ? customHex.toUpperCase()
    : (activeSwatch?.hex.toUpperCase() ?? "#0D0F14");

  const activeColorName = isCustomColor
    ? dict.customColorName
    : (activeSwatch?.name[locale] ?? "");

  const activeCode = isCustomColor
    ? "CUSTOM-HEX"
    : (activeSwatch?.code ?? "IB-01");

  const activeRgb = useMemo(() => hexToRgb(activeHex), [activeHex]);

  const isPureOriginalState =
    !isCustomColor &&
    Boolean(activeSwatch?.isOriginal) &&
    finish === "glossy";

  const drawStudioFrame = useCallback(
    (p: BrdfParams, compareActive: boolean, splitPercent: number) => {
      const glState = webglRef.current;
      if (glState) {
        const { gl, program, vao, uniforms } = glState;
        gl.viewport(0, 0, CANVAS_W, CANVAS_H);
        gl.useProgram(program);
        gl.bindVertexArray(vao);

        gl.uniform3f(uniforms.u_colorLin, p.cLinR, p.cLinG, p.cLinB);
        gl.uniform1f(uniforms.u_origMix, p.origMix);
        gl.uniform1f(uniforms.u_amb, p.amb);
        gl.uniform1f(uniforms.u_diffScale, p.diffScale);
        gl.uniform1f(uniforms.u_gammaE, p.gammaE);
        gl.uniform1f(uniforms.u_specSharpW, p.specSharpW);
        gl.uniform1f(uniforms.u_specSatinW, p.specSatinW);
        gl.uniform1f(uniforms.u_velvetW, p.velvetW);
        gl.uniform1f(uniforms.u_envW, p.envW);
        gl.uniform1f(uniforms.u_flakeW, p.flakeW);
        gl.uniform1f(uniforms.u_detailStrength, p.detailStrength);
        gl.uniform1i(uniforms.u_compareMode, compareActive ? 1 : 0);
        gl.uniform1f(uniforms.u_splitX, splitPercent / 100);

        gl.drawArrays(gl.TRIANGLES, 0, 3);
        gl.bindVertexArray(null);
        return;
      }

      const cpu = cpuFallbackRef.current;
      if (!cpu) return;

      const {
        ctx,
        origPixels,
        eb,
        od,
        ss,
        st,
        eyR,
        eyG,
        eyB,
        am,
        flakes,
        outImageData,
      } = cpu;
      const dst = outImageData.data;
      const splitCol = compareActive
        ? Math.round((splitPercent / 100) * CANVAS_W)
        : -1;
      const targetLum =
        0.2126 * p.cLinR + 0.7152 * p.cLinG + 0.0722 * p.cLinB;
      const envScale = p.envW * (1 - 0.35 * targetLum);

      const velvetTintR = 0.55 * Math.min(1, p.cLinR * 1.35 + 0.12) + 0.45;
      const velvetTintG = 0.55 * Math.min(1, p.cLinG * 1.35 + 0.12) + 0.45;
      const velvetTintB = 0.55 * Math.min(1, p.cLinB * 1.35 + 0.12) + 0.45;

      const flakeTintR =
        0.6 * Math.min(1, p.cLinR * 1.9 + 0.1) + 0.4 * 0.88;
      const flakeTintG =
        0.6 * Math.min(1, p.cLinG * 1.9 + 0.1) + 0.4 * 0.9;
      const flakeTintB =
        0.6 * Math.min(1, p.cLinB * 1.9 + 0.1) + 0.4 * 0.94;

      const satinTintR = 0.35 * Math.min(1, p.cLinR * 1.4 + 0.12) + 0.65;
      const satinTintG = 0.35 * Math.min(1, p.cLinG * 1.4 + 0.12) + 0.65;
      const satinTintB = 0.35 * Math.min(1, p.cLinB * 1.4 + 0.12) + 0.65;

      for (let y = 0; y < CANVAS_H; y++) {
        const rowOffset = y * CANVAS_W;
        for (let x = 0; x < CANVAS_W; x++) {
          const i = rowOffset + x;
          const idx = i * 4;

          if ((compareActive && x < splitCol) || p.origMix >= 0.999) {
            dst[idx] = origPixels[idx];
            dst[idx + 1] = origPixels[idx + 1];
            dst[idx + 2] = origPixels[idx + 2];
            dst[idx + 3] = 255;
            continue;
          }

          const alpha = am[i] * (1 - p.origMix);
          if (alpha <= 0.001) {
            dst[idx] = origPixels[idx];
            dst[idx + 1] = origPixels[idx + 1];
            dst[idx + 2] = origPixels[idx + 2];
            dst[idx + 3] = 255;
            continue;
          }

          const eVal = eb[i];
          const occ = (1 - p.detailStrength) + p.detailStrength * od[i];
          const irr =
            (p.amb + p.diffScale * Math.pow(Math.max(eVal, 1e-4), p.gammaE)) *
            occ;

          let pr = irr * p.cLinR;
          let pg = irr * p.cLinG;
          let pb = irr * p.cLinB;

          if (p.velvetW > 0.001) {
            const v = p.velvetW * Math.pow(eVal, 2.2) * occ;
            pr += v * velvetTintR;
            pg += v * velvetTintG;
            pb += v * velvetTintB;
          }

          if (p.flakeW > 0.001 && flakes[i] > 0) {
            const fz =
              p.flakeW *
              flakes[i] *
              Math.pow(eVal, 1.15) *
              (0.45 + 0.75 * st[i]) *
              (1 - 0.7 * ss[i]) *
              occ;
            pr += fz * flakeTintR;
            pg += fz * flakeTintG;
            pb += fz * flakeTintB;
          }

          const sat = p.specSatinW * Math.pow(Math.max(st[i], 1e-4), 1.15) * occ;
          pr += sat * satinTintR + envScale * eyR[i];
          pg += sat * satinTintG + envScale * eyG[i];
          pb += sat * satinTintB + envScale * eyB[i];

          const sw = p.specSharpW * Math.pow(Math.max(ss[i], 1e-4), 1.05);
          const atten = 1 - 0.65 * sw;
          pr = pr * atten + sw;
          pg = pg * atten + sw;
          pb = pb * atten + sw;

          const sr = linearToSrgbByte(pr);
          const sg = linearToSrgbByte(pg);
          const sb = linearToSrgbByte(pb);

          dst[idx] = Math.round(origPixels[idx] * (1 - alpha) + sr * alpha);
          dst[idx + 1] = Math.round(
            origPixels[idx + 1] * (1 - alpha) + sg * alpha
          );
          dst[idx + 2] = Math.round(
            origPixels[idx + 2] * (1 - alpha) + sb * alpha
          );
          dst[idx + 3] = 255;
        }
      }

      ctx.putImageData(outImageData, 0, 0);
    },
    []
  );

  // Animate swatch/finish transitions smoothly at 60fps, while rendering picker drags instantaneously!
  useEffect(() => {
    if (!assetsReady) return;

    const target = computeTargetBrdf(
      finish,
      activeRgb.r,
      activeRgb.g,
      activeRgb.b,
      isPureOriginalState
    );

    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    if (immediateNextRef.current) {
      immediateNextRef.current = false;
      currentParamsRef.current = target;
      drawStudioFrame(target, compareMode, splitPct);
      return;
    }

    const start = { ...currentParamsRef.current };
    const colorChanged =
      Math.abs(start.cLinR - target.cLinR) > 1e-4 ||
      Math.abs(start.cLinG - target.cLinG) > 1e-4 ||
      Math.abs(start.cLinB - target.cLinB) > 1e-4 ||
      Math.abs(start.origMix - target.origMix) > 1e-4 ||
      Math.abs(start.specSharpW - target.specSharpW) > 1e-4 ||
      Math.abs(start.flakeW - target.flakeW) > 1e-4 ||
      Math.abs(start.velvetW - target.velvetW) > 1e-4;

    if (!colorChanged) {
      // Pure slider drag or compare toggle -> instant 0ms redraw!
      currentParamsRef.current = target;
      drawStudioFrame(target, compareMode, splitPct);
      return;
    }

    const duration = 200;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - t, 3);

      const lerp = (a: number, b: number) => a + (b - a) * ease;
      const next: BrdfParams = {
        cLinR: lerp(start.cLinR, target.cLinR),
        cLinG: lerp(start.cLinG, target.cLinG),
        cLinB: lerp(start.cLinB, target.cLinB),
        origMix: lerp(start.origMix, target.origMix),
        amb: lerp(start.amb, target.amb),
        diffScale: lerp(start.diffScale, target.diffScale),
        gammaE: lerp(start.gammaE, target.gammaE),
        specSharpW: lerp(start.specSharpW, target.specSharpW),
        specSatinW: lerp(start.specSatinW, target.specSatinW),
        velvetW: lerp(start.velvetW, target.velvetW),
        envW: lerp(start.envW, target.envW),
        flakeW: lerp(start.flakeW, target.flakeW),
        detailStrength: lerp(start.detailStrength, target.detailStrength),
      };

      currentParamsRef.current = next;
      drawStudioFrame(next, compareMode, splitPct);

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [
    assetsReady,
    activeRgb.r,
    activeRgb.g,
    activeRgb.b,
    finish,
    isPureOriginalState,
    compareMode,
    splitPct,
    drawStudioFrame,
  ]);

  const visibleSwatches = useMemo(() => {
    if (activeCategory === "all") return COLOR_STUDIO_SWATCHES;
    return COLOR_STUDIO_SWATCHES.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const updateSplitFromClientX = useCallback((clientX: number) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplitPct(Math.max(4, Math.min(96, pct)));
  }, []);

  const handleSelectSwatch = (swatch: PaintColorSwatch) => {
    setIsCustomColor(false);
    setSelectedSwatchId(swatch.id);
    setCustomHex(swatch.hex);
    setHexInputText(swatch.hex.toUpperCase());
  };

  const handleCustomPickerChange = (hexValue: string) => {
    immediateNextRef.current = true;
    const formatted = hexValue.toUpperCase();
    setIsCustomColor(true);
    setCustomHex(formatted);
    setHexInputText(formatted);
  };

  const handleHexTextChange = (raw: string) => {
    const val = raw.startsWith("#") ? raw : `#${raw}`;
    setHexInputText(val.toUpperCase());
    if (isValidHexColor(val)) {
      immediateNextRef.current = true;
      setIsCustomColor(true);
      setCustomHex(val.toUpperCase());
    }
  };

  const handleReset = () => {
    const orig = COLOR_STUDIO_SWATCHES[0];
    setIsCustomColor(false);
    setSelectedSwatchId(orig.id);
    setFinish("glossy");
    setCompareMode(false);
    setHexInputText(orig.hex.toUpperCase());
  };

  const handleCopyHex = async () => {
    try {
      await navigator.clipboard.writeText(activeHex);
      setCopiedHex(true);
      setTimeout(() => setCopiedHex(false), 1800);
    } catch {
      // Clipboard unavailable
    }
  };

  const handleSaveConfiguration = () => {
    const entry: SavedPaintConfig = {
      id: `${Date.now()}`,
      name: activeColorName,
      hex: activeHex,
      finish,
      vehicle: vehicleModel.trim(),
    };
    const updated = [
      entry,
      ...savedConfigs.filter(
        (c) =>
          !(
            c.hex === entry.hex &&
            c.finish === entry.finish &&
            c.vehicle === entry.vehicle
          )
      ),
    ].slice(0, 6);

    setSavedConfigs(updated);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage quota
    }
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 1800);
  };

  const handleDeleteSaved = (id: string) => {
    const updated = savedConfigs.filter((c) => c.id !== id);
    setSavedConfigs(updated);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleRestoreSaved = (cfg: SavedPaintConfig) => {
    const matchingPreset = COLOR_STUDIO_SWATCHES.find(
      (s) => s.hex.toUpperCase() === cfg.hex.toUpperCase()
    );
    if (matchingPreset) {
      setIsCustomColor(false);
      setSelectedSwatchId(matchingPreset.id);
    } else {
      setIsCustomColor(true);
      setCustomHex(cfg.hex);
    }
    setHexInputText(cfg.hex.toUpperCase());
    setFinish(cfg.finish);
    if (cfg.vehicle) {
      setVehicleModel(cfg.vehicle);
    }
  };

  const handleDownloadSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `infinite-bright-${activeHex.replace("#", "")}-${finish}.jpg`;
    link.href = canvas.toDataURL("image/jpeg", 0.94);
    link.click();
  };

  const finishTitle = dict.finishes[finish].title;

  const waMessage = useMemo(() => {
    const vehiclePart = vehicleModel.trim()
      ? locale === "ar"
        ? `\n• السيارة: ${vehicleModel.trim()}`
        : `\n• Vehicle: ${vehicleModel.trim()}`
      : "";

    return locale === "ar"
      ? `مرحباً إنفينيتي برايت، أود الاستفسار وحجز خدمة تغيير لون السيارة من استوديو الألوان التفاعلي:${vehiclePart}\n• اللون المختار: ${activeColorName}\n• كود اللون (HEX): ${activeHex} — RGB(${activeRgb.r}, ${activeRgb.g}, ${activeRgb.b})\n• المظهر واللمعة: ${finishTitle}`
      : `Hello INFINITY BRIGHT, I would like to request a quote from the Car Color Studio:${vehiclePart}\n• Selected Color: ${activeColorName}\n• Color Code: ${activeHex} — RGB(${activeRgb.r}, ${activeRgb.g}, ${activeRgb.b})\n• Surface Finish: ${finishTitle}`;
  }, [
    locale,
    vehicleModel,
    activeColorName,
    activeHex,
    activeRgb,
    finishTitle,
  ]);

  const popularModels = SAUDI_POPULAR_MODELS[locale];

  const getSwatchFinishOverlay = (f: PaintFinishId) => {
    switch (f) {
      case "glossy":
        return "bg-[linear-gradient(135deg,rgba(255,255,255,0.52)_0%,rgba(255,255,255,0.08)_36%,rgba(0,0,0,0.28)_100%)]";
      case "matte":
        return "bg-[linear-gradient(160deg,rgba(255,255,255,0.12)_0%,rgba(0,0,0,0.22)_100%)]";
      case "satin":
        return "bg-[linear-gradient(135deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.04)_52%,rgba(0,0,0,0.25)_100%)]";
      case "metallic":
        return "bg-[radial-gradient(circle_at_30%_28%,rgba(255,255,255,0.55),transparent_58%),linear-gradient(135deg,rgba(255,255,255,0.22)_0%,rgba(0,0,0,0.32)_100%)]";
    }
  };

  return (
    <section
      id="color-studio"
      className={cn(
        "relative overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)]",
        isStandalonePage ? "py-14 sm:py-20" : "py-24 sm:py-32"
      )}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section Editorial Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FBE90A]/45 bg-[#FBE90A]/10 px-4 py-1.5 text-xs font-bold text-[var(--brand-accent-label)]">
              <Palette className="h-3.5 w-3.5" />
              <span>{dict.eyebrow}</span>
            </div>
            <h2 className="font-display text-3xl leading-[1.12] font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
              {dict.headline}
            </h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              {dict.description}
            </p>
          </Reveal>

          {!isStandalonePage && (
            <Reveal delay={0.08}>
              <Link
                href={localizedHref(locale, "color-studio")}
                className="group inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] px-5 py-2.5 text-xs font-bold text-[var(--text-primary)] transition-all hover:border-[#FBE90A] hover:bg-[#FBE90A] hover:text-[#060608]"
              >
                <span>{dict.openFullStudioCta}</span>
                <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
              </Link>
            </Reveal>
          )}
        </div>

        {/* MAIN STUDIO GRID — Desktop: Left 7 Cols Car Preview + Right 5 Cols Controls */}
        <div
          dir="ltr"
          className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10"
        >
          {/* LEFT SIDE: REAL-TIME WEBGL2 CAR PREVIEW + BEFORE/AFTER SLIDER + SELECTED SPEC + SAVED CONFIGS */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-[var(--border-strong)] bg-[#07080b] shadow-[var(--shadow-elevated)]">
              {/* Top Studio Telemetry Strip */}
              <div
                dir={locale === "ar" ? "rtl" : "ltr"}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#0b0d12] px-4 py-3 text-xs text-white sm:px-6"
              >
                <div className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#FBE90A]" />
                  <span className="font-bold tracking-wide text-white">
                    {dict.liveSpecTitle}
                  </span>
                  {vehicleModel.trim() && (
                    <span className="rounded-full border border-[#FBE90A]/45 bg-[#FBE90A]/15 px-3 py-0.5 text-[11px] font-bold text-[#FBE90A]">
                      {vehicleModel.trim()}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-[11px] font-semibold text-white/75">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#FBE90A]" />
                  <span>{dict.paintSafeBadge}</span>
                </div>
              </div>

              {/* Interactive WebGL2 <canvas> Viewport */}
              <div
                ref={stageRef}
                onPointerDown={(e) => {
                  if (!compareMode) return;
                  setIsDraggingSplit(true);
                  e.currentTarget.setPointerCapture(e.pointerId);
                  updateSplitFromClientX(e.clientX);
                }}
                onPointerMove={(e) => {
                  if (!compareMode || !isDraggingSplit) return;
                  updateSplitFromClientX(e.clientX);
                }}
                onPointerUp={(e) => {
                  if (!isDraggingSplit) return;
                  setIsDraggingSplit(false);
                  if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                    e.currentTarget.releasePointerCapture(e.pointerId);
                  }
                }}
                onPointerCancel={() => setIsDraggingSplit(false)}
                className={cn(
                  "relative aspect-[16/9] w-full select-none overflow-hidden bg-[#07080b]",
                  compareMode && "cursor-ew-resize touch-none"
                )}
              >
                {/* Initial preview image while WebGL2 textures hydrate */}
                {!assetsReady && (
                  <img
                    src="/images/services/color-change-studio.jpg"
                    alt="INFINITY BRIGHT Car Color Studio"
                    className="h-full w-full object-cover"
                  />
                )}

                <canvas
                  ref={canvasRef}
                  width={CANVAS_W}
                  height={CANVAS_H}
                  className={cn(
                    "block h-full w-full object-cover transition-opacity duration-200",
                    assetsReady ? "opacity-100" : "opacity-0"
                  )}
                />

                {/* Before / After Draggable Split Divider Overlay */}
                {compareMode && (
                  <>
                    <div
                      style={{ left: `${splitPct}%` }}
                      className="pointer-events-none absolute inset-y-0 z-20 w-[2px] -translate-x-1/2 bg-[#FBE90A] shadow-[0_0_20px_rgba(251,233,10,0.9)]"
                    >
                      <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#060608] bg-[#FBE90A] text-[#060608] shadow-[0_6px_24px_rgba(0,0,0,0.75)]">
                        <MoveHorizontal className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="pointer-events-none absolute top-4 left-4 z-20 rounded-full border border-white/20 bg-black/75 px-3.5 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                      {dict.beforeBadge}
                    </div>
                    <div className="pointer-events-none absolute top-4 right-4 z-20 rounded-full bg-[#FBE90A] px-3.5 py-1 text-[11px] font-extrabold text-[#060608] shadow-lg">
                      {dict.afterBadge}
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex justify-center px-4">
                      <span className="rounded-full border border-white/15 bg-black/75 px-4 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-md">
                        {dict.dragCompareHint}
                      </span>
                    </div>
                  </>
                )}

                {/* Floating Live Paint Chip Badge */}
                {!compareMode && (
                  <div
                    dir={locale === "ar" ? "rtl" : "ltr"}
                    className="pointer-events-none absolute right-3.5 bottom-3.5 left-3.5 z-10 flex flex-wrap items-center justify-between gap-2"
                  >
                    <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/75 px-3.5 py-1.5 backdrop-blur-md">
                      <span
                        className="h-4 w-4 rounded-full border border-white/40 shadow-inner"
                        style={{ backgroundColor: activeHex }}
                      />
                      <span className="text-xs font-bold text-white">
                        {activeColorName}
                      </span>
                      <span
                        dir="ltr"
                        className="font-mono text-[11px] font-semibold text-[#FBE90A]"
                      >
                        {activeHex}
                      </span>
                    </div>

                    <span className="rounded-full border border-[#FBE90A]/45 bg-black/75 px-3.5 py-1 text-[11px] font-bold text-[#FBE90A] backdrop-blur-md">
                      {finishTitle}
                    </span>
                  </div>
                )}
              </div>

              {/* Studio Action Bar Below Canvas */}
              <div
                dir={locale === "ar" ? "rtl" : "ltr"}
                className="flex flex-wrap items-center justify-between gap-2.5 border-t border-white/10 bg-[#0b0d12] px-4 py-3 sm:px-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCompareMode((v) => !v)}
                    className={cn(
                      "inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all",
                      compareMode
                        ? "bg-[#FBE90A] text-[#060608] shadow-[0_0_20px_rgba(251,233,10,0.35)]"
                        : "border border-white/20 bg-white/5 text-white hover:border-[#FBE90A]"
                    )}
                  >
                    <SplitSquareHorizontal className="h-3.5 w-3.5" />
                    <span>
                      {compareMode ? dict.compareActive : dict.compareToggle}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white/90 transition-colors hover:border-[#FBE90A] hover:text-[#FBE90A]"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>{dict.resetButton}</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveConfiguration}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#FBE90A]/50 bg-[#FBE90A]/15 px-3.5 py-2 text-xs font-bold text-[#FBE90A] transition-colors hover:bg-[#FBE90A] hover:text-[#060608]"
                  >
                    <Bookmark className="h-3.5 w-3.5" />
                    <span>
                      {savedToast ? dict.savedToast : dict.saveConfigButton}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadSnapshot}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white/90 transition-colors hover:border-white/50"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>{dict.downloadSnapshot}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Selected Color Information Card */}
            <div
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-sm sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-[var(--border-strong)] shadow-md"
                    style={{ backgroundColor: activeHex }}
                  >
                    <span
                      className={cn(
                        "pointer-events-none absolute inset-0",
                        getSwatchFinishOverlay(finish)
                      )}
                    />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[var(--brand-accent-label)] uppercase">
                      {dict.selectedInfoTitle}
                    </p>
                    <h3 className="font-display text-lg font-extrabold text-[var(--text-primary)] sm:text-xl">
                      {activeColorName}
                    </h3>
                    <p className="text-xs font-medium text-[var(--text-secondary)]">
                      {finishTitle} · {dict.colorCodeLabel}:{" "}
                      <span dir="ltr" className="font-mono font-bold">
                        {activeCode}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <div
                    dir="ltr"
                    className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-3.5 py-2 font-mono text-xs font-bold text-[var(--text-primary)]"
                  >
                    {activeHex} · RGB({activeRgb.r}, {activeRgb.g},{" "}
                    {activeRgb.b})
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyHex}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-3.5 py-2 text-xs font-bold text-[var(--text-primary)] transition-colors hover:border-[#FBE90A]"
                  >
                    {copiedHex ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    <span>{copiedHex ? dict.copiedHex : dict.copyHex}</span>
                  </button>
                </div>
              </div>

              {/* Saved Customer Configurations Strip */}
              <div className="mt-5 border-t border-[var(--border-subtle)] pt-4">
                <p className="mb-2.5 text-xs font-bold text-[var(--text-primary)]">
                  {dict.savedConfigsTitle} ({savedConfigs.length})
                </p>
                {savedConfigs.length === 0 ? (
                  <p className="text-xs text-[var(--text-muted)]">
                    {dict.savedEmptyHint}
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {savedConfigs.map((cfg) => (
                      <div
                        key={cfg.id}
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-canvas)] py-1 ps-2.5 pe-1.5 text-xs"
                      >
                        <button
                          type="button"
                          onClick={() => handleRestoreSaved(cfg)}
                          className="inline-flex cursor-pointer items-center gap-2 font-bold text-[var(--text-primary)] hover:text-[var(--brand-accent-label)]"
                        >
                          <span
                            className="h-3.5 w-3.5 rounded-full border border-white/30"
                            style={{ backgroundColor: cfg.hex }}
                          />
                          <span>{cfg.name}</span>
                          <span className="text-[10px] text-[var(--text-muted)]">
                            ({dict.finishes[cfg.finish].title.split(" ")[0]})
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSaved(cfg.id)}
                          aria-label={dict.removeSaved}
                          className="inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-[var(--text-muted)] hover:bg-red-500/15 hover:text-red-500"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: 4 FINISHES + 12 COLOR CATEGORIES + 48 SWATCH PALETTE + CUSTOM PICKER + VEHICLE TAG + CTA */}
          <div
            dir={locale === "ar" ? "rtl" : "ltr"}
            className="space-y-6 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-[var(--shadow-elevated)] sm:p-7 lg:col-span-5"
          >
            {/* 1. Paint Finish Selection (GLOSSY, MATTE, SATIN, METALLIC) */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-extrabold tracking-wide text-[var(--text-primary)] uppercase">
                <Sparkles className="h-3.5 w-3.5 text-[var(--brand-accent-label)]" />
                <span>{dict.finishLabel}</span>
              </label>

              <div className="grid grid-cols-2 gap-2.5">
                {PAINT_FINISHES.map((fKey) => {
                  const isSelected = finish === fKey;
                  const fCopy = dict.finishes[fKey];
                  return (
                    <button
                      key={fKey}
                      type="button"
                      onClick={() => setFinish(fKey)}
                      className={cn(
                        "flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 text-start transition-all duration-200",
                        isSelected
                          ? "border-2 border-[#FBE90A] bg-[var(--bg-canvas)] shadow-[0_8px_24px_rgba(251,233,10,0.14)]"
                          : "border-[var(--border-subtle)] bg-[var(--bg-canvas)]/60 hover:border-[#FBE90A]/55"
                      )}
                    >
                      <span
                        className={cn(
                          "relative mt-0.5 h-7 w-7 shrink-0 overflow-hidden rounded-full border border-white/25 shadow-inner",
                          getSwatchFinishOverlay(fKey)
                        )}
                        style={{ backgroundColor: activeHex }}
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-extrabold text-[var(--text-primary)] sm:text-sm">
                          {fCopy.title}
                        </p>
                        <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-[var(--text-secondary)]">
                          {fCopy.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. 12 Color Categories Filter Tabs */}
            <div className="space-y-2.5 border-t border-[var(--border-subtle)] pt-5">
              <p className="text-xs font-extrabold tracking-wide text-[var(--text-primary)] uppercase">
                {dict.categoriesLabel}
              </p>

              <div className="flex gap-1.5 overflow-x-auto pb-1.5 sm:flex-wrap sm:overflow-visible sm:pb-0">
                {(["all", ...PAINT_CATEGORIES] as PaintCategoryId[]).map(
                  (catId) => {
                    const active = activeCategory === catId;
                    const sampleHex =
                      catId === "all"
                        ? "#FBE90A"
                        : (COLOR_STUDIO_SWATCHES.find(
                            (s) => s.category === catId
                          )?.hex ?? "#888");
                    return (
                      <button
                        key={catId}
                        type="button"
                        onClick={() => setActiveCategory(catId)}
                        className={cn(
                          "inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-all",
                          active
                            ? "border-[#FBE90A] bg-[#FBE90A] text-[#060608] shadow-sm"
                            : "border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:border-[#FBE90A]/60 hover:text-[var(--text-primary)]"
                        )}
                      >
                        {catId !== "all" && (
                          <span
                            className="h-2.5 w-2.5 rounded-full border border-black/25"
                            style={{ backgroundColor: sampleHex }}
                          />
                        )}
                        <span>{dict.categories[catId]}</span>
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* 3. Professional Color Palette Grid (48 Curated Automotive Swatches) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-extrabold tracking-wide text-[var(--text-primary)] uppercase">
                  {dict.paletteLabel} ({visibleSwatches.length})
                </p>
              </div>

              <div className="grid max-h-[310px] grid-cols-2 gap-2.5 overflow-y-auto pe-1 sm:grid-cols-3">
                {visibleSwatches.map((swatch) => {
                  const selected =
                    !isCustomColor && selectedSwatchId === swatch.id;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() => handleSelectSwatch(swatch)}
                      className={cn(
                        "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border p-2 text-start transition-all duration-200",
                        selected
                          ? "border-2 border-[#FBE90A] bg-[var(--bg-canvas)] shadow-[0_6px_20px_rgba(251,233,10,0.18)]"
                          : "border-[var(--border-subtle)] bg-[var(--bg-canvas)]/70 hover:border-[#FBE90A]/60"
                      )}
                    >
                      <div
                        className="relative h-11 w-full overflow-hidden rounded-xl border border-black/15"
                        style={{ backgroundColor: swatch.hex }}
                      >
                        <span
                          className={cn(
                            "pointer-events-none absolute inset-0",
                            getSwatchFinishOverlay(finish)
                          )}
                        />
                        {selected && (
                          <span className="absolute top-1.5 end-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#FBE90A] text-[#060608] shadow">
                            <Check className="h-3 w-3 stroke-[3]" />
                          </span>
                        )}
                      </div>

                      <p className="mt-2 truncate text-xs font-bold text-[var(--text-primary)]">
                        {swatch.name[locale]}
                      </p>
                      <p
                        dir="ltr"
                        className="font-mono text-[10px] font-semibold text-[var(--text-muted)]"
                      >
                        {swatch.hex}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Custom HEX / RGB Color Picker */}
            <div className="space-y-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-4">
              <p className="text-xs font-extrabold text-[var(--text-primary)]">
                {dict.customColorLabel}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <label className="relative flex h-11 w-14 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-[#FBE90A] shadow-sm">
                  <input
                    type="color"
                    aria-label={dict.customColorLabel}
                    value={isValidHexColor(activeHex) ? activeHex : "#C81422"}
                    onChange={(e) => handleCustomPickerChange(e.target.value)}
                    className="absolute -inset-2 h-16 w-20 cursor-pointer border-0 p-0"
                  />
                </label>

                <div className="min-w-[110px] flex-1">
                  <label className="sr-only" htmlFor="ib-custom-hex">
                    {dict.hexInputLabel}
                  </label>
                  <input
                    id="ib-custom-hex"
                    type="text"
                    dir="ltr"
                    maxLength={7}
                    value={hexInputText}
                    onChange={(e) => handleHexTextChange(e.target.value)}
                    className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-2.5 font-mono text-xs font-bold text-[var(--text-primary)] uppercase focus:border-[#FBE90A] focus:outline-none"
                  />
                </div>

                <div
                  dir="ltr"
                  className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-2.5 font-mono text-[11px] font-semibold text-[var(--text-secondary)]"
                >
                  R:{activeRgb.r} G:{activeRgb.g} B:{activeRgb.b}
                </div>
              </div>
            </div>

            {/* 5. Optional Vehicle Make / Model Input + Saudi Popular Models Quick Chips */}
            <div className="space-y-2.5 border-t border-[var(--border-subtle)] pt-4">
              <label
                htmlFor="ib-studio-vehicle"
                className="block text-xs font-bold text-[var(--text-primary)]"
              >
                {dict.vehicleInputLabel}
              </label>
              <input
                id="ib-studio-vehicle"
                type="text"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                placeholder="اكتب نوع وموديل سيارتك..."
                className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-3.5 py-2.5 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#FBE90A] focus:outline-none sm:text-sm"
              />
            </div>

            {/* 6. Primary Request Service / WhatsApp CTA */}
            <a
              href={buildWhatsAppUrl(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#FBE90A] px-6 py-4 text-xs font-extrabold tracking-wide text-[#060608] uppercase shadow-[0_12px_32px_rgba(251,233,10,0.28)] transition-all duration-300 hover:bg-[#fff033] hover:shadow-[0_16px_40px_rgba(251,233,10,0.4)] sm:text-sm"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span>{dict.ctaWhatsapp}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
