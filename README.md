# 🏥 FHIR Patient Registration Portal

A cloud-native, enterprise-grade **FHIR R4 Patient Registration Portal** built using **Next.js**, **FastAPI**, **Azure Health Data Services (FHIR Service)**, **Azure Kubernetes Service (AKS)**, **Docker**, **Dapr**, and **Redis**.

This project demonstrates how modern healthcare applications can leverage **FHIR interoperability standards**, **microservices architecture**, **containerization**, and **cloud-native deployment patterns** to deliver scalable and secure patient registration workflows.

---

# 📌 Project Overview

The FHIR Patient Registration Portal enables healthcare providers to:

* Register new patients
* Search and filter patients
* View recently registered patients
* Store and retrieve patient information from Azure FHIR
* Maintain interoperability using FHIR R4 standards
* Utilize distributed state management with Dapr and Redis
* Run entirely on Kubernetes with containerized services

The project follows a production-inspired architecture using Microsoft Azure services and modern DevOps practices.

---

# 🏗️ System Architecture

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/f9fcfc67-c767-4c07-a176-968b24a488f7" />


---

# 🚀 Features

## Patient Registration

* Register new patients
* Consent-based enrollment
* Health card number capture
* Program enrollment
* Province and demographic capture
* Address management
* Contact information
* Privacy consent extension

## Patient Management

* View patients
* Search patients
* Filter by:

  * Name
  * Family Name
  * Given Name
  * Gender
  * Birth Date
  * Health Card
* Sort by latest update
* Retrieve recent registrations

## FHIR R4 Compliance

Supports standard FHIR Patient resource:

* Patient
* Identifier
* HumanName
* Telecom
* Address
* Gender
* BirthDate
* Extensions
* Meta
* Resource IDs

Custom extensions include:

* Program Type
* Privacy Consent

---

# ☁️ Azure Services Used

| Service                           | Purpose                  |
| --------------------------------- | ------------------------ |
| Azure Kubernetes Service (AKS)    | Container orchestration  |
| Azure Container Registry (ACR)    | Docker image storage     |
| Azure Health Data Services (FHIR) | Patient resource storage |
| Azure Active Directory            | Authentication           |
| Azure Load Balancer               | Public endpoint          |
| Managed Identity                  | AKS identity management  |

---

# 🛠️ Technology Stack

## Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Lucide Icons

## Backend

* FastAPI
* Python 3.12
* Uvicorn
* HTTPX
* Pydantic

## Cloud

* Azure Kubernetes Service
* Azure Container Registry
* Azure FHIR Service

## State Management

* Dapr
* Redis

## Containerization

* Docker
* Docker Buildx
* ARM64 Images

## Orchestration

* Kubernetes
* Deployments
* Services
* Secrets

---

# 🏥 Healthcare Standards

The application follows **FHIR R4** specifications.

Each patient registration creates a valid FHIR Patient resource containing:

* Resource ID
* Identifier
* Official Name
* Gender
* Birth Date
* Address
* Telecom
* Program Extension
* Privacy Consent Extension
* Meta Information

---

# 🔄 Dapr Integration

Dapr is used for distributed application runtime features.

Current usage:

* State Management
* Redis integration
* Future-ready microservice architecture

Backend pods run alongside Dapr sidecars.

---

# 🗄️ Redis Integration

Redis acts as the distributed state store.

Used for:

* Cached patient retrieval
* State persistence
* Dapr state management

Future possibilities:

* Session storage
* Distributed caching
* Pub/Sub
* Event-driven workflows

---

# 🔐 Authentication

Backend authenticates against Azure FHIR using Azure AD Service Principal.

Environment variables:

```
AZURE_TENANT_ID
AZURE_CLIENT_ID
AZURE_CLIENT_SECRET
FHIR_BASE_URL
```

OAuth token acquisition:

```
https://<FHIR>/.default
```

No user credentials are stored within the application.

---

# 📂 Project Structure

```
fhir-patient-registration-demo/

├── backend/
│   ├── app/
│   ├── components/
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── schemas/
│   ├── Dockerfile
│   └── package.json
│
├── k8s/
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── redis-deployment.yaml
│   ├── redis-service.yaml
│   └── backend-secret.yaml
│
└── README.md
```

---

# 🐳 Docker

## Backend

* Python 3.12 Slim
* Uvicorn
* FastAPI

```
python:3.12-slim
```

Runs:

```
uvicorn app.main:app
```

---

## Frontend

* Node 20 Alpine
* Next.js Production

```
node:20-alpine
```

Runs:

```
next start
```

---

# ☸️ Kubernetes Deployment

Components deployed:

* Frontend Deployment
* Backend Deployment
* Redis Deployment

Services:

* Frontend LoadBalancer
* Backend ClusterIP
* Redis ClusterIP

---

# 🔑 Kubernetes Secrets

Sensitive credentials are injected through Kubernetes Secrets.

Includes:

* Azure Tenant ID
* Client ID
* Client Secret
* FHIR Base URL

Secrets are mounted as environment variables.

---

# 📦 Azure Container Registry

Images stored in:

```
patientdemoacr.azurecr.io
```

Repositories:

```
frontend
backend
```

Deployment pulls directly from Azure Container Registry.

---

# 🚀 Azure Kubernetes Service

Application runs on:

* Azure Kubernetes Service
* Managed Identity
* Azure CNI Overlay
* System Assigned Identity
* Standard LoadBalancer

Images are pulled from Azure Container Registry.

---

# 🔍 Search & Filtering

Supports:

* Name
* Family
* Given
* Gender
* Birth Date
* Health Card
* Latest Updated
* Count

FHIR search parameters are translated into Azure FHIR API requests.

---

# ⚙️ Environment Variables

Backend:

```
AZURE_TENANT_ID
AZURE_CLIENT_ID
AZURE_CLIENT_SECRET
FHIR_BASE_URL
```

Frontend:

```
INTERNAL_API_BASE_URL
NEXT_PUBLIC_API_BASE_URL
```

---

# 🔥 Problems Solved During Development

This project involved solving several real-world cloud deployment issues:

## ARM64 Image Compatibility

AKS nodes required ARM64-compatible Docker images.

Resolved using:

```
docker buildx build --platform linux/arm64
```

---

## Azure Container Registry Authentication

Configured AKS to authenticate with ACR.

Resolved using:

```
az aks update --attach-acr
```

---

## ImagePullBackOff

Resolved by:

* Correct image architecture
* Proper image tags
* ACR attachment
* Rebuilding ARM64 images

---

## Frontend localhost References

Removed hardcoded:

```
http://localhost:8000
```

Replaced with configurable environment variables.

---

## CORS Issues

Backend updated to allow:

```
http://20.xxx.xxx.xxx
```

using FastAPI CORSMiddleware.

---

## Dapr Connectivity

Verified sidecar startup and Redis state integration.

---

## Internal Service Discovery

Verified:

```
http://backend:8000
```

within Kubernetes network.

---

# 📸 Screenshots

Suggested additions:

* Dashboard

<img width="3827" height="1968" alt="image" src="https://github.com/user-attachments/assets/3724167b-3e18-4df8-ad70-d5ba1c5997e7" />

* Register Patient

<img width="3071" height="1633" alt="image" src="https://github.com/user-attachments/assets/53169cd0-8f18-4fea-9f69-c35506fd1eac" />

* Patient Listing

<img width="3771" height="1773" alt="image" src="https://github.com/user-attachments/assets/7e980965-f516-4dc5-b51b-186b843d6f6a" />


* Filters

* Filter by Gender
  
   <img width="3015" height="1404" alt="image" src="https://github.com/user-attachments/assets/b5880c2e-024e-4113-9e4b-6ae65200fffe" />

* Search by Name
  
   <img width="3034" height="1179" alt="image" src="https://github.com/user-attachments/assets/67f78cc3-015a-4506-bdae-107538284c2d" />

* Sort by Oldest Record
<img width="3789" height="1766" alt="image" src="https://github.com/user-attachments/assets/39781777-211c-4995-9585-41dd17745e40" />


* Azure FHIR Portal

<img width="3825" height="1975" alt="image" src="https://github.com/user-attachments/assets/f3398b80-c763-4de4-a0c2-12629b6cadd6" />

* AKS Pods
<img width="1738" height="416" alt="image" src="https://github.com/user-attachments/assets/71169e52-9f31-4325-ba27-56238d97f54b" />

* Kubernetes Services
<img width="3828" height="1752" alt="image" src="https://github.com/user-attachments/assets/0f58fdde-5aed-4670-bd00-ebbc31c3cdad" />
  
* Azure Container Registry
<img width="3368" height="1222" alt="image" src="https://github.com/user-attachments/assets/1d2288f7-75ec-46f7-8a00-d4ded45af928" />

* Azure FHIR Resources
<img width="3217" height="989" alt="image" src="https://github.com/user-attachments/assets/6ea43d53-a8bc-42cc-8b2e-2d1183a565ad" />

---

# 🚀 Local Development

Backend:

```
uvicorn app.main:app --reload
```

Frontend:

```
npm install
npm run dev
```

---

# 🐳 Docker Build

Backend:

```
docker buildx build \
--platform linux/arm64 \
-t patientdemoacr.azurecr.io/backend:vX \
./backend --push
```

Frontend:

```
docker buildx build \
--platform linux/arm64 \
-t patientdemoacr.azurecr.io/frontend:vX \
./frontend/patient-registration-portal --push
```

---

# ☸️ Kubernetes Deployment

Apply manifests:

```
kubectl apply -f k8s/
```

Check pods:

```
kubectl get pods
```

Check services:

```
kubectl get svc
```

Update images:

```
kubectl set image deployment/frontend frontend=patientdemoacr.azurecr.io/frontend:vX

kubectl set image deployment/backend backend=patientdemoacr.azurecr.io/backend:vX
```

<img width="3345" height="1249" alt="image" src="https://github.com/user-attachments/assets/53056134-47cc-4922-9b42-ee99d4258188" />

---

# 🔮 Future Enhancements

* GitHub Actions CI/CD
* Azure DevOps Pipelines
* HTTPS with Ingress Controller
* Azure Application Gateway
* Azure Key Vault integration
* Prometheus Monitoring
* Grafana Dashboards
* OpenTelemetry
* Distributed Tracing
* Role-Based Authentication
* SMART on FHIR Support
* Audit Logging
* Multi-Tenant Support

---

# 💡 Enterprise Concepts Demonstrated

* Microservices
* Cloud Native Architecture
* Containerization
* Kubernetes
* Distributed State Management
* FHIR Interoperability
* Azure Identity
* Infrastructure as Code Ready
* DevOps Ready
* Healthcare Standards
* REST APIs
* Docker
* Azure AKS
* Azure ACR
* Redis
* Dapr
* Next.js
* FastAPI
* Tailwind CSS
* TypeScript
* Python
* OAuth 2.0
* Service Discovery
* CORS Management

---

# 👨‍💻 Author

Developed as an end-to-end demonstration of a modern cloud-native healthcare platform showcasing Azure, Kubernetes, Docker, FHIR interoperability, distributed systems, and enterprise software engineering best practices.

---

# ⭐ Project Status

**Status:** ✅ Production-Inspired Demonstration

The application successfully supports:

* ✅ Patient Registration
* ✅ Azure FHIR Integration
* ✅ Patient Search
* ✅ Distributed State Management
* ✅ Kubernetes Deployment
* ✅ Azure Container Registry
* ✅ Dockerized Services
* ✅ Cloud-Native Healthcare Workflows
* ✅ End-to-End AKS Hosting
* ✅ Enterprise-Ready Architecture

Next planned enhancement: **Fully automated CI/CD pipeline using GitHub Actions with continuous deployment to Azure Kubernetes Service (AKS).**
