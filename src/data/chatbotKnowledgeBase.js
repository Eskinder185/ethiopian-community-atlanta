export const CHATBOT_INTRO = {
  en: "Hi! I can help you find ECAA membership, programs, events, hall rental, media, leadership, documents, and contact information.",
  am: "ሰላም! ስለ ECAA አባልነት፣ ፕሮግራሞች፣ ዝግጅቶች፣ የአዳራሽ ኪራይ፣ ሚዲያ፣ አመራር፣ ሰነዶች እና እውቂያ መረጃ ልረዳዎት እችላለሁ።",
};

export const CHATBOT_QUICK_ACTIONS = {
  en: [
    { label: "Become a Member", href: "/membership" },
    { label: "Upcoming Events", href: "/events" },
    { label: "Book the Event Hall", href: "/events#book-hall" },
    { label: "Programs", href: "/programs" },
    { label: "Media Gallery", href: "/media" },
    { label: "Contact ECAA", href: "/contact" },
  ],
  am: [
    { label: "አባል ይሁኑ", href: "/membership" },
    { label: "መጪ ዝግጅቶች", href: "/events" },
    { label: "አዳራሽ ያስይዙ", href: "/events#book-hall" },
    { label: "ፕሮግራሞች", href: "/programs" },
    { label: "ሚዲያ", href: "/media" },
    { label: "ECAAን ያግኙ", href: "/contact" },
  ],
};

export const CHATBOT_FALLBACK = {
  en: {
    text: "I can help you find membership, events, programs, hall rental, media, leadership, documents, support, and contact information. What are you looking for?",
    actions: [
      { label: "Membership", href: "/membership" },
      { label: "Events", href: "/events" },
      { label: "Programs", href: "/programs" },
      { label: "Contact", href: "/contact" },
    ],
  },
  am: {
    text: "ስለ አባልነት፣ ዝግጅቶች፣ ፕሮግራሞች፣ የአዳራሽ ኪራይ፣ ሚዲያ፣ አመራር፣ ሰነዶች፣ ድጋፍ እና እውቂያ መረጃ ልረዳዎት እችላለሁ። ምን እየፈለጉ ነው?",
    actions: [
      { label: "አባልነት", href: "/membership" },
      { label: "ዝግጅቶች", href: "/events" },
      { label: "ፕሮግራሞች", href: "/programs" },
      { label: "እውቂያ", href: "/contact" },
    ],
  },
};

export const CHATBOT_NO_ADVICE = {
  en: {
    text: "I can help you find ECAA resources, but I cannot provide professional advice. Please contact ECAA or a qualified professional for guidance.",
    actions: [
      { label: "Contact ECAA", href: "/contact" },
      { label: "Programs", href: "/programs" },
    ],
  },
  am: {
    text: "የECAA ግብዓቶችን ለማግኘት ልረዳዎት እችላለሁ፣ ግን የባለሙያ ምክር መስጠት አልችልም። እባክዎን ECAAን ወይም ብቁ ባለሙያን ያነጋግሩ።",
    actions: [
      { label: "ECAAን ያግኙ", href: "/contact" },
      { label: "ፕሮግራሞች", href: "/programs" },
    ],
  },
};

export const CHATBOT_NO_ADVICE_KEYWORDS = {
  en: [
    "legal advice",
    "immigration advice",
    "medical advice",
    "financial advice",
    "emergency",
    "lawyer",
    "attorney",
    "doctor",
    "diagnosis",
    "visa help",
    "tax advice",
    "investment advice",
  ],
  am: ["ህጋዊ ምክር", "የስደት ምክር", "የሕክምና ምክር", "የፋይናንስ ምክር", "አደጋ", "አስቸኳይ"],
};

export const CHATBOT_INTENTS = [
  {
    id: "membership",
    keywords: {
      en: [
        "membership",
        "member",
        "join",
        "become a member",
        "sign up",
        "register",
        "application",
        "fee",
        "cost",
        "annual fee",
      ],
      am: ["አባል", "አባልነት", "መቀላቀል", "ይቀላቀሉ", "ቅጽ", "ክፍያ"],
    },
    phrases: {
      en: ["how do i become a member", "how to join", "join ecaa", "membership fee"],
      am: ["አባል መሆን", "እፈልጋለሁ"],
    },
    response: {
      en: "You can join ECAA through the Membership page. The annual membership fee listed on the website is $30.00 per person.",
      am: "ECAAን ለመቀላቀል የአባልነት ገጽን ይጎብኙ። በድህረ ገጹ ላይ የተጠቀሰው ዓመታዊ የአባልነት ክፍያ በአንድ ሰው $30.00 ነው።",
    },
    actions: {
      en: [{ label: "Become a Member", href: "/membership" }],
      am: [{ label: "አባል ይሁኑ", href: "/membership" }],
    },
  },
  {
    id: "events",
    keywords: {
      en: [
        "event",
        "events",
        "upcoming",
        "announcement",
        "news",
        "meeting",
        "calendar",
        "schedule",
      ],
      am: ["ዝግጅት", "ዝግጅቶች", "ማስታወቂያ", "ዜና", "ስብሰባ", "መጪ"],
    },
    phrases: {
      en: ["what events are coming up", "upcoming events", "community news"],
      am: ["ዝግጅቶች የት", "ዝግጅቶች የት ናቸው"],
    },
    response: {
      en: "You can view upcoming events, announcements, community news, hall booking information, and past events on the Events & News page.",
      am: "መጪ ዝግጅቶችን፣ ማስታወቂያዎችን፣ የማህበረሰብ ዜናዎችን፣ የአዳራሽ ማስያዣ መረጃን እና ያለፉ ዝግጅቶችን በዝግጅቶች እና ዜና ገጽ ላይ ማየት ይችላሉ።",
    },
    actions: {
      en: [{ label: "View Events", href: "/events" }],
      am: [{ label: "ዝግጅቶችን ይመልከቱ", href: "/events" }],
    },
  },
  {
    id: "book-hall",
    keywords: {
      en: [
        "hall",
        "rent",
        "rental",
        "book hall",
        "reservation",
        "venue",
        "space",
        "party",
        "wedding",
        "celebration",
        "meeting room",
      ],
      am: ["አዳራሽ", "ኪራይ", "ማስያዝ", "ቦታ", "ስብሰባ", "በዓል", "ዝግጅት"],
    },
    phrases: {
      en: ["how do i rent the hall", "can i rent the hall", "book the hall", "hall rental"],
      am: ["አዳራሽ ማስያዝ", "አዳራሽ ማስያዝ እፈልጋለሁ"],
    },
    response: {
      en: "You can request ECAA hall availability through the Events & News page. Submitting a request does not guarantee a reservation; ECAA must confirm availability, requirements, pricing, and approval.",
      am: "የECAA አዳራሽ ተገኝነትን በዝግጅቶች እና ዜና ገጽ ላይ መጠየቅ ይችላሉ። ጥያቄ ማስገባት ቦታ ማስያዝ ዋስትና አይሰጥም፤ ECAA ተገኝነትን፣ መስፈርቶችን፣ ዋጋን እና ማፅደቅን መረጋገጥ አለበት።",
    },
    actions: {
      en: [{ label: "Book a Hall", href: "/events#book-hall" }],
      am: [{ label: "አዳራሽ ያስይዙ", href: "/events#book-hall" }],
    },
  },
  {
    id: "programs",
    keywords: {
      en: [
        "program",
        "programs",
        "youth",
        "education",
        "health",
        "wellness",
        "financial literacy",
        "legal",
        "family",
        "training",
        "children",
        "special needs",
      ],
      am: ["ፕሮግራም", "ፕሮግራሞች", "ወጣቶች", "ትምህርት", "ጤና", "ቤተሰብ", "ልዩ ፍላጎት", "ስልጠና"],
    },
    phrases: {
      en: ["youth programs", "do you have youth programs", "community programs"],
      am: ["ፕሮግራሞች"],
    },
    response: {
      en: "ECAA offers community programs for youth and education, family support, wellness, financial literacy, legal awareness, leadership growth, and special needs children and families.",
      am: "ECAA ለወጣቶች እና ትምህርት፣ ለቤተሰብ ድጋፍ፣ ለጤና እና ደህንነት፣ ለፋይናንስ ትምህርት፣ ለህግ ግንዛቤ፣ ለአመራር እድገት እና ለልዩ ፍላጎት ልጆች እና ቤተሰቦች የማህበረሰብ ፕሮግራሞችን ያቀርባል።",
    },
    actions: {
      en: [{ label: "Explore Programs", href: "/programs" }],
      am: [{ label: "ፕሮግራሞችን ያስሱ", href: "/programs" }],
    },
  },
  {
    id: "media",
    keywords: {
      en: [
        "media",
        "photo",
        "photos",
        "picture",
        "pictures",
        "video",
        "videos",
        "flyer",
        "flyers",
        "gallery",
        "youtube",
      ],
      am: ["ሚዲያ", "ፎቶ", "ፎቶዎች", "ምስል", "ቪዲዮ", "ቪዲዮዎች", "በራሪ ወረቀት", "ጋለሪ"],
    },
    phrases: {
      en: ["where are the photos", "photo gallery", "media gallery"],
      am: ["ሚዲያ", "ፎቶዎች"],
    },
    response: {
      en: "You can view ECAA photos, videos, flyers, and community links on the Media page.",
      am: "የECAA ፎቶዎችን፣ ቪዲዮዎችን፣ በራሪ ወረቀቶችን እና የማህበረሰብ አገናኞችን በሚዲያ ገጽ ላይ ማየት ይችላሉ።",
    },
    actions: {
      en: [{ label: "View Media", href: "/media" }],
      am: [{ label: "ሚዲያን ይመልከቱ", href: "/media" }],
    },
  },
  {
    id: "leadership",
    keywords: {
      en: [
        "leadership",
        "leader",
        "leaders",
        "board",
        "committee",
        "executive",
        "director",
        "officers",
        "advisory",
      ],
      am: ["አመራር", "መሪ", "መሪዎች", "ቦርድ", "ኮሚቴ", "ዳይሬክተር", "አማካሪ"],
    },
    phrases: {
      en: ["who are the leaders", "board members"],
      am: ["አመራር"],
    },
    response: {
      en: "You can meet ECAA's leaders, board members, committee members, and advisors on the Leadership page.",
      am: "የECAA መሪዎችን፣ የቦርድ አባላትን፣ የኮሚቴ አባላትን እና አማካሪዎችን በአመራር ገጽ ላይ ማየት ይችላሉ።",
    },
    actions: {
      en: [{ label: "View Leadership", href: "/leadership" }],
      am: [{ label: "አመራርን ይመልከቱ", href: "/leadership" }],
    },
  },
  {
    id: "support",
    keywords: {
      en: [
        "donate",
        "donation",
        "support",
        "sponsor",
        "sponsorship",
        "volunteer",
        "help",
        "give",
        "fundraising",
      ],
      am: ["ልገሳ", "ይደግፉ", "ድጋፍ", "ስፖንሰር", "በጎ ፈቃደኝነት", "ያግዙ"],
    },
    phrases: {
      en: ["i want to donate", "how to volunteer", "support ecaa"],
      am: ["ልገሳ", "በጎ ፈቃደኝነት"],
    },
    response: {
      en: "You can support ECAA through donations, sponsorship, volunteering, membership, and community participation.",
      am: "ECAAን በልገሳ፣ በስፖንሰርነት፣ በበጎ ፈቃደኝነት፣ በአባልነት እና በማህበረሰብ ተሳትፎ መደገፍ ይችላሉ።",
    },
    actions: {
      en: [
        { label: "Support ECAA", href: "/support" },
        { label: "Volunteer", href: "/support#volunteer" },
      ],
      am: [
        { label: "ECAAን ይደግፉ", href: "/support" },
        { label: "በጎ ፈቃደኝነት", href: "/support#volunteer" },
      ],
    },
  },
  {
    id: "contact",
    keywords: {
      en: [
        "contact",
        "phone",
        "email",
        "address",
        "location",
        "hours",
        "open",
        "office",
        "visit",
        "directions",
      ],
      am: ["እውቂያ", "ያግኙ", "ስልክ", "ኢሜይል", "አድራሻ", "ቦታ", "ሰዓት", "ቢሮ"],
    },
    phrases: {
      en: ["where is ecaa located", "phone number", "contact ecaa", "office hours"],
      am: ["ስልክ ቁጥር", "አድራሻ"],
    },
    response: {
      en: "You can contact ECAA by email at staff@ethiopiancaa.org or phone at +1 (404) 298-4570. ECAA is located at 5616 Memorial Dr, Stone Mountain, GA 30083.",
      am: "ECAAን በኢሜይል staff@ethiopiancaa.org ወይም በስልክ +1 (404) 298-4570 ማግኘት ይችላሉ። ECAA በ 5616 Memorial Dr, Stone Mountain, GA 30083 ይገኛል።",
    },
    actions: {
      en: [{ label: "Contact ECAA", href: "/contact" }],
      am: [{ label: "ECAAን ያግኙ", href: "/contact" }],
    },
  },
  {
    id: "documents",
    keywords: {
      en: ["documents", "bylaws", "forms", "election", "policy", "report", "file", "download"],
      am: ["ሰነዶች", "መተዳደሪያ", "ቅጾች", "ምርጫ", "ፖሊሲ", "ሪፖርት"],
    },
    phrases: {
      en: ["bylaws", "public documents"],
      am: ["ሰነዶች"],
    },
    response: {
      en: "You can find ECAA documents, bylaws, forms, election materials, and public resources on the Documents page.",
      am: "የECAA ሰነዶችን፣ መተዳደሪያ ህጎችን፣ ቅጾችን፣ የምርጫ መረጃዎችን እና የህዝብ ግብዓቶችን በሰነዶች ገጽ ላይ ማግኘት ይችላሉ።",
    },
    actions: {
      en: [{ label: "View Documents", href: "/documents" }],
      am: [{ label: "ሰነዶችን ይመልከቱ", href: "/documents" }],
    },
  },
  {
    id: "admin",
    keywords: {
      en: ["admin", "login", "dashboard", "editor", "cms", "update website", "manage website"],
      am: ["አስተዳዳሪ", "ዳሽቦርድ", "መግቢያ", "አርታኢ"],
    },
    phrases: {
      en: ["admin login", "website editor"],
      am: ["አስተዳዳሪ መግቢያ"],
    },
    response: {
      en: "Website editors can use the Admin Login page. Public visitors do not need admin access.",
      am: "የድህረ ገጽ አርታኢዎች የአስተዳዳሪ መግቢያ ገጽን መጠቀም ይችላሉ። የህዝብ ጎብኚዎች የአስተዳዳሪ መዳረሻ አያስፈልጋቸውም።",
    },
    actions: {
      en: [{ label: "Admin Login", href: "/admin/login" }],
      am: [{ label: "አስተዳዳሪ መግቢያ", href: "/admin/login" }],
    },
  },
];
