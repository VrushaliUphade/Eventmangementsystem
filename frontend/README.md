# 🎓 CampusEvents — College Event Registration Portal

CampusEvents is a frontend-based college event registration portal built using React.js. It allows organizers to create and manage college events, while students can discover events, register for available seats, and receive a digital entry pass.

## 🚀 Live Demo

Add your live Vercel link here:

`https://your-project.vercel.app`

## 📂 GitHub Repository

Add your GitHub repository link here:

`https://github.com/your-username/college-event-registration-portal`

---

## ✨ Features

### 🧑‍💼 Organizer

* Create new college events
* Select event category
* Add event venue
* Add event description
* Set maximum number of seats
* View all created events
* View registered students
* Track remaining seats
* Automatically show sold-out status

### 🎓 Student

* Browse available college events
* View event category and venue
* View remaining seats
* Register for an event
* Prevent duplicate registration
* Prevent registration when seats are full
* Get a unique registration ID
* Generate a digital event entry pass

---

## 🛠️ Technologies Used

* **React.js**
* **Vite**
* **JavaScript**
* **HTML5**
* **CSS3**
* **LocalStorage**
* **Git & GitHub**

---

## 📁 Project Structure

```text
college-event-registration-portal/
│
├── public/
│
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/college-event-registration-portal.git
```

### 2. Open the project

```bash
cd college-event-registration-portal
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173/
```

---

## 🧪 Test the Application

### Organizer Flow

1. Open the application.
2. Select **Organizer**.
3. Enter event details.
4. Set the maximum seats.
5. Click **Publish Event**.
6. Check the created event in the dashboard.
7. View registered students after registrations.

### Student Flow

1. Logout from Organizer.
2. Select **Student**.
3. Browse available events.
4. Click **Register Now**.
5. Enter name and email.
6. Click **Confirm Registration**.
7. View the generated digital entry pass.

---

## 🔐 Business Logic

### Seat Management

The application automatically calculates remaining seats:

```text
Remaining Seats = Maximum Seats - Registered Students
```

When remaining seats become `0`, registration is closed.

### Duplicate Registration

A student cannot register for the same event twice using the same email address.

### Registration ID

Each successful registration receives a unique registration ID such as:

```text
REG-123456-ABC
```

---

## 💾 Data Storage

This project uses **browser LocalStorage** to store event and registration data.

Because this is a frontend-only project, no external backend or database is required.

> Note: LocalStorage data belongs to the individual browser/device and is not shared between different users or devices.

---

## 📱 Responsive Design

The application is designed to work on:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile devices
* 📱 Tablets

---

## 🎯 Problem Solved

College events are often shared through multiple WhatsApp groups or other communication channels, which can make event information difficult to manage.

CampusEvents provides a single platform where:

* Organizers can create and manage events.
* Students can discover available events.
* Seat availability can be tracked.
* Students can register easily.
* A digital entry pass is generated after registration.

---

## 🔮 Future Improvements

The project can be extended with:

* User authentication
* Node.js and Express.js backend
* MongoDB database
* Admin authentication
* Email notifications
* QR-code based entry passes
* Event search and filtering
* Event editing and deletion
* Online payment integration
* Cloud deployment with backend and database

---

## 👩‍💻 Developer

**Vrushali Uphade**

BE Computer Science & Engineering
Prof. Ram Meghe College of Engineering & Management, Badnera-Amravati

---

## 📄 License

This project is created for educational and internship/placement purposes.
