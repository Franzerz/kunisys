# KQue

This is a full-stack web application for booking and managing hospital appointments. Patients can book appointments with available doctors, doctors can view, confirm, or manage these appointments, and the admin can manage user and view the booking activities. It includes user authentication, email forgot pasword, and a dashboard for different user roles.

---

## Brief Info

The system allows:

- Patients to register, log in, and book appointments
- Doctors to view and manage appointments
- Admins to manage users
- Email notifications if the user forgot password
- Secure login using JWT

The frontend is built with React, and the backend uses Node.js, Express, and MongoDB.

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Franzerz/kunisys.git
cd kunisys
```

### 2. Install Dependencies

You'll need to install packages in **both the root** and **client** folders:

```bash
# Install backend dependencies
npm install

# Go into the client folder
cd client

# Install frontend dependencies
npm install

# Go back to the main project folder
cd ..
```

### 3. Set Up Environment Variables

Create a `.env` file in the **root directory** of the project and structure it like this:

```env
PORT=8080
NODE_MODE=development
MONGODB_URL=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
GMAIL_USER=your-gmail-address
GMAIL_PASS=your-gmail-app-password
```

> Note: This Gmail is use for sending the reset password link. Use a [Gmail App Password](https://support.google.com/accounts/answer/185833) instead of your regular Gmail password.

---

## Running the App Locally

Once everything is installed and `.env` is configured:

```bash
npm run dev
```

This will start both the backend and frontend servers concurrently using `concurrently`.

- Backend will run on: `http://localhost:8080`
- Frontend will run on: `http://localhost:3000`

---

## Setting Up the First Admin

To promote the first user to an admin:

1. Open **MongoDB Compass**.
2. Go to the **users** collection in your database.
3. Find the user you want to make an admin.
4. Change their `isAdmin` field to `true`.

This will grant admin privileges to that user.

