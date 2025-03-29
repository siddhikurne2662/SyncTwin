import * as THREE from "three";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://fsmlidqdqrmagovqmdat.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzbWxpZHFkcXJtYWdvdnFtZGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNDgwMzEsImV4cCI6MjA1ODYyNDAzMX0.eoJIfk3oEevwOg5yDhkJhVWyHIPu3Op3NX_jgruoIIE");

let lastPosition = { x: 0, y: 0, z: 0 };
let lastUpdateTime = 0;
let carModel = null; // Ensure it's declared at the top


function lerp(start, end, t) {
    return start + (end - start) * t;
}


function update3DModel(data) {
    if (!carModel) return;

    let now = performance.now();
    let deltaTime = (now - lastUpdateTime) / 1000; // Convert to seconds
    if (deltaTime < 0.1) return; // Throttle updates to avoid excessive changes
    lastUpdateTime = now;

    // **Check if the new position is significantly different before updating**
    if (
        Math.abs(data.ultrasonic_front * 0.01 - lastPosition.x) < 0.02 &&
        Math.abs(data.ultrasonic_rear * 0.01 - lastPosition.y) < 0.02
    ) {
        return; // Ignore minor changes to avoid jitter
    }

    // Smooth movement
    carModel.position.x = lerp(carModel.position.x, data.ultrasonic_front * 0.01, deltaTime);
    carModel.position.y = lerp(carModel.position.y, data.ultrasonic_rear * 0.01, deltaTime);

    // Update last position
    lastPosition = {
        x: carModel.position.x,
        y: carModel.position.y,
        z: carModel.rotation.z
    };

    // Change color if too close to an obstacle
    carModel.material.color.set(data.ultrasonic_front < 10 ? 0xff0000 : 0x00ff00);
}

// Subscribe to real-time updates with throttling
supabase
    .channel("vehicle_data")
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "vehicle_data" }, (payload) => {
        console.log("📡 New Data:", payload.new);
        requestAnimationFrame(() => update3DModel(payload.new)); // Smoother updates
    })
    .subscribe();
