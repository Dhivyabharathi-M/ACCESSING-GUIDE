**🚍 Accessi-Guide – Smart Accessible Travel Companion**

Accessi-Guide is an AI-powered, accessibility-first travel platform designed to make travel inclusive for people with disabilities.
The app adapts dynamically to user needs (Blind, Deaf, Wheelchair, Cognitive) and provides accessible ride booking, hotel discovery, navigation, and admin management — all in one platform.

**🌍 Problem Statement**

Traveling is still a challenge for people with disabilities due to:

Lack of verified accessibility information

Inaccessible navigation routes

Limited accessible transportation options

Poor real-time assistance

Accessi-Guide solves this by providing verified accessibility data, adaptive navigation, and inclusive travel services.

**✨ Key Features**
**🧑‍🦽 User (Traveler) Module**

Accessible Ride Booking

Wheelchair vans, lift-enabled taxis

Pickup & drop-off with accessibility preferences

Hotel Finder

Filter hotels by ramps, elevators, braille signage, accessible toilets

Navigation (Map + AR Simulation)

Map view for accessible routes

AR demo with overlays (♿ 🚻)

Voice guidance & vibration alerts

Booking History

Timeline of past & upcoming rides

Accessible formats for different disabilities

**🧠 Adaptive Accessibility**
Disability Type	Features
Blind	Voice navigation (Text-to-Speech)
Deaf	Visual captions & vibration alerts
Wheelchair	Accessible route & transport filters
Cognitive	Simple UI, step-by-step flow

**🛠️ Admin Dashboard**

Manage bookings (approve / reject / complete)

Add & update accessible hotels

View analytics on accessibility usage

**🧪 Hackathon Demo Flow**

User registers as wheelchair user

Books an accessible van

Searches hotels with ramps & braille

Uses Navigation → switches to AR mode

Admin approves booking & adds hotel

Judges see both user & admin workflows

**🧰 Tech Stack**
Frontend (Mobile)

React Native (Expo)

Expo Speech (Voice guidance)

Expo Haptics (Vibration alerts)

Backend

FastAPI (Python)

JWT Authentication

SQLite (for easy setup)

Database

Users

Bookings

Hotels (with accessibility attributes)


**🚀 Getting Started**
**🔹 Backend Setup**
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python main.py


API runs at:
👉 http://localhost:5000

**🔹 Mobile App Setup**
cd frontend/mobile
npm install
npx expo start


Scan QR using Expo Go app on mobile.

🔑 Sample Environment Variables
API_BASE_URL=http://localhost:5000
GOOGLE_MAPS_API_KEY=AIzaSyFAKE-KEY-FOR-DEMO
JWT_SECRET_KEY=supersecretkey

**👨‍💻 Demo Credentials**

Admin

Email: admin@accessiguide.com

Password: admin123

User

Register via app onboarding

**🎯 Why Accessi-Guide?**

Accessibility-first design

Real-world social impact

Scalable for smart cities & tourism

Perfect for hackathons & MVP demos

**🏆 Future Enhancements**

Real-time AR navigation using ARCore/ARKit

AI-based accessibility verification

Live transport tracking

Public accessibility crowdsourcing

**❤️ Built For Inclusion**

Accessi-Guide empowers millions of people with disabilities to travel independently, safely, and confidently. 
