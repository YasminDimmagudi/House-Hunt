# 🏠 HouseHunt – Property Rental and Management Platform

**HouseHunt** is a full-stack web application built to streamline the property rental process. It supports three user roles — Renters, Owners, and Admins — with tailored functionality for each, including property listings, bookings, and role-based access control.

---

## 🚀 Features

### 👤 User Roles:
- **Renter:** Browse properties and send inquiries to landlords.
- **Owner:** Register and list properties for rent (upon admin approval).
- **Admin:** Grant owner access and manage listed properties and user accounts.

### 🏘 Property Listings:
- Add/edit/delete property listings with images, amenities, location, and pricing.
- Properties categorized by type (apartment, house, studio, etc.).

### 🔐 Authentication:
- User registration and login.
- Role-based access control using JWT.
- Admin can grant owner access via protected route.

### 📩 Inquiry System:
- Renters can submit inquiries for specific properties.
- Landlords receive contact info via the inquiry modal.

---

## 🛠 Tech Stack

### 🌐 Frontend
- React.js with TypeScript
- Tailwind CSS & ShadCN UI
- React Router DOM
- Axios for API communication
- Context API for global auth state

### ⚙ Backend
- Node.js + Express
- MongoDB with Mongoose
- JWT for authentication
- REST API for all operations

---

## 📁 Folder Structure

```bash
HouseHunt/
├── backend/
│   ├── config/         # DB & server configuration
│   ├── models/         # Mongoose schemas (User, Property, Booking, etc.)
│   ├── routes/         # Express routes
│   ├── controllers/    # Route logic
│   ├── middleware/     # Auth middleware
│   ├── server.js
│   └── .env
├── frontend/
│   ├── components/     # Reusable components (e.g., PropertyCard, Modals)
│   ├── context/        # Auth context
│   ├── pages/          # Route-level components (Home, PropertyDetails, etc.)
│   ├── types/          # TypeScript interfaces
│   ├── App.tsx
│   └── main.tsx
├── .gitignore
├── README.md
└── package.json
```
## ⚙ Setup Instructions

### 🧩 Prerequisites
- Node.js and npm
- MongoDB (local or Atlas)
- Git

---

### 🔧 Backend Setup

```bash
cd backend
npm install

Create a .env file inside the backend/ folder:
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the server:
npm run dev

🌐 Frontend Setup:
cd frontend
npm install
npm run dev

Your app will be running at http://localhost:5173
```
📸 Screenshots:

![Screenshot 2025-06-27 210006](https://github.com/user-attachments/assets/28afa7c6-5869-4721-bb36-c875c26380ba)

