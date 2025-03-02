# Claims Management System

## Overview

The **Claims Management System** is a full-stack web application designed to streamline the management of insurance claims. It consists of:

- **Claims Dashboard (Frontend)**: A React application built with **Vite** for fast and efficient development.
- **Claims Mock API (Backend)**: A mock backend powered by **json-server** to simulate API responses.

## Project Structure

The repository consists of a main folder named `claims-management`, containing two subfolders:

- `claims-dashboard/` - The **React frontend**.
- `claims-mock-api/` - The **mock API**.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (>= 16.0.0)
- **npm** (or **yarn** as an alternative)

## Installation

### 1. Clone the Repository

```sh
git clone https://github.com/Hani-Al-Maleh/Claims-Management.git
cd claims-management
```

### 2. Install Frontend Dependencies

```sh
cd claims-dashboard
npm install  # or yarn install
```

### 3. Install Backend Dependencies

```sh
cd ../claims-mock-api
npm install
```

### 4. Start the Mock API Server

```sh
npm start
```

This will serve the mock claims data from `db.json` on `http://localhost:3001`.

### 5. Start the Frontend 

```sh
cd ../claims-dashboard
npm run dev  # or yarn dev
```

### 6. Access the Application

Open `http://localhost:5173` in your browser to interact with the Claims Management System.

## Features

### Claims Dashboard
- **Authentication** (Login & Signup with mock authentication)
- **Claims List** (View, search, filter, and paginate claims)
- **Claim Status Updates** (Approve/Deny claims)
- **Claim Details Page** (Detailed view of each claim)
- **Reports Page** (Generate & download claims reports)
- **Dashboard with Charts** (Visual insights into claim statuses)
- **Dark/Light Mode** (Theming support for user preference)

### Mock API (JSON Server)
- Simulated authentication via stored users
- Claims management with status updates
- Mock delay for report generation (simulates real processing time)

## Testing

### Running Unit Tests
Unit tests are implemented using **Jest** and **React Testing Library**.

To run tests:
```sh
npm test
```
Or using yarn:
```sh
yarn test
```

### Manual Testing Checklist

#### Authentication
- Log in with a valid user.
- Attempt to log in with incorrect credentials (should show an error).
- Ensure unauthorized users cannot access protected routes.

#### Claims Management
- Search for a claim by **diagnosis code** or **procedure code**.
- Filter claims by **status**.
- Navigate to a claim’s details page.
- Update a claim’s status and confirm the change.

#### Reports
- Navigate to the **Reports Page**.
- Generate a report and observe the **loading indicator**.
- Download the report once it is ready.

#### Theming
- Toggle **light/dark mode** and confirm the UI updates correctly.

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

Hani Al-Maleh

