import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://fsmlidqdqrmagovqmdat.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzbWxpZHFkcXJtYWdvdnFtZGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNDgwMzEsImV4cCI6MjA1ODYyNDAzMX0.eoJIfk3oEevwOg5yDhkJhVWyHIPu3Op3NX_jgruoIIE"
);

export default function RealtimeSteering() {
  const [steeringData, setSteeringData] = useState([]);

  useEffect(() => {
    const channel = supabase
      .channel("realtime:vehicle_status")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "vehicle_status" },
        (payload) => {
          setSteeringData((prev) => [payload.new, ...prev.slice(0, 9)]); // Keep last 10 entries
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div>
      <h2>Steering Angle Updates</h2>
      <ul>
        {steeringData.map((data, index) => (
          <li key={index}>
            Steering Angle: {data.steering_angle}° | Distance: {data.ultrasonic_distance} cm
          </li>
        ))}
      </ul>
    </div>
  );
}
