// Smart College Club Management System (CCMS) - Comprehensive Mock Database
// Clubs, Events, Feedback Questions, Pre-seeded Registrations, and Schedules

const CCMS_DATA = {
  clubs: [
    {
      id: "singing",
      name: "Aura Harmonics",
      category: "Singing & Music Club",
      shortDesc: "Vocal virtuosos, acoustics, beatboxing, choral symphonies & electrifying musical battles.",
      badge: "Trending #1",
      membersCount: 1420,
      activeEvents: 10,
      leadName: "Aarav Sharma",
      facultyMentor: "Dr. Meenakshi Sundaram (Dept. of Performing Arts)",
      icon: "fa-microphone-lines",
      accentColor: "#1db954", // Spotify Green
      coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      avatarImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80",
      tags: ["Vocals", "Acoustic", "Bands", "Orchestra", "Rap Cipher"]
    },
    {
      id: "dancing",
      name: "Pulse Choreotech",
      category: "Dancing & Performing Arts",
      shortDesc: "From street hip-hop cyphers to classical Kathak and high-voltage K-Pop dance choreography.",
      badge: "Most Energetic",
      membersCount: 1280,
      activeEvents: 10,
      leadName: "Priya Nair",
      facultyMentor: "Prof. Rajesh Sengupta (Cultural Dean)",
      icon: "fa-person-walking",
      accentColor: "#ff007f", // Neon Magenta
      coverImage: "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80",
      avatarImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80",
      tags: ["Freestyle", "Hip-Hop", "Classical Fusion", "Salsa", "K-Pop"]
    },
    {
      id: "hackathons",
      name: "CodeNova Nexus",
      category: "Hackathons & Dev Society",
      shortDesc: "36-hour code marathons, AI Agentic engineering, Web3 dApps, CTF cybersecurity & open-source.",
      badge: "Top Career Impact",
      membersCount: 2350,
      activeEvents: 10,
      leadName: "Kavya Deshmukh",
      facultyMentor: "Dr. Anirudh Bhattacharya (HOD, Computer Science)",
      icon: "fa-terminal",
      accentColor: "#00f2fe", // Cyber Cyan
      coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      avatarImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
      tags: ["AI/ML", "Web3", "Cybersecurity", "Cloud Native", "GameDev"]
    },
    {
      id: "sports",
      name: "Apex Titans",
      category: "Sports & Athletics League",
      shortDesc: "Campus cricket leagues, intense 5v5 futsal, basketball derbies, chess grandmasters & e-sports.",
      badge: "Campus Champions",
      membersCount: 3100,
      activeEvents: 10,
      leadName: "Rohan Varma",
      facultyMentor: "Coach Vikram Rathore (Director of Physical Education)",
      icon: "fa-medal",
      accentColor: "#ff9100", // Vibrant Amber
      coverImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
      avatarImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=400&q=80",
      tags: ["Cricket", "Futsal", "Basketball", "E-Sports", "Athletics"]
    },
    {
      id: "research",
      name: "Syntropy Labs",
      category: "Research & DeepTech Innovation",
      shortDesc: "Patent commercialization, robotics prototypes, nano-satellites, renewable energy & paper publishing.",
      badge: "Research Grants",
      membersCount: 890,
      activeEvents: 10,
      leadName: "Dr. Siddharth Roy",
      facultyMentor: "Dr. Suniti Murthy (Director of R&D Innovation)",
      icon: "fa-atom",
      accentColor: "#9d4edd", // Deep Violet
      coverImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
      avatarImage: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=400&q=80",
      tags: ["AI Research", "GreenTech", "Robotics", "BioTech", "Patents"]
    },
    {
      id: "fashion",
      name: "Vogue Vanguard",
      category: "Fashion & Lifestyle Guild",
      shortDesc: "Haute couture runway galas, upcycled sustainable fashion, cyberpunk streetwear & makeup artistry.",
      badge: "Glamour & Style",
      membersCount: 1150,
      activeEvents: 10,
      leadName: "Natasha Kapoor",
      facultyMentor: "Prof. Ananya Sen (Dept. of Visual & Design Arts)",
      icon: "fa-gem",
      accentColor: "#ff0055", // Electric Rose
      coverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
      avatarImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80",
      tags: ["Runway", "Sustainable Fashion", "Avant-Garde", "Styling", "MetGala"]
    }
  ],

  // 10 Detailed Events per Club = 60 Curated Events Total
  events: [
    // --- 1. SINGING CLUB EVENTS ---
    {
      id: "EVT-SNG-01",
      clubId: "singing",
      name: "Silver Jubilee Grand Gala",
      tagline: "The 25th Annual Inter-University Mega Concert & Symphony",
      category: "Flagship Mega Concert",
      date: "2026-11-15",
      time: "06:00 PM - 10:30 PM",
      venue: "Grand Open-Air Amphitheatre (Main Stage)",
      teamSize: "Solo or Ensemble (1 - 8 members)",
      slotsTotal: 120,
      slotsFilled: 89,
      badge: "Silver Jubilee Special",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Performance duration must be between 8 to 12 minutes.",
        "Live instrumentation or pre-submitted backing tracks (320kbps MP3) permitted.",
        "Original compositions and medley arrangements earn extra jury points.",
        "Sound check takes place at 03:00 PM sharp before auditorium doors open.",
        "Participants must bring valid college identity cards."
      ],
      disqualifications: [
        "Exceeding allotted stage time by more than 60 seconds incurs automatic disqualification.",
        "Explicit, vulgar or hate-speech lyrics will lead to immediate cancellation.",
        "Pre-recorded lead vocal tracks (lip-syncing) are strictly prohibited.",
        "Destruction of stage hardware or inappropriate backstage conduct."
      ],
      coordinator: { name: "Aarav Sharma", phone: "+91 98450 11223", email: "singing.lead@ccms.edu" },
      facultyInCharge: "Dr. Meenakshi Sundaram"
    },
    {
      id: "EVT-SNG-02",
      clubId: "singing",
      name: "Voice of Zenith: Solo Championship",
      tagline: "Unleash your pitch perfection and vocal dominance",
      category: "Solo Vocals",
      date: "2026-11-18",
      time: "02:00 PM - 06:00 PM",
      venue: "Auditorium Hall B",
      teamSize: "Solo (1 Member)",
      slotsTotal: 40,
      slotsFilled: 34,
      badge: "High Stakes",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Time limit: 4 minutes performance + 1 minute transition.",
        "One acoustic accompanist permitted (guitar or keyboard).",
        "Judging criteria: Vocal pitch, timbre, breath control, and expression."
      ],
      disqualifications: [
        "Any lip-syncing or pitch correction software usage.",
        "Unexcused absence when participant code is called twice."
      ],
      coordinator: { name: "Devika Roy", phone: "+91 98450 22334", email: "devika.vocal@ccms.edu" },
      facultyInCharge: "Dr. Meenakshi Sundaram"
    },
    {
      id: "EVT-SNG-03",
      clubId: "singing",
      name: "Echo Unplugged: Acoustic Duet",
      tagline: "Two voices, one acoustic guitar, infinite harmony",
      category: "Acoustic Duet",
      date: "2026-11-20",
      time: "05:00 PM - 08:00 PM",
      venue: "Fountain Courtyard Garden",
      teamSize: "Duet (2 Members)",
      slotsTotal: 30,
      slotsFilled: 22,
      badge: "Sunset Vibes",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Only acoustic instruments allowed (no heavy distortion pedals).",
        "Both participants must sing harmonies during chorus.",
        "Duration: 5 minutes maximum."
      ],
      disqualifications: [
        "Using synthesized electronic backing tracks.",
        "Delaying the schedule beyond 5 minutes of slot call."
      ],
      coordinator: { name: "Raghav Menon", phone: "+91 98450 33445", email: "raghav.m@ccms.edu" },
      facultyInCharge: "Dr. Meenakshi Sundaram"
    },
    {
      id: "EVT-SNG-04",
      clubId: "singing",
      name: "BeatDrop Acapella Clash",
      tagline: "Zero instruments, 100% human voices & rhythm",
      category: "Group Acapella",
      date: "2026-11-22",
      time: "03:00 PM - 07:00 PM",
      venue: "Centenary Acoustic Hall",
      teamSize: "Teams of 4 to 10",
      slotsTotal: 20,
      slotsFilled: 16,
      badge: "Vocal Magic",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1520523839898-507127053c37?auto=format&fit=crop&w=800&q=80",
      rules: [
        "All sounds must be human-produced (vocals, basslines, beatboxing).",
        "Time limit: 7 minutes per crew.",
        "Arrangement must demonstrate minimum 3-part vocal polyphony."
      ],
      disqualifications: [
        "Using concealed audio props, kazoos, or pitch whistle tricks.",
        "Failing to submit member roster 24 hours prior."
      ],
      coordinator: { name: "Tanya Sen", phone: "+91 98450 44556", email: "tanya.sen@ccms.edu" },
      facultyInCharge: "Dr. Meenakshi Sundaram"
    },
    {
      id: "EVT-SNG-05",
      clubId: "singing",
      name: "Retro Melodies: 70s-90s Karaoke Fest",
      tagline: "Golden nostalgic melodies that defined generations",
      category: "Retro Showcase",
      date: "2026-11-25",
      time: "04:00 PM - 08:00 PM",
      venue: "Student Activity Center Lounge",
      teamSize: "Solo or Duet",
      slotsTotal: 50,
      slotsFilled: 48,
      badge: "Crowd Favorite",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Songs must be officially released between 1970 and 1999.",
        "Karaoke tracks provided or you can bring your verified USB.",
        "Audience cheering contributes 20% of the aggregate score."
      ],
      disqualifications: [
        "Selecting modern post-2000 remixes or EDM adaptations."
      ],
      coordinator: { name: "Kunal Gupta", phone: "+91 98450 55667", email: "kunal.g@ccms.edu" },
      facultyInCharge: "Dr. Meenakshi Sundaram"
    },
    {
      id: "EVT-SNG-06",
      clubId: "singing",
      name: "Battle of Bands: Electric Mayhem",
      tagline: "High-octane rock, distortion, double bass & sonic power",
      category: "Rock & Metal Battle",
      date: "2026-11-28",
      time: "05:00 PM - 10:00 PM",
      venue: "Sports Stadium Stage",
      teamSize: "Bands of 3 to 7",
      slotsTotal: 15,
      slotsFilled: 14,
      badge: "Main Event",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Stage time: 15 minutes inclusive of setup.",
        "Full drum kit, bass amp, and 2 guitar tube amps provided.",
        "Minimum one original track required."
      ],
      disqualifications: [
        "Smashing stage equipment or intentional mic drops.",
        "Unannounced pyrotechnics or smoke canisters without permit."
      ],
      coordinator: { name: "Vikramaditya Rao", phone: "+91 98450 66778", email: "vikram.rock@ccms.edu" },
      facultyInCharge: "Dr. Meenakshi Sundaram"
    },
    {
      id: "EVT-SNG-07",
      clubId: "singing",
      name: "Classical Raga Revival",
      tagline: "Hindustani & Carnatic classical vocal mastery",
      category: "Classical",
      date: "2026-12-02",
      time: "10:00 AM - 02:00 PM",
      venue: "Shruti Auditorium",
      teamSize: "Solo + up to 2 accompanists",
      slotsTotal: 25,
      slotsFilled: 19,
      badge: "Traditional Heritage",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Alaap, Bandish/Kriti presentation within 10 minutes.",
        "Tabla and Tanpura accompanists available on spot upon request."
      ],
      disqualifications: [
        "Deviation from established raga scales (thaat/mela)."
      ],
      coordinator: { name: "Srinivas Iyer", phone: "+91 98450 77889", email: "srini.raga@ccms.edu" },
      facultyInCharge: "Dr. Meenakshi Sundaram"
    },
    {
      id: "EVT-SNG-08",
      clubId: "singing",
      name: "Midnight Jazz & Blues Jam",
      tagline: "Improvisational blue notes under starlit skies",
      category: "Jazz Jam",
      date: "2026-12-05",
      time: "07:00 PM - 10:30 PM",
      venue: "Rooftop Observatory Terrace",
      teamSize: "Solo or Trios",
      slotsTotal: 30,
      slotsFilled: 25,
      badge: "Soulful",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Standards and scat vocal solos judged on phrasing & dynamic feel."
      ],
      disqualifications: [
        "Refusing to participate in impromptu standard trade-offs."
      ],
      coordinator: { name: "Maya Dsouza", phone: "+91 98450 88990", email: "maya.jazz@ccms.edu" },
      facultyInCharge: "Dr. Meenakshi Sundaram"
    },
    {
      id: "EVT-SNG-09",
      clubId: "singing",
      name: "Rap Cipher & Beatbox Championship",
      tagline: "Bars, cadence, freestyle flow & human 808 beats",
      category: "Hip-Hop Cipher",
      date: "2026-12-08",
      time: "03:00 PM - 07:00 PM",
      venue: "Open Amphitheatre Steps",
      teamSize: "Solo",
      slotsTotal: 40,
      slotsFilled: 38,
      badge: "High Energy",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Round 1: 90 seconds written verses. Round 2: 1v1 Freestyle face-off.",
        "Live DJ drops random BPM tracks."
      ],
      disqualifications: [
        "Personal attacks, caste/religious slurs in punchlines."
      ],
      coordinator: { name: "MC Rishi", phone: "+91 98450 99001", email: "rishi.cipher@ccms.edu" },
      facultyInCharge: "Dr. Meenakshi Sundaram"
    },
    {
      id: "EVT-SNG-10",
      clubId: "singing",
      name: "Celestial Choir Ensemble",
      tagline: "Harmonic choir choruses echoing serenity",
      category: "Choral Showcase",
      date: "2026-12-12",
      time: "04:00 PM - 08:00 PM",
      venue: "Chapel & Main Heritage Hall",
      teamSize: "Groups of 8 to 20",
      slotsTotal: 12,
      slotsFilled: 10,
      badge: "Grand Ensemble",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Choral arrangement with soprano, alto, tenor, and bass parts.",
        "Maximum 12 minutes on stage."
      ],
      disqualifications: [
        "Failure to adhere to uniform concert dress code."
      ],
      coordinator: { name: "Ananya Ghosh", phone: "+91 98450 00112", email: "ananya.choir@ccms.edu" },
      facultyInCharge: "Dr. Meenakshi Sundaram"
    },

    // --- 2. DANCING CLUB EVENTS ---
    {
      id: "EVT-DNC-01",
      clubId: "dancing",
      name: "Cosmic Grooves: Solo Freestyle",
      tagline: "Locking, popping, waacking & pure spontaneous dance",
      category: "Solo Freestyle",
      date: "2026-11-16",
      time: "02:00 PM - 06:00 PM",
      venue: "Indoor Sports Complex Arena",
      teamSize: "Solo",
      slotsTotal: 50,
      slotsFilled: 45,
      badge: "Hot Contest",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Music will be played on the spot by official DJ.",
        "Round duration: 60 seconds per battle.",
        "Judged on musicality, foundation, creativity, and flow."
      ],
      disqualifications: [
        "Physical contact with opposing dancers during battles.",
        "Unsportsmanlike gestures on the dance floor."
      ],
      coordinator: { name: "Priya Nair", phone: "+91 97410 11223", email: "dance.lead@ccms.edu" },
      facultyInCharge: "Prof. Rajesh Sengupta"
    },
    {
      id: "EVT-DNC-02",
      clubId: "dancing",
      name: "StepUp Street Crew Battles",
      tagline: "Crew vs Crew: synchronize, syncopate and conquer",
      category: "Crew Street Battle",
      date: "2026-11-19",
      time: "04:00 PM - 08:30 PM",
      venue: "Central Plaza Amphitheatre",
      teamSize: "Crews of 5 to 12",
      slotsTotal: 16,
      slotsFilled: 15,
      badge: "Electrifying",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Preliminary showcase: 4 minutes routine.",
        "Top 4 crews enter knockout 1v1 and routine clash rounds."
      ],
      disqualifications: [
        "Exceeding 12 crew members on stage.",
        "Damaging flooring or leaving props uncleaned."
      ],
      coordinator: { name: "Rohit Chawla", phone: "+91 97410 22334", email: "rohit.step@ccms.edu" },
      facultyInCharge: "Prof. Rajesh Sengupta"
    },
    {
      id: "EVT-DNC-03",
      clubId: "dancing",
      name: "Natyam: Classical Fusion Showcase",
      tagline: "Bharatanatyam, Kathak & Odissi intertwined with contemporary rhythms",
      category: "Classical Fusion",
      date: "2026-11-21",
      time: "03:00 PM - 07:00 PM",
      venue: "Heritage Golden Auditorium",
      teamSize: "Solo or Groups (up to 6)",
      slotsTotal: 30,
      slotsFilled: 26,
      badge: "Art & Grace",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Time limit: 6 to 8 minutes.",
        "Costume and ghungroos must adhere to aesthetic decency."
      ],
      disqualifications: [
        "Distorting classical mudras in a disrespectful context."
      ],
      coordinator: { name: "Radha Krishnan", phone: "+91 97410 33445", email: "radha.natyam@ccms.edu" },
      facultyInCharge: "Prof. Rajesh Sengupta"
    },
    {
      id: "EVT-DNC-04",
      clubId: "dancing",
      name: "Ballroom Elegance & Salsa Night",
      tagline: "Spins, lifts, Argentine tango and Cuban salsa beats",
      category: "Couple Dance",
      date: "2026-11-24",
      time: "06:00 PM - 09:30 PM",
      venue: "Emerald Banquet Hall",
      teamSize: "Pairs (2 Members)",
      slotsTotal: 35,
      slotsFilled: 30,
      badge: "Romance & Rhythm",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1545959570-a94486551e60?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Pairs will perform both Latin Salsa and Slow Waltz rounds.",
        "Formal evening attire mandatory."
      ],
      disqualifications: [
        "Dangerous unchecked overhead aerial drops without spotting permission."
      ],
      coordinator: { name: "Alok & Simran", phone: "+91 97410 44556", email: "salsa.club@ccms.edu" },
      facultyInCharge: "Prof. Rajesh Sengupta"
    },
    {
      id: "EVT-DNC-05",
      clubId: "dancing",
      name: "K-Pop Dance Cover Challenge",
      tagline: "Pixel-perfect synchronization from Seoul to our campus",
      category: "K-Pop Cover",
      date: "2026-11-27",
      time: "01:00 PM - 05:00 PM",
      venue: "Multipurpose Hall A",
      teamSize: "Groups of 3 to 9",
      slotsTotal: 25,
      slotsFilled: 24,
      badge: "Viral Sensation",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Must recreate official choreography of recognized K-Pop hits.",
        "Styling and camera-face expressions carry dedicated points."
      ],
      disqualifications: [
        "Audio track containing non-Korean or fan-edit audio glitches."
      ],
      coordinator: { name: "Minah Sharma", phone: "+91 97410 55667", email: "minah.kpop@ccms.edu" },
      facultyInCharge: "Prof. Rajesh Sengupta"
    },
    {
      id: "EVT-DNC-06",
      clubId: "dancing",
      name: "Campus Flashmob Blitz",
      tagline: "Surprise synchronized movement transforming campus square",
      category: "Flashmob",
      date: "2026-11-30",
      time: "12:30 PM - 01:30 PM",
      venue: "Central Quadrangle Walkway",
      teamSize: "Open Campus Join (All Welcome)",
      slotsTotal: 200,
      slotsFilled: 180,
      badge: "Massive Energy",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Attend minimum 2 dry-run rehearsals prior to event day.",
        "Follow color code: Black tee + denim."
      ],
      disqualifications: [
        "Disrupting active academic class corridors."
      ],
      coordinator: { name: "Harshit Verma", phone: "+91 97410 66778", email: "harshit.mob@ccms.edu" },
      facultyInCharge: "Prof. Rajesh Sengupta"
    },
    {
      id: "EVT-DNC-07",
      clubId: "dancing",
      name: "Hip-Hop Cypher 3.0",
      tagline: "Raw subterranean underground cyphers & 7-to-smoke",
      category: "Underground Cypher",
      date: "2026-12-03",
      time: "05:00 PM - 08:30 PM",
      venue: "Basement Parking B2 Zone",
      teamSize: "Solo",
      slotsTotal: 40,
      slotsFilled: 33,
      badge: "Underground",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
      rules: [
        "7-to-Smoke rules: 8 b-boys/b-girls, 20 minute clock, first to 7 points wins."
      ],
      disqualifications: [
        "Intentional stepping on opponent's footwear or clothing."
      ],
      coordinator: { name: "B-Boy Zenith", phone: "+91 97410 77889", email: "bboy.zenith@ccms.edu" },
      facultyInCharge: "Prof. Rajesh Sengupta"
    },
    {
      id: "EVT-DNC-08",
      clubId: "dancing",
      name: "Contemporary Soul Expressions",
      tagline: "Lyrical fluid storytelling through gravity and emotion",
      category: "Contemporary",
      date: "2026-12-06",
      time: "02:00 PM - 06:00 PM",
      venue: "Auditorium Hall C",
      teamSize: "Solo or Duet",
      slotsTotal: 25,
      slotsFilled: 20,
      badge: "Emotional Impact",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Prop usage must be pre-approved (fabrics, stools permitted)."
      ],
      disqualifications: [
        "Use of talcum powder or liquids on dance floor."
      ],
      coordinator: { name: "Sanya Joseph", phone: "+91 97410 88990", email: "sanya.c@ccms.edu" },
      facultyInCharge: "Prof. Rajesh Sengupta"
    },
    {
      id: "EVT-DNC-09",
      clubId: "dancing",
      name: "Folk Beats: Heritage of India",
      tagline: "Bhangra, Garba, Lavani, and Bihu folk festivity",
      category: "Traditional Folk",
      date: "2026-12-09",
      time: "03:00 PM - 07:00 PM",
      venue: "Main Ground Pavilion",
      teamSize: "Groups of 6 to 16",
      slotsTotal: 15,
      slotsFilled: 13,
      badge: "Cultural Pride",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Authentic regional costumes and instruments required."
      ],
      disqualifications: [
        "Non-traditional remixes containing inappropriate beats."
      ],
      coordinator: { name: "Gurpreet Singh", phone: "+91 97410 99001", email: "gurpreet.folk@ccms.edu" },
      facultyInCharge: "Prof. Rajesh Sengupta"
    },
    {
      id: "EVT-DNC-10",
      clubId: "dancing",
      name: "Neon Glow Choreography Night",
      tagline: "Ultraviolet darkroom dance with electroluminescent suits",
      category: "Tech-Choreography",
      date: "2026-12-14",
      time: "07:00 PM - 10:00 PM",
      venue: "Black Box Theatre",
      teamSize: "Teams of 4 to 8",
      slotsTotal: 18,
      slotsFilled: 17,
      badge: "Visual Spectacle",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Full blackout environment. Costumes must feature UV reactive paint or EL wires."
      ],
      disqualifications: [
        "Short-circuit hazards in custom battery wearable packs."
      ],
      coordinator: { name: "Aditya Bhatt", phone: "+91 97410 00112", email: "aditya.glow@ccms.edu" },
      facultyInCharge: "Prof. Rajesh Sengupta"
    },

    // --- 3. HACKATHONS CLUB EVENTS ---
    {
      id: "EVT-HCK-01",
      clubId: "hackathons",
      name: "HackGenesis 2026 - National 36hr Hackathon",
      tagline: "Build real-world solutions that reshape industries",
      category: "Flagship Hackathon",
      date: "2026-11-14",
      time: "09:00 AM (Nov 14) - 09:00 PM (Nov 15)",
      venue: "APJ Abdul Kalam Computing Center",
      teamSize: "Teams of 2 to 4 developers",
      slotsTotal: 80,
      slotsFilled: 76,
      badge: "₹1,50,000 Prize Pool",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      rules: [
        "36 hours non-stop hacking with continuous mentoring rounds.",
        "Code repositories must be initialized after opening ceremony on GitHub.",
        "All third-party libraries and APIs must be openly declared.",
        "Working MVP demo mandatory for final round evaluation."
      ],
      disqualifications: [
        "Submitting pre-built projects or code written before kick-off.",
        "Plagiarism from other participating teams.",
        "Unauthorized network probing or DDoS on campus infrastructure."
      ],
      coordinator: { name: "Kavya Deshmukh", phone: "+91 98220 11223", email: "hack.lead@ccms.edu" },
      facultyInCharge: "Dr. Anirudh Bhattacharya"
    },
    {
      id: "EVT-HCK-02",
      clubId: "hackathons",
      name: "AI Agentic Hack: Autonomous LLMs",
      tagline: "Develop multi-agent workflows, MCP servers & memory graphs",
      category: "Generative AI",
      date: "2026-11-20",
      time: "10:00 AM - 08:00 PM",
      venue: "Turing AI Innovation Lab",
      teamSize: "Teams of 2 to 3",
      slotsTotal: 40,
      slotsFilled: 38,
      badge: "Cutting-Edge",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Build autonomous tools utilizing Gemini, Claude or open-source weights.",
        "Live test scenarios will be provided by industry judges."
      ],
      disqualifications: [
        "Hardcoding responses or mock outputs without real inference."
      ],
      coordinator: { name: "Nitin Pai", phone: "+91 98220 22334", email: "nitin.ai@ccms.edu" },
      facultyInCharge: "Dr. Anirudh Bhattacharya"
    },
    {
      id: "EVT-HCK-03",
      clubId: "hackathons",
      name: "BugHunt: Ethical Hacking CTF",
      tagline: "Capture the flag: cryptography, web exploits, reverse engineering",
      category: "Cybersecurity CTF",
      date: "2026-11-23",
      time: "02:00 PM - 08:00 PM",
      venue: "Cyber Defense Sandbox Lab",
      teamSize: "Solo or Duet",
      slotsTotal: 50,
      slotsFilled: 44,
      badge: "Red Team Challenge",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Flags are formatted as CCMS{...}.",
        "Dynamic scoring engine based on solve speeds."
      ],
      disqualifications: [
        "Attacking scoring infrastructure or sharing flags between teams."
      ],
      coordinator: { name: "Abhay Patil", phone: "+91 98220 33445", email: "abhay.sec@ccms.edu" },
      facultyInCharge: "Dr. Anirudh Bhattacharya"
    },
    {
      id: "EVT-HCK-04",
      clubId: "hackathons",
      name: "Web3 & DeFi Decentralized Build",
      tagline: "Smart contracts, zero-knowledge proofs & tokenomics",
      category: "Blockchain",
      date: "2026-11-26",
      time: "09:00 AM - 06:00 PM",
      venue: "Blockchain Research Cell",
      teamSize: "Teams of 2 to 4",
      slotsTotal: 30,
      slotsFilled: 22,
      badge: "Web3 Grants",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Deploy verified contracts to Ethereum Sepolia or Polygon Amoy testnet.",
        "Front-end must integrate with Web3 wallet provider."
      ],
      disqualifications: [
        "Submitting standard tutorial fork without new logic."
      ],
      coordinator: { name: "Sahil Zaveri", phone: "+91 98220 44556", email: "sahil.defi@ccms.edu" },
      facultyInCharge: "Dr. Anirudh Bhattacharya"
    },
    {
      id: "EVT-HCK-05",
      clubId: "hackathons",
      name: "CodeSprint: Speed Algorithmic Duel",
      tagline: "Fastest fingers and optimal Big-O time complexity",
      category: "Competitive Coding",
      date: "2026-11-29",
      time: "04:00 PM - 07:00 PM",
      venue: "Online Platform + Lab 401",
      teamSize: "Solo",
      slotsTotal: 100,
      slotsFilled: 92,
      badge: "Speed & Logic",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80",
      rules: [
        "6 algorithmic problems spanning graphs, DP, segment trees.",
        "Languages allowed: C++, Java, Python3, Rust, Go."
      ],
      disqualifications: [
        "Using AI copilot or external chat during the 3-hour window."
      ],
      coordinator: { name: "Anish Aggarwal", phone: "+91 98220 55667", email: "anish.algo@ccms.edu" },
      facultyInCharge: "Dr. Anirudh Bhattacharya"
    },
    {
      id: "EVT-HCK-06",
      clubId: "hackathons",
      name: "UI/UX Figma Designathon: 60fps Delight",
      tagline: "Craft high-fidelity prototypes that define the future of interfaces",
      category: "Product Design",
      date: "2026-12-01",
      time: "10:00 AM - 05:00 PM",
      venue: "Human Computer Interaction Lab",
      teamSize: "Solo or Duet",
      slotsTotal: 40,
      slotsFilled: 36,
      badge: "Design Excellence",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Theme revealed at 10:00 AM.",
        "Deliver interactive Figma prototype + design system component tokens."
      ],
      disqualifications: [
        "Copying existing UI kits without meaningful modification."
      ],
      coordinator: { name: "Tanvi Saraf", phone: "+91 98220 66778", email: "tanvi.design@ccms.edu" },
      facultyInCharge: "Dr. Anirudh Bhattacharya"
    },
    {
      id: "EVT-HCK-07",
      clubId: "hackathons",
      name: "IoT Smart Campus Hardware Sprint",
      tagline: "ESP32, Raspberry Pi, LoRaWAN & smart campus sensing",
      category: "Hardware & IoT",
      date: "2026-12-04",
      time: "09:00 AM - 06:00 PM",
      venue: "Embedded Systems & Robotics Lab",
      teamSize: "Teams of 2 to 4",
      slotsTotal: 25,
      slotsFilled: 21,
      badge: "Hardware Included",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Sensors and microcontrollers provided at registration desk.",
        "Demonstrate end-to-end telemetry and dashboard visualization."
      ],
      disqualifications: [
        "Damaging development boards through excessive voltage."
      ],
      coordinator: { name: "Gaurav Joshi", phone: "+91 98220 77889", email: "gaurav.iot@ccms.edu" },
      facultyInCharge: "Dr. Anirudh Bhattacharya"
    },
    {
      id: "EVT-HCK-08",
      clubId: "hackathons",
      name: "Cloud Native DevOps Rumble",
      tagline: "Containerization, Kubernetes chaos engineering, zero downtime CI/CD",
      category: "DevOps & SRE",
      date: "2026-12-07",
      time: "01:00 PM - 06:00 PM",
      venue: "Server Room Workshop Lab",
      teamSize: "Solo or Duet",
      slotsTotal: 30,
      slotsFilled: 25,
      badge: "Infra Mastery",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Fix intentionally broken production microservice clusters within time."
      ],
      disqualifications: [
        "Altering test runner scripts."
      ],
      coordinator: { name: "Rishabh K", phone: "+91 98220 88990", email: "rishabh.ops@ccms.edu" },
      facultyInCharge: "Dr. Anirudh Bhattacharya"
    },
    {
      id: "EVT-HCK-09",
      clubId: "hackathons",
      name: "GameJam 48hr: Unreal & Unity Sprint",
      tagline: "Create immersive gameplay, physics & audio mechanics",
      category: "Game Development",
      date: "2026-12-10",
      time: "06:00 PM (Dec 10) - 06:00 PM (Dec 12)",
      venue: "Media Animation Studio",
      teamSize: "Teams of 2 to 4",
      slotsTotal: 20,
      slotsFilled: 19,
      badge: "Creative Tech",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Theme declared at start. Playable build must be exported to Windows or WebGL."
      ],
      disqualifications: [
        "Using copyrighted 3D meshes without license."
      ],
      coordinator: { name: "Varun Dixit", phone: "+91 98220 99001", email: "varun.game@ccms.edu" },
      facultyInCharge: "Dr. Anirudh Bhattacharya"
    },
    {
      id: "EVT-HCK-10",
      clubId: "hackathons",
      name: "Quantum Computing Algorithmic Jam",
      tagline: "Qiskit, superposition & Grover's search algorithms",
      category: "Quantum Tech",
      date: "2026-12-15",
      time: "10:00 AM - 04:00 PM",
      venue: "High Performance Computing Lab",
      teamSize: "Solo or Duet",
      slotsTotal: 25,
      slotsFilled: 18,
      badge: "Next Gen",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Submit quantum circuit solutions tested on IBM Quantum simulator."
      ],
      disqualifications: [
        "Plagiarism in circuit synthesis."
      ],
      coordinator: { name: "Dr. Sneha Paul", phone: "+91 98220 00112", email: "sneha.quantum@ccms.edu" },
      facultyInCharge: "Dr. Anirudh Bhattacharya"
    },

    // --- 4. SPORTS CLUB EVENTS ---
    {
      id: "EVT-SPT-01",
      clubId: "sports",
      name: "Inter-Department Cricket Premier League",
      tagline: "T20 floodlit rivalry: power-hitting and championship glory",
      category: "Cricket Tournament",
      date: "2026-11-17",
      time: "04:00 PM - 10:00 PM",
      venue: "Main University Cricket Oval",
      teamSize: "11 Players + 4 Substitutes",
      slotsTotal: 16,
      slotsFilled: 16,
      badge: "Sold Out",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Standard ICC T20 regulations with 4 powerplay overs.",
        "Spike shoes strictly prohibited on pitch turf.",
        "Official white leather balls provided by athletic committee."
      ],
      disqualifications: [
        "Fielding non-registered student players.",
        "Dissent against official umpire decisions results in yellow card / ban."
      ],
      coordinator: { name: "Rohan Varma", phone: "+91 96110 11223", email: "sports.lead@ccms.edu" },
      facultyInCharge: "Coach Vikram Rathore"
    },
    {
      id: "EVT-SPT-02",
      clubId: "sports",
      name: "Zenith Futsal Championship (5v5)",
      tagline: "Fast-paced cage football under neon lights",
      category: "Futsal 5v5",
      date: "2026-11-21",
      time: "05:00 PM - 09:30 PM",
      venue: "Synthetic AstroTurf Arena",
      teamSize: "5 Players + 3 Rolling Subs",
      slotsTotal: 24,
      slotsFilled: 22,
      badge: "Fast & Furious",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Two halves of 12 minutes with rolling substitutions.",
        "No slide tackling on turf surface."
      ],
      disqualifications: [
        "Violent conduct or deliberate handball outside box."
      ],
      coordinator: { name: "Farhan Qureshi", phone: "+91 96110 22334", email: "farhan.futsal@ccms.edu" },
      facultyInCharge: "Coach Vikram Rathore"
    },
    {
      id: "EVT-SPT-03",
      clubId: "sports",
      name: "Slam Dunk Basketball Carnival",
      tagline: "Crossover handles, 3-point shootouts & rim-rocking dunks",
      category: "Basketball",
      date: "2026-11-24",
      time: "03:00 PM - 08:00 PM",
      venue: "Olympic Maple-Wood Indoor Court",
      teamSize: "Teams of 5 + 3 Reserves",
      slotsTotal: 16,
      slotsFilled: 14,
      badge: "High Flying",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
      rules: [
        "FIBA rules apply. 10-minute quarters.",
        "Non-marking indoor basketball shoes compulsory."
      ],
      disqualifications: [
        "Accumulation of two technical fouls by a player."
      ],
      coordinator: { name: "Jason Fernandes", phone: "+91 96110 33445", email: "jason.dunk@ccms.edu" },
      facultyInCharge: "Coach Vikram Rathore"
    },
    {
      id: "EVT-SPT-04",
      clubId: "sports",
      name: "SmashFest Badminton Open",
      tagline: "Singles and doubles shuttlecocks flying at 300 km/h",
      category: "Badminton",
      date: "2026-11-27",
      time: "09:00 AM - 05:00 PM",
      venue: "Badminton Hall (Courts 1-4)",
      teamSize: "Singles (1) or Doubles (2)",
      slotsTotal: 48,
      slotsFilled: 42,
      badge: "Precision",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Best of 3 sets, 21 points rally scoring.",
        "Yonex feather shuttles provided."
      ],
      disqualifications: [
        "Throwing racquets onto court mats."
      ],
      coordinator: { name: "Ananya Hegde", phone: "+91 96110 44556", email: "ananya.smash@ccms.edu" },
      facultyInCharge: "Coach Vikram Rathore"
    },
    {
      id: "EVT-SPT-05",
      clubId: "sports",
      name: "Table Tennis Rapid Fire",
      tagline: "Topspin duels and lightning reflexes",
      category: "Table Tennis",
      date: "2026-11-29",
      time: "02:00 PM - 07:00 PM",
      venue: "Recreation Center TT Arena",
      teamSize: "Singles",
      slotsTotal: 32,
      slotsFilled: 28,
      badge: "Rapid Reflex",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=800&q=80",
      rules: [
        "ITTF rules. 11 points per game, alternate 2 serves."
      ],
      disqualifications: [
        "Unapproved rubber paddle adhesives."
      ],
      coordinator: { name: "Chirag Singhania", phone: "+91 96110 55667", email: "chirag.tt@ccms.edu" },
      facultyInCharge: "Coach Vikram Rathore"
    },
    {
      id: "EVT-SPT-06",
      clubId: "sports",
      name: "Grandmaster Blitz Chess Tournament",
      tagline: "3 minutes + 2 seconds increment: the ultimate mind battle",
      category: "Chess Blitz",
      date: "2026-12-02",
      time: "10:00 AM - 03:00 PM",
      venue: "Library Quiet Conference Hall",
      teamSize: "Solo",
      slotsTotal: 64,
      slotsFilled: 59,
      badge: "FIDE Rules",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80",
      rules: [
        "9 rounds Swiss system.",
        "FIDE blitz tiebreaks apply."
      ],
      disqualifications: [
        "Possession of electronic watches or mobile phones in playing hall."
      ],
      coordinator: { name: "Siddharth Rao", phone: "+91 96110 66778", email: "siddharth.chess@ccms.edu" },
      facultyInCharge: "Coach Vikram Rathore"
    },
    {
      id: "EVT-SPT-07",
      clubId: "sports",
      name: "Track & Field: 100m Sprint & 4x100m",
      tagline: "Pure speed, explosive acceleration, and seamless baton handoffs",
      category: "Athletics",
      date: "2026-12-05",
      time: "08:00 AM - 12:30 PM",
      venue: "Olympic 400m Synthetic Track",
      teamSize: "Solo (Sprint) / Team of 4 (Relay)",
      slotsTotal: 40,
      slotsFilled: 36,
      badge: "Pure Speed",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Electronic laser timing gate used.",
        "One false start leads to instant disqualification."
      ],
      disqualifications: [
        "Stepping out of lane boundaries on curve."
      ],
      coordinator: { name: "Kiran Bedi", phone: "+91 96110 77889", email: "kiran.track@ccms.edu" },
      facultyInCharge: "Coach Vikram Rathore"
    },
    {
      id: "EVT-SPT-08",
      clubId: "sports",
      name: "E-Sports: Valorant & BGMI Cup",
      tagline: "LAN tournament: clutch aces, tactical lineups & chicken dinners",
      category: "E-Sports LAN",
      date: "2026-12-08",
      time: "11:00 AM - 08:00 PM",
      venue: "Esports Lounge (Gaming Arena)",
      teamSize: "Teams of 5 (Valorant) / 4 (BGMI)",
      slotsTotal: 32,
      slotsFilled: 32,
      badge: "Sold Out",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Custom private LAN tournament servers.",
        "Bring your own peripherals (mouse, headset, keypad)."
      ],
      disqualifications: [
        "Any aimbot, macro scripts or third-party overlay injection."
      ],
      coordinator: { name: "Arya Stark", phone: "+91 96110 88990", email: "arya.esports@ccms.edu" },
      facultyInCharge: "Coach Vikram Rathore"
    },
    {
      id: "EVT-SPT-09",
      clubId: "sports",
      name: "Tug of War Campus Derby",
      tagline: "Grit, traction, anchor strength and raw horsepower",
      category: "Power Sport",
      date: "2026-12-11",
      time: "03:30 PM - 06:30 PM",
      venue: "Mud Track Field",
      teamSize: "Teams of 8 (Max total weight 640kg)",
      slotsTotal: 16,
      slotsFilled: 15,
      badge: "Grit & Muscle",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Standard Manila hemp rope.",
        "Cleats without metal spikes permitted."
      ],
      disqualifications: [
        "Locking rope around arms or waist (safety foul)."
      ],
      coordinator: { name: "Harman Preet", phone: "+91 96110 99001", email: "harman.tug@ccms.edu" },
      facultyInCharge: "Coach Vikram Rathore"
    },
    {
      id: "EVT-SPT-10",
      clubId: "sports",
      name: "Powerlifting Titan Cup: SBD",
      tagline: "Squat, bench press and deadlift: total kilograms triumph",
      category: "Strength Athletics",
      date: "2026-12-14",
      time: "10:00 AM - 04:00 PM",
      venue: "Campus Gymnasium Iron Pit",
      teamSize: "Solo (Weight Categories)",
      slotsTotal: 30,
      slotsFilled: 27,
      badge: "Iron Will",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
      rules: [
        "IPF rules: 3 attempts each in squat, bench, and deadlift."
      ],
      disqualifications: [
        "Failure to achieve parallel squat depth across attempts."
      ],
      coordinator: { name: "Sameer Khan", phone: "+91 96110 00112", email: "sameer.iron@ccms.edu" },
      facultyInCharge: "Coach Vikram Rathore"
    },

    // --- 5. RESEARCH CLUB EVENTS ---
    {
      id: "EVT-RSC-01",
      clubId: "research",
      name: "National Student Research Colloquium",
      tagline: "Peer-reviewed innovation presented to IEEE and Elsevier reviewers",
      category: "Flagship Research Conference",
      date: "2026-11-18",
      time: "09:00 AM - 05:00 PM",
      venue: "Sir C.V. Raman Auditorium",
      teamSize: "Solo or Teams up to 3",
      slotsTotal: 30,
      slotsFilled: 28,
      badge: "Scopus Indexed",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
      rules: [
        "15 minutes presentation + 5 minutes technical Q&A by jury.",
        "Paper formatted according to double-column IEEE template."
      ],
      disqualifications: [
        "Similarity index (Turnitin) exceeding 15%.",
        "Fabrication of experimental results."
      ],
      coordinator: { name: "Dr. Siddharth Roy", phone: "+91 95350 11223", email: "research.lead@ccms.edu" },
      facultyInCharge: "Dr. Suniti Murthy"
    },
    {
      id: "EVT-RSC-02",
      clubId: "research",
      name: "PatentPitch: Innovate to Commercialize",
      tagline: "Pitch novel engineering prototypes to angel investors & patent attorneys",
      category: "IP & Entrepreneurship",
      date: "2026-11-22",
      time: "10:00 AM - 03:00 PM",
      venue: "Incubation Center Boardroom",
      teamSize: "Teams of 1 to 4",
      slotsTotal: 20,
      slotsFilled: 17,
      badge: "Seed Funding",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      rules: [
        "7 minute pitch deck + prototype demonstration.",
        "Prior-art search documentation required."
      ],
      disqualifications: [
        "Disclosing ideas under active NDA without authorization."
      ],
      coordinator: { name: "Pooja Vashist", phone: "+91 95350 22334", email: "pooja.patent@ccms.edu" },
      facultyInCharge: "Dr. Suniti Murthy"
    },
    {
      id: "EVT-RSC-03",
      clubId: "research",
      name: "DeepTech Robotics & Autonomous Drones Expo",
      tagline: "Obstacle avoidance, SLAM navigation, and swarm robotics live demo",
      category: "Robotics Expo",
      date: "2026-11-25",
      time: "11:00 AM - 06:00 PM",
      venue: "High Bay Robotics Arena",
      teamSize: "Teams of 2 to 5",
      slotsTotal: 25,
      slotsFilled: 23,
      badge: "Live Testing",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Robots must pass safety failsafe check before entering demo net."
      ],
      disqualifications: [
        "Loss of radio communication without hardware emergency cutoff."
      ],
      coordinator: { name: "Akash Deep", phone: "+91 95350 33445", email: "akash.robo@ccms.edu" },
      facultyInCharge: "Dr. Suniti Murthy"
    },
    {
      id: "EVT-RSC-04",
      clubId: "research",
      name: "Data Science & Predictive Analytics Summit",
      tagline: "Solving city traffic, healthcare forecasting, and climate datasets",
      category: "Data Science",
      date: "2026-11-28",
      time: "09:30 AM - 04:30 PM",
      venue: "Analytics Center Seminar Hall",
      teamSize: "Solo or Duet",
      slotsTotal: 35,
      slotsFilled: 30,
      badge: "Kaggle Certified",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Jupyter notebooks and reproducibility environment must be documented."
      ],
      disqualifications: [
        "Data leakage between test and training sets."
      ],
      coordinator: { name: "Shreya Ghoshal", phone: "+91 95350 44556", email: "shreya.ds@ccms.edu" },
      facultyInCharge: "Dr. Suniti Murthy"
    },
    {
      id: "EVT-RSC-05",
      clubId: "research",
      name: "Biotech & Genomic Research Showcase",
      tagline: "CRISPR models, bio-informatics, and enzymatic solutions",
      category: "Biotechnology",
      date: "2026-12-01",
      time: "10:00 AM - 03:00 PM",
      venue: "Bio-Sciences Research Wing",
      teamSize: "Teams of 2 to 3",
      slotsTotal: 20,
      slotsFilled: 16,
      badge: "Bio-Safety Certified",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80",
      rules: [
        "In silico and wet-lab findings presented with statistical p-values."
      ],
      disqualifications: [
        "Unauthorized handling of Biosafety Level 2 pathogens."
      ],
      coordinator: { name: "Aarushi Taneja", phone: "+91 95350 55667", email: "aarushi.bio@ccms.edu" },
      facultyInCharge: "Dr. Suniti Murthy"
    },
    {
      id: "EVT-RSC-06",
      clubId: "research",
      name: "Aerospace & Nano-Sat Prototype Fair",
      tagline: "CubeSat payloads, atmospheric weather probes & propulsion",
      category: "Aerospace",
      date: "2026-12-04",
      time: "10:00 AM - 05:00 PM",
      venue: "Aerodynamics Wind Tunnel Lab",
      teamSize: "Teams of 3 to 6",
      slotsTotal: 15,
      slotsFilled: 14,
      badge: "Space Mission",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1517976487507-5b3b4b45f917?auto=format&fit=crop&w=800&q=80",
      rules: [
        "CubeSat structure adheres to standard 1U/2U specifications."
      ],
      disqualifications: [
        "Unapproved propellants or combustible fuels."
      ],
      coordinator: { name: "Karthik Chandra", phone: "+91 95350 66778", email: "karthik.sat@ccms.edu" },
      facultyInCharge: "Dr. Suniti Murthy"
    },
    {
      id: "EVT-RSC-07",
      clubId: "research",
      name: "Renewable Energy Solutions Challenge",
      tagline: "Perovskite solar cells, hydrogen fuel systems & micro-grids",
      category: "Green Tech",
      date: "2026-12-07",
      time: "09:00 AM - 02:00 PM",
      venue: "Renewable Energy Rooftop Station",
      teamSize: "Teams of 2 to 4",
      slotsTotal: 25,
      slotsFilled: 22,
      badge: "Eco Impact",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Live energy conversion efficiency measurement by panel."
      ],
      disqualifications: [
        "Presenting theoretical proposals without experimental verification."
      ],
      coordinator: { name: "Neha Rastogi", phone: "+91 95350 77889", email: "neha.green@ccms.edu" },
      facultyInCharge: "Dr. Suniti Murthy"
    },
    {
      id: "EVT-RSC-08",
      clubId: "research",
      name: "Materials Science Future Frontiers",
      tagline: "Graphene coatings, self-healing polymers and biomaterials",
      category: "Materials Science",
      date: "2026-12-10",
      time: "01:30 PM - 05:30 PM",
      venue: "Metallurgy Characterization Facility",
      teamSize: "Solo or Duet",
      slotsTotal: 20,
      slotsFilled: 15,
      badge: "Nano Scale",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80",
      rules: [
        "SEM/TEM characterization micrograph inclusion mandatory."
      ],
      disqualifications: [
        "Misrepresenting magnification scales on microscopic imaging."
      ],
      coordinator: { name: "Manish Tewari", phone: "+91 95350 88990", email: "manish.mat@ccms.edu" },
      facultyInCharge: "Dr. Suniti Murthy"
    },
    {
      id: "EVT-RSC-09",
      clubId: "research",
      name: "Young Scientist Grant Pitch Battle",
      tagline: "Win up to ₹1,00,000 direct departmental seed grant",
      category: "Research Grants",
      date: "2026-12-13",
      time: "10:00 AM - 04:00 PM",
      venue: "Executive Council Chambers",
      teamSize: "Individual Student Researchers",
      slotsTotal: 15,
      slotsFilled: 13,
      badge: "Direct Grants",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Proposal must feature clear 6-month milestones and budget breakdown."
      ],
      disqualifications: [
        "Incomplete financial budget ledger."
      ],
      coordinator: { name: "Ritika Chawla", phone: "+91 95350 99001", email: "ritika.grant@ccms.edu" },
      facultyInCharge: "Dr. Suniti Murthy"
    },
    {
      id: "EVT-RSC-10",
      clubId: "research",
      name: "Ethics & Safety in Artificial Superintelligence",
      tagline: "Panel debate and policy thesis presentation",
      category: "AI Governance",
      date: "2026-12-16",
      time: "02:00 PM - 06:00 PM",
      venue: "Philosophical & Legal Studies Hall",
      teamSize: "Solo or Duet",
      slotsTotal: 30,
      slotsFilled: 27,
      badge: "Thought Leadership",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Submit 3,000 word whitepaper on alignment and mechanistic interpretability."
      ],
      disqualifications: [
        "AI-generated papers with zero human critical commentary."
      ],
      coordinator: { name: "Prof. Jayant Sahas", phone: "+91 95350 00112", email: "jayant.policy@ccms.edu" },
      facultyInCharge: "Dr. Suniti Murthy"
    },

    // --- 6. FASHION CLUB EVENTS ---
    {
      id: "EVT-FSH-01",
      clubId: "fashion",
      name: "Haute Couture Runway Gala",
      tagline: "The crown jewel of college fashion week: custom designer silhouettes",
      category: "Flagship Runway Gala",
      date: "2026-11-19",
      time: "06:30 PM - 10:30 PM",
      venue: "Grand Open-Air Promenade Ramp",
      teamSize: "Designers + Models (6 to 14 members)",
      slotsTotal: 12,
      slotsFilled: 11,
      badge: "Vogue Highlight",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Theme: Renaissance Futurism. 10 minutes runway showcase.",
        "Original garments created and tailored by student designers.",
        "Professional lighting, ramp music track submitted 48 hours prior."
      ],
      disqualifications: [
        "Using off-the-shelf ready-made commercial retail garments.",
        "Ramp choreography extending past 10 minutes limit."
      ],
      coordinator: { name: "Natasha Kapoor", phone: "+91 99160 11223", email: "fashion.lead@ccms.edu" },
      facultyInCharge: "Prof. Ananya Sen"
    },
    {
      id: "EVT-FSH-02",
      clubId: "fashion",
      name: "EcoChic: Sustainable Upcycled Fashion",
      tagline: "Transforming thrifted denim, textiles & scraps into high runway art",
      category: "Sustainable Fashion",
      date: "2026-11-23",
      time: "02:00 PM - 06:00 PM",
      venue: "Art Studio Gallery",
      teamSize: "Teams of 2 to 4",
      slotsTotal: 20,
      slotsFilled: 19,
      badge: "Zero Waste",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Minimum 85% post-consumer discarded materials used.",
        "Before-and-after construction process documented."
      ],
      disqualifications: [
        "Purchasing virgin plastic fabrics or new fast-fashion items."
      ],
      coordinator: { name: "Meera Singhania", phone: "+91 99160 22334", email: "meera.eco@ccms.edu" },
      facultyInCharge: "Prof. Ananya Sen"
    },
    {
      id: "EVT-FSH-03",
      clubId: "fashion",
      name: "Ethnic Opulence: Indian Royal Regalia",
      tagline: "Banarasi brocades, Chikankari, Zardozi and royal silhouettes",
      category: "Traditional Couture",
      date: "2026-11-26",
      time: "05:00 PM - 09:00 PM",
      venue: "Courtyard Heritage Pavilion",
      teamSize: "Models & Stylists (4 to 8)",
      slotsTotal: 15,
      slotsFilled: 14,
      badge: "Royal Splendor",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Celebrates authentic regional handlooms and weaves."
      ],
      disqualifications: [
        "Inappropriate satirical caricature of regional customs."
      ],
      coordinator: { name: "Aarushi Singhal", phone: "+91 99160 33445", email: "aarushi.regalia@ccms.edu" },
      facultyInCharge: "Prof. Ananya Sen"
    },
    {
      id: "EVT-FSH-04",
      clubId: "fashion",
      name: "Cyberpunk Neon Streetwear Ramp",
      tagline: "Techwear, tactical utility straps, reflective iridescence",
      category: "Streetwear",
      date: "2026-11-29",
      time: "07:00 PM - 10:00 PM",
      venue: "Underground Atrium Walkway",
      teamSize: "Solo or Crews up to 6",
      slotsTotal: 25,
      slotsFilled: 24,
      badge: "Edgy & Modern",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Utility functionality: pockets, modular straps, dark aesthetic."
      ],
      disqualifications: [
        "Unshielded laser pointers causing eye glare to audience."
      ],
      coordinator: { name: "Zack Martin", phone: "+91 99160 44556", email: "zack.street@ccms.edu" },
      facultyInCharge: "Prof. Ananya Sen"
    },
    {
      id: "EVT-FSH-05",
      clubId: "fashion",
      name: "Met Gala Masquerade Soiree",
      tagline: "Dramatic avant-garde masks, theatrical capes and fantasy couture",
      category: "Theatrical Fashion",
      date: "2026-12-03",
      time: "06:00 PM - 10:30 PM",
      venue: "Crystal Ballroom & Gardens",
      teamSize: "Solo or Couples",
      slotsTotal: 40,
      slotsFilled: 38,
      badge: "Theatrical Masterpiece",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Elaborate hand-sculpted masquerade masks mandatory."
      ],
      disqualifications: [
        "Plastic party store masks without custom artistic rework."
      ],
      coordinator: { name: "Rhea Mukherjee", phone: "+91 99160 55667", email: "rhea.gala@ccms.edu" },
      facultyInCharge: "Prof. Ananya Sen"
    },
    {
      id: "EVT-FSH-06",
      clubId: "fashion",
      name: "Sneaker Customization & Art Walk",
      tagline: "Hand-painted Air Jordans, hydro-dipping & custom leather work",
      category: "Sneaker Art",
      date: "2026-12-06",
      time: "11:00 AM - 04:00 PM",
      venue: "Design Quadrangle Open Gazebo",
      teamSize: "Solo",
      slotsTotal: 30,
      slotsFilled: 27,
      badge: "Kicks & Craft",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Participants bring their own blank/canvas shoes. Acrylic leather paints provided."
      ],
      disqualifications: [
        "Toxic chemical fumes in unventilated areas."
      ],
      coordinator: { name: "Dhruv Malhotra", phone: "+91 99160 66778", email: "dhruv.kicks@ccms.edu" },
      facultyInCharge: "Prof. Ananya Sen"
    },
    {
      id: "EVT-FSH-07",
      clubId: "fashion",
      name: "Glam & Glow: Makeup Artistry Duel",
      tagline: "Editorial face painting, prosthetic fantasy & glow-in-the-dark art",
      category: "Makeup Artistry",
      date: "2026-12-09",
      time: "01:00 PM - 05:00 PM",
      venue: "Styling Studio 3",
      teamSize: "Artist + Model (2 Members)",
      slotsTotal: 25,
      slotsFilled: 23,
      badge: "Editorial Glam",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      rules: [
        "2 hours live transformation under jury observation."
      ],
      disqualifications: [
        "Non-hypoallergenic industrial chemicals harmful to skin."
      ],
      coordinator: { name: "Ananya Dixit", phone: "+91 99160 77889", email: "ananya.makeup@ccms.edu" },
      facultyInCharge: "Prof. Ananya Sen"
    },
    {
      id: "EVT-FSH-08",
      clubId: "fashion",
      name: "Vintage Rewind: 80s & 90s Nostalgia",
      tagline: "Bell-bottoms, oversized blazers, grunge and polka-dot revival",
      category: "Vintage Aesthetics",
      date: "2026-12-12",
      time: "04:00 PM - 08:00 PM",
      venue: "Retro Diner Lounge Patio",
      teamSize: "Solo or Duet",
      slotsTotal: 35,
      slotsFilled: 31,
      badge: "Retro Chic",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Styling must clearly identify with specific 70s/80s/90s subcultures."
      ],
      disqualifications: [
        "Modern fast-fashion branded logos prominently visible."
      ],
      coordinator: { name: "Kabir Oberoi", phone: "+91 99160 88990", email: "kabir.vintage@ccms.edu" },
      facultyInCharge: "Prof. Ananya Sen"
    },
    {
      id: "EVT-FSH-09",
      clubId: "fashion",
      name: "Avant-Garde Architectural Silhouette",
      tagline: "Garments sculpted like structural bridges and origami monuments",
      category: "Architectural Fashion",
      date: "2026-12-15",
      time: "03:00 PM - 07:00 PM",
      venue: "School of Architecture Atrium",
      teamSize: "Teams of 2 to 4",
      slotsTotal: 15,
      slotsFilled: 13,
      badge: "Sculptural Art",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Incorporate wireframes, molded resin, or geometric pleats."
      ],
      disqualifications: [
        "Structurally unsafe designs that collapse on model."
      ],
      coordinator: { name: "Simran Johar", phone: "+91 99160 99001", email: "simran.sculpt@ccms.edu" },
      facultyInCharge: "Prof. Ananya Sen"
    },
    {
      id: "EVT-FSH-10",
      clubId: "fashion",
      name: "Vogue Face of the Year & Model Hunt",
      tagline: "Walk, confidence, photogenic presence and personality interview",
      category: "Model Hunt",
      date: "2026-12-18",
      time: "02:00 PM - 07:30 PM",
      venue: "Auditorium Main Stage",
      teamSize: "Solo",
      slotsTotal: 50,
      slotsFilled: 49,
      badge: "Magazine Cover",
      price: "Free Entry",
      banner: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
      rules: [
        "Round 1: Casual walk. Round 2: Evening formal. Round 3: Personality Q&A."
      ],
      disqualifications: [
        "Disrespectful interaction with jury members."
      ],
      coordinator: { name: "Aditi Rao", phone: "+91 99160 00112", email: "aditi.model@ccms.edu" },
      facultyInCharge: "Prof. Ananya Sen"
    }
  ],

  // 6 Feedback Survey Questions (MSQ / Multi-select & Star Rating)
  feedbackQuestions: [
    {
      id: "q1",
      question: "Which aspects of the event organization impressed you the most?",
      type: "msq",
      options: [
        "Punctual Stage & Technical Setup",
        "Clear Rules & Fair Judging Criteria",
        "High Quality Sound / Equipment Systems",
        "Smooth Fast Registration & Check-in",
        "Helpful Student Volunteers & Faculty Support"
      ]
    },
    {
      id: "q2",
      question: "How would you rate the overall event venue, acoustics, and hospitality?",
      type: "rating",
      options: ["1 - Poor", "2 - Fair", "3 - Good", "4 - Very Good", "5 - World Class"]
    },
    {
      id: "q3",
      question: "Which areas need immediate improvement for the next edition?",
      type: "msq",
      options: [
        "More practice/setup time before performance",
        "Better refreshment & hydration stalls",
        "Enhanced audio feedback monitors",
        "Clearer schedule updates via WhatsApp/SMS",
        "Expanded seating capacity for audience"
      ]
    },
    {
      id: "q4",
      question: "How would you rate the club coordinators' response time & assistance?",
      type: "rating",
      options: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"]
    },
    {
      id: "q5",
      question: "Would you participate again or recommend CCMS events to peers?",
      type: "single",
      options: [
        "Absolutely Yes! (100% Recommended)",
        "Likely to participate again",
        "Neutral / Depends on future event lineup",
        "Unlikely"
      ]
    },
    {
      id: "q6",
      question: "Select the future event themes you would love CCMS to host next semester:",
      type: "msq",
      options: [
        "Inter-College National Cultural Fest",
        "Celebrity Singer / Band Concert Night",
        "Industry-Sponsored 48hr Hackathon",
        "E-Sports Championship on Big Screens",
        "Fashion & Design Incubation Fair"
      ]
    }
  ],

  // Pre-seeded Student Registrations (Stored in localStorage database)
  initialRegistrations: [
    {
      regId: "REG-2026-1001",
      studentId: "STU-8821",
      studentName: "Shorajit Das",
      email: "shorajid.das@campus.edu",
      phone: "+91 98412 34567",
      dept: "Computer Science & Engineering",
      year: "3rd Year",
      clubId: "singing",
      clubName: "Aura Harmonics",
      eventId: "EVT-SNG-01",
      eventName: "Silver Jubilee Grand Gala",
      teamName: "Acoustic Mirage",
      teamMembers: "Shorajit Das, Rahul Verma, Tanya Roy",
      registeredAt: "2026-10-24 11:32 AM",
      status: "Approved",
      attendance: "Present",
      certificateGenerated: true
    },
    {
      regId: "REG-2026-1002",
      studentId: "STU-8822",
      studentName: "Ridhi Kundu",
      email: "ridhi.kundu@campus.edu",
      phone: "+91 98412 98765",
      dept: "Information Technology",
      year: "3rd Year",
      clubId: "hackathons",
      clubName: "CodeNova Nexus",
      eventId: "EVT-HCK-01",
      eventName: "HackGenesis 2026 - National 36hr Hackathon",
      teamName: "Quantum Coders",
      teamMembers: "Ridhi Kundu, Aarav Patel, Sneha Rao",
      registeredAt: "2026-10-25 02:15 PM",
      status: "Approved",
      attendance: "Present",
      certificateGenerated: true
    },
    {
      regId: "REG-2026-1003",
      studentId: "STU-8905",
      studentName: "Armaan Malik",
      email: "armaan.m@campus.edu",
      phone: "+91 91234 56780",
      dept: "Performing Arts",
      year: "2nd Year",
      clubId: "singing",
      clubName: "Aura Harmonics",
      eventId: "EVT-SNG-02",
      eventName: "Voice of Zenith: Solo Championship",
      teamName: "Solo",
      teamMembers: "Armaan Malik",
      registeredAt: "2026-10-25 04:45 PM",
      status: "Pending",
      attendance: "Not Marked",
      certificateGenerated: false
    },
    {
      regId: "REG-2026-1004",
      studentId: "STU-9012",
      studentName: "Ananya Pandey",
      email: "ananya.p@campus.edu",
      phone: "+91 94567 89012",
      dept: "Design & Fashion Tech",
      year: "4th Year",
      clubId: "fashion",
      clubName: "Vogue Vanguard",
      eventId: "EVT-FSH-01",
      eventName: "Haute Couture Runway Gala",
      teamName: "Elysian Threads",
      teamMembers: "Ananya Pandey, Megha Sen, Natasha K",
      registeredAt: "2026-10-25 06:10 PM",
      status: "Approved",
      attendance: "Present",
      certificateGenerated: false
    },
    {
      regId: "REG-2026-1005",
      studentId: "STU-9134",
      studentName: "Vikrant Chauhan",
      email: "vikrant.c@campus.edu",
      phone: "+91 93456 78901",
      dept: "Mechanical Engineering",
      year: "3rd Year",
      clubId: "sports",
      clubName: "Apex Titans",
      eventId: "EVT-SPT-01",
      eventName: "Inter-Department Cricket Premier League",
      teamName: "Mech Strikers XI",
      teamMembers: "Vikrant C (C), Rohit P, Karan S, Sunny T",
      registeredAt: "2026-10-26 09:20 AM",
      status: "Approved",
      attendance: "Not Marked",
      certificateGenerated: false
    },
    {
      regId: "REG-2026-1006",
      studentId: "STU-9245",
      studentName: "Megha Sunder",
      email: "megha.s@campus.edu",
      phone: "+91 92345 67890",
      dept: "BioTechnology",
      year: "1st Year",
      clubId: "research",
      clubName: "Syntropy Labs",
      eventId: "EVT-RSC-01",
      eventName: "National Student Research Colloquium",
      teamName: "BioNano Sync",
      teamMembers: "Megha Sunder, Dr. Roy",
      registeredAt: "2026-10-26 10:15 AM",
      status: "Pending",
      attendance: "Not Marked",
      certificateGenerated: false
    },
    {
      regId: "REG-2026-1007",
      studentId: "STU-9388",
      studentName: "Rohan Deshmukh",
      email: "rohan.d@campus.edu",
      phone: "+91 91122 33445",
      dept: "Electronics & Communication",
      year: "2nd Year",
      clubId: "dancing",
      clubName: "Pulse Choreotech",
      eventId: "EVT-DNC-01",
      eventName: "Cosmic Grooves: Solo Freestyle",
      teamName: "Solo",
      teamMembers: "Rohan Deshmukh",
      registeredAt: "2026-10-26 11:50 AM",
      status: "Approved",
      attendance: "Present",
      certificateGenerated: true
    }
  ],

  // Volunteer & Event Management Schedules for Board Members
  boardSchedules: [
    {
      id: "SCH-001",
      clubId: "singing",
      eventName: "Silver Jubilee Grand Gala",
      date: "Nov 15, 2026",
      time: "06:00 PM - 10:30 PM",
      venue: "Grand Open-Air Amphitheatre",
      status: "Setup In Progress",
      assignedLead: "Kunal Verma (Head Coordinator)",
      volunteersNeeded: 15,
      volunteersActive: 15,
      timeline: [
        { time: "02:00 PM", task: "Stage audio setup & soundcraft board check", status: "Completed" },
        { time: "03:30 PM", task: "Acoustic mic testing & participant roster verification", status: "Ongoing" },
        { time: "05:00 PM", task: "Gate VIP & student registration check-in scanner active", status: "Upcoming" },
        { time: "06:00 PM", task: "Event Inauguration & Opening Choral Medley", status: "Upcoming" },
        { time: "09:45 PM", task: "Judges scoring tabulation & Certificate distribution", status: "Upcoming" }
      ]
    },
    {
      id: "SCH-002",
      clubId: "singing",
      eventName: "Voice of Zenith: Solo Championship",
      date: "Nov 18, 2026",
      time: "02:00 PM - 06:00 PM",
      venue: "Auditorium Hall B",
      status: "Scheduled",
      assignedLead: "Tanya Sen (Stage Manager)",
      volunteersNeeded: 8,
      volunteersActive: 8,
      timeline: [
        { time: "12:30 PM", task: "Backing track audio upload & sound engineer check", status: "Upcoming" },
        { time: "01:30 PM", task: "Participant roll-call & token allotment", status: "Upcoming" },
        { time: "02:00 PM", task: "Session 1: Solo Vocals (Contestants 1 - 20)", status: "Upcoming" },
        { time: "04:30 PM", task: "Session 2: Finalists face-off", status: "Upcoming" }
      ]
    },
    {
      id: "SCH-003",
      clubId: "dancing",
      eventName: "Cosmic Grooves: Solo Freestyle",
      date: "Nov 16, 2026",
      time: "02:00 PM - 06:00 PM",
      venue: "Indoor Sports Complex Arena",
      status: "Briefing Ready",
      assignedLead: "Priya Nair & Rohit Chawla",
      volunteersNeeded: 10,
      volunteersActive: 10,
      timeline: [
        { time: "01:00 PM", task: "Turf floor tape marking and cypher perimeter layout", status: "Upcoming" },
        { time: "01:45 PM", task: "DJ system sound test & judge briefing", status: "Upcoming" },
        { time: "02:00 PM", task: "Prelim Cypher Round (50 Dancers)", status: "Upcoming" }
      ]
    },
    {
      id: "SCH-004",
      clubId: "hackathons",
      eventName: "HackGenesis 2026 - National 36hr Hackathon",
      date: "Nov 14, 2026",
      time: "09:00 AM (Nov 14) - 09:00 PM (Nov 15)",
      venue: "APJ Abdul Kalam Computing Center",
      status: "High Alert / Lab Setup",
      assignedLead: "Kavya Deshmukh & Nitin Pai",
      volunteersNeeded: 25,
      volunteersActive: 24,
      timeline: [
        { time: "07:30 AM", task: "Gigabit switch installation & power redundancy check", status: "Completed" },
        { time: "08:30 AM", task: "Participant kit distribution (Badges, stickers, redbull)", status: "Completed" },
        { time: "09:00 AM", task: "Hackathon Problem Statements Released", status: "Ongoing" },
        { time: "02:00 PM", task: "Mentor Review Round 1", status: "Upcoming" },
        { time: "11:00 PM", task: "Midnight Pizza & Coffee Reload Station", status: "Upcoming" }
      ]
    },
    {
      id: "SCH-005",
      clubId: "sports",
      eventName: "Inter-Department Cricket Premier League",
      date: "Nov 17, 2026",
      time: "04:00 PM - 10:00 PM",
      venue: "Main Cricket Oval",
      status: "Ground Ready",
      assignedLead: "Farhan Qureshi (Field Marshal)",
      volunteersNeeded: 14,
      volunteersActive: 14,
      timeline: [
        { time: "02:30 PM", task: "Pitch inspection with match referee", status: "Completed" },
        { time: "03:30 PM", task: "Captains toss and live digital scoreboard init", status: "Upcoming" },
        { time: "04:00 PM", task: "Match 1: CS Hackers vs Mech Titans", status: "Upcoming" }
      ]
    },
    {
      id: "SCH-006",
      clubId: "research",
      eventName: "National Student Research Colloquium",
      date: "Nov 18, 2026",
      time: "09:00 AM - 05:00 PM",
      venue: "Sir C.V. Raman Auditorium",
      status: "Jury Confirmed",
      assignedLead: "Dr. Siddharth Roy",
      volunteersNeeded: 12,
      volunteersActive: 12,
      timeline: [
        { time: "08:00 AM", task: "Poster stands setup in exhibition galleria", status: "Upcoming" },
        { time: "09:00 AM", task: "Keynote address by IEEE Fellow", status: "Upcoming" },
        { time: "11:00 AM", task: "Oral Paper presentations Track A & Track B", status: "Upcoming" }
      ]
    },
    {
      id: "SCH-007",
      clubId: "fashion",
      eventName: "Haute Couture Runway Gala",
      date: "Nov 19, 2026",
      time: "06:30 PM - 10:30 PM",
      venue: "Grand Open-Air Promenade Ramp",
      status: "Backstage Prep",
      assignedLead: "Natasha Kapoor & Zack Martin",
      volunteersNeeded: 18,
      volunteersActive: 18,
      timeline: [
        { time: "02:00 PM", task: "Ramp lighting truss & smoke machines calibration", status: "Upcoming" },
        { time: "04:00 PM", task: "Model fitting & makeup studio station assignment", status: "Upcoming" },
        { time: "06:30 PM", task: "Red carpet walk & opening designer showcase", status: "Upcoming" }
      ]
    }
  ]
};

// Make accessible on window
if (typeof window !== "undefined") {
  window.CCMS_DATA = CCMS_DATA;
}
