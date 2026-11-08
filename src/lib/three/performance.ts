import * as THREE from "three";

/**
 * Safely disposes cloned geometries, materials, and non-shared textures
 * inside a Three.js Object3D subtree to prevent WebGL memory leaks.
 */
export function disposeObject3DResources(
  root: THREE.Object3D | null | undefined,
  preserveSharedTextures = true
): void {
  if (!root) return;

  root.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (mesh.isMesh) {
      if (mesh.geometry && mesh.userData?.ownsGeometry) {
        mesh.geometry.dispose();
      }

      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : mesh.material
          ? [mesh.material]
          : [];

      for (const mat of materials) {
        if (!mat) continue;
        if (!preserveSharedTextures) {
          for (const value of Object.values(mat)) {
            if (value && (value as THREE.Texture).isTexture) {
              (value as THREE.Texture).dispose();
            }
          }
        }
        mat.dispose();
      }
    }
  });
}

