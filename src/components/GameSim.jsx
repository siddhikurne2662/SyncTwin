import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://fsmlidqdqrmagovqmdat.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzbWxpZHFkcXJtYWdvdnFtZGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNDgwMzEsImV4cCI6MjA1ODYyNDAzMX0.eoJIfk3oEevwOg5yDhkJhVWyHIPu3Op3NX_jgruoIIE"
);

export default function GameSim() {
  const [carPosition, setCarPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("vehicle_status").select("*").order("id", { ascending: false }).limit(1);
      if (data && data.length > 0) {
        const accelX = data[0].imu_acceleration_x * 10;
        const accelY = data[0].imu_acceleration_y * 10;

        setVelocity((prev) => ({
          x: prev.x * 0.9 + accelX, // Apply friction (0.9 reduces speed over time)
          y: prev.y * 0.9 + accelY,
        }));
      }
    };
    
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCarPosition((prev) => ({
      x: prev.x + velocity.x,
      y: prev.y + velocity.y,
    }));
  }, [velocity]);

  return (
    <div style={{ width: "400px", height: "400px", background: "#ddd", position: "relative" }}>
      <div
        style={{
          width: "50px",
          height: "30px",
          background: "red",
          position: "absolute",
          left: `${carPosition.x + 200}px`,
          top: `${carPosition.y + 200}px`,
          transition: "0.5s",
        }}
      />
    </div>
  );
}
