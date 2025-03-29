import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { createClient } from "@supabase/supabase-js";
import "chart.js/auto";

const supabase = createClient(
  "https://fsmlidqdqrmagovqmdat.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzbWxpZHFkcXJtYWdvdnFtZGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNDgwMzEsImV4cCI6MjA1ODYyNDAzMX0.eoJIfk3oEevwOg5yDhkJhVWyHIPu3Op3NX_jgruoIIE"
);

export default function DataGraph() {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("vehicle_status").select("*").order("id", { ascending: false }).limit(10);
      if (data) {
        setSensorData(data.reverse());
      }
    };
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Live Sensor Data</h2>
      <Line
        data={{
          labels: sensorData.map((d) => d.id),
          datasets: [
            {
              label: "IMU Acceleration X",
              data: sensorData.map((d) => d.imu_acceleration_x),
              borderColor: "blue",
              fill: false,
            },
            {
              label: "IMU Acceleration Y",
              data: sensorData.map((d) => d.imu_acceleration_y),
              borderColor: "red",
              fill: false,
            },
          ],
        }}
      />
    </div>
  );
}
