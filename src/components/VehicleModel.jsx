import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { supabase } from "../assets/supabase";

const Vehicle = () => {
  const modelRef = useRef();
  const { scene } = useGLTF("/model.glb"); // Load 3D model
  
  const [vehicleData, setVehicleData] = useState({
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    wheelSpeed: 0,
    steeringAngle: 0,
    viewDirection: "front",
    obstacleDistance: 100,
  });

  // Subscribe to real-time data
  useEffect(() => {
    const channel = supabase
      .channel("vehicle_status_updates")
      .on("postgres_changes", { event: "*", schema: "public", table: "vehicle_status" }, (payload) => {
        const data = payload.new;
        setVehicleData({
          position: [data.position_x, data.position_y, data.position_z],
          rotation: [
            (data.imu_pitch * Math.PI) / 180, // Convert to radians
            (data.imu_yaw * Math.PI) / 180,
            (data.imu_roll * Math.PI) / 180,
          ],
          wheelSpeed: data.wheel_speed,
          steeringAngle: (data.steering_angle * Math.PI) / 180,
          viewDirection: data.view_direction,
          obstacleDistance: data.obstacle_distance,
        });
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // Apply transformations to the model
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.position.set(...vehicleData.position);
      modelRef.current.rotation.set(...vehicleData.rotation);
      
      // Apply steering rotation
      const steeringWheel = modelRef.current.getObjectByName("steering_wheel");
      if (steeringWheel) steeringWheel.rotation.y = vehicleData.steeringAngle;
      
      // Apply wheel movement
      const wheels = ["front_left_wheel", "front_right_wheel", "rear_left_wheel", "rear_right_wheel"];
      wheels.forEach((wheelName) => {
        const wheel = modelRef.current.getObjectByName(wheelName);
        if (wheel) wheel.rotation.x += vehicleData.wheelSpeed * 0.01;
      });
    }
  });

  return <primitive ref={modelRef} object={scene} scale={0.5} />;
};

const VehicleModel = () => (
  <Canvas camera={{ position: [0, 2, 5] }}>
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 5]} intensity={1} />
    <Vehicle />
    <OrbitControls />
  </Canvas>
);

export default VehicleModel;
