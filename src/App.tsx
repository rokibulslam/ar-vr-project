import React, { useState } from "react";
import { ModelViewer } from "./components/ModelViewer";

const App: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>("1, 0, 0, 1");
  const [selectedColorChair, setSelectedColorChair] =
    useState<string>("1, 0, 0, 1"); // Default to red

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };
  const handleColorChangeChair = (color: string) => {
    setSelectedColorChair(color);
  };

  return (
    <div className="w-screen">
      <h1 className="text-center my-10 text-3xl font-serif font-bold">
        3D Model Viewer with AR
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="w-full">
          <ModelViewer
            src="/scene.gltf" // Path to your .gltf model
            alt="A sample 3D model"
            ar={true}
            color={selectedColor}
          />
          <div className="w-full flex justify-center">
            <button
              className="bg-red-100 text-black px-4 py-1 rounded-md mr-2"
              onClick={() => handleColorChange("1, 0, 0, 1")}
            >
              Red
            </button>
            <button
              className="bg-green-100 text-black px-4 py-1 rounded-md mr-2"
              onClick={() => handleColorChange("0, 1, 0, 1")}
            >
              Green
            </button>
            <button
              className="bg-blue-100 text-black px-4 py-1 rounded-md mr-2"
              onClick={() => handleColorChange("0, 0, 1, 1")}
            >
              Blue
            </button>
            <button
              className="bg-yellow-100 text-black px-4 py-1 rounded-md mr-2"
              onClick={() => handleColorChange("1, 1, 0, 1")}
            >
              Yellow
            </button>
          </div>
        </div>
        <div className="w-full">
          <ModelViewer
            src="chair/scene.gltf" // Path to your .gltf model
            alt="A sample 3D model"
            ar={true}
            color={selectedColorChair}
          />
          <div className="w-full flex justify-center">
            <button
              className="bg-red-100 text-black px-4 py-1 rounded-md mr-2"
              onClick={() => handleColorChangeChair("1, 0, 0, 1")}
            >
              Red
            </button>
            <button
              className="bg-green-100 text-black px-4 py-1 rounded-md mr-2"
              onClick={() => handleColorChangeChair("0, 1, 0, 1")}
            >
              Green
            </button>
            <button
              className="bg-blue-100 text-black px-4 py-1 rounded-md mr-2"
              onClick={() => handleColorChangeChair("0, 0, 1, 1")}
            >
              Blue
            </button>
            <button
              className="bg-yellow-100 text-black px-4 py-1 rounded-md mr-2"
              onClick={() => handleColorChangeChair("1, 1, 0, 1")}
            >
              Yellow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
