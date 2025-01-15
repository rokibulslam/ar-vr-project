import "@google/model-viewer";
import React, { useEffect, useRef, useState } from "react";

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
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

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

  // Handle progress and load events
  useEffect(() => {
    const modelViewer = modelViewerRef.current;

    if (!modelViewer) return;

    const handleProgress = (event: any) => {
      if (event.detail && event.detail.totalProgress) {
        const progress = Math.round(event.detail.totalProgress * 100);
        setLoadingProgress(progress);
      }
    };

    const handleLoad = () => {
      setLoadingProgress(100);
      setIsLoaded(true);
    };

    // Add event listeners
    modelViewer.addEventListener("progress", handleProgress);
    modelViewer.addEventListener("load", handleLoad);

    // Cleanup event listeners on unmount
    return () => {
      modelViewer.removeEventListener("progress", handleProgress);
      modelViewer.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div className="relative w-full h-500px">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
          <div className="w-3/4">
            <div className="text-center mb-4">Loading Model...</div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <div className="text-center mt-2">{loadingProgress}%</div>
          </div>
        </div>
      )}
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
    </div>
  );
};
