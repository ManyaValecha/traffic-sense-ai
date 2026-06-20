# 🚦 TrafficSense AI Bengaluru

### *AI-Powered Event-Driven Traffic Intelligence for Smarter Urban Mobility*

> **Flipkart GRIDLOCK Hackathon 2.0 | Prototype Phase**

TrafficSense AI is an intelligent traffic command platform designed to help traffic authorities **predict, manage, and resolve event-driven congestion** across Bengaluru.

Instead of reacting after traffic jams occur, TrafficSense combines historical traffic intelligence, machine learning, and generative AI to forecast congestion, recommend tactical deployments, and continuously learn from every resolved incident.

https://traffic-sense-ai-eta.vercel.app
---

## 🌟 Problem Statement

Political rallies, festivals, sports events, construction work, vehicle breakdowns, accidents, and sudden gatherings often trigger localized traffic congestion.

Current traffic management is largely reactive:

* Manual resource planning
* Delayed incident response
* Limited prediction capability
* No systematic post-event learning

TrafficSense AI transforms this process into a proactive, AI-assisted decision support system.

---

# 🚀 Key Features

### 🚨 Live Traffic Command Centre

* Real-time operational dashboard
* Incident monitoring
* Corridor stress analysis
* Live event telemetry

### 🤖 Gemini Traffic Copilot

Generate intelligent traffic response plans using natural language.

Simply describe an incident and receive:

* Severity prediction
* Officer allocation
* Barricading strategy
* Diversion recommendations
* Operational timeline

---

### 📈 Predictive Intelligence Engine

Powered by:

* XGBoost
* LightGBM
* Historical Astram traffic dataset

Predicts:

* Traffic severity
* Clearance duration
* Congestion spread
* Resource requirements

---

### 🧠 Congestion Debt Engine *(Core Innovation)*

TrafficSense introduces the concept of **Congestion Debt**.

Every unresolved incident contributes to hidden future congestion.

The platform continuously:

* Tracks accumulated congestion debt
* Identifies recurring bottlenecks
* Forecasts long-term operational risk
* Suggests preventive interventions

---

### 👮 Deployment Recommendation Engine

Automatically recommends:

* Officer deployment
* Barricade placement
* Diversion routes
* Tactical response timelines

---

### 📍 Interactive Hotspot Intelligence

Visualizes:

* High-risk junctions
* Historical hotspots
* Spatial congestion distribution
* Sector-wise traffic density

---

### 📚 Post-Event Learning Loop

Every resolved incident improves future predictions.

The platform continuously evaluates:

* Prediction accuracy
* Response effectiveness
* Resource utilization
* Operational outcomes

---

# 🏗️ System Architecture

```text
ASTRAM Dataset
        │
        ▼
ETL Pipeline
        │
        ▼
PostgreSQL
        │
        ▼
ML Models
(XGBoost + LightGBM)
        │
        ▼
Gemini AI
        │
        ▼
Express Backend
        │
        ▼
React Dashboard
        │
        ▼
Officer Application
        │
        ▼
Traffic Control Command Centre
```

---

# 🛠️ Technology Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js

### Artificial Intelligence

* Google Gemini API
* XGBoost
* LightGBM

### Database

* PostgreSQL

### Data

* ASTraM Bengaluru Traffic Dataset

---

# 💼 Business Value

TrafficSense AI is designed as a scalable Smart City platform.

Potential deployment includes:

* Bengaluru Traffic Police
* Smart City Command Centres
* Municipal Authorities
* Emergency Response Teams
* Logistics & Fleet Operators

Revenue opportunities:

* Government Licensing
* Enterprise SaaS
* Logistics Intelligence APIs
* Analytics Dashboard
* Multi-City Deployments

---

# 📷 Prototype

TrafficSense AI includes:

* Live AI Command Dashboard
* Event Simulation Engine
* AI Copilot
* Congestion Debt Analytics
* Deployment Recommendation Engine
* Predictive Intelligence Suite

---

# ⚙️ Running Locally

## Prerequisites

* Node.js 18+
* npm

## Installation

```bash
git clone https://github.com/ManyaValecha/traffic-sense-ai.git

cd traffic-sense-ai

npm install
```

Create a `.env.local` file:

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Run the development server:

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

# 📂 Repository Structure

```text
src/
 ├── components/
 ├── pages/
 ├── hooks/
 ├── services/
 ├── assets/
 └── utils/
```

---

# 🎯 Hackathon Theme

**Event-Driven Congestion (Planned & Unplanned)**

TrafficSense AI addresses:

* Political rallies
* Festivals
* Sports events
* Construction activities
* VIP movement
* Vehicle breakdowns
* Road accidents
* Waterlogging

using predictive AI and real-time operational intelligence.

---

# 👩‍💻 Developer

**Manya Valecha**

B.Tech Information Technology
Delhi Technological University (DTU)

---

# 🙏 Acknowledgements

Special thanks to:

* **Flipkart GRIDLOCK Hackathon**
* **Bengaluru Traffic Police (ASTraM)**
* **MapmyIndia**

for providing the challenge, traffic intelligence resources, and inspiration behind this project.

---

## ⭐ Vision

**From Reactive Traffic Management to Predictive Urban Intelligence.**
