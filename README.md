# Civic Bridge - Your Civic Guide

> **"Speak once. Civic Bridge handles the complexity."**

---

### The Mission
**Civic Bridge** acts as a virtual government caseworker, bridging the digital divide between citizens and the benefits they deserve. Millions of citizens in rural and semi-urban communities struggle with complex portals and bureaucratic jargon. Civic Bridge simplifies this into a **single, human conversation**.

---

### Key Features

#### Voice-First Interface
State-of-the-art voice recognition allows users to speak naturally in their local dialect.
- **Real-time Audio Visualizer**: Interact with a responsive, high-tech interface that listens and reacts to your voice.
- **Natural Language Understanding**: No keywords needed—just tell Civic Bridge your story.

#### Truly Inclusive
- **Multilingual Support**: Breaks down language barriers by supporting 12+ regional languages.
- **WhatsApp Integration**: Meets users where they are, offering the same powerful assistance via a familiar chat interface.

#### Frictionless Experience
- **Zero Learning Curve**: Designed for non-technical users.
- **Glassmorphism UI**: A premium, accessible, and calming visual experience inspired by clarity and trust.
- **Smart Tracking**: Keeps users updated on their application status without them needing to check a portal.

---

### Built With

- **Core**: React, Vite, TypeScript
- **Styling**: Tailwind CSS, Framer Motion (Animations)
- **UI Components**: Shadcn UI, Radix Primitives
- **Design System**: Custom Glassmorphism & Aurora Gradients

### Backend API DocumentationAI-powered civic assistance platform designed to bridge the gap between citizens and government schemes using AWS Serverless architecture.
🔗 Base URL[https://1fnk1ml6jf.execute-api.ap-south-1.amazonaws.com](https://1fnk1ml6jf.execute-api.ap-south-1.amazonaws.com)
📱 User Registration & Profile
Manage citizen profiles and onboarding.
Endpoint,Method,Description,Payload / Params
/register,POST,Register a new citizen,"{""phone"": ""9876543210"", ""name"": ""Name"", ""language"": ""en""}"
/register,GET,Lookup user by phone,?phone=9876543210

📝 Scheme Applications
Track and manage scheme application history.
Endpoint,Method,Description,Payload / Params
/applications,POST,File a new application,"{""userId"": ""USER#123"", ""schemeId"": ""SCHEME_01"", ""schemeName"": ""Name""}"
/applications,GET,Get user application history,?userId=USER%23123

⚠️ Integration Note: When calling the GET /applications endpoint, ensure the # in the userId is URL-encoded as %23 (e.g., USER%23d87b75a8).

🛠️ Tech Stack
Compute: AWS Lambda (Python 3.12)
API Layer: Amazon API Gateway (HTTP API)
Database: Amazon DynamoDB (NoSQL)
Indexes: Global Secondary Indexes (GSI) for high-speed lookups by Phone and User ID.

---

<div align="center">
  <sub>Built with love for AI For Bharat 2026</sub>
</div>
