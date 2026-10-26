// Database and LocalStorage Storage Manager for CCMS

const DB_KEYS = {
  REGISTRATIONS: "ccms_registrations_v1",
  FEEDBACKS: "ccms_feedbacks_v1",
  SESSION: "ccms_session_v1",
  NOTIFICATIONS: "ccms_notifications_v1",
  USERS: "ccms_users_v1"
};

const CCMS_DB = {
  // Initialize mock DB
  init() {
    if (!localStorage.getItem(DB_KEYS.REGISTRATIONS)) {
      localStorage.setItem(
        DB_KEYS.REGISTRATIONS,
        JSON.stringify(window.CCMS_DATA ? window.CCMS_DATA.initialRegistrations : [])
      );
    }
    if (!localStorage.getItem(DB_KEYS.USERS)) {
      const defaultUsers = [
        {
          name: "Shorajit Das",
          email: "shorajid.das@campus.edu",
          password: "password123",
          role: "student",
          studentId: "STU-8821",
          dept: "Computer Science & Engineering"
        },
        {
          name: "Dr. Meenakshi Sundaram",
          email: "meenakshi.sundaram@campus.edu",
          password: "password123",
          role: "faculty",
          dept: "Performing Arts & Cultural Affairs"
        },
        {
          name: "Aarav Sharma",
          email: "aarav.sharma@campus.edu",
          password: "password123",
          role: "board",
          dept: "Central Student Board"
        }
      ];
      localStorage.setItem(DB_KEYS.USERS, JSON.stringify(defaultUsers));
    }
    if (!localStorage.getItem(DB_KEYS.FEEDBACKS)) {
      const sampleFeedbacks = [
        {
          id: "FB-001",
          studentName: "Shorajit Das",
          studentId: "STU-8821",
          clubId: "singing",
          eventName: "Silver Jubilee Grand Gala",
          submittedAt: "2026-10-25 04:30 PM",
          q1: ["Punctual Stage & Technical Setup", "High Quality Sound / Equipment Systems"],
          q2: "5 - World Class",
          q3: ["Expanded seating capacity for audience"],
          q4: "5 Stars",
          q5: "Absolutely Yes! (100% Recommended)",
          q6: ["Celebrity Singer / Band Concert Night", "Inter-College National Cultural Fest"]
        }
      ];
      localStorage.setItem(DB_KEYS.FEEDBACKS, JSON.stringify(sampleFeedbacks));
    }
    if (!localStorage.getItem(DB_KEYS.NOTIFICATIONS)) {
      const initialNotes = [
        {
          id: "N-1",
          title: "Welcome to CCMS 2026",
          message: "Check out the Silver Jubilee Singing Gala & National Hackathon now open for registrations!",
          time: "Just now",
          type: "info",
          read: false
        },
        {
          id: "N-2",
          title: "Certificate Portal Active",
          message: "Download your verifiable digital attendance certificate with official seal.",
          time: "2h ago",
          type: "success",
          read: false
        }
      ];
      localStorage.setItem(DB_KEYS.NOTIFICATIONS, JSON.stringify(initialNotes));
    }
  },

  // Registrations
  getRegistrations() {
    try {
      const data = localStorage.getItem(DB_KEYS.REGISTRATIONS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to load registrations:", e);
      return [];
    }
  },

  getRegistrationsByClub(clubId) {
    const list = this.getRegistrations();
    if (!clubId || clubId === "all") return list;
    return list.filter(r => r.clubId === clubId);
  },

  getRegistrationById(regId) {
    const list = this.getRegistrations();
    return list.find(r => r.regId === regId);
  },

  addRegistration(regData) {
    const list = this.getRegistrations();
    const newRecord = {
      regId: "REG-2026-" + Math.floor(1000 + Math.random() * 9000),
      studentId: regData.studentId || "STU-" + Math.floor(1000 + Math.random() * 9000),
      studentName: regData.studentName || "Anonymous Student",
      email: regData.email || "",
      phone: regData.phone || "",
      dept: regData.dept || "Computer Science",
      year: regData.year || "3rd Year",
      clubId: regData.clubId,
      clubName: regData.clubName,
      eventId: regData.eventId,
      eventName: regData.eventName,
      teamName: regData.teamName || "Individual Participant",
      teamMembers: regData.teamMembers || regData.studentName,
      registeredAt: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true
      }),
      status: "Approved", // Instant confirmation
      attendance: "Registered",
      certificateGenerated: false
    };

    list.unshift(newRecord);
    localStorage.setItem(DB_KEYS.REGISTRATIONS, JSON.stringify(list));

    // Update slots in memory
    const event = window.CCMS_DATA?.events.find(e => e.id === regData.eventId);
    if (event && event.slotsFilled < event.slotsTotal) {
      event.slotsFilled += 1;
    }

    // Add notification
    this.addNotification({
      title: "Registration Confirmed!",
      message: `You are officially registered for ${newRecord.eventName}. Pass ID: ${newRecord.regId}`,
      type: "success"
    });

    return newRecord;
  },

  updateRegistrationStatus(regId, status) {
    const list = this.getRegistrations();
    const item = list.find(r => r.regId === regId);
    if (item) {
      item.status = status;
      localStorage.setItem(DB_KEYS.REGISTRATIONS, JSON.stringify(list));
      return item;
    }
    return null;
  },

  updateAttendance(regId, attendance) {
    const list = this.getRegistrations();
    const item = list.find(r => r.regId === regId);
    if (item) {
      item.attendance = attendance;
      if (attendance === "Present") {
        item.certificateGenerated = true;
      }
      localStorage.setItem(DB_KEYS.REGISTRATIONS, JSON.stringify(list));
      return item;
    }
    return null;
  },

  // Feedbacks
  getFeedbacks() {
    try {
      const data = localStorage.getItem(DB_KEYS.FEEDBACKS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  addFeedback(feedback) {
    const list = this.getFeedbacks();
    const record = {
      id: "FB-" + Date.now(),
      submittedAt: new Date().toLocaleString(),
      ...feedback
    };
    list.unshift(record);
    localStorage.setItem(DB_KEYS.FEEDBACKS, JSON.stringify(list));
    this.addNotification({
      title: "Feedback Received",
      message: "Thank you for rating your event experience! Your feedback helps us improve.",
      type: "success"
    });
    return record;
  },

  // Notifications
  getNotifications() {
    try {
      const data = localStorage.getItem(DB_KEYS.NOTIFICATIONS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  addNotification({ title, message, type = "info" }) {
    const notes = this.getNotifications();
    const newNote = {
      id: "N-" + Date.now(),
      title,
      message,
      type,
      time: "Just now",
      read: false
    };
    notes.unshift(newNote);
    localStorage.setItem(DB_KEYS.NOTIFICATIONS, JSON.stringify(notes));
    // Trigger any active UI toast
    if (window.showLiveToast) {
      window.showLiveToast(title, message, type);
    }
    return newNote;
  },

  // User Accounts & Authentication
  getUsers() {
    try {
      const data = localStorage.getItem(DB_KEYS.USERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  registerUser(userData) {
    const users = this.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existing) {
      return { success: false, message: "An account with this college Gmail already exists." };
    }
    const newUser = {
      name: userData.name,
      email: userData.email.toLowerCase(),
      password: userData.password,
      role: userData.role || "student",
      studentId: userData.studentId || "STU-" + Math.floor(1000 + Math.random() * 9000),
      dept: userData.dept || "Computer Science & Engineering"
    };
    users.push(newUser);
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
    this.setSession(newUser);
    return { success: true, user: newUser };
  },

  loginUser(email, password, expectedRole = null) {
    const users = this.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (!user) {
      return { success: false, message: "No account found with this college Gmail address." };
    }
    if (user.password !== password) {
      return { success: false, message: "Incorrect password. Please try again." };
    }
    if (expectedRole && user.role !== expectedRole) {
      return {
        success: false,
        message: `Account is registered as '${user.role.toUpperCase()}', but you selected '${expectedRole.toUpperCase()}'. Please select the correct role tab.`
      };
    }
    this.setSession(user);
    return { success: true, user };
  },

  logoutUser() {
    localStorage.removeItem(DB_KEYS.SESSION);
  },

  // Active Session
  getSession() {
    try {
      const data = localStorage.getItem(DB_KEYS.SESSION);
      if (data) return JSON.parse(data);
    } catch (e) {}
    return null;
  },

  setSession(sessionData) {
    localStorage.setItem(DB_KEYS.SESSION, JSON.stringify(sessionData));
  },

  // Export registrations as CSV
  exportCSV(clubId = null) {
    const list = this.getRegistrationsByClub(clubId);
    if (!list.length) {
      alert("No registration records found to export.");
      return;
    }

    const headers = [
      "Registration ID",
      "Student ID",
      "Student Name",
      "Email",
      "Phone",
      "Department",
      "Year",
      "Club Name",
      "Event Name",
      "Team Name",
      "Team Members",
      "Registered At",
      "Status",
      "Attendance"
    ];

    const rows = list.map(r => [
      `"${r.regId}"`,
      `"${r.studentId}"`,
      `"${r.studentName}"`,
      `"${r.email}"`,
      `"${r.phone}"`,
      `"${r.dept}"`,
      `"${r.year}"`,
      `"${r.clubName}"`,
      `"${r.eventName}"`,
      `"${r.teamName}"`,
      `"${r.teamMembers}"`,
      `"${r.registeredAt}"`,
      `"${r.status}"`,
      `"${r.attendance}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CCMS_Registrations_${clubId || "All"}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Initialize DB immediately
CCMS_DB.init();

if (typeof window !== "undefined") {
  window.CCMS_DB = CCMS_DB;
}
