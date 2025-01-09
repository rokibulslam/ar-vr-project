// import "@google/model-viewer";
// import React from "react";

// interface ModelViewerProps {
//   src: string; // Path to your .gltf model
//   alt: string;
//   ar?: boolean;
// }

// const ModelViewer: React.FC<ModelViewerProps> = ({ src, alt, ar = false }) => {
//   return (
//     <model-viewer
//       src={src}
//       alt={alt}
//       ar={ar}
//       ar-modes="webxr scene-viewer"
//       camera-controls
//       shadow-intensity="1"
//       style={{
//         width: "100%",
//         height: "500px",
//       }}
//     ></model-viewer>
//   );
// };

// export default ModelViewer;
import "@google/model-viewer";
import React, { useEffect, useRef } from "react";

interface ModelViewerProps {
  src: string; // Path to your .gltf model
  alt: string;
  ar?: boolean;
  color?: string; // Optional: Initial color
}

const ModelViewer: React.FC<ModelViewerProps> = ({
  src,
  alt,
  ar = false,
  color,
}) => {
  const modelViewerRef = useRef<any>(null);

  // Update material color dynamically
  const updateColor = (newColor: string) => {
    const modelViewer = modelViewerRef.current;
    if (modelViewer && modelViewer.model) {
      const [r, g, b, a] = newColor.split(",").map(Number); // Parse RGBA color
      const baseColor = [r, g, b, a];
      modelViewer.model.materials.forEach((material: any) => {
        material.pbrMetallicRoughness.setBaseColorFactor(baseColor);
      });
    }
  };

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
      camera-controls
      shadow-intensity="1"
      // exposure="1"
      style={{
        width: "100%",
        height: "500px",
      }}
    ></model-viewer>
  );
};

export default ModelViewer;
