# 🏥 DHARMA — AI-Powered Disease Surveillance & Early Warning System

> **Decentralized Health Analytics & Risk Monitoring Architecture**
> Built for Telangana's Public Health Infrastructure

[![Built with React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-000?logo=vercel)](https://vercel.com)

---

## 📋 Problem Statement

India's rural and semi-urban health surveillance suffers from **delayed outbreak detection**, **fragmented data collection**, and **poor inter-agency coordination**. DHARMA solves this with an AI-powered, role-based surveillance platform enabling real-time disease tracking, risk prediction, and coordinated intervention across all levels of governance.

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    DHARMA PLATFORM                       │
├──────────────┬──────────────┬──────────────┬─────────────┤
│  Community   │  ASHA Worker │   District   │   State     │
│  Dashboard   │  Dashboard   │   Command    │  Governance │
│              │              │   Center     │  Dashboard  │
├──────────────┴──────────────┴──────────────┴─────────────┤
│              AI Risk Engine & Analytics Layer             │
├──────────────────────────────────────────────────────────┤
│         Offline-First Data Ingestion (SMS/IVR/Web)       │
├──────────────────────────────────────────────────────────┤
│    GeoJSON Maps │ Recharts Viz │ Leaflet Risk Mapping    │
└──────────────────────────────────────────────────────────┘
```

---

## 👥 User Roles & Dashboards

| Role | Dashboard | Key Capabilities |
|------|-----------|-----------------|
| **Community Member** | Community Portal | Report symptoms, water quality, view alerts, health education |
| **ASHA Worker** | Field Operations | Field verification, cluster detection, weekly reports, escalation |
| **Doctor / Clinic** | Clinical Dashboard | Patient analytics, advisory system, clinical reports |
| **District Admin (DHO)** | District Command Center | Cluster monitoring, risk maps, interventions, resource allocation |
| **State Authority** | State Governance | District performance, AI risk intelligence, compliance tracking |
| **Super Admin** | Platform Control | User management, audit logs, AI config, emergency mode |

---

## 🔬 Key Features

- **🤖 AI Risk Intelligence** — Outbreak predictions, vulnerability rankings, policy suggestions
- **🗺 Interactive Risk Maps** — GeoJSON-powered Telangana district maps with real-time risk coloring
- **📊 Multi-Level Dashboards** — 6 role-based dashboards with 40+ functional modules
- **📱 Offline-First Architecture** — SMS/IVR data ingestion, sync queue for intermittent connectivity
- **⚡ Real-Time Alerts** — AI-generated early warnings with district-level granularity
- **📋 Advisory System** — State-to-district governance flow with compliance tracking
- **🏕 Health Camp Management** — Camp scheduling, ASHA activity tracking, feedback collection
- **📈 Comprehensive Reports** — Auto-generated state/district reports with export capability

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript 5.8, Vite 7 |
| Styling | Tailwind CSS 3, Remix Icon |
| Maps | Leaflet, React-Leaflet, GeoJSON |
| Charts | Recharts 3 |
| Routing | React Router 7 |
| State | React Context + LocalStorage |
| i18n | i18next (Telugu, Hindi, English) |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/239x1a33a6-cmyk/Tech-Phantoms-HealthTech.git
cd Tech-Phantoms-HealthTech

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start development server
npm run dev
```

### Demo Accounts

| Role | Login | Password |
|------|-------|----------|
| State Authority | `state.demo@dharma.gov` | `State@123` |
| District Admin | `collector.demo@dharma.gov` | `Collector@123` |
| Doctor | `doctor.demo@dharma.gov` | `Doctor@123` |
| Super Admin | `admin` | `admin123` |
| ASHA Worker | `9000000001` (OTP) | `123456` |
| Community | `9876543210` (OTP) | `123456` |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # DistrictLayout, StateLayout, SuperAdminLayout
│   ├── maps/            # DistrictRiskMap (Leaflet + GeoJSON)
│   └── ui/              # Reusable UI components
├── pages/
│   ├── state/           # State Governance Dashboard (8 modules)
│   ├── district/        # District Command Center (14 modules)
│   ├── asha/            # ASHA Worker Dashboard (16 modules)
│   ├── community/       # Community Portal (7 modules)
│   ├── clinic/          # Clinical Dashboard
│   └── admin/           # Super Admin Panel (8 modules)
├── context/             # AuthContext (role-based auth)
├── services/            # Data ingestion, validation
├── data/                # GeoJSON, mock analytics
├── mocks/               # Demo data for all dashboards
└── router/              # Route configuration
```

---

## 🔒 Security

- Role-based access control (6 roles with granular permissions)
- Protected routes with role validation
- No secrets in source code — all via environment variables
- `.gitignore` excludes `.env`, database files, private keys, raw shapefiles

---

## 🌐 Deployment

### Vercel (Frontend)

1. Connect GitHub repo to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables in Vercel dashboard

### Environment Variables (set in Vercel)

```
VITE_API_URL=https://your-backend-url.com
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_key
```

---

## 🔮 Future Scope

- Backend API with FastAPI/Node.js for real data persistence
- Real-time WebSocket alerts
- Mobile app (React Native) for ASHA field workers
- ML model integration for outbreak prediction (LSTM/Prophet)
- WhatsApp Bot integration for community reporting
- Aadhaar-based ASHA worker verification
- Integration with IDSP (Integrated Disease Surveillance Programme)

---

## 👨‍💻 Team

**Tech Phantoms** — Built for HealthTech Innovation

---

## 📄 License

This project is for demonstration and hackathon purposes.
