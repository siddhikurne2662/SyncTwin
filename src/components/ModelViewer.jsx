import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useLoader } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { supabase } from '../supabaseClient'; // Import Supabase client

function Model({ sensorData }) {
  const obj = useLoader(OBJLoader, '/model.obj');
  const modelRef = useRef();

  useEffect(() => {
    obj.geometry?.center();  // Center the model
    obj.scale.set(1.5, 1.5, 1.5);
    obj.position.set(0, -1, 0);
  }, [obj]);

  useFrame(() => {
    if (modelRef.current && sensorData) {
      modelRef.current.rotation.x = sensorData.imu_gyro_x * 0.1;
      modelRef.current.rotation.y = sensorData.imu_gyro_y * 0.1;
      modelRef.current.rotation.z = sensorData.imu_gyro_z * 0.1;

      modelRef.current.position.x += sensorData.imu_acceleration_x * 0.01;
      modelRef.current.position.y += sensorData.imu_acceleration_y * 0.01;
      modelRef.current.position.z += sensorData.imu_acceleration_z * 0.01;

      modelRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(sensorData.ultrasonic_distance < 10 ? 0xff0000 : 0x00ff00);
        }
      });
    }
  });

  return <primitive object={obj} ref={modelRef} />;
}

function ModelViewer() {
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    const channel = supabase
      .channel('vehicle_updates') // Subscribe to changes
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'vehicle_status' },
        (payload) => {
          console.log('New Sensor Data:', payload.new);
          setSensorData(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 50 }}
      style={{ width: '100%', height: '500px', background: '#f0f0f0' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Model sensorData={sensorData} />
      </Suspense>
      <OrbitControls target={[0, 0, 0]} />
    </Canvas>
  );
}

export default ModelViewer;
