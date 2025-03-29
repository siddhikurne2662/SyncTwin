// import React, { useState, useEffect, useMemo } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF } from "@react-three/drei";
// import { createClient } from "@supabase/supabase-js";

// // ✅ Secure Supabase Client Initialization
// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_ANON_KEY
// );

// function Model({ position, rotation, distance }) {
//   const { scene } = useGLTF("/car_model.glb");

//   // ✅ Memoized model to prevent unnecessary re-renders
//   const memoizedScene = useMemo(() => scene.clone(), [scene]);

//   useEffect(() => {
//     if (!memoizedScene) return;

//     let carModel = memoizedScene.getObjectByName("Car");
//     if (!carModel) return;

//     // ✅ Update position and rotation smoothly
//     carModel.position.set(...position);
//     carModel.rotation.set(...rotation);

//     // ✅ Change car color based on obstacle distance
//     memoizedScene.traverse((child) => {
//       if (child.isMesh) {
//         child.material.color.set(distance < 10 ? 0xff0000 : 0x00ff00);
//       }
//     });

//   }, [position, rotation, distance, memoizedScene]);

//   return <primitive object={memoizedScene} scale={[3, 3, 3]} />;
// }

// export default function ThreeDModel() {
//   const [position, setPosition] = useState([0, 0, 0]);
//   const [velocity, setVelocity] = useState([0, 0, 0]);
//   const [rotation, setRotation] = useState([0, 0, 0]);
//   const [distance, setDistance] = useState(100); // Default distance

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data, error } = await supabase
//           .from("vehicle_status")
//           .select("*")
//           .order("created_at", { ascending: false })
//           .limit(1);

//         if (error) throw error;
//         if (data.length > 0) {
//           const latestData = data[0];

//           // ✅ Update velocity with gradual slowdown
//           setVelocity((prevVelocity) => [
//             prevVelocity[0] * 0.95 + latestData.imu_acceleration_x * 0.05,
//             prevVelocity[1] * 0.95 + latestData.imu_acceleration_y * 0.05,
//             prevVelocity[2] * 0.95 + latestData.imu_acceleration_z * 0.05,
//           ]);

//           // ✅ Update rotation based on gyroscope data
//           setRotation([
//             latestData.imu_gyro_x * 0.1,
//             latestData.imu_gyro_y * 0.1,
//             latestData.imu_gyro_z * 0.1,
//           ]);

//           // ✅ Update distance (used for color change)
//           setDistance(latestData.ultrasonic_distance);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 2000); // ✅ Reduced API calls for efficiency
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     // ✅ Update position based on velocity
//     setPosition((prevPos) => [
//       prevPos[0] + velocity[0],
//       prevPos[1] + velocity[1],
//       prevPos[2] + velocity[2],
//     ]);
//   }, [velocity]);

//   return (
//     <Canvas camera={{ position: [0, 5, 15], fov: 50 }} style={{ width: "100%", height: "500px", background: "#f0f0f0" }}>
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[5, 5, 5]} intensity={1} />
//       <Model position={position} rotation={rotation} distance={distance} />
//       <OrbitControls enableDamping dampingFactor={0.1} />
//     </Canvas>
//   );
// }


import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

const ThreeDModel = ({ position, rotationSpeed }) => {
    const gltf = useLoader(GLTFLoader, '/model.glb');
    const carRef = useRef();
    const wheelRefs = useRef({});

    useEffect(() => {
        if (gltf.scene) {
            gltf.scene.traverse((child) => {
                if (child.isMesh || child.isObject3D) {
                    // Check if the name matches any wheel parts
                    if ([
                        'Wheel_joint_Back_L', 'Wheel_joint_Back_R', 
                        'Wheel_joint_Front_L', 'Wheel_joint_Front_R'
                    ].includes(child.name)) {
                        wheelRefs.current[child.name] = child;
                    }
                }
            });
        }
    }, [gltf]);

    useFrame(() => {
        // Rotate only wheels, keep car steady
        Object.values(wheelRefs.current).forEach((wheel) => {
            if (wheel) {
                wheel.rotation.x -= rotationSpeed; // Adjust rotation if needed
            }
        });
    });

    return <primitive object={gltf.scene} ref={carRef} position={position} />;
};

export default ThreeDModel;
