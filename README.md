# SignFlow Frontend (React)

This is the frontend application for SignFlow, a digital contract signing platform.
It provides a role-based interface for Managers and Employees to manage, sign, and track documents securely.

The frontend communicates with the SignFlow Django backend APIs to handle authentication, document management, and digital signatures.

## 📖 Project Overview

The SignFlow Frontend delivers a user-friendly experience tailored to two roles:

💼 Managers can:

- Create new users (Managers & Employees)

- Upload contracts and initiate signing requests

- Track signing progress of all documents

- Sign documents themselves

- Download completed documents once all signatures are collected

👨‍💼 Employees can:

- View documents assigned to them

- Sign assigned documents

- Track the status of pending and signed documents

- Download completed signed documents

✨ Key Frontend Features

- Role-based UI → Separate dashboards and access for Managers and Employees.

- Automatic Signature Status Polling → Continuously fetches the latest document/signature status from the backend, ensuring real-time updates.

- Hot Reloading → Development mode includes instant browser refresh on code changes.

- Shimmer Loading States → Dashboard and status views use loading skeletons for a smoother user experience.

- Status Indicators → Visual counters for Signed, Unsigned, and Total documents so users can quickly track progress.

- Responsive Design → Fully optimized for desktop and mobile devices.

- Reusable Components → Built with TailwindCSS + ShadCN for a consistent UI across the app.

- Success Toast Notifications → Users see toast messages on successful actions (e.g., document upload, user creation, signature completion).

- Error Handling & Alerts → User-friendly error messages for failed API calls or invalid inputs.

- Secure API Communication → All requests routed through the backend’s JWT-based authentication.

## ⚙️ Tech Stack

- React (with functional components & hooks)

- React Router → Navigation

- Context API → Global state management

- Fetch → API requests to backend

- TailwindCSS → Styling

- ShadCN UI → Prebuilt UI components

## 🛠️ Setup Instructions(With and Without 🐳Docker)
### 1. Clone the repository
``` bash 
git clone https://github.com/abhirup2565/Esign_Project-Frontend.git
cd Esign_Project-Frontend
```
### 🐳 Running with Docker
Follow these steps to run the SignFlow Frontend inside a Docker container.

### 2. Build the image
``` bash
docker build -t signflow-frontend .
``` 

### 3. Run the container
```bash 
docker run -it -p 5173:5173 --name signflow-frontend signflow-frontend
```

The app will now be available at http://localhost:5173
.

### ⚙️ Local Development (Without Docker)
### 2. Install dependencies

```bash
npm install
```

### 3. Configure network variable

Change the BASE_URL in src/costants/network.js<br>
By default set to localhost:8000 

``` bash
BASE_URL=http://localhost:8000/api/
```

For production builds, replace with your deployed backend URL:

BASE_URL=https://your-backend-url/api/

### 4. Run the app locally

``` bash
npm start
```

This will start the development server at http://localhost:5173
.


## 📡 API Integration

The frontend relies on the backend for all major operations:

- Authentication (JWT-based login & refresh)

- User management (Managers creating Employees & Managers)

- Document upload, signing, and download

- Status polling and dashboards

**Make sure the backend is running and accessible via the REACT_APP_API_BASE_URL.**

## 🔗 Related Repositories
SignFlow Backend Repository: [SignFlow Backend (Django)](https://github.com/abhirup2565/Esign_Project-Backend.git)