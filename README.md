# Temple Management System

A comprehensive web-based application designed to digitize and streamline the management of temple activities, finances, and community engagement. This system facilitates efficient handling of events, donations, gallery media, announcements, and villager complaints.

## 🚀 Features

### Core Functionalities
- **User Management & Authentication**: Secure registration and login for administrators and villagers with role-based access control.
- **Event Management**: Schedule, update, and manage temple festivals and daily rituals (`ManageEvents`).
- **Gallery**: Upload and manage photos/videos of temple events using Cloudinary integration (`ManageGallery`).
- **Announcements**: Post and view important updates for the community (`ManageAnnouncements`).
- **Complaints System**: Villagers can submit complaints or suggestions, which admins can review and address (`VillagerComplaints`).
- **Financial Management**: Track temple income (donations, mishri) and expenses with monthly locking mechanisms (`Income`, `Expense`, `LockedMonth`).
- **Activity Logs**: detailed logs of user actions for accountability (`ActivityLog`).
- **Multilingual Support**: Support for local languages (e.g., Kannada) to ensure accessibility for all villagers.
- **Reports**: Generate PDF reports for events and financials.

---

## � Project Team
**Project Title**: Temple Management System
**Team Members**:
1. [Name] ([USN])
2. [Name] ([USN])
3. [Name] ([USN])
4. [Name] ([USN])

**Guide**: [Prof. Name]
**Institution**: [College Name]

---

## 💻 System Requirements

### Hardware Requirements
- **Processor**: Intel Core i3 or higher / AMD Ryzen 3 or higher.
- **RAM**: 4GB minimum (8GB recommended).
- **Storage**: 500MB free space.
- **Internet Connection**: Required for Cloudinary and Google Fonts.

### Software Requirements
- **OS**: Windows 10/11, macOS, or Linux.
- **Runtime**: Node.js (v14 or higher).
- **Database**: MongoDB (Local or Atlas).
- **Browser**: Google Chrome, Firefox, or Edge.

---

## �🛠️ Tech Stack

### Frontend
- **React.js**: Javascript library for building user interfaces.
- **Vite**: Next Generation Frontend Tooling for fast build times.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI design.
- **Framer Motion**: For smooth animations and transitions.
- **Axios**: For making HTTP requests to the backend.

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **Cloudinary**: Cloud-based image and video management.
- **PDFKit**: For generating PDF documents.

## 📂 Project Structure

```
temple/
├── backend/                 # Node.js/Express Backend
│   ├── config/             # Database & other configurations
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Custom middleware (auth, upload)
│   ├── models/             # Mongoose database models
│   ├── routes/             # API routes
│   └── server.js           # Entry point
│
└── temple-frontend/         # React Frontend
    ├── src/
    │   ├── api/            # API connection setup
    │   ├── auth/           # Login & Register components
    │   ├── components/     # Reusable UI components
    │   ├── context/        # React Context (Auth, Language)
    │   ├── pages/          # Main application pages
    │   └── styles/         # CSS files
    └── package.json
```

## ⚙️ Installation & Setup

Prerequisites: Ensure you have **Node.js** and **MongoDB** installed on your machine.

### 1. Clone the Repository
```bash
git clone <repository-url>
cd temple
```

### 2. Backend Setup
Navigate to the backend folder and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend folder, and install dependencies:
```bash
cd ../temple-frontend
npm install
```

Start the React development server:
```bash
npm run dev
```

The application will typically run at `http://localhost:5173`.

---

## 🔮 Future Scope
- **Online Payment Gateway**: Integration of Razorpay/Stripe for online donations.
- **Live Streaming**: Feature to view live daily rituals (Pooja) from the temple.
- **SMS/Email Notifications**: Automated alerts for upcoming events and festivals.
- **Mobile App**: Development of a dedicated mobile application using React Native.

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## 📄 License
This project is licensed under the ISC License.
