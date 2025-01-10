import "@google/model-viewer";
import React, { useEffect, useRef } from "react";

interface ModelViewerElement extends HTMLElement {
  model?: {
    materials: {
      pbrMetallicRoughness: {
        setBaseColorFactor: (color: [number, number, number, number]) => void;
        setMetallicFactor: (metallic: number) => void;
        setRoughnessFactor: (roughness: number) => void;
      };
    }[];
  };
}

interface ModelViewerProps {
  src: string;
  alt: string;
  ar?: boolean;
  color?: string;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({
  src,
  alt,
  ar = false,
  color,
}) => {
  const modelViewerRef = useRef<ModelViewerElement>(null);

  const updateColor = (newColor: string) => {
    if (modelViewerRef.current?.model?.materials) {
      const [r, g, b, a] = newColor.split(",").map(Number); // Parse RGBA values
      const baseColor: [number, number, number, number] = [r, g, b, a];
      modelViewerRef.current.model.materials.forEach((material) => {
        material.pbrMetallicRoughness.setBaseColorFactor(baseColor);
      });
    }
  };

  // Apply the color when the component mounts or the `color` prop changes
  useEffect(() => {
    if (color) {
      updateColor(color);
    }
  }, [color]);

  return (
    <model-viewer
      ref={modelViewerRef}
      src={src}
      alt={alt}
      ar={ar}
      ar-modes="webxr scene-viewer"
      poster="/src/assets/3d.jpg"
      camera-controls
      shadow-intensity="1"
      style={{
        width: "100%",
        height: "500px",
      }}
    ></model-viewer>
  );
};
