## 🚗 Digital Twin for Autonomous Vehicle (ESP32 + React + Supabase)

This project demonstrates a **Digital Twin** model of an autonomous vehicle using **ESP32** for hardware integration and a **React + Vite + Three.js** stack for 3D visualization. Real-time sensor data (IMU and Ultrasonic) is transmitted to **Supabase** and visualized live in a browser using a 3D car model.

### 🧩 Project Overview:
- **Problem Statement:** Developing a Digital Twin for Autonomous Vehicle using ESP32.
- **Hardware:** A miniature car setup with ESP32, IMU, and ultrasonic sensors.
- **Data Flow:**
  - Sensor data sent from ESP32 to Supabase in real-time.
  - React web app fetches and displays this data using Three.js to control the model's motion, steering, and wheel dynamics.
- **Frontend:** React, Vite, Three.js, @react-three/fiber, @react-three/drei.
- **Backend/Data:** Supabase Realtime Database.
- **Visualization:** 3D car movement, steering angle changes, wheel rotation—all synced with real-time sensor input.

### 🛠️ Technologies Used:
- ESP32 (Hardware Microcontroller)
- Supabase (Backend & Realtime DB)
- React, Vite (Frontend)
- Three.js + React Three Fiber (3D Visualization)
- Python (Sensor data simulator for testing)

### 📁 Directory Highlights:
- `/src/components/VehicleModel.jsx` – Handles 3D model rendering and live data updates.
- `/backend/sensor_simulator.py` – Simulates sensor input to Supabase during testing.

### 🙌 Team:
Developed as part of an industrial project by **Team Saviours**.

> *Frontend/Software:* Ruchi Mulik, Siddhi  
> *Hardware/Integration:* Kaustubh Hire (Team Leader), Vignesh Kamath, Ali

