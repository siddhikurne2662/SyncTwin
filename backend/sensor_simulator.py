# import requests
# import time
# import random

# # Supabase details
# SUPABASE_URL = "https://fsmlidqdqrmagovqmdat.supabase.co"
# SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzbWxpZHFkcXJtYWdvdnFtZGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNDgwMzEsImV4cCI6MjA1ODYyNDAzMX0.eoJIfk3oEevwOg5yDhkJhVWyHIPu3Op3NX_jgruoIIE"
# TABLE_NAME = "vehicle_status"

# # API Headers
# headers = {
#     "apikey": SUPABASE_ANON_KEY,
#     "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
#     "Content-Type": "application/json"
# }

# # Function to send data
# def send_sensor_data():
#     data = {
#         "ultrasonic_distance": round(random.uniform(10, 100), 2),
#         "imu_acceleration_x": round(random.uniform(-1, 1), 2),
#         "imu_acceleration_y": round(random.uniform(-1, 1), 2),
#         "imu_acceleration_z": round(random.uniform(-3, 3), 2),  # Allow forward and backward motion
#         "imu_gyro_x": round(random.uniform(-180, 180), 2),
#         "imu_gyro_y": round(random.uniform(-180, 180), 2),
#         "imu_gyro_z": round(random.uniform(-180, 180), 2)
#     }

#     try:
#         response = requests.post(
#             f"{SUPABASE_URL}/rest/v1/{TABLE_NAME}",
#             headers=headers,
#             json=data,
#             timeout=5
#         )

#         if response.status_code == 201:
#             print(f"✅ Data Sent: {data}")
#         else:
#             print(f"❌ Error {response.status_code}: {response.text}")

#     except requests.exceptions.RequestException as e:
#         print(f"❌ Connection Error: {e}")

# # Run the script continuously
# def main():
#     try:
#         while True:
#             send_sensor_data()
#             time.sleep(0.5)  # Faster updates every 0.5 seconds
#     except KeyboardInterrupt:
#         print("\n🛑 Script stopped by user")

# if __name__ == "__main__":
#     main()

import requests
import time
import random

# Supabase details
SUPABASE_URL = "https://fsmlidqdqrmagovqmdat.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzbWxpZHFkcXJtYWdvdnFtZGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNDgwMzEsImV4cCI6MjA1ODYyNDAzMX0.eoJIfk3oEevwOg5yDhkJhVWyHIPu3Op3NX_jgruoIIE"
TABLE_NAME = "vehicle_status"

# API Headers
headers = {
    "apikey": SUPABASE_ANON_KEY,
    "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
    "Content-Type": "application/json"
}


# Function to send data
def send_sensor_data():
    data = {
        "ultrasonic_distance": round(random.uniform(10, 100), 2),
        "imu_acceleration_x": round(random.uniform(-1, 1), 2),
        "imu_acceleration_y": round(random.uniform(-1, 1), 2),
        "imu_acceleration_z": round(random.uniform(-3, 3), 2),
        "imu_gyro_x": round(random.uniform(-180, 180), 2),
        "imu_gyro_y": round(random.uniform(-180, 180), 2),
        "imu_gyro_z": round(random.uniform(-180, 180), 2),
        "steering_angle": round(random.uniform(-45, 45), 2) 
    }

    try:
        response = requests.post(
            f"{SUPABASE_URL}/rest/v1/{TABLE_NAME}",
            headers=headers,
            json=data,
            timeout=5
        )

        if response.status_code == 201:
            print(f"✅ Data Sent: {data}")
        else:
            print(f"❌ Error {response.status_code}: {response.text}")

    except requests.exceptions.RequestException as e:
        print(f"❌ Connection Error: {e}")

# Run the script continuously
def main():
    try:
        while True:
            send_sensor_data()
            time.sleep(0.5)  # Faster updates every 0.5 seconds
    except KeyboardInterrupt:
        print("\n🛑 Script stopped by user")

if __name__ == "__main__":
    main()

# import requests
# import time
# import random

# # Supabase details
# SUPABASE_URL = "https://fsmlidqdqrmagovqmdat.supabase.co"
# SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzbWxpZHFkcXJtYWdvdnFtZGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNDgwMzEsImV4cCI6MjA1ODYyNDAzMX0.eoJIfk3oEevwOg5yDhkJhVWyHIPu3Op3NX_jgruoIIE"
# TABLE_NAME = "vehicle_status"

# # API Headers
# headers = {
#     "apikey": SUPABASE_ANON_KEY,
#     "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
#     "Content-Type": "application/json"
# }

# # Function to send data
# def send_vehicle_status():
#     data = {
#         "imu_pitch": round(random.uniform(-90, 90), 2),
#         "imu_roll": round(random.uniform(-90, 90), 2),
#         "imu_yaw": round(random.uniform(-180, 180), 2),
#         "wheel_speed": int(random.uniform(0, 100)),  # Convert to int
#         "steering_angle": int(random.uniform(-45, 45)),  # Convert to int
#         "obstacle_distance": round(random.uniform(0, 200), 2),
#         "position_x": round(random.uniform(-100, 100), 2),
#         "position_y": round(random.uniform(-100, 100), 2),
#         "position_z": round(random.uniform(-100, 100), 2),
#         "view_direction": random.choice(["North", "South", "East", "West"])
#     }

#     try:
#         response = requests.post(
#             f"{SUPABASE_URL}/rest/v1/{TABLE_NAME}",
#             headers=headers,
#             json=data,
#             timeout=5
#         )

#         if response.status_code == 201:
#             print(f"✅ Data Sent: {data}")
#         else:
#             print(f"❌ Error {response.status_code}: {response.text}")

#     except requests.exceptions.RequestException as e:
#         print(f"❌ Connection Error: {e}")

# # Run the script continuously
# def main():
#     try:
#         while True:
#             send_vehicle_status()
#             time.sleep(0.5)  # Data updates every 0.5 seconds
#     except KeyboardInterrupt:
#         print("\n🛑 Script stopped by user")

# if __name__ == "__main__":
#     main()