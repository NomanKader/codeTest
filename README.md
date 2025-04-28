# Location Picker App

A professional full-stack React.js application for location management.  
Built with a clean and scalable architecture, featuring authentication, map integration, and location editing.

---

## 📋 Features

- Login with email and password (using backend API)
- Session storage token management
- Protected routes (Home, Locations, Edit Location)
- Location picking on interactive Leaflet map
- Upload location images
- View location details (including uploaded images)
- Drag markers to update location
- Edit existing locations
- Responsive UI using Material-UI (MUI)

---

## 🛠 Tech Stack

- React.js (Vite/Cra template)
- React Router DOM
- Material-UI (MUI)
- Redux Toolkit (state management)
- React Hook Form (form management & validation)
- Leaflet.js & React-Leaflet (map)
- Axios (API calls)
- SessionStorage for authentication tokens

---

## 📂 Project Structure

src/ api/ AuthController.js # Handles Login API assets/ icons/ logo.png # App Logo components/ MapPickerComponent.jsx # Map click to pick location LocationFormComponent.jsx# Create location form LocationMarkerComponent.jsx # Marker display pages/ LoginPage.jsx # Login screen HomePage.jsx # Map with locations ListPage.jsx # List of saved locations EditLocationPage.jsx # Edit location screen redux/ locationSlice.js # Redux logic for locations App.jsx public/ 192.png 512.png favicon.ico .env # API base URL README.md


---

## 🚀 Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/location-picker-app.git
cd location-picker-app

2. Install dependencies:
npm install

3.Set up your .env file:
REACT_APP_API_BASE_URL=https://nksoftware-001-site27.anytempurl.com/api

4.Start the development server:
npm start

🔐 Authentication Details
API Login Endpoint: /api/login

Stores authToken in sessionStorage

Redirects unauthorized users back to / (Login page)

Example Credentials:
Email: pyaephyoswe@gmail.com
Password: Admin@123

🗺️ Map Features
Pick location on map (sets Latitude and Longitude)

Upload location image

Drag marker to update location

View marker popup showing uploaded image and location details

🙌 Credits
Developed and designed by Pyae Phyo Swe

A React.js coding test project demonstrating real-world app development skills, code quality, UI/UX optimization, and scalability.

📜 License
This project is for learning, testing, and demo purposes only.
All rights reserved © 2025 by Pyae Phyo Swe.
