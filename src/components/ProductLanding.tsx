// import { Camera, ZoomIn } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import * as THREE from "three";

// interface ThreeRefs {
//   renderer: THREE.WebGLRenderer | null;
//   scene: THREE.Scene | null;
//   camera: THREE.PerspectiveCamera | null;
// }

// const WebXRProductViewer: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const [isXRSupported, setIsXRSupported] = useState<boolean>(false);
//   const [isInAR, setIsInAR] = useState<boolean>(false);

//   // Use ThreeRefs interface for the refs
//   const threeRefs = useRef<ThreeRefs>({
//     renderer: null,
//     scene: null,
//     camera: null,
//   });

//   // Create a reference to the lamp
//   const lampRef = useRef<THREE.Group | null>(null);

//   useEffect(() => {
//     if ("xr" in navigator) {
//       navigator.xr
//         ?.isSessionSupported("immersive-ar")
//         .then((supported: boolean) => setIsXRSupported(supported));
//     }

//     // Set up Three.js scene
//     threeRefs.current.scene = new THREE.Scene();
//     threeRefs.current.camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     threeRefs.current.renderer = new THREE.WebGLRenderer({
//       antialias: true,
//       alpha: true,
//     });

//     const { renderer, scene, camera } = threeRefs.current;

//     if (!renderer || !scene || !camera || !containerRef.current) return;

//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     containerRef.current.appendChild(renderer.domElement);

//     // Add lighting
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//     directionalLight.position.set(0, 5, 5);
//     scene.add(directionalLight);

//     // Create a simple product model (lamp)
//     const lampBase = new THREE.CylinderGeometry(0.2, 0.3, 0.1, 32);
//     const lampPole = new THREE.CylinderGeometry(0.03, 0.03, 1, 16);
//     const lampHead = new THREE.SphereGeometry(0.15, 32, 32);

//     const material = new THREE.MeshPhongMaterial({ color: 0x404040 });

//     const base = new THREE.Mesh(lampBase, material);
//     const pole = new THREE.Mesh(lampPole, material);
//     const head = new THREE.Mesh(lampHead, material);

//     pole.position.y = 0.5;
//     head.position.y = 1;

//     const lamp = new THREE.Group();
//     lamp.add(base);
//     lamp.add(pole);
//     lamp.add(head);

//     scene.add(lamp);
//     lampRef.current = lamp; // Store the lamp reference

//     // Position camera
//     camera.position.z = 2;

//     // Animation loop
//     const animate = (): void => {
//       requestAnimationFrame(animate);
//       if (lampRef.current) {
//         lampRef.current.rotation.y += 0.005; // Rotate the lamp
//       }
//       renderer.render(scene, camera);
//     };

//     // Handle window resize
//     const handleResize = (): void => {
//       if (!camera || !renderer) return;
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };

//     window.addEventListener("resize", handleResize);
//     animate();

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       if (containerRef.current && renderer) {
//         containerRef.current.removeChild(renderer.domElement);
//         renderer.dispose();
//       }
//     };
//   }, []);

//   const startAR = async (): Promise<void> => {
//     const { renderer } = threeRefs.current;
//     if (!renderer || !navigator.xr) return;

//     try {
//       const session = await navigator.xr.requestSession("immersive-ar", {
//         requiredFeatures: ["hit-test"],
//         optionalFeatures: ["dom-overlay"],
//       });

//       renderer.xr.enabled = true;
//       renderer.xr.setReferenceSpaceType("local");
//       await renderer.xr.setSession(session);

//       setIsInAR(true);

//       // Hit-test logic to update model position based on real-world space
//       const hitTestSource = await session.requestHitTestSource({
//         space: renderer.xr.getReferenceSpace(),
//       });

//       session.requestAnimationFrame((time, frame) => {
//         const hitTestResults = hitTestSource.getHitTestResults(frame);
//         if (hitTestResults.length > 0) {
//           // Update the model's position with the hit test results
//           const hit = hitTestResults[0];
//           if (lampRef.current) {
//             lampRef.current.position.set(
//               hit.pose.position.x,
//               hit.pose.position.y,
//               hit.pose.position.z
//             );
//           }
//         }

//         // Continue rendering in AR mode
//         renderer.render(scene, camera);
//       });

//       session.addEventListener("end", () => {
//         setIsInAR(false);
//         if (renderer) {
//           renderer.xr.setSession(null);
//         }
//       });
//     } catch (error) {
//       console.error("Error starting AR session:", error);
//     }
//   };

//   return (
//     <div className="relative min-h-screen">
//       <div ref={containerRef} className="absolute inset-0" />

//       {/* UI Overlay */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="max-w-7xl mx-auto px-4 py-8">
//           <div className="flex justify-between items-start">
//             <h1 className="text-2xl font-bold text-white shadow-sm">
//               AR Product Viewer
//             </h1>

//             {!isInAR && (
//               <div className="pointer-events-auto">
//                 <button
//                   onClick={startAR}
//                   disabled={!isXRSupported}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg
//                     ${
//                       isXRSupported
//                         ? "bg-blue-600 text-white hover:bg-blue-700"
//                         : "bg-gray-400 text-gray-200"
//                     }`}
//                 >
//                   <Camera className="w-5 h-5" />
//                   {isXRSupported ? "View in AR" : "AR Not Supported"}
//                 </button>
//               </div>
//             )}
//           </div>

//           {isInAR && (
//             <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 pointer-events-auto">
//               <button className="p-3 bg-white rounded-full shadow-lg">
//                 <ZoomIn className="w-6 h-6" />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WebXRProductViewer;
