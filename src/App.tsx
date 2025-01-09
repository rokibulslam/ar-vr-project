// import React from "react";
// import ModelViewer from "./components/ModelViewer";

// const App: React.FC = () => {
//   return (
//     <div>
//       <h1>3D Model Viewer with AR</h1>
//       <ModelViewer
//         src="/scene.gltf" // Path to your .gltf model
//         alt="A sample 3D model"
//         ar={true} // Enables AR viewing
//       />
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import ModelViewer from "./components/ModelViewer";

const App: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>("1, 0, 0, 1"); // Default to red

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div>
      <h1>3D Model Viewer with AR</h1>
      <ModelViewer
        src="/scene.gltf" // Path to your .gltf model
        alt="A sample 3D model"
        ar={true}
        color={selectedColor}
      />
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => handleColorChange("1, 0, 0, 1")}>Red</button>
        <button onClick={() => handleColorChange("0, 1, 0, 1")}>Green</button>
        <button onClick={() => handleColorChange("0, 0, 1, 1")}>Blue</button>
        <button onClick={() => handleColorChange("1, 1, 0, 1")}>Yellow</button>
      </div>
    </div>
  );
};

export default App;
