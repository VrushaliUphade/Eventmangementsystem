// import { useEffect, useState } from "react";
// import "./App.css";

// const initialEvents = [
//   {
//     id: 1,
//     title: "Tech Fest 2026",
//     category: "Technical",
//     date: "2026-10-10T10:00",
//     venue: "Seminar Hall",
//     description:
//       "A technical festival with coding, quiz and innovation events.",
//     maxSeats: 50,
//     registrations: [],
//   },
//   {
//     id: 2,
//     title: "Cultural Night",
//     category: "Cultural",
//     date: "2026-10-15T18:00",
//     venue: "College Auditorium",
//     description:
//       "Music, dance and cultural performances by college students.",
//     maxSeats: 100,
//     registrations: [],
//   },
// ];

// // Format date and time properly
// function formatDate(date) {
//   if (!date) return "Date not available";

//   return new Date(date).toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });
// }

// // Get current date/time for datetime-local min value
// function getCurrentDateTime() {
//   const now = new Date();

//   const offset = now.getTimezoneOffset();
//   const localTime = new Date(now.getTime() - offset * 60000);

//   return localTime.toISOString().slice(0, 16);
// }

// function App() {
//   const [role, setRole] = useState(null);

//   const [events, setEvents] = useState(() => {
//     const saved = localStorage.getItem("collegeEvents");

//     if (saved) {
//       try {
//         return JSON.parse(saved);
//       } catch {
//         return initialEvents;
//       }
//     }

//     return initialEvents;
//   });

//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [pass, setPass] = useState(null);
//   const [message, setMessage] = useState("");

//   const [student, setStudent] = useState({
//     name: "",
//     email: "",
//   });

//   const [form, setForm] = useState({
//     title: "",
//     category: "Technical",
//     date: "",
//     venue: "",
//     description: "",
//     maxSeats: "",
//   });

//   useEffect(() => {
//     localStorage.setItem("collegeEvents", JSON.stringify(events));
//   }, [events]);

//   // ---------------- LOGOUT ----------------

//   const logout = () => {
//     setRole(null);
//     setSelectedEvent(null);
//     setPass(null);
//     setMessage("");
//   };

//   // ---------------- CREATE EVENT ----------------

//   const createEvent = (e) => {
//     e.preventDefault();

//     if (!form.title.trim()) {
//       setMessage("Please enter an event title.");
//       return;
//     }

//     if (!form.date) {
//       setMessage("Please select date and time.");
//       return;
//     }

//     if (new Date(form.date) <= new Date()) {
//       setMessage("Please select a future date and time.");
//       return;
//     }

//     if (!form.venue.trim()) {
//       setMessage("Please enter the venue.");
//       return;
//     }

//     if (Number(form.maxSeats) < 1) {
//       setMessage("Maximum seats must be at least 1.");
//       return;
//     }

//     const newEvent = {
//       id: Date.now(),
//       title: form.title.trim(),
//       category: form.category,
//       date: form.date,
//       venue: form.venue.trim(),
//       description:
//         form.description.trim() ||
//         "Join us for this exciting college event.",
//       maxSeats: Number(form.maxSeats),
//       registrations: [],
//     };

//     setEvents((previousEvents) => [
//       ...previousEvents,
//       newEvent,
//     ]);

//     setForm({
//       title: "",
//       category: "Technical",
//       date: "",
//       venue: "",
//       description: "",
//       maxSeats: "",
//     });

//     setMessage("Event created successfully!");
//   };

//   // ---------------- REGISTER STUDENT ----------------

//   const registerStudent = () => {
//     if (!student.name.trim()) {
//       setMessage("Please enter your full name.");
//       return;
//     }

//     if (!student.email.trim()) {
//       setMessage("Please enter your email.");
//       return;
//     }

//     const currentEvent = events.find(
//       (event) => event.id === selectedEvent.id
//     );

//     if (!currentEvent) {
//       setMessage("Event not found.");
//       return;
//     }

//     const remainingSeats =
//       currentEvent.maxSeats -
//       currentEvent.registrations.length;

//     // Full event check
//     if (remainingSeats <= 0) {
//       setMessage("Event registration is closed.");
//       return;
//     }

//     // Duplicate registration check
//     const duplicate = currentEvent.registrations.some(
//       (user) =>
//         user.email.toLowerCase() ===
//         student.email.trim().toLowerCase()
//     );

//     if (duplicate) {
//       setMessage("Already registered.");
//       return;
//     }

//     // Generate unique registration ID
//     const registrationId =
//       "REG-" +
//       Date.now().toString().slice(-6) +
//       "-" +
//       Math.random()
//         .toString(36)
//         .substring(2, 5)
//         .toUpperCase();

//     const registration = {
//       id: registrationId,
//       name: student.name.trim(),
//       email: student.email.trim(),
//     };

//     const updatedEvents = events.map((event) =>
//       event.id === selectedEvent.id
//         ? {
//             ...event,
//             registrations: [
//               ...event.registrations,
//               registration,
//             ],
//           }
//         : event
//     );

//     setEvents(updatedEvents);

//     // Create digital pass
//     setPass({
//       registrationId,
//       studentName: student.name.trim(),
//       studentEmail: student.email.trim(),
//       event: {
//         ...currentEvent,
//         registrations: [
//           ...currentEvent.registrations,
//           registration,
//         ],
//       },
//     });

//     setSelectedEvent(null);

//     setStudent({
//       name: "",
//       email: "",
//     });

//     setMessage("");
//   };

//   // ---------------- LOGIN / ROLE SELECTION ----------------

//   if (!role) {
//     return (
//       <div className="login-page">
//         <div className="login-card">

//           <div className="logo">
//             CE
//           </div>

//           <h1>CampusEvents</h1>

//           <p>
//             College Event Registration Portal
//           </p>

//           <h3>Continue as</h3>

//           <button
//             className="role-btn"
//             onClick={() => {
//               setRole("student");
//               setMessage("");
//             }}
//           >
//             🎓 Student
//             <span>
//               Discover and register for events
//             </span>
//           </button>

//           <button
//             className="role-btn organizer"
//             onClick={() => {
//               setRole("organizer");
//               setMessage("");
//             }}
//           >
//             🧑‍💼 Organizer
//             <span>
//               Create events and manage participants
//             </span>
//           </button>

//         </div>
//       </div>
//     );
//   }

//   // ---------------- ORGANIZER DASHBOARD ----------------

//   if (role === "organizer") {
//     return (
//       <div className="app">

//         <Header
//           role="Organizer"
//           logout={logout}
//         />

//         <main className="container">

//           <div className="page-title">

//             <div>
//               <p className="eyebrow">
//                 ORGANIZER PANEL
//               </p>

//               <h1>
//                 Manage Events
//               </h1>

//               <p>
//                 Create events and track registered students.
//               </p>
//             </div>

//           </div>

//           {message && (
//             <div className="success">
//               {message}
//             </div>
//           )}

//           <section className="dashboard-grid">

//             {/* CREATE EVENT */}

//             <div className="form-card">

//               <h2>
//                 Create New Event
//               </h2>

//               <p className="muted">
//                 Publish an event with a participant limit.
//               </p>

//               <form onSubmit={createEvent}>

//                 <label>
//                   Event Title
//                 </label>

//                 <input
//                   required
//                   type="text"
//                   placeholder="e.g. Hackathon 2026"
//                   value={form.title}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       title: e.target.value,
//                     })
//                   }
//                 />

//                 <label>
//                   Category
//                 </label>

//                 <select
//                   value={form.category}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       category: e.target.value,
//                     })
//                   }
//                 >
//                   <option value="Technical">
//                     Technical
//                   </option>

//                   <option value="Cultural">
//                     Cultural
//                   </option>

//                   <option value="Sports">
//                     Sports
//                   </option>

//                   <option value="Workshop">
//                     Workshop
//                   </option>

//                   <option value="Seminar">
//                     Seminar
//                   </option>
//                 </select>

//                 <label>
//                   Date & Time
//                 </label>

//                 <input
//                   required
//                   type="datetime-local"
//                   min={getCurrentDateTime()}
//                   value={form.date}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       date: e.target.value,
//                     })
//                   }
//                 />

//                 <small className="input-help">
//                   Select a future date and time.
//                 </small>

//                 <label>
//                   Venue
//                 </label>

//                 <input
//                   required
//                   type="text"
//                   placeholder="College Auditorium"
//                   value={form.venue}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       venue: e.target.value,
//                     })
//                   }
//                 />

//                 <label>
//                   Description
//                 </label>

//                 <textarea
//                   placeholder="Describe your event..."
//                   value={form.description}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       description: e.target.value,
//                     })
//                   }
//                 />

//                 <label>
//                   Maximum Seats
//                 </label>

//                 <input
//                   required
//                   min="1"
//                   type="number"
//                   placeholder="50"
//                   value={form.maxSeats}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       maxSeats: e.target.value,
//                     })
//                   }
//                 />

//                 <button
//                   className="primary-btn"
//                   type="submit"
//                 >
//                   + Publish Event
//                 </button>

//               </form>

//             </div>

//             {/* EVENT LIST */}

//             <div>

//               <h2 className="section-heading">
//                 Your Events ({events.length})
//               </h2>

//               {events.map((event) => {

//                 const remaining =
//                   event.maxSeats -
//                   event.registrations.length;

//                 const soldOut = remaining <= 0;

//                 return (
//                   <div
//                     className="admin-event"
//                     key={event.id}
//                   >

//                     <div>

//                       <span className="badge">
//                         {event.category}
//                       </span>

//                       <h3>
//                         {event.title}
//                       </h3>

//                       <p>
//                         📍 {event.venue}
//                       </p>

//                       <p>
//                         📅 {formatDate(event.date)}
//                       </p>

//                     </div>

//                     <div className="seat-box">

//                       <strong>
//                         {remaining}
//                       </strong>

//                       <span>
//                         {soldOut
//                           ? "sold out"
//                           : "seats left"}
//                       </span>

//                       <small>
//                         {event.registrations.length} registered
//                       </small>

//                     </div>

//                     {event.registrations.length > 0 && (
//                       <div className="attendees">

//                         <strong>
//                           Registered Students
//                         </strong>

//                         {event.registrations.map(
//                           (user) => (
//                             <div
//                               className="attendee"
//                               key={user.id}
//                             >

//                               <div className="avatar">
//                                 {user.name
//                                   .charAt(0)
//                                   .toUpperCase()}
//                               </div>

//                               <div>

//                                 <strong>
//                                   {user.name}
//                                 </strong>

//                                 <small>
//                                   {user.email}
//                                 </small>

//                               </div>

//                             </div>
//                           )
//                         )}

//                       </div>
//                     )}

//                   </div>
//                 );
//               })}

//             </div>

//           </section>

//         </main>

//       </div>
//     );
//   }

//   // ---------------- DIGITAL PASS ----------------

//   if (pass) {
//     return (
//       <div className="app">

//         <Header
//           role="Student"
//           logout={logout}
//         />

//         <main className="container pass-page">

//           <button
//             className="back-btn"
//             onClick={() => setPass(null)}
//           >
//             ← Back to Events
//           </button>

//           <div className="pass-wrapper">

//             <div className="pass-header">

//               <div className="check">
//                 ✓
//               </div>

//               <p className="eyebrow">
//                 REGISTRATION CONFIRMED
//               </p>

//               <h1>
//                 Your Event Entry Pass
//               </h1>

//               <p>
//                 Show this pass at the event entrance.
//               </p>

//             </div>

//             <div className="ticket">

//               <div className="ticket-top">

//                 <span className="badge">
//                   {pass.event.category}
//                 </span>

//                 <span className="confirmed">
//                   ✓ CONFIRMED
//                 </span>

//               </div>

//               <h2>
//                 {pass.event.title}
//               </h2>

//               <p className="ticket-description">
//                 {pass.event.description}
//               </p>

//               <div className="ticket-info">

//                 <div>
//                   <span>
//                     Date & Time
//                   </span>

//                   <strong>
//                     {formatDate(pass.event.date)}
//                   </strong>
//                 </div>

//                 <div>
//                   <span>
//                     Venue
//                   </span>

//                   <strong>
//                     {pass.event.venue}
//                   </strong>
//                 </div>

//                 <div>
//                   <span>
//                     Participant
//                   </span>

//                   <strong>
//                     {pass.studentName}
//                   </strong>
//                 </div>

//                 <div>
//                   <span>
//                     Email
//                   </span>

//                   <strong>
//                     {pass.studentEmail}
//                   </strong>
//                 </div>

//               </div>

//               <div className="registration-id">

//                 <span>
//                   REGISTRATION ID
//                 </span>

//                 <strong>
//                   {pass.registrationId}
//                 </strong>

//               </div>

//             </div>

//           </div>

//         </main>

//       </div>
//     );
//   }

//   // ---------------- STUDENT EVENTS ----------------

//   return (
//     <div className="app">

//       <Header
//         role="Student"
//         logout={logout}
//       />

//       <main className="container">

//         <section className="student-hero">

//           <div>

//             <p className="eyebrow">
//               COLLEGE EVENTS
//             </p>

//             <h1>
//               Discover. Register. Participate.
//             </h1>

//             <p>
//               Find upcoming college events and secure
//               your seat before they fill up.
//             </p>

//           </div>

//           <div className="hero-stat">

//             <strong>
//               {events.length}
//             </strong>

//             <span>
//               Upcoming Events
//             </span>

//           </div>

//         </section>

//         {message && (
//           <div className="error">
//             {message}
//           </div>
//         )}

//         <div className="section-heading-row">

//           <div>

//             <h2>
//               Upcoming Events
//             </h2>

//             <p>
//               Choose an event and register instantly.
//             </p>

//           </div>

//         </div>

//         <section className="event-grid">

//           {events.map((event) => {

//             const remaining =
//               event.maxSeats -
//               event.registrations.length;

//             const soldOut = remaining <= 0;

//             return (
//               <div
//                 className="event-card"
//                 key={event.id}
//               >

//                 <div className="event-card-top">

//                   <span className="badge">
//                     {event.category}
//                   </span>

//                   <span
//                     className={
//                       soldOut
//                         ? "soldout"
//                         : "available"
//                     }
//                   >
//                     {soldOut
//                       ? "Sold Out"
//                       : `${remaining} seats left`}
//                   </span>

//                 </div>

//                 <h2>
//                   {event.title}
//                 </h2>

//                 <p className="description">
//                   {event.description}
//                 </p>

//                 <div className="event-details">

//                   <p>
//                     <span>📅</span>
//                     {formatDate(event.date)}
//                   </p>

//                   <p>
//                     <span>📍</span>
//                     {event.venue}
//                   </p>

//                 </div>

//                 <button
//                   className="primary-btn full"
//                   disabled={soldOut}
//                   onClick={() =>
//                     setSelectedEvent(event)
//                   }
//                 >
//                   {soldOut
//                     ? "Registration Closed"
//                     : "Register Now →"}
//                 </button>

//               </div>
//             );
//           })}

//         </section>

//       </main>

//       {/* REGISTRATION MODAL */}

//       {selectedEvent && (

//         <div className="modal">

//           <div className="modal-card">

//             <button
//               className="close"
//               onClick={() =>
//                 setSelectedEvent(null)
//               }
//             >
//               ×
//             </button>

//             <span className="badge">
//               {selectedEvent.category}
//             </span>

//             <h2>
//               {selectedEvent.title}
//             </h2>

//             <p className="muted">
//               Enter your details to confirm your
//               registration.
//             </p>

//             <div className="seat-notice">
//               💺{" "}
//               {selectedEvent.maxSeats -
//                 selectedEvent.registrations.length}{" "}
//               seats remaining
//             </div>

//             <label>
//               Full Name
//             </label>

//             <input
//               type="text"
//               placeholder="Enter your full name"
//               value={student.name}
//               onChange={(e) =>
//                 setStudent({
//                   ...student,
//                   name: e.target.value,
//                 })
//               }
//             />

//             <label>
//               Email Address
//             </label>

//             <input
//               type="email"
//               placeholder="student@example.com"
//               value={student.email}
//               onChange={(e) =>
//                 setStudent({
//                   ...student,
//                   email: e.target.value,
//                 })
//               }
//             />

//             <button
//               className="primary-btn full"
//               onClick={registerStudent}
//             >
//               Confirm Registration
//             </button>

//           </div>

//         </div>
//       )}

//     </div>
//   );
// }

// // ---------------- HEADER ----------------

// function Header({ role, logout }) {
//   return (
//     <header>

//       <div className="brand">

//         <div className="brand-icon">
//           CE
//         </div>

//         <div>
//           <strong>
//             CampusEvents
//           </strong>

//           <span>
//             College Registration Portal
//           </span>
//         </div>

//       </div>

//       <div className="header-right">

//         <span className="role">
//           {role === "Student"
//             ? "🎓 Student"
//             : "🧑‍💼 Organizer"}
//         </span>

//         <button
//           className="logout"
//           onClick={logout}
//         >
//           Logout
//         </button>

//       </div>

//     </header>
//   );
// }

// export default App;
import { useEffect, useState } from "react";
import "./App.css";

const initialEvents = [
  {
    id: 1,
    title: "Tech Fest 2026",
    category: "Technical",
    venue: "Seminar Hall",
    description:
      "A technical festival with coding, quiz and innovation events.",
    maxSeats: 50,
    registrations: [],
  },
  {
    id: 2,
    title: "Cultural Night",
    category: "Cultural",
    venue: "College Auditorium",
    description:
      "Music, dance and cultural performances by college students.",
    maxSeats: 100,
    registrations: [],
  },
];

function App() {
  const [role, setRole] = useState(null);

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("collegeEvents");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialEvents;
      }
    }

    return initialEvents;
  });

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [pass, setPass] = useState(null);
  const [message, setMessage] = useState("");

  const [student, setStudent] = useState({
    name: "",
    email: "",
  });

  const [form, setForm] = useState({
    title: "",
    category: "Technical",
    venue: "",
    description: "",
    maxSeats: "",
  });

  useEffect(() => {
    localStorage.setItem("collegeEvents", JSON.stringify(events));
  }, [events]);

  // ---------------- LOGOUT ----------------

  const logout = () => {
    setRole(null);
    setSelectedEvent(null);
    setPass(null);
    setMessage("");
  };

  // ---------------- CREATE EVENT ----------------

  const createEvent = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setMessage("Please enter an event title.");
      return;
    }

    if (!form.venue.trim()) {
      setMessage("Please enter the venue.");
      return;
    }

    if (Number(form.maxSeats) < 1) {
      setMessage("Maximum seats must be at least 1.");
      return;
    }

    const newEvent = {
      id: Date.now(),
      title: form.title.trim(),
      category: form.category,
      venue: form.venue.trim(),
      description:
        form.description.trim() ||
        "Join us for this exciting college event.",
      maxSeats: Number(form.maxSeats),
      registrations: [],
    };

    setEvents((previousEvents) => [
      ...previousEvents,
      newEvent,
    ]);

    setForm({
      title: "",
      category: "Technical",
      venue: "",
      description: "",
      maxSeats: "",
    });

    setMessage("Event created successfully!");
  };

  // ---------------- REGISTER STUDENT ----------------

  const registerStudent = () => {
    if (!student.name.trim()) {
      setMessage("Please enter your full name.");
      return;
    }

    if (!student.email.trim()) {
      setMessage("Please enter your email.");
      return;
    }

    const currentEvent = events.find(
      (event) => event.id === selectedEvent.id
    );

    if (!currentEvent) {
      setMessage("Event not found.");
      return;
    }

    const remainingSeats =
      currentEvent.maxSeats -
      currentEvent.registrations.length;

    // Full event check
    if (remainingSeats <= 0) {
      setMessage("Event registration is closed.");
      return;
    }

    // Duplicate registration check
    const duplicate = currentEvent.registrations.some(
      (user) =>
        user.email.toLowerCase() ===
        student.email.trim().toLowerCase()
    );

    if (duplicate) {
      setMessage("Already registered.");
      return;
    }

    // Generate unique registration ID
    const registrationId =
      "REG-" +
      Date.now().toString().slice(-6) +
      "-" +
      Math.random()
        .toString(36)
        .substring(2, 5)
        .toUpperCase();

    const registration = {
      id: registrationId,
      name: student.name.trim(),
      email: student.email.trim(),
    };

    const updatedEvents = events.map((event) =>
      event.id === selectedEvent.id
        ? {
            ...event,
            registrations: [
              ...event.registrations,
              registration,
            ],
          }
        : event
    );

    setEvents(updatedEvents);

    // Create digital pass
    setPass({
      registrationId,
      studentName: student.name.trim(),
      studentEmail: student.email.trim(),
      event: {
        ...currentEvent,
        registrations: [
          ...currentEvent.registrations,
          registration,
        ],
      },
    });

    setSelectedEvent(null);

    setStudent({
      name: "",
      email: "",
    });

    setMessage("");
  };

  // ---------------- LOGIN / ROLE SELECTION ----------------

  if (!role) {
    return (
      <div className="login-page">
        <div className="login-card">

          <div className="logo">
            CE
          </div>

          <h1>CampusEvents</h1>

          <p>
            College Event Registration Portal
          </p>

          <h3>Continue as</h3>

          <button
            className="role-btn"
            onClick={() => {
              setRole("student");
              setMessage("");
            }}
          >
            🎓 Student

            <span>
              Discover and register for events
            </span>
          </button>

          <button
            className="role-btn organizer"
            onClick={() => {
              setRole("organizer");
              setMessage("");
            }}
          >
            🧑‍💼 Organizer

            <span>
              Create events and manage participants
            </span>
          </button>

        </div>
      </div>
    );
  }

  // ---------------- ORGANIZER DASHBOARD ----------------

  if (role === "organizer") {
    return (
      <div className="app">

        <Header
          role="Organizer"
          logout={logout}
        />

        <main className="container">

          <div className="page-title">

            <div>
              <p className="eyebrow">
                ORGANIZER PANEL
              </p>

              <h1>
                Manage Events
              </h1>

              <p>
                Create events and track registered students.
              </p>
            </div>

          </div>

          {message && (
            <div className="success">
              {message}
            </div>
          )}

          <section className="dashboard-grid">

            {/* CREATE EVENT */}

            <div className="form-card">

              <h2>
                Create New Event
              </h2>

              <p className="muted">
                Publish an event with a participant limit.
              </p>

              <form onSubmit={createEvent}>

                <label>
                  Event Title
                </label>

                <input
                  required
                  type="text"
                  placeholder="e.g. Hackathon 2026"
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                />

                <label>
                  Category
                </label>

                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="Technical">
                    Technical
                  </option>

                  <option value="Cultural">
                    Cultural
                  </option>

                  <option value="Sports">
                    Sports
                  </option>

                  <option value="Workshop">
                    Workshop
                  </option>

                  <option value="Seminar">
                    Seminar
                  </option>
                </select>

                <label>
                  Venue
                </label>

                <input
                  required
                  type="text"
                  placeholder="College Auditorium"
                  value={form.venue}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      venue: e.target.value,
                    })
                  }
                />

                <label>
                  Description
                </label>

                <textarea
                  placeholder="Describe your event..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                />

                <label>
                  Maximum Seats
                </label>

                <input
                  required
                  min="1"
                  type="number"
                  placeholder="50"
                  value={form.maxSeats}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      maxSeats: e.target.value,
                    })
                  }
                />

                <button
                  className="primary-btn"
                  type="submit"
                >
                  + Publish Event
                </button>

              </form>

            </div>

            {/* EVENT LIST */}

            <div>

              <h2 className="section-heading">
                Your Events ({events.length})
              </h2>

              {events.map((event) => {

                const remaining =
                  event.maxSeats -
                  event.registrations.length;

                const soldOut = remaining <= 0;

                return (
                  <div
                    className="admin-event"
                    key={event.id}
                  >

                    <div>

                      <span className="badge">
                        {event.category}
                      </span>

                      <h3>
                        {event.title}
                      </h3>

                      <p>
                        📍 {event.venue}
                      </p>

                    </div>

                    <div className="seat-box">

                      <strong>
                        {remaining}
                      </strong>

                      <span>
                        {soldOut
                          ? "sold out"
                          : "seats left"}
                      </span>

                      <small>
                        {event.registrations.length} registered
                      </small>

                    </div>

                    {event.registrations.length > 0 && (
                      <div className="attendees">

                        <strong>
                          Registered Students
                        </strong>

                        {event.registrations.map(
                          (user) => (
                            <div
                              className="attendee"
                              key={user.id}
                            >

                              <div className="avatar">
                                {user.name
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div>

                                <strong>
                                  {user.name}
                                </strong>

                                <small>
                                  {user.email}
                                </small>

                              </div>

                            </div>
                          )
                        )}

                      </div>
                    )}

                  </div>
                );
              })}

            </div>

          </section>

        </main>

      </div>
    );
  }

  // ---------------- DIGITAL PASS ----------------

  if (pass) {
    return (
      <div className="app">

        <Header
          role="Student"
          logout={logout}
        />

        <main className="container pass-page">

          <button
            className="back-btn"
            onClick={() => setPass(null)}
          >
            ← Back to Events
          </button>

          <div className="pass-wrapper">

            <div className="pass-header">

              <div className="check">
                ✓
              </div>

              <p className="eyebrow">
                REGISTRATION CONFIRMED
              </p>

              <h1>
                Your Event Entry Pass
              </h1>

              <p>
                Show this pass at the event entrance.
              </p>

            </div>

            <div className="ticket">

              <div className="ticket-top">

                <span className="badge">
                  {pass.event.category}
                </span>

                <span className="confirmed">
                  ✓ CONFIRMED
                </span>

              </div>

              <h2>
                {pass.event.title}
              </h2>

              <p className="ticket-description">
                {pass.event.description}
              </p>

              <div className="ticket-info">

                <div>
                  <span>
                    Venue
                  </span>

                  <strong>
                    {pass.event.venue}
                  </strong>
                </div>

                <div>
                  <span>
                    Participant
                  </span>

                  <strong>
                    {pass.studentName}
                  </strong>
                </div>

                <div>
                  <span>
                    Email
                  </span>

                  <strong>
                    {pass.studentEmail}
                  </strong>
                </div>

              </div>

              <div className="registration-id">

                <span>
                  REGISTRATION ID
                </span>

                <strong>
                  {pass.registrationId}
                </strong>

              </div>

            </div>

          </div>

        </main>

      </div>
    );
  }

  // ---------------- STUDENT EVENTS ----------------

  return (
    <div className="app">

      <Header
        role="Student"
        logout={logout}
      />

      <main className="container">

        <section className="student-hero">

          <div>

            <p className="eyebrow">
              COLLEGE EVENTS
            </p>

            <h1>
              Discover. Register. Participate.
            </h1>

            <p>
              Find college events and secure
              your seat before they fill up.
            </p>

          </div>

          <div className="hero-stat">

            <strong>
              {events.length}
            </strong>

            <span>
              Available Events
            </span>

          </div>

        </section>

        {message && (
          <div className="error">
            {message}
          </div>
        )}

        <div className="section-heading-row">

          <div>

            <h2>
              College Events
            </h2>

            <p>
              Choose an event and register instantly.
            </p>

          </div>

        </div>

        <section className="event-grid">

          {events.map((event) => {

            const remaining =
              event.maxSeats -
              event.registrations.length;

            const soldOut = remaining <= 0;

            return (
              <div
                className="event-card"
                key={event.id}
              >

                <div className="event-card-top">

                  <span className="badge">
                    {event.category}
                  </span>

                  <span
                    className={
                      soldOut
                        ? "soldout"
                        : "available"
                    }
                  >
                    {soldOut
                      ? "Sold Out"
                      : `${remaining} seats left`}
                  </span>

                </div>

                <h2>
                  {event.title}
                </h2>

                <p className="description">
                  {event.description}
                </p>

                <div className="event-details">

                  <p>
                    <span>📍</span>
                    {event.venue}
                  </p>

                </div>

                <button
                  className="primary-btn full"
                  disabled={soldOut}
                  onClick={() =>
                    setSelectedEvent(event)
                  }
                >
                  {soldOut
                    ? "Registration Closed"
                    : "Register Now →"}
                </button>

              </div>
            );
          })}

        </section>

      </main>

      {/* REGISTRATION MODAL */}

      {selectedEvent && (

        <div className="modal">

          <div className="modal-card">

            <button
              className="close"
              onClick={() =>
                setSelectedEvent(null)
              }
            >
              ×
            </button>

            <span className="badge">
              {selectedEvent.category}
            </span>

            <h2>
              {selectedEvent.title}
            </h2>

            <p className="muted">
              Enter your details to confirm your
              registration.
            </p>

            <div className="seat-notice">
              💺{" "}
              {selectedEvent.maxSeats -
                selectedEvent.registrations.length}{" "}
              seats remaining
            </div>

            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={student.name}
              onChange={(e) =>
                setStudent({
                  ...student,
                  name: e.target.value,
                })
              }
            />

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="student@example.com"
              value={student.email}
              onChange={(e) =>
                setStudent({
                  ...student,
                  email: e.target.value,
                })
              }
            />

            <button
              className="primary-btn full"
              onClick={registerStudent}
            >
              Confirm Registration
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

// ---------------- HEADER ----------------

function Header({ role, logout }) {
  return (
    <header>

      <div className="brand">

        <div className="brand-icon">
          CE
        </div>

        <div>
          <strong>
            CampusEvents
          </strong>

          <span>
            College Registration Portal
          </span>
        </div>

      </div>

      <div className="header-right">

        <span className="role">
          {role === "Student"
            ? "🎓 Student"
            : "🧑‍💼 Organizer"}
        </span>

        <button
          className="logout"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default App;
