// import React, { Suspense, useEffect, useRef, useState } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, Stats, Environment, useGLTF } from "@react-three/drei";
// import { createClient } from "@supabase/supabase-js";
// import { MeshStandardMaterial } from "three";


// const SUPABASE_URL = "https://fsmlidqdqrmagovqmdat.supabase.co";
// const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzbWxpZHFkcXJtYWdvdnFtZGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNDgwMzEsImV4cCI6MjA1ODYyNDAzMX0.eoJIfk3oEevwOg5yDhkJhVWyHIPu3Op3NX_jgruoIIE";
// const supabase = createClient(SUPABASE_URL, API_KEY);

// // function Model({ data }) {
// //     const { scene } = useGLTF("/model.glb");
// //     const modelRef = useRef();
// //     const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });

// //     const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

// //     useFrame(() => {
// //         if (modelRef.current && data) {
// //             const { imu_gyro_x, imu_gyro_y, imu_gyro_z, imu_acceleration_x, imu_acceleration_y, imu_acceleration_z, ultrasonic_distance } = data;

// //             modelRef.current.rotation.x += (clamp(imu_gyro_x * 0.1, -0.1, 0.1) - modelRef.current.rotation.x) * 0.1;
// //             modelRef.current.rotation.y += (clamp(imu_gyro_y * 0.1, -0.1, 0.1) - modelRef.current.rotation.y) * 0.1;
// //             modelRef.current.rotation.z += (clamp(imu_gyro_z * 0.1, -0.1, 0.1) - modelRef.current.rotation.z) * 0.1;

// //             setVelocity(prev => ({
// //                 x: prev.x * 0.9 + imu_acceleration_x * 0.05,
// //                 y: prev.y * 0.9 + imu_acceleration_y * 0.02,
// //                 z: prev.z * 0.9 + imu_acceleration_z * 0.05,
// //             }));

// //             modelRef.current.position.x += velocity.x;
// //             modelRef.current.position.y = Math.max(-0.1, modelRef.current.position.y + velocity.y);
// //             modelRef.current.position.z += velocity.z;

// //             if (Math.abs(imu_acceleration_x) < 0.01 && Math.abs(imu_acceleration_y) < 0.01 && Math.abs(imu_acceleration_z) < 0.01) {
// //                 setVelocity({ x: 0, y: 0, z: 0 });
// //             }

// //             modelRef.current.traverse((child) => {
// //                 if (child.isMesh) {
// //                     child.material.color.set(ultrasonic_distance < 10 ? 0xff0000 : 0x00ff00);
// //                 }
// //             });
// //         }
// //     });

// //     return <primitive object={scene} ref={modelRef} scale={[3, 3, 3]} position={[-0.5, -0.3, 0]} rotation={[0.1, -0.3, 0]} />;
// // }
// // eslint-disable-next-line no-unused-vars
// function Model({ data }) {
//     const { scene } = useGLTF("/model.glb");
//     const modelRef = useRef();

//     useEffect(() => {
//         if (modelRef.current) {
//             modelRef.current.wheels = {
//                 backLeft: modelRef.current.getObjectByName("Wheel_joint_Back_L"),
//                 backRight: modelRef.current.getObjectByName("Wheel_joint_Back_R"),
//                 frontLeft: modelRef.current.getObjectByName("Wheel_joint_Front_L"),
//                 frontRight: modelRef.current.getObjectByName("Wheel_joint_Front_R"),
//             };
    
// // Apply decent color to the car
// modelRef.current.traverse((child) => {
//     if (child.isMesh) {
//         child.material = new MeshStandardMaterial({ 
//             color: "#1565C0",  // Deep Blue
//             metalness: 0.6, 
//             roughness: 0.4 
//         });
//     }
// });        }
//     }, []);
    

//     useFrame(() => {
//         if (modelRef.current) {
//             // Keep car steady
//             modelRef.current.position.set(-0.5, -0.3, 0);
//             modelRef.current.rotation.set(0, -Math.PI / 2, 0); // Side view
    
//             // Rotate wheels forward
//             const wheelSpeed = 0.1; // Adjust speed if needed
//             if (modelRef.current.wheels) {
//                 Object.values(modelRef.current.wheels).forEach((wheel) => {
//                     if (wheel) wheel.rotation.x += wheelSpeed; // Forward movement
//                 });
//             }
//         }
//     });
    

//     return <primitive object={scene} ref={modelRef} scale={[3, 3, 3]} />;
// }

// function App() {
//     const [data, setData] = useState(null);

//     async function fetchData() {
//         try {
//             let { data, error } = await supabase
//                 .from("vehicle_status")
//                 .select("*")
//                 .order("created_at", { ascending: false })
//                 .limit(1)
//                 .single();

//             if (error) throw error;
//             setData(data);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     }

//     useEffect(() => {
//         fetchData();
//         const channel = supabase
//             .channel("vehicle_status_updates")
//             .on("postgres_changes", { event: "INSERT", schema: "public", table: "vehicle_status" }, (payload) => {
//                 console.log("📡 New Data:", payload.new);
//                 setData(payload.new);
//             })
//             .subscribe();

//         return () => {
//             supabase.removeChannel(channel);
//         };
//     }, []);

//     return (
//         <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#1a1a1a' }}>
//             <Canvas camera={{ position: [12, 100, 200], fov: 50 }} style={{ width: '100%', height: '500px', background: '#f0f0f0' }}>
//                 <ambientLight intensity={0.5} />
//                 <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
//                 <pointLight position={[10, 10, 10]} intensity={0.5} />
//                 <Environment preset="city" 
//                 />
//                 <Stats />
//                 <Suspense fallback={null}>
//                     <Model data={data} />
//                 </Suspense>
//                 <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
//                     <planeGeometry args={[50, 50]} />
//                     <meshStandardMaterial color="#734654" />
//                 </mesh>
//                 <OrbitControls enableRotate enableZoom enablePan rotateSpeed={1} zoomSpeed={0.8} panSpeed={0.8} dampingFactor={0.1} minDistance={2} maxDistance={15} />
//             </Canvas>
//         </div>
//     );
// }

// export default App;


import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stats, Environment, useGLTF } from "@react-three/drei";
import { createClient } from "@supabase/supabase-js";
import { MeshStandardMaterial } from "three";
import RealtimeSteering from "./components/RealtimeSteering";


const SUPABASE_URL = "https://fsmlidqdqrmagovqmdat.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzbWxpZHFkcXJtYWdvdnFtZGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNDgwMzEsImV4cCI6MjA1ODYyNDAzMX0.eoJIfk3oEevwOg5yDhkJhVWyHIPu3Op3NX_jgruoIIE";
const supabase = createClient(SUPABASE_URL, API_KEY);

function Model({ data }) {
    const { scene } = useGLTF("/model.glb");
    const modelRef = useRef();
    const [turnAngle, setTurnAngle] = useState(0);

    useEffect(() => {
        if (modelRef.current) {
            modelRef.current.wheels = {
                backLeft: modelRef.current.getObjectByName("Wheel_joint_Back_L"),
                backRight: modelRef.current.getObjectByName("Wheel_joint_Back_R"),
                frontLeft: modelRef.current.getObjectByName("Wheel_joint_Front_L"),
                frontRight: modelRef.current.getObjectByName("Wheel_joint_Front_R"),
            };

            modelRef.current.traverse((child) => {
                if (child.isMesh) {
                    child.material = new MeshStandardMaterial({ 
                        color: "#1565C0",  // Deep Blue
                        metalness: 0.6, 
                        roughness: 0.4 
                    });
                }
            });
        }
    }, []);

    useEffect(() => {
        if (data && "steering_angle" in data) {
            setTurnAngle((prev) => {
                let newAngle = prev * 0.9 + data.steering_angle * 0.1;
                return Math.max(-Math.PI / 6, Math.min(Math.PI / 6, newAngle)); // Limit turns
            });
        }89
    }, [data]);

    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.position.set(-0.5, -0.3, 0);
            modelRef.current.rotation.set(0, -Math.PI / 2 + turnAngle, 0); // Apply turn angle

            const wheelSpeed = 0.1; 
            if (modelRef.current.wheels) {
                Object.values(modelRef.current.wheels).forEach((wheel) => {
                    if (wheel) wheel.rotation.x += wheelSpeed;
                });
            }
        }
    });

    return <primitive object={scene} ref={modelRef} scale={[3, 3, 3]} />;
}

function App() {
    const [data, setData] = useState(null);

    async function fetchData() {
        try {
            let { data, error } = await supabase
                .from("vehicle_status")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(1)
                .single();

            if (error) throw error;
            setData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchData();
        const channel = supabase
            .channel("vehicle_status_updates")
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "vehicle_status" }, (payload) => {
                console.log("📡 New Data:", payload.new);
                setData(payload.new);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#1a1a1a' }}>
            <Canvas camera={{ position: [12, 100, 200], fov: 50 }} style={{ width: '100%', height: '500px', background: '#f0f0f0' }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                <pointLight position={[10, 10, 10]} intensity={0.5} />
                <Environment preset="city" />
                <Stats />
                <Suspense fallback={null}>
                    <Model data={data} />
                </Suspense>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
                    <planeGeometry args={[50, 50]} />
                    <meshStandardMaterial color="#2b9348" />
                </mesh>
                <OrbitControls enableRotate enableZoom enablePan rotateSpeed={1} zoomSpeed={0.8} panSpeed={0.8} dampingFactor={0.1} minDistance={2} maxDistance={15} />
            </Canvas>
        </div>
    );
}

export default App;
