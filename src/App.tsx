import React, { useState } from "react";
import apeiro from "./assets/Apeiro-Logo-768x296.png";
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
    <div className="w-screen h-full">
      <div className="flex justify-center">
        <img src={apeiro} width={300} height={200} alt="" />
      </div>
      <h1 className="text-center my-10 text-3xl font-serif font-bold">
        3D Model Viewer with AR
      </h1>
      <div className="grid grid-cols-1 w-full ">
        <div className="w-full md:grid grid-cols-12 ">
          <div className="col-span-8">
            <ModelViewer
              src="chair/scene.gltf" // Path to your .gltf model
              alt="A sample 3D model"
              ar={true}
              color={selectedColorChair}
            />
          </div>

          <div className="ml-5 md:ml-0 col-span-4  flex flex-col space-y-5 justify-center ">
            <p className="pb-5 font-bold">Colors</p>
            <div className="flex  items-center w-full">
              <button
                className="bg-[#738973] text-black px-4 py-1 rounded-full mr-2 w-[50px] h-[50px]"
                onClick={() => handleColorChangeChair("0.6, 0.6, 0.6, 1")}
              ></button>
              <button
                className="bg-[#393939] text-black px-4 py-1 rounded-full mr-2 w-[50px] h-[50px]"
                onClick={() => handleColorChangeChair("0.3, 0.3, 0.3, 1")}
              ></button>
              <button
                className="bg-[#5E4E39]  text-black px-4 py-1 rounded-full mr-2 w-[50px] h-[50px]"
                onClick={() => handleColorChangeChair("0.7, 0.5, 0.3, 1")}
              ></button>
              <button
                className="bg-[#667B66]  text-black px-4 py-1 rounded-full mr-2 w-[50px] h-[50px]"
                onClick={() => handleColorChangeChair("0.7, 1, 0.7, 1")}
              ></button>
            </div>
            <p className="font-bold">Size</p>
            <div className="flex  items-center w-full">
              <div>
                <button className=" text-gray-700 rounded-[100%] mr-2 text-center px-3 py-1 shadow-md shadow-gray-500">
                  S
                </button>
              </div>
              <div>
                <button className="bg-black text-gray-100 rounded-[100%] mr-2 text-center px-2 py-1 shadow-md shadow-gray-500 ">
                  M
                </button>
              </div>
              <div>
                <button className="bg-black text-gray-100 rounded-[100%] mr-2 text-center px-3 py-1 shadow-md shadow-gray-500 ">
                  X
                </button>
              </div>
              <div>
                <button className="bg-black text-gray-100 rounded-[100%] mr-2 text-center px-2 py-1 shadow-md shadow-gray-500 ">
                  XL
                </button>
              </div>
            </div>
            <p className="pb-5 font-bold">
              price: <span className="text-xl text-red-600 ml-3">$100</span>
            </p>
          </div>
        </div>
        <div className="w-full md:grid grid-cols-12 ">
          <div className="col-span-8">
            <ModelViewer
              src="/scene.gltf"
              alt="A sample 3D model"
              ar={true}
              color={selectedColor}
            />
          </div>

          <div className="ml-5 md:ml-0 col-span-4  flex flex-col space-y-5 justify-center ">
            <p className="pb-5 font-bold">Colors</p>
            <div className="flex  items-center w-full">
              <button
                className="bg-[#469DAD] text-black px-4 py-1 rounded-full mr-2 w-[50px] h-[50px]"
                onClick={() => handleColorChange("0.6, 0.8, 1, 1")}
              ></button>
              <button
                className="bg-[#68A5AE] text-black px-4 py-1 rounded-full mr-2 w-[50px] h-[50px]"
                onClick={() => handleColorChange("1, 0.8, 0.9, 1")}
              ></button>
              <button
                className="bg-[#6FCBA7]  text-black px-4 py-1 rounded-full mr-2 w-[50px] h-[50px]"
                onClick={() => handleColorChange("0.7, 1, 0.7, 1")}
              ></button>
              <button
                className="bg-[#608762]  text-black px-4 py-1 rounded-full mr-2 w-[50px] h-[50px]"
                onClick={() => handleColorChange("1, 1, 0.8, 1")}
              ></button>
            </div>
            <p className="font-bold">Size</p>
            <div className="flex  items-center w-full">
              <div>
                <button className=" text-gray-700 rounded-[100%] mr-2 text-center px-3 py-1 shadow-md shadow-gray-500">
                  S
                </button>
              </div>
              <div>
                <button className="bg-black text-gray-100 rounded-[100%] mr-2 text-center px-2 py-1 shadow-md shadow-gray-500 ">
                  M
                </button>
              </div>
              <div>
                <button className="bg-black text-gray-100 rounded-[100%] mr-2 text-center px-3 py-1 shadow-md shadow-gray-500 ">
                  X
                </button>
              </div>
              <div>
                <button className="bg-black text-gray-100 rounded-[100%] mr-2 text-center px-2 py-1 shadow-md shadow-gray-500 ">
                  XL
                </button>
              </div>
            </div>
            <p className="pb-5 font-bold">
              price: <span className="text-xl text-red-600 ml-3">$100</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
