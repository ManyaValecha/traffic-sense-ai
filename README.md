# 🚦 TrafficSense AI Bengaluru

### **AI-Powered Event-Driven Traffic Intelligence for Smarter Urban Mobility**

**From reactive traffic management to predictive urban intelligence.**

TrafficSense AI Bengaluru is an intelligent traffic command platform designed to help traffic authorities **understand, predict, and respond to event-driven congestion**.

Political rallies, festivals, sports events, construction activity, accidents, vehicle breakdowns, VIP movement, and sudden gatherings can create localized congestion that propagates across surrounding corridors.

TrafficSense combines **historical traffic intelligence, machine learning, generative AI, and event-driven cloud architecture** to transform these incidents into structured, actionable response workflows.

> **Detect → Predict → Recommend → Activate → Learn**

🔗 **Live Prototype:** https://traffic-sense-ai-eta.vercel.app/

---

## 🌟 Why TrafficSense AI?

Traditional traffic management often begins **after** congestion has already become a problem.

TrafficSense is designed around a different approach:

```text
              EVENT
                │
                ▼
       ┌─────────────────┐
       │ Detect Incident │
       └────────┬────────┘
                │
                ▼
       ┌─────────────────┐
       │ Predict Impact  │
       └────────┬────────┘
                │
                ▼
       ┌─────────────────┐
       │ Recommend Action│
       └────────┬────────┘
                │
                ▼
       ┌─────────────────┐
       │ Activate Route  │
       │ / Response      │
       └────────┬────────┘
                │
                ▼
       ┌─────────────────┐
       │ Learn from      │
       │ Outcome         │
       └─────────────────┘
```

The goal is to move traffic operations toward **data-informed, proactive decision support**.

---

# 🚨 Problem Statement

Large planned and unplanned events can cause localized traffic disruption.

Examples include:

* Political rallies
* Festivals
* Sports events
* Construction activities
* VIP movement
* Vehicle breakdowns
* Road accidents
* Waterlogging
* Sudden public gatherings

These incidents can create secondary congestion across nearby roads and junctions.

Common operational challenges include:

* Manual resource planning
* Delayed incident response
* Limited predictive capability
* Fragmented traffic information
* Difficulty identifying recurring bottlenecks
* Limited post-event analysis
* Lack of a continuous learning loop

TrafficSense AI addresses these challenges through a combination of **ML-based prediction, generative AI assistance, operational recommendations, and cloud-based event workflows**.

---

# 🚀 Key Features

## 🚨 1. Live Traffic Command Centre

A centralized operational dashboard for monitoring traffic incidents and their potential impact.

The interface brings together:

* Incident monitoring
* Corridor stress analysis
* Traffic intelligence
* Event telemetry
* Hotspot visualization
* Operational recommendations

The goal is to provide a single decision-support interface rather than forcing operators to work across disconnected tools.

---

# 🤖 2. Gemini Traffic Copilot

Traffic operators can describe an incident using natural language.

For example:

> "A large event is expected near a high-traffic junction during evening peak hours."

The AI copilot can generate a structured traffic response plan containing:

* Severity assessment
* Officer allocation suggestions
* Barricading strategy
* Diversion recommendations
* Operational timeline

The copilot is designed as a **decision-support layer**, keeping the human operator involved in the final operational decision.

---

# 📈 3. Predictive Intelligence Engine

TrafficSense uses machine learning to analyze historical traffic patterns and estimate incident impact.

### Models

* **XGBoost**
* **LightGBM**

### Data

* Historical Bengaluru traffic data
* ASTraM traffic dataset

The predictive layer is designed to estimate:

* Traffic severity
* Clearance duration
* Congestion spread
* Resource requirements

This allows the platform to move beyond simply displaying current traffic conditions toward estimating what may happen next.

---

# 🧠 4. Congestion Debt Engine

### **Core Innovation**

TrafficSense introduces the concept of **Congestion Debt**.

A single traffic incident may be resolved, but repeated incidents at the same location can reveal a deeper operational problem.

TrafficSense treats unresolved or recurring congestion as accumulated **Congestion Debt**.

Conceptually:

```text
Incident
   │
   ▼
Congestion
   │
   ├── Resolved quickly ─────► Low residual impact
   │
   └── Persists / repeats ───► Congestion Debt
                                  │
                                  ▼
                         Recurring Bottleneck
                                  │
                                  ▼
                         Future Risk Signal
                                  │
                                  ▼
                     Preventive Intervention
```

The engine is designed to help identify:

* Recurring bottlenecks
* Accumulated congestion impact
* High-risk corridors
* Long-term operational pressure
* Preventive intervention opportunities

The objective is to make congestion a **measurable operational signal rather than an isolated incident**.

---

# 👮 5. Deployment Recommendation Engine

TrafficSense converts predicted traffic impact into operational recommendations.

The system can recommend:

* Officer deployment
* Barricade placement
* Diversion routes
* Response timelines
* Resource allocation

The recommendations are intended to assist human operators rather than autonomously control traffic infrastructure.

---

# 📍 6. Interactive Hotspot Intelligence

TrafficSense provides spatial visibility into traffic risk.

The platform visualizes:

* High-risk junctions
* Historical hotspots
* Spatial congestion distribution
* Sector-wise traffic density
* Recurring problem areas

This can help operators identify locations that require attention beyond the immediate incident.

---

# 📚 7. Post-Event Learning Loop

Traffic management should not end when an incident ends.

TrafficSense introduces a feedback loop:

```text
Incident
   │
   ▼
Prediction
   │
   ▼
Recommended Response
   │
   ▼
Operational Outcome
   │
   ▼
Evaluation
   │
   ▼
Future Predictions
```

The platform can evaluate:

* Prediction accuracy
* Response effectiveness
* Resource utilization
* Operational outcomes

This creates the foundation for continuously improving future traffic intelligence.

---

# ☁️ AWS Serverless Architecture

TrafficSense combines its AI/ML workflow with an **AWS serverless, event-driven foundation**.

```text
                         TRAFFICSENSE AI
                              │
                              ▼
                       React / Vite UI
                              │
                         HTTPS Request
                              │
                              ▼
                    ┌──────────────────┐
                    │ Amazon API       │
                    │ Gateway          │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ AWS Lambda       │
                    │ Routing Function │
                    └───────┬───┬──────┘
                            │   │
                   ┌────────┘   └─────────┐
                   ▼                      ▼
          ┌────────────────┐      ┌─────────────────┐
          │ Amazon         │      │ Amazon          │
          │ DynamoDB       │      │ EventBridge     │
          │ Route State    │      │ Event Bus       │
          └────────────────┘      └────────┬────────┘
                                           │
                                           ▼
                                    Future Consumers
```

The current AWS prototype focuses on the core cloud workflow:

**Request → Compute → State → Event**

This provides a foundation for future traffic intelligence and operational services.

---

# 🧩 AWS Technology Stack

| Layer                  | AWS / Technology     |
| ---------------------- | -------------------- |
| Frontend               | React + Vite         |
| API                    | Amazon API Gateway   |
| Compute                | AWS Lambda           |
| Runtime                | Node.js 22           |
| Database               | Amazon DynamoDB      |
| Event Bus              | Amazon EventBridge   |
| Infrastructure as Code | AWS CDK v2           |
| Access Control         | IAM                  |
| Database Billing       | PAY_PER_REQUEST      |
| AI Layer               | Google Gemini API    |
| ML Layer               | XGBoost + LightGBM   |
| Backend                | Node.js + Express.js |
| Database Layer         | PostgreSQL           |

---

# ⚡ Event-Driven Architecture

One of the central AWS design decisions is the separation between **state and events**.

```text
                     REQUEST
                        │
                        ▼
                  API Gateway
                        │
                        ▼
                   AWS Lambda
                    /      \
                   /        \
                  ▼          ▼
             DynamoDB    EventBridge
                │            │
               STATE        EVENT
```

### DynamoDB

DynamoDB stores route-related state.

It answers:

> **"What is the current state?"**

### EventBridge

EventBridge communicates that an important state transition has occurred.

It answers:

> **"What happened?"**

This separation reduces coupling between the routing workflow and future consumers.

---

# 📡 Corridor Activation Event

When the routing workflow activates a corridor, the prototype publishes a structured EventBridge event.

### Event Type

```text
TrafficSense.Corridor.Activated
```

### Example Event

```json
{
  "routeId": "route-001",
  "startNode": "Node-A",
  "endNode": "Node-B",
  "priority": "CRITICAL",
  "activatedAt": "2026-08-20T10:30:00Z"
}
```

The event creates an integration point for future services.

For example:

```text
                     EventBridge
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
     Notifications     Analytics      Operations
          │               │               │
          ▼               ▼               ▼
        Alerts        Traffic Data     Monitoring
```

The current prototype publishes the event; these downstream consumers represent future architectural extensions.

---

# 🏗️ Infrastructure as Code

TrafficSense uses **AWS CDK v2** to define cloud infrastructure as code.

A simplified version of the infrastructure is:

```typescript
const routesTable = new dynamodb.Table(this, "TrafficNodesTable", {
  partitionKey: {
    name: "id",
    type: dynamodb.AttributeType.STRING
  },
  billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
});

const eventBus = new events.EventBus(this, "TrafficSenseEventBus");

const routingFunction = new lambda.Function(this, "RoutingFunction", {
  runtime: lambda.Runtime.NODEJS_22_X,
  handler: "routing.handler",
  code: lambda.Code.fromAsset("lambda")
});

routesTable.grantReadWriteData(routingFunction);
eventBus.grantPutEventsTo(routingFunction);
```

Using CDK makes the infrastructure:

* Reproducible
* Version controlled
* Reviewable
* Easier to modify
* Easier to deploy consistently

The architecture is therefore represented not only in diagrams, but also in code.

---

# 🔐 Security and IAM

The Lambda routing function is granted access only to the resources required for its workflow.

```text
                 Routing Lambda
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
   Read / Write Data         Put Events
          │                       │
          ▼                       ▼
      DynamoDB               EventBridge
```

The implemented permissions include:

```text
routesTable.grantReadWriteData(routingFunction)

eventBus.grantPutEventsTo(routingFunction)
```

This follows the principle of **least privilege** by avoiding unnecessary broad permissions.

---

# 🔄 End-to-End Workflow

```text
Emergency / Traffic Event
            │
            ▼
     React Dashboard
            │
            ▼
     Amazon API Gateway
            │
            ▼
       AWS Lambda
            │
       ┌────┴────┐
       ▼         ▼
   DynamoDB   EventBridge
    State       Event
                  │
                  ▼
          Future Consumers
```

At the application level, the broader intelligence workflow can be represented as:

```text
Historical Data
      │
      ▼
ETL / Data Processing
      │
      ▼
PostgreSQL
      │
      ▼
ML Prediction
(XGBoost / LightGBM)
      │
      ▼
Generative AI
(Gemini)
      │
      ▼
Operational Recommendations
      │
      ▼
Traffic Command Dashboard
```

The AWS serverless layer provides the cloud foundation for request handling, route state, and event communication.

---

# 🧠 Architecture Philosophy

TrafficSense follows a simple engineering principle:

> **Give every component one clear responsibility.**

| Component   | Responsibility                    |
| ----------- | --------------------------------- |
| React       | User interface                    |
| API Gateway | API entry point                   |
| Lambda      | Backend routing workflow          |
| DynamoDB    | Route state                       |
| EventBridge | Event communication               |
| IAM         | Permissions                       |
| CDK         | Infrastructure                    |
| XGBoost     | ML prediction                     |
| LightGBM    | ML prediction                     |
| Gemini      | Natural-language decision support |
| PostgreSQL  | Historical/application data       |

This separation allows individual components to evolve without forcing the entire system to change together.

---

# 📊 Prototype Status

The project deliberately distinguishes between implemented capabilities and future production extensions.

| Capability                       | Status        |
| -------------------------------- | ------------- |
| React/Vite traffic dashboard     | ✅ Implemented |
| Traffic event simulation         | ✅ Implemented |
| AI Traffic Copilot               | ✅ Implemented |
| Predictive intelligence workflow | ✅ Implemented |
| Congestion Debt concept          | ✅ Implemented |
| Deployment recommendations       | ✅ Implemented |
| Hotspot intelligence             | ✅ Implemented |
| API Gateway integration          | ✅ Implemented |
| Lambda routing workflow          | ✅ Implemented |
| DynamoDB persistence             | ✅ Implemented |
| EventBridge corridor event       | ✅ Implemented |
| AWS CDK infrastructure           | ✅ Implemented |
| IAM resource permissions         | ✅ Implemented |
| Live city-wide traffic ingestion | 🔮 Future     |
| Direct traffic-signal control    | 🔮 Future     |
| Emergency-service integration    | 🔮 Future     |
| Production observability         | 🔮 Future     |
| Multi-city deployment            | 🔮 Future     |

This distinction is intentional.

TrafficSense AI is a **working prototype and architectural foundation**, not a deployed city-wide autonomous traffic-control system.

---

# 🔮 Roadmap: From Prototype to Production

```text
CURRENT
   │
   ▼
Prototype
   │
   ├── AI Copilot
   ├── ML Prediction
   ├── Congestion Debt
   ├── Recommendations
   └── AWS Event Workflow
   │
   ▼
NEXT
   │
   ├── Live authorized traffic feeds
   ├── Advanced route optimization
   ├── Expanded event consumers
   ├── Observability
   └── Automated testing / CI-CD
   │
   ▼
FUTURE
   │
   ├── Multi-city deployment
   ├── Traffic infrastructure integration
   ├── Emergency-service integration
   └── Large-scale operational intelligence
```

---

# 🛣️ Production Evolution

| Current Prototype             | Production Evolution                               |
| ----------------------------- | -------------------------------------------------- |
| Demo routing inputs           | Authorized live traffic feeds                      |
| Lambda routing workflow       | Advanced routing and optimization                  |
| DynamoDB route state          | Expanded road-network and route model              |
| EventBridge event             | Multiple independent event consumers               |
| Basic API                     | Authentication, authorization and rate limiting    |
| Prototype workflow            | CI/CD and automated testing                        |
| Basic execution               | Centralized logs, metrics and alarms               |
| Simulated corridor activation | Integration with authorized traffic infrastructure |

A real deployment would require appropriate authorization, safety mechanisms, validation, operational oversight, and collaboration with relevant authorities, emergency services, traffic-data providers, and infrastructure operators.

---

# 💼 Business & Deployment Potential

TrafficSense AI is designed as a potential **Smart City traffic intelligence platform**.

Potential users include:

### 🏛️ Government & Public Infrastructure

* Bengaluru Traffic Police
* Smart City command centres
* Municipal authorities
* Public transportation organizations
* Emergency response organizations

### 🚚 Enterprise

* Logistics operators
* Fleet-management companies
* Delivery networks
* Mobility platforms

### 📊 Platform Opportunities

Potential commercialization models include:

* Government licensing
* Enterprise SaaS
* Traffic intelligence APIs
* Analytics dashboards
* Multi-city deployments

The long-term opportunity is to turn traffic incidents from isolated operational problems into a reusable source of **urban mobility intelligence**.

---

# 📷 Prototype Modules

TrafficSense AI brings together:

```text
┌────────────────────────────────────────────┐
│            TRAFFICSENSE AI                 │
├────────────────────────────────────────────┤
│ 🚨 Live Traffic Command Centre             │
│ 🤖 Gemini Traffic Copilot                 │
│ 📈 Predictive Intelligence                 │
│ 🧠 Congestion Debt Engine                  │
│ 👮 Deployment Recommendations              │
│ 📍 Hotspot Intelligence                    │
│ 📚 Post-Event Learning Loop                │
│ ☁️ AWS Serverless Event Workflow            │
└────────────────────────────────────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

* React
* TypeScript
* Tailwind CSS
* Vite

## Backend

* Node.js
* Express.js

## AWS Cloud

* Amazon API Gateway
* AWS Lambda
* Amazon DynamoDB
* Amazon EventBridge
* AWS CDK v2
* IAM

## Artificial Intelligence

* Google Gemini API

## Machine Learning

* XGBoost
* LightGBM

## Database

* PostgreSQL
* DynamoDB

## Data

* ASTraM Bengaluru Traffic Dataset

---

# ⚙️ Running Locally

## Prerequisites

* Node.js 18+
* npm
* Git
* Google Gemini API key

## 1. Clone the Repository

```bash
git clone https://github.com/ManyaValecha/traffic-sense-ai.git
cd traffic-sense-ai
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create:

```text
.env.local
```

Add:

```env
GEMINI_API_KEY=YOUR_API_KEY
```

## 4. Start the Development Server

```bash
npm run dev
```

## 5. Open the Application

```text
http://localhost:5173
```

---

# 📂 Repository Structure

```text
traffic-sense-ai/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── assets/
│   └── utils/
│
├── lambda/
│   └── routing/
│
├── infrastructure/
│   └── AWS CDK
│
├── public/
│
├── package.json
└── README.md
```

---

# 🎯 Hackathon Theme

### **Event-Driven Congestion — Planned & Unplanned**

TrafficSense AI addresses traffic disruption caused by:

* Political rallies
* Festivals
* Sports events
* Construction activities
* VIP movement
* Vehicle breakdowns
* Road accidents
* Waterlogging
* Sudden gatherings

The platform combines **predictive intelligence with event-driven cloud architecture** to explore a more proactive approach to urban traffic operations.

---

# 🏆 What Makes TrafficSense Different?

TrafficSense is not designed as another traffic dashboard.

Its architecture connects several layers:

```text
                   TRAFFIC EVENT
                         │
                         ▼
                ┌─────────────────┐
                │ Historical Data │
                └────────┬────────┘
                         │
                         ▼
                 ML Prediction
                         │
                         ▼
                  Gemini Copilot
                         │
                         ▼
              Operational Decision
                         │
                         ▼
                AWS Event Workflow
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
          Route State             Event
          DynamoDB             EventBridge
              │                     │
              └──────────┬──────────┘
                         ▼
                 Future Learning
```

The result is a platform concept built around a continuous loop:

> **Predict → Decide → Act → Measure → Learn**

---

# 🌱 Vision

### **From Reactive Traffic Management to Predictive Urban Intelligence.**

The long-term vision for TrafficSense AI is to create a scalable intelligence layer for urban mobility—one capable of helping operators understand not only **where congestion is happening**, but also **why it is happening, how it may evolve, and what operational responses could be considered**.

The AWS architecture provides the foundation for this evolution through serverless compute, persistent state, event-driven communication, infrastructure as code, and controlled access.

---

# 👩‍💻 Developer

### **Manya Valecha**

**B.Tech Information Technology**
**Delhi Technological University (DTU)**
**2027 Batch**

Built as part of the **WeMakeDevs First Commit — Bharat Builds Tour**.

---

# 🔗 Project Links

### 🚀 Live Demo

https://traffic-sense-ai-eta.vercel.app/

### 💻 GitHub Repository

https://github.com/ManyaValecha/traffic-sense-ai

### 📝 AWS Builder Center Article

https://builder.aws.com/content/3Jazy8l65wbEcEdBp5CN5GB1daH/trafficsense-ai-building-emergency-green-corridors-with-aws-serverless

---

# ⭐ Final Note

TrafficSense AI started with a simple question:

> **What if traffic management could anticipate congestion instead of only reacting to it?**

Building the prototype turned that question into an engineering exploration spanning **machine learning, generative AI, serverless computing, event-driven architecture, infrastructure as code, and operational decision support**.

The current system is intentionally a prototype.

The bigger idea is the architecture behind it:

> **Turn traffic events into intelligence, intelligence into informed decisions, and every resolved incident into knowledge for the next one.**

**TrafficSense AI Bengaluru — Predict. Respond. Learn.**
