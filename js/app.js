// Smart College Club Management System (CCMS) - Main Logic Engine

document.addEventListener("DOMContentLoaded", () => {
  // Ensure DB initialized
  if (window.CCMS_DB) {
    window.CCMS_DB.init();
  }

  // State Management
  const state = {
    currentRole: "student", // 'student' | 'faculty' | 'board'
    selectedClubId: "singing", // default selected club
    activeFilter: "all",
    searchQuery: "",
    activeModalEvent: null,
    currentCertificateReg: null,
    drawerOpen: false,
    drawerTab: "feedback" // 'feedback' | 'certificate' | 'notifications'
  };

  // Cache DOM Elements
  const elements = {
    // Portals
    studentPortal: document.getElementById("studentPortalView"),
    facultyPortal: document.getElementById("facultyPortalView"),
    boardPortal: document.getElementById("boardPortalView"),

    // Nav Role Buttons
    btnRoleStudent: document.getElementById("btnRoleStudent"),
    btnRoleFaculty: document.getElementById("btnRoleFaculty"),
    btnRoleBoard: document.getElementById("btnRoleBoard"),

    // User Profile Display
    userAvatar: document.getElementById("userAvatar"),
    userName: document.getElementById("userName"),
    userRoleLabel: document.getElementById("userRoleLabel"),

    // Search Bar
    globalSearchInput: document.getElementById("globalSearchInput"),

    // Student View Elements
    clubsGrid: document.getElementById("clubsGrid"),
    eventsGrid: document.getElementById("eventsGrid"),
    filterChipsContainer: document.getElementById("filterChipsContainer"),
    selectedClubBanner: document.getElementById("selectedClubBanner"),
    selectedClubTitle: document.getElementById("selectedClubTitle"),
    selectedClubDesc: document.getElementById("selectedClubDesc"),

    // Faculty Elements
    facultyClubSelect: document.getElementById("facultyClubSelect"),
    facultyTableBody: document.getElementById("facultyTableBody"),
    facultySearchInput: document.getElementById("facultySearchInput"),
    facultyStatusFilter: document.getElementById("facultyStatusFilter"),
    facultyExportBtn: document.getElementById("facultyExportBtn"),
    statTotalRegistrations: document.getElementById("statTotalRegistrations"),
    statApprovedCount: document.getElementById("statApprovedCount"),
    statAttendanceCount: document.getElementById("statAttendanceCount"),
    statActiveEventsCount: document.getElementById("statActiveEventsCount"),

    // Board Member Elements
    boardClubSelect: document.getElementById("boardClubSelect"),
    boardTimelineContainer: document.getElementById("boardTimelineContainer"),

    // Modals
    eventDetailModal: document.getElementById("eventDetailModal"),
    closeEventDetailBtn: document.getElementById("closeEventDetailBtn"),
    registrationModal: document.getElementById("registrationModal"),
    closeRegModalBtn: document.getElementById("closeRegModalBtn"),
    registrationForm: document.getElementById("registrationForm"),
    confirmationModal: document.getElementById("confirmationModal"),
    closeConfirmModalBtn: document.getElementById("closeConfirmModalBtn"),

    // Floating Corner Drawer
    fabToggleBtn: document.getElementById("fabToggleBtn"),
    cornerDrawer: document.getElementById("cornerDrawer"),
    closeDrawerBtn: document.getElementById("closeDrawerBtn"),
    drawerNotificationBadge: document.getElementById("drawerNotificationBadge"),
    tabBtnFeedback: document.getElementById("tabBtnFeedback"),
    tabBtnCertificate: document.getElementById("tabBtnCertificate"),
    tabBtnNotifications: document.getElementById("tabBtnNotifications"),
    feedbackPane: document.getElementById("feedbackPane"),
    certificatePane: document.getElementById("certificatePane"),
    notificationsPane: document.getElementById("notificationsPane"),
    feedbackForm: document.getElementById("feedbackForm"),
    certCanvas: document.getElementById("certCanvas"),
    btnDownloadCert: document.getElementById("btnDownloadCert"),
    certSelectReg: document.getElementById("certSelectReg"),

    // Toast Container
    toastContainer: document.getElementById("toastContainer"),

    // Bottom Now-Playing
    bottomEventTitle: document.getElementById("bottomEventTitle"),
    bottomEventClub: document.getElementById("bottomEventClub"),
    bottomEventThumb: document.getElementById("bottomEventThumb")
  };

  // Toast Function
  window.showLiveToast = function (title, message, type = "info") {
    if (!elements.toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "toast-item";
    toast.innerHTML = `
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    `;
    elements.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      toast.style.opacity = "0";
      toast.style.transform = "translateX(50px)";
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  };

  // Define renderStudentView
  function renderStudentView() {
    renderClubCards();
    renderFilterChips();
    renderEvents();
  }

  // --- 0. AUTHENTICATION & ROLE-ISOLATED DASHBOARD SYSTEM ---
  function initApp() {
    setupAuthModal();
    setupStudentPortal();
    setupFacultyPortal();
    setupBoardPortal();
    setupModals();
    setupCornerDrawer();
    setupSearch();

    // Expose core navigation functions to window for onclick handlers
    window.selectClub = selectClub;
    window.openCornerDrawer = openCornerDrawer;
    window.openRegistrationModal = openRegistrationModal;
    window.openEventDetails = openEventDetails;
    window.handleLogout = handleLogout;

    // Check active login session
    const session = window.CCMS_DB.getSession();
    if (!session) {
      showAuthModal();
    } else {
      applyAuthenticatedUser(session);
    }
  }

  // Setup Auth Modal UI and Handlers
  function setupAuthModal() {
    let authModal = document.getElementById("authModal");
    if (!authModal) {
      authModal = document.createElement("div");
      authModal.id = "authModal";
      authModal.className = "auth-modal-overlay";
      authModal.innerHTML = `
        <div class="auth-modal-card">
          <div class="auth-header">
            <div class="auth-logo-badge" id="authLogoBadge">
              <i class="fa-solid fa-graduation-cap" id="authLogoIcon"></i>
            </div>
            <h3 id="authModalTitle">PulseCampus Sign In</h3>
            <p id="authModalSubtitle">Enter your name, password and college Gmail to access your dashboard</p>
          </div>

          <!-- Role Selector Tabs -->
          <div class="auth-role-tabs" id="authRoleTabs">
            <button type="button" class="auth-role-tab active student" data-role="student">
              <i class="fa-solid fa-graduation-cap"></i> Student
            </button>
            <button type="button" class="auth-role-tab" data-role="faculty">
              <i class="fa-solid fa-chalkboard-user"></i> Faculty
            </button>
            <button type="button" class="auth-role-tab" data-role="board">
              <i class="fa-solid fa-shield-halved"></i> Board Lead
            </button>
          </div>

          <div class="auth-error-alert" id="authErrorAlert"></div>

          <!-- Login / Register Form -->
          <form id="authLoginForm" class="auth-form">
            <div class="form-group" id="authNameGroup">
              <label>Full Name *</label>
              <input type="text" id="authInputName" value="Shorajit Das" placeholder="e.g. Shorajit Das" required>
            </div>

            <div class="form-group">
              <label>College Gmail / Email Address *</label>
              <input type="email" id="authInputEmail" value="shorajid.das@campus.edu" placeholder="name@campus.edu or name@gmail.com" required>
            </div>

            <div class="form-group">
              <label>Password *</label>
              <input type="password" id="authInputPassword" value="password123" placeholder="••••••••" required>
            </div>

            <button type="submit" class="btn-primary-spotify" id="authSubmitBtn" style="width: 100%; justify-content: center; margin-top: 0.5rem;">
              <i class="fa-solid fa-right-to-bracket"></i> <span id="authSubmitText">Log In & Access Dashboard</span>
            </button>
          </form>

          <div style="text-align: center; margin-top: 1rem; font-size: 0.8rem; color: var(--text-secondary);">
            <span id="authSwitchPrompt">New to PulseCampus?</span>
            <button type="button" id="authSwitchModeBtn" style="background: none; border: none; color: var(--accent-spotify); font-weight: 700; cursor: pointer; text-decoration: underline; margin-left: 0.25rem;">
              Register New Account
            </button>
          </div>

          <!-- Quick 1-Click Demo Accounts -->
          <div class="quick-demo-accounts">
            <div class="quick-demo-title">
              <span>⚡ Fast Demo 1-Click Login:</span>
              <span style="font-size: 0.68rem; color: var(--accent-spotify);">Instant Autofill</span>
            </div>
            <div class="quick-demo-chips">
              <button type="button" class="demo-chip-btn" data-demo="student">
                <div>
                  <strong style="color: #1db954;"><i class="fa-solid fa-graduation-cap"></i> Student:</strong> Shorajit Das
                </div>
                <span style="color: var(--text-muted); font-size: 0.72rem;">shorajid.das@campus.edu</span>
              </button>
              <button type="button" class="demo-chip-btn" data-demo="faculty">
                <div>
                  <strong style="color: #8c52ff;"><i class="fa-solid fa-chalkboard-user"></i> Faculty:</strong> Dr. Meenakshi Sundaram
                </div>
                <span style="color: var(--text-muted); font-size: 0.72rem;">meenakshi.sundaram@campus.edu</span>
              </button>
              <button type="button" class="demo-chip-btn" data-demo="board">
                <div>
                  <strong style="color: #ff9100;"><i class="fa-solid fa-shield-halved"></i> Board Lead:</strong> Aarav Sharma
                </div>
                <span style="color: var(--text-muted); font-size: 0.72rem;">aarav.sharma@campus.edu</span>
              </button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(authModal);
    }

    // Role tabs logic
    let selectedRole = "student";
    let isRegisterMode = false;

    const roleTabs = authModal.querySelectorAll(".auth-role-tab");
    roleTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        roleTabs.forEach(t => t.classList.remove("active", "student", "faculty", "board"));
        selectedRole = tab.getAttribute("data-role");
        tab.classList.add("active", selectedRole);

        // Update logo icon & color
        const logoBadge = document.getElementById("authLogoBadge");
        const logoIcon = document.getElementById("authLogoIcon");
        if (selectedRole === "student") {
          logoBadge.style.background = "linear-gradient(135deg, #1db954, #00f2fe)";
          logoIcon.className = "fa-solid fa-graduation-cap";
        } else if (selectedRole === "faculty") {
          logoBadge.style.background = "linear-gradient(135deg, #8c52ff, #00f2fe)";
          logoIcon.className = "fa-solid fa-chalkboard-user";
        } else {
          logoBadge.style.background = "linear-gradient(135deg, #ff9100, #ff2a70)";
          logoIcon.className = "fa-solid fa-shield-halved";
        }

        // Auto pre-fill demo values when role tab switched
        autofillDemoRole(selectedRole);
      });
    });

    // Demo Fill Chips
    authModal.querySelectorAll(".demo-chip-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const demoRole = btn.getAttribute("data-demo");
        const matchingTab = authModal.querySelector(`.auth-role-tab[data-role="${demoRole}"]`);
        if (matchingTab) matchingTab.click();
      });
    });

    function autofillDemoRole(role) {
      const emailInput = document.getElementById("authInputEmail");
      const nameInput = document.getElementById("authInputName");
      const pwdInput = document.getElementById("authInputPassword");

      if (role === "student") {
        if (nameInput) nameInput.value = "Shorajit Das";
        if (emailInput) emailInput.value = "shorajid.das@campus.edu";
        if (pwdInput) pwdInput.value = "password123";
      } else if (role === "faculty") {
        if (nameInput) nameInput.value = "Dr. Meenakshi Sundaram";
        if (emailInput) emailInput.value = "meenakshi.sundaram@campus.edu";
        if (pwdInput) pwdInput.value = "password123";
      } else if (role === "board") {
        if (nameInput) nameInput.value = "Aarav Sharma";
        if (emailInput) emailInput.value = "aarav.sharma@campus.edu";
        if (pwdInput) pwdInput.value = "password123";
      }
    }

    // Switch between Sign in and Register
    const switchBtn = document.getElementById("authSwitchModeBtn");
    const switchPrompt = document.getElementById("authSwitchPrompt");
    const submitText = document.getElementById("authSubmitText");
    const modalTitle = document.getElementById("authModalTitle");

    if (switchBtn) {
      switchBtn.addEventListener("click", () => {
        isRegisterMode = !isRegisterMode;
        if (isRegisterMode) {
          modalTitle.textContent = "PulseCampus Registration";
          submitText.textContent = "Register & Enter Dashboard";
          switchPrompt.textContent = "Already have a college account?";
          switchBtn.textContent = "Sign In Instead";
        } else {
          modalTitle.textContent = "PulseCampus Sign In";
          submitText.textContent = "Log In & Access Dashboard";
          switchPrompt.textContent = "New to PulseCampus?";
          switchBtn.textContent = "Register New Account";
        }
      });
    }

    // Form submission
    const form = document.getElementById("authLoginForm");
    const errorAlert = document.getElementById("authErrorAlert");

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        errorAlert.style.display = "none";

        const name = document.getElementById("authInputName").value.trim();
        const email = document.getElementById("authInputEmail").value.trim();
        const password = document.getElementById("authInputPassword").value.trim();

        if (!email || !password) {
          errorAlert.textContent = "Please fill in both your college Gmail and password.";
          errorAlert.style.display = "block";
          return;
        }

        if (isRegisterMode) {
          const res = window.CCMS_DB.registerUser({
            name: name || "Campus User",
            email,
            password,
            role: selectedRole
          });
          if (!res.success) {
            errorAlert.textContent = res.message;
            errorAlert.style.display = "block";
            return;
          }
          hideAuthModal();
          window.showLiveToast("Account Created", `Welcome, ${res.user.name}! Accessing ${selectedRole.toUpperCase()} Dashboard`, "success");
          applyAuthenticatedUser(res.user);
        } else {
          const res = window.CCMS_DB.loginUser(email, password, selectedRole);
          if (!res.success) {
            errorAlert.textContent = res.message;
            errorAlert.style.display = "block";
            return;
          }
          hideAuthModal();
          window.showLiveToast("Logged In", `Welcome back, ${res.user.name}!`, "success");
          applyAuthenticatedUser(res.user);
        }
      });
    }

    // Hook Logout button if present
    document.querySelectorAll(".btn-logout, #btnLogout").forEach(btn => {
      btn.addEventListener("click", handleLogout);
    });
  }

  function showAuthModal() {
    const modal = document.getElementById("authModal");
    if (modal) modal.classList.add("active");
  }

  function hideAuthModal() {
    const modal = document.getElementById("authModal");
    if (modal) modal.classList.remove("active");
  }

  function handleLogout() {
    window.CCMS_DB.logoutUser();
    window.showLiveToast("Logged Out", "You have signed out of PulseCampus.", "info");
    showAuthModal();
  }

  // --- STRICT DASHBOARD ROLE ISOLATION ---
  function applyAuthenticatedUser(user) {
    state.currentRole = user.role;

    // 1. Update 2D Animated Avatar (No human face photo!)
    const avatarBox = document.getElementById("user2dAvatar");
    const avatarIcon = document.getElementById("avatarIcon");
    if (avatarBox && avatarIcon) {
      avatarBox.className = `user-2d-avatar ${user.role}`;
      if (user.role === "student") {
        avatarIcon.className = "fa-solid fa-graduation-cap";
      } else if (user.role === "faculty") {
        avatarIcon.className = "fa-solid fa-chalkboard-user";
      } else if (user.role === "board") {
        avatarIcon.className = "fa-solid fa-shield-halved";
      }
    }

    // Update user info labels
    if (elements.userName) elements.userName.textContent = user.name;
    if (elements.userRoleLabel) {
      if (user.role === "student") elements.userRoleLabel.textContent = "Student Participant";
      else if (user.role === "faculty") elements.userRoleLabel.textContent = "Faculty Mentor";
      else if (user.role === "board") elements.userRoleLabel.textContent = "Board Member / Lead";
    }

    // Check page context (if on dedicated student.html / faculty.html / board.html)
    const pageDefaultRole = document.body ? document.body.getAttribute("data-default-role") : null;
    const pathname = window.location.pathname.toLowerCase();

    // Check if user role matches the dedicated page
    let pageRestricted = false;
    let requiredRoleName = "";

    if (pageDefaultRole === "student" && user.role !== "student" && pathname.includes("student")) {
      pageRestricted = true;
      requiredRoleName = "Student Participant";
    } else if (pageDefaultRole === "faculty" && user.role !== "faculty" && pathname.includes("faculty")) {
      pageRestricted = true;
      requiredRoleName = "Faculty Mentor";
    } else if (pageDefaultRole === "board" && user.role !== "board" && pathname.includes("board")) {
      pageRestricted = true;
      requiredRoleName = "Board Member / Lead";
    }

    if (pageRestricted) {
      renderRoleLockoutScreen(user, requiredRoleName);
      return;
    }

    // 2. Strict Viewport Isolation: Only the logged-in dashboard is displayed!
    if (elements.studentPortal) {
      elements.studentPortal.style.display = user.role === "student" ? "block" : "none";
    }
    if (elements.facultyPortal) {
      elements.facultyPortal.style.display = user.role === "faculty" ? "block" : "none";
    }
    if (elements.boardPortal) {
      elements.boardPortal.style.display = user.role === "board" ? "block" : "none";
    }

    // 3. Update Nav Role Pills in Header
    [elements.btnRoleStudent, elements.btnRoleFaculty, elements.btnRoleBoard].forEach(b => {
      if (b) {
        b.classList.remove("active", "faculty", "board");
        b.style.pointerEvents = "auto";
        b.style.opacity = "0.4";
        b.title = "Switching restricted: Log in with that role's credentials";
      }
    });

    if (user.role === "student" && elements.btnRoleStudent) {
      elements.btnRoleStudent.classList.add("active");
      elements.btnRoleStudent.style.opacity = "1";
    } else if (user.role === "faculty" && elements.btnRoleFaculty) {
      elements.btnRoleFaculty.classList.add("active", "faculty");
      elements.btnRoleFaculty.style.opacity = "1";
    } else if (user.role === "board" && elements.btnRoleBoard) {
      elements.btnRoleBoard.classList.add("active", "board");
      elements.btnRoleBoard.style.opacity = "1";
    }

    // If a student tries to click faculty or board pill, warn them
    [
      { btn: elements.btnRoleStudent, role: "student", label: "Student" },
      { btn: elements.btnRoleFaculty, role: "faculty", label: "Faculty" },
      { btn: elements.btnRoleBoard, role: "board", label: "Board Member" }
    ].forEach(({ btn, role, label }) => {
      if (!btn) return;
      btn.onclick = () => {
        if (role !== user.role) {
          window.showLiveToast("Access Restricted", `You are logged in as ${user.role.toUpperCase()}. Please Log Out to access ${label} portal.`, "info");
        }
      };
    });

    // 4. Render Data for Active Role
    if (user.role === "student") {
      renderStudentView();
    } else if (user.role === "faculty") {
      renderFacultyView();
    } else if (user.role === "board") {
      renderBoardView();
    }
  }

  function renderRoleLockoutScreen(user, requiredRoleName) {
    const mainViewport = document.querySelector(".main-viewport");
    if (!mainViewport) return;

    mainViewport.innerHTML = `
      <div class="role-lockout-card">
        <div style="width: 72px; height: 72px; border-radius: 50%; background: rgba(255, 42, 112, 0.15); border: 2px solid var(--accent-rose); color: var(--accent-rose); font-size: 2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
          <i class="fa-solid fa-lock"></i>
        </div>
        <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 1.8rem; font-weight: 800; color: #fff;">
          Dashboard Access Restricted
        </h3>
        <p style="color: var(--text-secondary); margin: 0.75rem 0 1.5rem; font-size: 0.95rem; line-height: 1.5;">
          You are currently signed in as <strong>${user.name}</strong> (<span style="color: var(--accent-spotify); text-transform: uppercase; font-weight: 700;">${user.role}</span>).<br>
          This dashboard requires <strong>${requiredRoleName}</strong> credentials.
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
          <button class="btn-primary-spotify" onclick="handleLogout()">
            <i class="fa-solid fa-right-from-bracket"></i> Log Out & Switch Account
          </button>
          <a href="index.html" class="btn-secondary-glass" style="text-decoration: none;">
            <i class="fa-solid fa-house"></i> Return to Main Hub
          </a>
        </div>
      </div>
    `;
  }

  // --- 2. STUDENT PORTAL LOGIC ---
  function setupStudentPortal() {
    renderClubCards();
    renderFilterChips();
    renderEvents();
  }

  function renderClubCards() {
    if (!elements.clubsGrid) return;
    const clubs = window.CCMS_DATA.clubs;

    elements.clubsGrid.innerHTML = clubs.map(club => `
      <div class="club-card-premium ${club.id === state.selectedClubId ? 'active-filter' : ''}" data-club-id="${club.id}">
        <div class="club-card-cover">
          <img src="${club.coverImage}" alt="${club.name}" loading="lazy">
          <div class="club-badge-overlay">
            <i class="fa-solid fa-fire" style="color: #ffb703;"></i>
            ${club.badge}
          </div>
          <div class="club-events-counter">
            ${club.activeEvents} Events
          </div>
        </div>
        <div class="club-card-body">
          <div class="club-name-row">
            <img src="${club.avatarImage}" class="club-avatar-mini" alt="${club.name}">
            <div class="club-title-text">
              <h4>${club.name}</h4>
              <span>${club.category}</span>
            </div>
          </div>
          <p class="club-desc">${club.shortDesc}</p>
          <div class="club-meta-footer">
            <span>Members: <strong>${club.membersCount}</strong></span>
            <button class="btn-explore-club" data-club-id="${club.id}">
              Explore Events <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    `).join("");

    // Add click listeners to club cards
    elements.clubsGrid.querySelectorAll(".club-card-premium, .btn-explore-club").forEach(el => {
      el.addEventListener("click", (e) => {
        const clubId = el.getAttribute("data-club-id") || el.closest(".club-card-premium").getAttribute("data-club-id");
        selectClub(clubId);
      });
    });
  }

  function selectClub(clubId) {
    state.selectedClubId = clubId;
    state.activeFilter = clubId;

    // Highlight active in cards and chips
    document.querySelectorAll(".club-card-premium").forEach(card => {
      card.classList.toggle("active-filter", card.getAttribute("data-club-id") === clubId);
    });

    document.querySelectorAll(".chip-btn").forEach(chip => {
      chip.classList.toggle("active", chip.getAttribute("data-filter") === clubId);
    });

    const club = window.CCMS_DATA.clubs.find(c => c.id === clubId);
    if (club && elements.selectedClubTitle && elements.selectedClubDesc) {
      elements.selectedClubTitle.textContent = `${club.name} – Events Schedule`;
      elements.selectedClubDesc.textContent = `Showing 10 curated competitive events organized by ${club.name}. Register directly below!`;
    }

    renderEvents();

    // Smooth scroll down to events section
    const evtSec = document.getElementById("eventsSection");
    if (evtSec) {
      evtSec.scrollIntoView({ behavior: "smooth" });
    }
  }

  function renderFilterChips() {
    if (!elements.filterChipsContainer) return;

    const chips = [
      { id: "all", label: "🔥 All 60 Events" },
      { id: "singing", label: "🎤 Singing Club (10)" },
      { id: "dancing", label: "💃 Dancing Club (10)" },
      { id: "hackathons", label: "💻 Hackathons (10)" },
      { id: "sports", label: "🏆 Sports League (10)" },
      { id: "research", label: "🔬 Research Labs (10)" },
      { id: "fashion", label: "✨ Fashion Guild (10)" }
    ];

    elements.filterChipsContainer.innerHTML = chips.map(chip => `
      <button class="chip-btn ${chip.id === state.activeFilter ? 'active' : ''}" data-filter="${chip.id}">
        ${chip.label}
      </button>
    `).join("");

    elements.filterChipsContainer.querySelectorAll(".chip-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-filter");
        state.activeFilter = filter;
        if (filter !== "all") {
          state.selectedClubId = filter;
        }
        document.querySelectorAll(".chip-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderEvents();
      });
    });
  }

  function renderEvents() {
    if (!elements.eventsGrid) return;

    let events = window.CCMS_DATA.events;

    // Filter by club if not 'all'
    if (state.activeFilter !== "all") {
      events = events.filter(e => e.clubId === state.activeFilter);
    }

    // Filter by search query if any
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase();
      events = events.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.tagline.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q)
      );
    }

    if (events.length === 0) {
      elements.eventsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">
          <i class="fa-solid fa-search" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--text-muted);"></i>
          <h3>No matching events found</h3>
          <p>Try searching for a different event title or clear your filters.</p>
        </div>
      `;
      return;
    }

    elements.eventsGrid.innerHTML = events.map(evt => {
      const fillPercent = Math.min(100, Math.round((evt.slotsFilled / evt.slotsTotal) * 100));
      const club = window.CCMS_DATA.clubs.find(c => c.id === evt.clubId);

      return `
        <div class="event-product-card" data-event-id="${evt.id}">
          <div class="event-card-media">
            <img src="${evt.banner}" alt="${evt.name}" loading="lazy">
            <div class="event-media-gradient"></div>
            <div class="event-tag-badge ${evt.badge.includes('Silver') ? 'silver' : ''}">
              ${evt.badge}
            </div>
            <div class="event-time-badge">
              <i class="fa-regular fa-calendar"></i>
              ${evt.date}
            </div>
          </div>
          <div class="event-card-content">
            <div class="event-club-category">
              ${club ? club.name : evt.clubId.toUpperCase()} • ${evt.category}
            </div>
            <h4 class="event-product-title">${evt.name}</h4>
            <p class="event-product-tagline">${evt.tagline}</p>

            <div class="event-specs-table">
              <div class="spec-row">
                <span>Venue:</span>
                <strong>${evt.venue.split('(')[0]}</strong>
              </div>
              <div class="spec-row">
                <span>Team:</span>
                <strong>${evt.teamSize}</strong>
              </div>
              <div class="spec-row">
                <span>Time:</span>
                <strong>${evt.time}</strong>
              </div>
            </div>

            <div class="slots-container">
              <div class="slots-label-row">
                <span>Registrations: <strong>${evt.slotsFilled}/${evt.slotsTotal}</strong></span>
                <span>${fillPercent}% Filled</span>
              </div>
              <div class="slots-track">
                <div class="slots-bar" style="width: ${fillPercent}%;"></div>
              </div>
            </div>

            <div class="event-card-actions">
              <button class="btn-card-register" data-action="register" data-event-id="${evt.id}">
                Register Now
              </button>
              <button class="btn-card-details" data-action="details" data-event-id="${evt.id}">
                Details
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    // Hook card action buttons
    elements.eventsGrid.querySelectorAll("button[data-action]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const action = btn.getAttribute("data-action");
        const eventId = btn.getAttribute("data-event-id");
        const eventObj = window.CCMS_DATA.events.find(e => e.id === eventId);
        if (!eventObj) return;

        if (action === "details") {
          openEventDetails(eventObj);
        } else if (action === "register") {
          openRegistrationModal(eventObj);
        }
      });
    });

    // Also click card itself to open details
    elements.eventsGrid.querySelectorAll(".event-product-card").forEach(card => {
      card.addEventListener("click", (e) => {
        if (e.target.closest("button")) return;
        const eventId = card.getAttribute("data-event-id");
        const eventObj = window.CCMS_DATA.events.find(e => e.id === eventId);
        if (eventObj) openEventDetails(eventObj);
      });
    });
  }

  // --- 3. EVENT DETAILS & REGISTRATION MODALS ---
  function setupModals() {
    if (elements.closeEventDetailBtn) {
      elements.closeEventDetailBtn.addEventListener("click", () => {
        elements.eventDetailModal.classList.remove("active");
      });
    }

    if (elements.closeRegModalBtn) {
      elements.closeRegModalBtn.addEventListener("click", () => {
        elements.registrationModal.classList.remove("active");
      });
    }

    if (elements.closeConfirmModalBtn) {
      elements.closeConfirmModalBtn.addEventListener("click", () => {
        elements.confirmationModal.classList.remove("active");
      });
    }

    // Close on overlay click
    [elements.eventDetailModal, elements.registrationModal, elements.confirmationModal].forEach(modal => {
      if (modal) {
        modal.addEventListener("click", (e) => {
          if (e.target === modal) modal.classList.remove("active");
        });
      }
    });

    // Registration Form Submit Handler
    if (elements.registrationForm) {
      elements.registrationForm.addEventListener("submit", (e) => {
        e.preventDefault();
        submitRegistration();
      });
    }
  }

  function openEventDetails(eventObj) {
    state.activeModalEvent = eventObj;
    const club = window.CCMS_DATA.clubs.find(c => c.id === eventObj.clubId);

    const modalBody = elements.eventDetailModal.querySelector(".modal-container");
    modalBody.innerHTML = `
      <button class="modal-close-btn" id="modalCloseAction"><i class="fa-solid fa-xmark"></i></button>
      <div class="modal-hero-cover">
        <img src="${eventObj.banner}" alt="${eventObj.name}">
        <div class="cover-gradient"></div>
      </div>
      <div class="modal-body">
        <div class="modal-title-group">
          <span style="color: var(--accent-spotify); font-size: 0.8rem; font-weight: 700; text-transform: uppercase;">
            ${club ? club.name : ''} • ${eventObj.category}
          </span>
          <h3>${eventObj.name}</h3>
          <p>${eventObj.tagline}</p>
        </div>

        <div class="info-cards-grid">
          <div class="info-card-box">
            <span>Date & Time</span>
            <strong>${eventObj.date}<br>${eventObj.time}</strong>
          </div>
          <div class="info-card-box">
            <span>Venue</span>
            <strong>${eventObj.venue}</strong>
          </div>
          <div class="info-card-box">
            <span>Team Configuration</span>
            <strong>${eventObj.teamSize}</strong>
          </div>
          <div class="info-card-box">
            <span>Faculty Mentor</span>
            <strong>${eventObj.facultyInCharge}</strong>
          </div>
        </div>

        <div class="modal-rules-section">
          <h5><i class="fa-solid fa-list-check" style="color: var(--accent-spotify);"></i> Official Competition Rules</h5>
          <ul class="modal-rules-list">
            ${eventObj.rules.map(r => `<li>${r}</li>`).join("")}
          </ul>
        </div>

        <div class="modal-rules-section" style="border-color: rgba(255, 42, 112, 0.3);">
          <h5><i class="fa-solid fa-triangle-exclamation" style="color: var(--accent-rose);"></i> Disqualification Grounds</h5>
          <ul class="modal-rules-list disqualify">
            ${eventObj.disqualifications.map(d => `<li>${d}</li>`).join("")}
          </ul>
        </div>

        <div style="background: var(--bg-elevated); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 0.76rem; color: var(--text-muted); text-transform: uppercase;">Lead Student Coordinator</div>
            <div style="font-weight: 700; color: #fff;">${eventObj.coordinator.name}</div>
            <div style="font-size: 0.8rem; color: var(--accent-cyan);">${eventObj.coordinator.phone} • ${eventObj.coordinator.email}</div>
          </div>
          <div style="text-align: right;">
            <span style="display: inline-block; background: rgba(29, 185, 84, 0.15); color: var(--accent-spotify); font-weight: 700; padding: 0.35rem 0.85rem; border-radius: var(--radius-full); font-size: 0.8rem;">
              ${eventObj.price}
            </span>
          </div>
        </div>

        <div style="display: flex; gap: 1rem; justify-content: flex-end;">
          <button class="btn-secondary-glass" id="modalCloseAction2">Close</button>
          <button class="btn-primary-spotify" id="modalProceedReg">
            <i class="fa-solid fa-ticket"></i> Proceed to Register
          </button>
        </div>
      </div>
    `;

    elements.eventDetailModal.classList.add("active");

    modalBody.querySelector("#modalCloseAction").addEventListener("click", () => {
      elements.eventDetailModal.classList.remove("active");
    });
    modalBody.querySelector("#modalCloseAction2").addEventListener("click", () => {
      elements.eventDetailModal.classList.remove("active");
    });
    modalBody.querySelector("#modalProceedReg").addEventListener("click", () => {
      elements.eventDetailModal.classList.remove("active");
      openRegistrationModal(eventObj);
    });

    // Update bottom status bar
    updateBottomStatus(eventObj);
  }

  function openRegistrationModal(eventObj) {
    state.activeModalEvent = eventObj;
    const club = window.CCMS_DATA.clubs.find(c => c.id === eventObj.clubId);

    // Fill form metadata
    document.getElementById("regEventTitle").textContent = eventObj.name;
    document.getElementById("regClubTitle").textContent = club ? club.name : "";
    document.getElementById("regEventIdInput").value = eventObj.id;
    document.getElementById("regClubIdInput").value = eventObj.clubId;

    elements.registrationModal.classList.add("active");
  }

  function submitRegistration() {
    const eventObj = state.activeModalEvent;
    if (!eventObj) return;

    const club = window.CCMS_DATA.clubs.find(c => c.id === eventObj.clubId);

    const regData = {
      studentId: document.getElementById("regStudentId").value.trim() || "STU-8821",
      studentName: document.getElementById("regStudentName").value.trim(),
      email: document.getElementById("regStudentEmail").value.trim(),
      phone: document.getElementById("regStudentPhone").value.trim(),
      dept: document.getElementById("regStudentDept").value,
      year: document.getElementById("regStudentYear").value,
      teamName: document.getElementById("regTeamName").value.trim() || "Individual",
      teamMembers: document.getElementById("regTeamMembers").value.trim() || document.getElementById("regStudentName").value.trim(),
      eventId: eventObj.id,
      eventName: eventObj.name,
      clubId: eventObj.clubId,
      clubName: club ? club.name : eventObj.clubId
    };

    // Save into LocalStorage DB
    const newRecord = window.CCMS_DB.addRegistration(regData);

    // Close registration modal
    elements.registrationModal.classList.remove("active");

    // Show Confirmation Pass
    showConfirmationModal(newRecord, eventObj);

    // Refresh UI
    renderEvents();
    renderFacultyView();
    populateCertificateSelect();
  }

  function showConfirmationModal(regRecord, eventObj) {
    const confContainer = elements.confirmationModal.querySelector(".modal-container");
    confContainer.innerHTML = `
      <button class="modal-close-btn" id="closeConfirmX"><i class="fa-solid fa-xmark"></i></button>
      <div style="padding: 2.5rem; text-align: center;">
        <div style="width: 72px; height: 72px; border-radius: 50%; background: rgba(29, 185, 84, 0.2); border: 2px solid var(--accent-spotify); color: var(--accent-spotify); font-size: 2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
          <i class="fa-solid fa-check"></i>
        </div>
        <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 1.8rem; font-weight: 800; color: #fff;">
          Registration Confirmed!
        </h3>
        <p style="color: var(--text-secondary); margin-top: 0.5rem; font-size: 0.95rem;">
          Your official spot for <strong>${regRecord.eventName}</strong> has been secured in the university database.
        </p>

        <!-- Digital Ticket Pass (Spotify / Uber Style) -->
        <div style="margin: 2rem 0; background: linear-gradient(135deg, #181d27, #0e1117); border: 1px dashed rgba(255, 255, 255, 0.2); border-radius: var(--radius-md); padding: 1.5rem; text-align: left; position: relative;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.85rem; margin-bottom: 1rem;">
            <div>
              <span style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Digital Event Entry Pass</span>
              <h4 style="color: #fff; font-size: 1.15rem; font-weight: 700;">${regRecord.eventName}</h4>
            </div>
            <span style="background: var(--accent-spotify); color: #000; font-size: 0.72rem; font-weight: 800; padding: 0.25rem 0.65rem; border-radius: var(--radius-full);">
              APPROVED
            </span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; font-size: 0.82rem;">
            <div>
              <span style="color: var(--text-muted);">Pass ID:</span>
              <strong style="color: var(--accent-spotify); display: block;">${regRecord.regId}</strong>
            </div>
            <div>
              <span style="color: var(--text-muted);">Student ID:</span>
              <strong style="color: #fff; display: block;">${regRecord.studentId}</strong>
            </div>
            <div>
              <span style="color: var(--text-muted);">Candidate Name:</span>
              <strong style="color: #fff; display: block;">${regRecord.studentName}</strong>
            </div>
            <div>
              <span style="color: var(--text-muted);">Department:</span>
              <strong style="color: #fff; display: block;">${regRecord.dept}</strong>
            </div>
            <div>
              <span style="color: var(--text-muted);">Team Name:</span>
              <strong style="color: #fff; display: block;">${regRecord.teamName}</strong>
            </div>
            <div>
              <span style="color: var(--text-muted);">Venue:</span>
              <strong style="color: #fff; display: block;">${eventObj.venue.split('(')[0]}</strong>
            </div>
          </div>

          <div style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between;">
            <div style="font-size: 0.74rem; color: var(--text-secondary);">
              <i class="fa-solid fa-qrcode" style="font-size: 1.8rem; vertical-align: middle; margin-right: 0.5rem; color: #fff;"></i>
              Scan barcode at entrance on event day
            </div>
            <button class="btn-card-details" onclick="window.print()" style="font-size: 0.75rem;">
              <i class="fa-solid fa-print"></i> Print Ticket
            </button>
          </div>
        </div>

        <div style="display: flex; gap: 1rem; justify-content: center;">
          <button class="btn-primary-spotify" id="closeConfirmBtnAction">
            Continue Browsing
          </button>
          <button class="btn-secondary-glass" id="openDrawerCertBtn">
            <i class="fa-solid fa-award"></i> View Certificate
          </button>
        </div>
      </div>
    `;

    elements.confirmationModal.classList.add("active");

    confContainer.querySelector("#closeConfirmX").addEventListener("click", () => {
      elements.confirmationModal.classList.remove("active");
    });
    confContainer.querySelector("#closeConfirmBtnAction").addEventListener("click", () => {
      elements.confirmationModal.classList.remove("active");
    });
    confContainer.querySelector("#openDrawerCertBtn").addEventListener("click", () => {
      elements.confirmationModal.classList.remove("active");
      openCornerDrawer("certificate");
    });
  }

  // --- 4. FACULTY PORTAL LOGIC ---
  function setupFacultyPortal() {
    if (!elements.facultyClubSelect) return;

    // Populate club select dropdown
    const clubs = window.CCMS_DATA.clubs;
    elements.facultyClubSelect.innerHTML = `
      <option value="all">⚡ All Campus Clubs (Consolidated View)</option>
      ${clubs.map(c => `<option value="${c.id}">${c.name} (${c.category})</option>`).join("")}
    `;

    elements.facultyClubSelect.addEventListener("change", () => {
      renderFacultyView();
    });

    if (elements.facultySearchInput) {
      elements.facultySearchInput.addEventListener("input", () => {
        renderFacultyView();
      });
    }

    if (elements.facultyStatusFilter) {
      elements.facultyStatusFilter.addEventListener("change", () => {
        renderFacultyView();
      });
    }

    if (elements.facultyExportBtn) {
      elements.facultyExportBtn.addEventListener("click", () => {
        const clubId = elements.facultyClubSelect.value;
        window.CCMS_DB.exportCSV(clubId);
      });
    }
  }

  function renderFacultyView() {
    if (!elements.facultyTableBody) return;

    const selectedClubId = elements.facultyClubSelect ? elements.facultyClubSelect.value : "all";
    let registrations = window.CCMS_DB.getRegistrationsByClub(selectedClubId);

    // Apply Faculty Search
    const searchQ = elements.facultySearchInput ? elements.facultySearchInput.value.toLowerCase().trim() : "";
    if (searchQ) {
      registrations = registrations.filter(r =>
        r.studentName.toLowerCase().includes(searchQ) ||
        r.studentId.toLowerCase().includes(searchQ) ||
        r.eventName.toLowerCase().includes(searchQ) ||
        r.dept.toLowerCase().includes(searchQ)
      );
    }

    // Apply Faculty Status Filter
    const statusVal = elements.facultyStatusFilter ? elements.facultyStatusFilter.value : "all";
    if (statusVal !== "all") {
      registrations = registrations.filter(r => r.status.toLowerCase() === statusVal.toLowerCase());
    }

    // Update Stats Deck
    const allRegs = window.CCMS_DB.getRegistrations();
    if (elements.statTotalRegistrations) elements.statTotalRegistrations.textContent = registrations.length;
    if (elements.statApprovedCount) elements.statApprovedCount.textContent = registrations.filter(r => r.status === "Approved").length;
    if (elements.statAttendanceCount) elements.statAttendanceCount.textContent = registrations.filter(r => r.attendance === "Present").length;
    if (elements.statActiveEventsCount) elements.statActiveEventsCount.textContent = selectedClubId === "all" ? 60 : 10;

    if (registrations.length === 0) {
      elements.facultyTableBody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; padding: 2.5rem; color: var(--text-secondary);">
            <i class="fa-solid fa-users-slash" style="font-size: 2rem; margin-bottom: 0.5rem; color: var(--text-muted);"></i>
            <div>No student registrations found for this filter criteria.</div>
          </td>
        </tr>
      `;
      return;
    }

    elements.facultyTableBody.innerHTML = registrations.map(reg => `
      <tr>
        <td>
          <strong style="color: var(--accent-spotify);">${reg.regId}</strong><br>
          <span style="font-size: 0.72rem; color: var(--text-muted);">${reg.registeredAt}</span>
        </td>
        <td>
          <strong>${reg.studentName}</strong><br>
          <span style="font-size: 0.72rem; color: var(--text-secondary);">${reg.studentId} • ${reg.email}</span>
        </td>
        <td>
          <strong>${reg.dept}</strong><br>
          <span style="font-size: 0.72rem; color: var(--text-muted);">${reg.year}</span>
        </td>
        <td>
          <span style="font-size: 0.75rem; color: var(--accent-cyan); font-weight: 700;">${reg.clubName}</span><br>
          <strong>${reg.eventName}</strong>
        </td>
        <td>
          <span>${reg.teamName}</span>
        </td>
        <td>
          <span class="badge-status ${reg.status.toLowerCase()}">
            <i class="fa-solid fa-circle" style="font-size: 6px;"></i> ${reg.status}
          </span>
        </td>
        <td>
          <span style="font-size: 0.78rem; font-weight: 700; color: ${reg.attendance === 'Present' ? '#1db954' : '#9da7b7'};">
            ${reg.attendance}
          </span>
        </td>
        <td>
          <div style="display: flex; gap: 0.35rem;">
            <button class="btn-table-action" title="Toggle Approval" onclick="window.facultyToggleStatus('${reg.regId}')">
              <i class="fa-solid fa-check"></i>
            </button>
            <button class="btn-table-action" title="Mark Attendance (Present)" onclick="window.facultyMarkAttendance('${reg.regId}')">
              <i class="fa-solid fa-user-check"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join("");
  }

  // Global Faculty Actions
  window.facultyToggleStatus = function (regId) {
    const reg = window.CCMS_DB.getRegistrationById(regId);
    if (!reg) return;
    const nextStatus = reg.status === "Approved" ? "Pending" : "Approved";
    window.CCMS_DB.updateRegistrationStatus(regId, nextStatus);
    window.showLiveToast("Status Updated", `Candidate ${reg.studentName} set to ${nextStatus}`, "info");
    renderFacultyView();
  };

  window.facultyMarkAttendance = function (regId) {
    const reg = window.CCMS_DB.getRegistrationById(regId);
    if (!reg) return;
    const nextAtt = reg.attendance === "Present" ? "Absent" : "Present";
    window.CCMS_DB.updateAttendance(regId, nextAtt);
    window.showLiveToast("Attendance Logged", `${reg.studentName} marked ${nextAtt}`, "success");
    renderFacultyView();
    populateCertificateSelect();
  };

  // --- 5. BOARD MEMBER / VOLUNTEER PORTAL LOGIC ---
  function setupBoardPortal() {
    if (!elements.boardClubSelect) return;

    // Populate board club select
    const clubs = window.CCMS_DATA.clubs;
    elements.boardClubSelect.innerHTML = `
      ${clubs.map(c => `<option value="${c.id}">${c.name} (${c.category})</option>`).join("")}
    `;

    elements.boardClubSelect.addEventListener("change", () => {
      renderBoardView();
    });
  }

  function renderBoardView() {
    if (!elements.boardTimelineContainer) return;

    const clubId = elements.boardClubSelect ? elements.boardClubSelect.value : "singing";
    const club = window.CCMS_DATA.clubs.find(c => c.id === clubId);

    // Get schedules for this club
    const schedules = window.CCMS_DATA.boardSchedules.filter(s => s.clubId === clubId);

    if (schedules.length === 0) {
      elements.boardTimelineContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
          <i class="fa-solid fa-calendar-xmark" style="font-size: 2rem; margin-bottom: 1rem; color: var(--text-muted);"></i>
          <h3>No Live Volunteer Duty Scheduled for ${club ? club.name : 'this club'}</h3>
          <p>Please check back closer to the festival weekend.</p>
        </div>
      `;
      return;
    }

    elements.boardTimelineContainer.innerHTML = schedules.map(sch => `
      <div class="uber-live-card">
        <div class="uber-live-header">
          <div>
            <div class="live-pulse-badge">
              <span class="pulse-dot"></span>
              Live Volunteer Dispatch • ${sch.status}
            </div>
            <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 1.6rem; font-weight: 800; color: #fff; margin-top: 0.5rem;">
              ${sch.eventName}
            </h3>
            <p style="color: var(--text-secondary); font-size: 0.88rem;">
              <i class="fa-solid fa-location-dot" style="color: var(--accent-spotify); margin-right: 0.35rem;"></i> ${sch.venue} • 
              <i class="fa-solid fa-clock" style="color: var(--accent-cyan); margin: 0 0.35rem 0 0.75rem;"></i> ${sch.date} (${sch.time})
            </p>
          </div>
          <div style="background: var(--bg-elevated); padding: 0.75rem 1.25rem; border-radius: var(--radius-md); text-align: right; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Duty Lead</div>
            <strong style="color: #fff; font-size: 0.95rem;">${sch.assignedLead}</strong>
            <div style="font-size: 0.74rem; color: var(--accent-spotify); margin-top: 0.2rem;">
              <i class="fa-solid fa-users"></i> ${sch.volunteersActive}/${sch.volunteersNeeded} Volunteers Checked-In
            </div>
          </div>
        </div>

        <h5 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 1.25rem; font-weight: 700;">
          <i class="fa-solid fa-route" style="color: var(--accent-spotify); margin-right: 0.4rem;"></i> Uber-Style Live Execution Timeline
        </h5>

        <div class="timeline-track-uber">
          ${sch.timeline.map((step, idx) => `
            <div class="timeline-step-node ${step.status.toLowerCase()}">
              <div class="step-marker-uber">
                ${step.status === 'Completed' ? '<i class="fa-solid fa-check"></i>' : (idx + 1)}
              </div>
              <div class="step-info-card">
                <div>
                  <div class="step-time-label">${step.time}</div>
                  <div class="step-task-desc">${step.task}</div>
                </div>
                <div>
                  <span class="badge-status ${step.status === 'Completed' ? 'approved' : (step.status === 'Ongoing' ? 'pending' : '')}" style="font-size: 0.72rem;">
                    ${step.status}
                  </span>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");
  }

  // --- 6. FLOATING CORNER NOTIFICATION, FEEDBACK & CERTIFICATE ---
  function setupCornerDrawer() {
    if (elements.fabToggleBtn) {
      elements.fabToggleBtn.addEventListener("click", () => {
        state.drawerOpen = !state.drawerOpen;
        elements.cornerDrawer.classList.toggle("open", state.drawerOpen);
      });
    }

    if (elements.closeDrawerBtn) {
      elements.closeDrawerBtn.addEventListener("click", () => {
        state.drawerOpen = false;
        elements.cornerDrawer.classList.remove("open");
      });
    }

    // Tabs inside drawer
    const tabs = [
      { btn: elements.tabBtnFeedback, tab: "feedback", pane: elements.feedbackPane },
      { btn: elements.tabBtnCertificate, tab: "certificate", pane: elements.certificatePane },
      { btn: elements.tabBtnNotifications, tab: "notifications", pane: elements.notificationsPane }
    ];

    tabs.forEach(({ btn, tab, pane }) => {
      if (!btn) return;
      btn.addEventListener("click", () => {
        tabs.forEach(t => {
          if (t.btn) t.btn.classList.remove("active");
          if (t.pane) t.pane.classList.remove("active");
        });
        btn.classList.add("active");
        if (pane) pane.classList.add("active");
        state.drawerTab = tab;

        if (tab === "certificate") {
          renderCertificateOnCanvas();
        } else if (tab === "notifications") {
          renderNotificationsList();
        }
      });
    });

    // Render feedback questions
    renderFeedbackForm();

    // Setup Certificate select
    populateCertificateSelect();

    if (elements.certSelectReg) {
      elements.certSelectReg.addEventListener("change", () => {
        renderCertificateOnCanvas();
      });
    }

    if (elements.btnDownloadCert) {
      elements.btnDownloadCert.addEventListener("click", () => {
        downloadCertificateCanvas();
      });
    }
  }

  function openCornerDrawer(tabName) {
    state.drawerOpen = true;
    elements.cornerDrawer.classList.add("open");

    if (tabName === "certificate" && elements.tabBtnCertificate) {
      elements.tabBtnCertificate.click();
    } else if (tabName === "feedback" && elements.tabBtnFeedback) {
      elements.tabBtnFeedback.click();
    }
  }

  // Render 6 MSQ / Star Rating Feedback Questions
  function renderFeedbackForm() {
    if (!elements.feedbackForm) return;

    const questions = window.CCMS_DATA.feedbackQuestions;

    elements.feedbackForm.innerHTML = questions.map((q, qIndex) => {
      if (q.type === "msq") {
        return `
          <div class="feedback-q-card">
            <div class="feedback-q-title">Q${qIndex + 1}. ${q.question}</div>
            <div class="msq-options-list">
              ${q.options.map((opt, oIndex) => `
                <label class="msq-label">
                  <input type="checkbox" name="${q.id}" value="${opt}">
                  ${opt}
                </label>
              `).join("")}
            </div>
          </div>
        `;
      } else if (q.type === "rating") {
        return `
          <div class="feedback-q-card">
            <div class="feedback-q-title">Q${qIndex + 1}. ${q.question}</div>
            <div class="star-rating-row" data-qid="${q.id}">
              <span class="star" data-val="1">★</span>
              <span class="star" data-val="2">★</span>
              <span class="star" data-val="3">★</span>
              <span class="star" data-val="4">★</span>
              <span class="star" data-val="5">★</span>
            </div>
            <input type="hidden" name="${q.id}" id="input_${q.id}" value="5">
          </div>
        `;
      } else {
        return `
          <div class="feedback-q-card">
            <div class="feedback-q-title">Q${qIndex + 1}. ${q.question}</div>
            <div class="msq-options-list">
              ${q.options.map((opt, oIndex) => `
                <label class="msq-label">
                  <input type="radio" name="${q.id}" value="${opt}" ${oIndex === 0 ? 'checked' : ''}>
                  ${opt}
                </label>
              `).join("")}
            </div>
          </div>
        `;
      }
    }).join("") + `
      <button type="submit" class="btn-primary-spotify" style="width: 100%; justify-content: center; margin-top: 1rem;">
        <i class="fa-solid fa-paper-plane"></i> Submit Event Feedback
      </button>
    `;

    // Star rating click handlers
    elements.feedbackForm.querySelectorAll(".star-rating-row").forEach(row => {
      const qid = row.getAttribute("data-qid");
      const hiddenInput = document.getElementById("input_" + qid);
      const stars = row.querySelectorAll(".star");

      stars.forEach((star, idx) => {
        star.addEventListener("click", () => {
          const ratingVal = idx + 1;
          if (hiddenInput) hiddenInput.value = ratingVal;
          stars.forEach((s, sIdx) => {
            s.classList.toggle("selected", sIdx < ratingVal);
          });
        });
      });

      // default 5 stars selected
      stars.forEach(s => s.classList.add("selected"));
    });

    elements.feedbackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const feedbackPayload = {
        q1: Array.from(elements.feedbackForm.querySelectorAll("input[name='q1']:checked")).map(c => c.value),
        q2: document.getElementById("input_q2") ? document.getElementById("input_q2").value : "5",
        q3: Array.from(elements.feedbackForm.querySelectorAll("input[name='q3']:checked")).map(c => c.value),
        q4: document.getElementById("input_q4") ? document.getElementById("input_q4").value : "5",
        q5: elements.feedbackForm.querySelector("input[name='q5']:checked")?.value || "Yes",
        q6: Array.from(elements.feedbackForm.querySelectorAll("input[name='q6']:checked")).map(c => c.value)
      };

      window.CCMS_DB.addFeedback(feedbackPayload);
      window.showLiveToast("Feedback Submitted!", "Thank you! Your verified attendance certificate is now ready for download.", "success");

      // Switch to certificate tab
      setTimeout(() => {
        elements.tabBtnCertificate.click();
      }, 700);
    });
  }

  // Certificate Generator
  function populateCertificateSelect() {
    if (!elements.certSelectReg) return;

    const regs = window.CCMS_DB.getRegistrations();
    if (regs.length === 0) {
      elements.certSelectReg.innerHTML = `<option value="">No registered events found</option>`;
      return;
    }

    elements.certSelectReg.innerHTML = regs.map(r => `
      <option value="${r.regId}">${r.studentName} – ${r.eventName} (${r.regId})</option>
    `).join("");

    renderCertificateOnCanvas();
  }

  function renderCertificateOnCanvas() {
    if (!elements.certCanvas) return;
    const canvas = elements.certCanvas;
    const ctx = canvas.getContext("2d");

    // Canvas native dimensions
    canvas.width = 1000;
    canvas.height = 700;

    const selectedRegId = elements.certSelectReg ? elements.certSelectReg.value : null;
    const reg = window.CCMS_DB.getRegistrationById(selectedRegId) || window.CCMS_DB.getRegistrations()[0] || {
      regId: "REG-2026-1001",
      studentName: "Shorajit Das",
      eventName: "Silver Jubilee Grand Gala",
      clubName: "Aura Harmonics",
      registeredAt: "Nov 15, 2026"
    };

    // 1. Background Gradient (Luxury Navy/Slate)
    const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGrad.addColorStop(0, "#0c1017");
    bgGrad.addColorStop(0.5, "#151b26");
    bgGrad.addColorStop(1, "#0a0d14");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Ornate Golden Border
    ctx.lineWidth = 14;
    ctx.strokeStyle = "#c59b27";
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#f3e5ab";
    ctx.strokeRect(45, 45, canvas.width - 90, canvas.height - 90);

    // Corner Ornaments
    drawCornerOrnament(ctx, 45, 45);
    drawCornerOrnament(ctx, canvas.width - 45, 45);
    drawCornerOrnament(ctx, 45, canvas.height - 45);
    drawCornerOrnament(ctx, canvas.width - 45, canvas.height - 45);

    // 3. Institution Title
    ctx.textAlign = "center";
    ctx.fillStyle = "#a3b1c6";
    ctx.font = "600 16px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("SMART COLLEGE CLUB MANAGEMENT SYSTEM • CCMS 2026", canvas.width / 2, 95);

    // 4. Main Certificate Header
    const goldGrad = ctx.createLinearGradient(canvas.width / 2 - 200, 0, canvas.width / 2 + 200, 0);
    goldGrad.addColorStop(0, "#ffd700");
    goldGrad.addColorStop(0.5, "#fff0a0");
    goldGrad.addColorStop(1, "#c59b27");
    ctx.fillStyle = goldGrad;
    ctx.font = "800 38px 'Space Grotesk', sans-serif";
    ctx.fillText("CERTIFICATE OF EXCELLENCE", canvas.width / 2, 145);

    // 5. Subtitle
    ctx.fillStyle = "#94a3b8";
    ctx.font = "400 16px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("THIS IS PROUDLY AND OFFICIALLY PRESENTED TO", canvas.width / 2, 195);

    // 6. Recipient Name
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 44px 'Space Grotesk', sans-serif";
    ctx.fillText(reg.studentName, canvas.width / 2, 260);

    // Decorative underline under name
    ctx.lineWidth = 3;
    const nameUnderlineGrad = ctx.createLinearGradient(canvas.width / 2 - 150, 0, canvas.width / 2 + 150, 0);
    nameUnderlineGrad.addColorStop(0, "transparent");
    nameUnderlineGrad.addColorStop(0.5, "#1db954");
    nameUnderlineGrad.addColorStop(1, "transparent");
    ctx.strokeStyle = nameUnderlineGrad;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 180, 280);
    ctx.lineTo(canvas.width / 2 + 180, 280);
    ctx.stroke();

    // 7. Event & Citation
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "400 18px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("For outstanding active participation and demonstrated talent in the competitive event", canvas.width / 2, 330);

    ctx.fillStyle = "#1db954";
    ctx.font = "700 28px 'Space Grotesk', sans-serif";
    ctx.fillText(`"${reg.eventName}"`, canvas.width / 2, 375);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "500 17px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(`Organized by ${reg.clubName || 'Aura Harmonics'} at the Annual CCMS Conclave`, canvas.width / 2, 415);

    // 8. Seal Graphics (Center Bottom)
    drawGoldSeal(ctx, canvas.width / 2, 530, 48);

    // 9. Signatures (Left & Right)
    // Left: Faculty In-Charge
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(140, 570);
    ctx.lineTo(340, 570);
    ctx.stroke();

    ctx.font = "italic 20px 'Space Grotesk', cursive";
    ctx.fillStyle = "#38bdf8";
    ctx.fillText("Dr. M. Sundaram", 240, 550);

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "700 14px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("FACULTY ADVISOR", 240, 595);
    ctx.fillStyle = "#64748b";
    ctx.font = "12px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Director of Cultural & Academic Affairs", 240, 615);

    // Right: Student President & Convenor
    ctx.beginPath();
    ctx.moveTo(canvas.width - 340, 570);
    ctx.lineTo(canvas.width - 140, 570);
    ctx.stroke();

    ctx.font = "italic 20px 'Space Grotesk', cursive";
    ctx.fillStyle = "#a855f7";
    ctx.fillText("Aarav Sharma", canvas.width - 240, 550);

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "700 14px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("EVENT CONVENOR", canvas.width - 240, 595);
    ctx.fillStyle = "#64748b";
    ctx.font = "12px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Central Board of Student Affairs", canvas.width - 240, 615);

    // 10. Security Hologram ID
    ctx.fillStyle = "#475569";
    ctx.font = "600 12px 'Space Grotesk', monospace";
    ctx.fillText(`VERIFIABLE PASS SEC-HASH: ${reg.regId} • AUTH: CCMS-SMART-COLLEGE-2026`, canvas.width / 2, 650);
  }

  function drawCornerOrnament(ctx, x, y) {
    ctx.save();
    ctx.strokeStyle = "#ffd700";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function drawGoldSeal(ctx, x, y, radius) {
    ctx.save();
    // Star burst rosette
    ctx.fillStyle = "#c59b27";
    ctx.beginPath();
    for (let i = 0; i < 24; i++) {
      const angle = (i * Math.PI) / 12;
      const r = i % 2 === 0 ? radius : radius - 7;
      const px = x + Math.cos(angle) * r;
      const py = y + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();

    // Inner circle
    ctx.fillStyle = "#151b26";
    ctx.beginPath();
    ctx.arc(x, y, radius - 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#ffd700";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 10px 'Space Grotesk', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("OFFICIAL", x, y - 2);
    ctx.fillText("SEAL", x, y + 10);
    ctx.restore();
  }

  function downloadCertificateCanvas() {
    if (!elements.certCanvas) return;
    const link = document.createElement("a");
    link.download = `CCMS_Certificate_${Date.now()}.png`;
    link.href = elements.certCanvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.showLiveToast("Certificate Downloaded", "Official verifiable certificate has been saved to your device.", "success");
  }

  function renderNotificationsList() {
    if (!elements.notificationsPane) return;
    const notes = window.CCMS_DB.getNotifications();

    elements.notificationsPane.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        ${notes.map(n => `
          <div style="background: var(--bg-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.85rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
              <strong style="color: #fff; font-size: 0.85rem;">${n.title}</strong>
              <span style="font-size: 0.7rem; color: var(--text-muted);">${n.time}</span>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4;">${n.message}</p>
          </div>
        `).join("")}
      </div>
    `;
  }

  // --- 7. SEARCH BAR LOGIC ---
  function setupSearch() {
    if (!elements.globalSearchInput) return;
    elements.globalSearchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      if (state.currentRole === "student") {
        renderEvents();
      }
    });
  }

  // Update bottom status bar
  function updateBottomStatus(eventObj) {
    if (!elements.bottomEventTitle) return;
    elements.bottomEventTitle.textContent = eventObj.name;
    elements.bottomEventClub.textContent = `${eventObj.category} • ${eventObj.venue.split('(')[0]}`;
    if (elements.bottomEventThumb) {
      elements.bottomEventThumb.src = eventObj.banner;
    }
  }

  function renderAll() {
    renderClubCards();
    renderFilterChips();
    renderEvents();
    renderFacultyView();
    renderBoardView();
  }

  // Kickoff
  initApp();
});
