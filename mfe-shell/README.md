
A high-resilience Micro-Frontend (MFE) host application built with Vite Module Federation. This project serves as the central orchestrator for a distributed dashboard, managing remote lifecycles, global state, and autonomous fault tolerance.

Architectural Overview

Orchestration: Utilizes Vite Module Federation to dynamically consume remote micro-services (e.g., chat-remote) without hard dependencies.

Fault Isolation: Implemented a "Self-Healing" component pattern using React Error Boundaries to prevent remote failures from cascading to the host.

Real-Time Pipeline: Connected to a Node.js Socket Server (Port 3003) for sub-100ms bidirectional communication.

State Management: Orchestrates feature flags and user context across distributed remotes to ensure a unified user experience.

Safe Loading: Detects net::ERR_CONNECTION_REFUSED or 404s from remotes and triggers a fallback UI rather than a system crash.

Live Support Integration: Houses a "Rich UI" chat widget with auto-scrolling, glassmorphism, and real-time message status.

Performance Optimization: Implements data batching for high-frequency socket events to maintain a 60fps rendering cycle during data spikes.

Secure Provenance: Every architectural change and deployment is verified via GPG-signed commits to ensure code integrity.

🛠️ Technical Stack
Frontend: React 18, Vite, CSS Grid/Flexbox.

Communication: Socket.io-client for real-time event streaming.

Deployment: Optimized for Cloudflare Pages with automated CI/CD via GitHub Webhooks.

Infrastructure: Integrated with AWS ECR for containerized image management.

Start the Socket Bridge: Navigate to chat-server and run node index.js.

Launch the Remote: Run npm run preview on Port 5001 for the Chat MFE.

Run the Shell: Execute npm run dev on Port 5005.