/**
 * Mulinguae Website Knowledge Base
 * Comprehensive information about the Mulinguae platform for the AI assistant.
 * 
 * This knowledge base is used to generate detailed system prompts that give
 * the AI complete context about the website's features, content, and structure.
 */

// ============================================
// CORE PLATFORM INFORMATION
// ============================================

export const WEBSITE_KNOWLEDGE = {
  // Platform Identity
  platform: {
    name: "Mulinguae",
    tagline: "A multilingual language learning platform connecting students with teachers worldwide",
    mission: "To make language learning accessible, interactive, and community-driven",
    vision: "Creating a world where language barriers don't limit education, culture, or human connection",
    description: `Mulinguae is a comprehensive language learning platform that connects students with qualified teachers 
    for personalized language education. The platform offers structured courses, interactive lessons, 
    community features, and AI-powered assistance to enhance the learning experience.`,
  },

  // Target Audience
  audience: {
    primary: "Language learners of all ages and proficiency levels",
    secondary: "Language teachers seeking students and resources",
    languages: "Multilingual (see verified answers for the exact language list)",
  },

  // ============================================
  // MAIN FEATURES & PAGES
  // ============================================
  
  features: {
    // Home Page
    home: {
      path: "/",
      title: "Home",
      description: "Landing page with platform overview, featured teachers, latest courses, and community highlights",
      keyElements: [
        "Hero section with platform value proposition",
        "Featured teachers carousel",
        "Popular courses showcase",
        "Student testimonials",
        "Language learning statistics",
        "Call-to-action for registration",
      ],
    },

    // About Page
    about: {
      path: "/about",
      title: "About Us",
      description: "Mission, vision, story, and team information",
      keyElements: [
        "Mission statement",
        "Founding story",
        "Core values",
        "Team members",
        "Impact metrics",
      ],
    },

    // Teachers Pages
    teachers: {
      path: "/pages/teachers",
      title: "Find Teachers",
      description: "Browse and filter qualified language teachers",
      keyElements: [
        "Meet Our Teachers carousel with a View Profile link per tutor",
        "Teacher profiles with bios, qualifications, teaching methodology",
        "No search/filter by language, price, rating, or availability",
      ],
      subFeatures: {
        teacherProfile: {
          path: "/pages/teachers/:teacherId",
          title: "Teacher Profile",
          description: "Detailed view of a specific teacher's profile",
          keyElements: [
            "Teaching Philosophy",
            "Career Summary",
            "Teaching Methods and Strategies",
            "Qualifications and Certificates",
            "Teacher Collaboration",
            "Classroom Management",
            "Behavior Management",
            "Additional Information",
          ],
        },
      },
    },

    // Students Pages
    students: {
      path: "/pages/students",
      title: "Student Resources",
      description: "Resources and community for language learners",
      keyElements: [
        "Mentions scholarship, special certificates or other form of recognition as potential rewards for extra-effort students",
      ],
    },

    // Courses Pages
    courses: {
      path: "/courses",
      title: "Courses",
      description: "Structured language courses for all levels",
      keyElements: [
        "Course catalog",
        "Course details: duration, target audience, description, goals, methodology, areas covered, required level, learning outcomes",
        "Level-based courses (ESL A1-C1, no C2; EFP offerings)",
        "Placement test to determine level (Levels 3-6)",
        "Detailed syllabus provided upon joining a course",
      ],
    },

    // Blogs
    blogs: {
      path: "/pages/blogs",
      title: "Blog & Articles",
      description: "Educational articles, tips, and community stories",
      keyElements: [
        "Language learning tips and strategies",
        "Cultural insights and articles",
        "Teacher and student interviews",
        "Platform updates and announcements",
        "Community-contributed content",
        "Categories and tags for filtering",
      ],
      subFeatures: {
        createBlog: {
          path: "/pages/blogs/create-new-blog",
          title: "Create Blog Post",
          description: "Authenticated users can create blog posts",
          requiresAuth: true,
        },
      },
    },

    // Libraries
    libraries: {
      path: "/pages/libraries",
      title: "Resource Libraries",
      description: "Curated learning materials and resources",
      keyElements: [
        "Video Library featuring YouTube videos on endangered languages",
        "Intro Video modal",
        "No video classroom",
      ],
    },

    // 100 Basic Phrases
    hundredPhrases: {
      path: "/pages/100-basic-phrases",
      title: "100 Basic Phrases",
      description: "Essential phrases for quick language start",
      keyElements: [
        "100 most common phrases per language",
        "Available languages: Amari, Arabic, Aymara, Cantonese, French, Hindi, Italian, Kreol Haiti, Kreol Morisyen, Mandarin, Portuguese, Quechua, Russian, Spanish, Urdu",
        "Combined with the site's Courses page to request teachers for any other language",
      ],
    },

    // Education for All
    educationForAll: {
      path: "/pages/education-for-all",
      title: "Education for All",
      description: "Initiative for accessible language education",
      keyElements: [
        "Scholarship programs",
        "Free resources for underserved communities",
        "Partnership programs",
        "Volunteer teaching opportunities",
        "Impact reports",
      ],
    },

    // Donations
    donations: {
      path: "/pages/donations",
      title: "Support Us",
      description: "Donation platform to support free language education",
      keyElements: [
        "Donations via PayPal or credit card on the Donations page",
      ],
    },

    // Feedback
    feedback: {
      path: "/pages/feedback",
      title: "Feedback & Suggestions",
      description: "Community feedback system",
      keyElements: [
        "Feature requests",
        "Bug reports",
        "General feedback",
        "Community voting on suggestions",
        "Response from team",
      ],
    },

    // Unity & Solidarity
    unitySolidarity: {
      path: "/pages/unity-solidarity",
      title: "Unity & Solidarity",
      description: "Community building and cultural exchange",
      keyElements: [
        "Educational page on Equality, Unity, Solidarity, and Education",
        "Promotes Human Rights Article 26 (Right to Education) and educational equity",
      ],
    },

    // Work With Us
    workWithUs: {
      path: "/pages/work-with-us",
      title: "Work With Us",
      description: "Career and partnership opportunities",
      keyElements: [
        "Teacher application process",
        "Content creator opportunities",
        "Internship programs",
        "Partnership proposals",
        "Ambassador program",
      ],
      subFeatures: {
        becomeTeacher: {
          path: "/pages/work-with-us/become-teacher",
          title: "Become a Teacher",
          description: "Application to join as a verified teacher",
          keyElements: [
            "Contact page 'Are you A Teacher?' form (Name, Email, Phone, Country, Languages spoken, Subjects taught, Address, CV)",
            "Submitted for review",
          ],
        },
      },
    },

    // Multilingualism
    multilingualism: {
      path: "/pages/multilingualism",
      title: "Multilingualism",
      description: "Research and resources on multilingual education",
      keyElements: [
        "Benefits of multilingualism",
        "Research articles",
        "Policy advocacy",
        "Family resources for raising multilingual children",
      ],
    },

    // Linguicide
    linguicide: {
      path: "/pages/linguicide",
      title: "Language Preservation",
      description: "Awareness and action for endangered languages",
      keyElements: [
        "Endangered languages database",
        "Preservation initiatives",
        "Community projects",
        "Documentation resources",
        "How to help",
      ],
    },

    // Contact
    contact: {
      path: "/contact",
      title: "Contact Us",
      description: "Get in touch with the Mulinguae team",
      keyElements: [
        "Contact form",
        "Office locations",
        "Support email",
        "Business inquiries",
        "Press kit",
      ],
    },

    // FAQs
    faqs: {
      path: "/pages/faqs",
      title: "Frequently Asked Questions",
      description: "Common questions and answers",
      keyElements: [
        "Account & registration",
        "Booking & payments",
        "Technical support",
        "Teacher requirements",
        "Platform features",
      ],
    },

    // Privacy & Terms
    privacy: {
      path: "/privacy-policy",
      title: "Privacy Policy",
      description: "Data protection and privacy information",
    },
    terms: {
      path: "/terms-of-service",
      title: "Terms of Service",
      description: "Platform terms and conditions",
    },

    // Auth Pages
    auth: {
      login: { path: "/login", title: "Login", description: "User authentication" },
      register: { path: "/register", title: "Register", description: "New user registration" },
      forgotPassword: { path: "/forgot-password", title: "Forgot Password", description: "Password reset request" },
      resetPassword: { path: "/reset/:id/:token", title: "Reset Password", description: "Set new password" },
      userSettings: { path: "/user-settings", title: "Account Settings", description: "Profile and preferences management" },
    },

    // Dashboard (Admin)
    dashboard: {
      path: "/dashboard",
      title: "Admin Dashboard",
      description: "Administrative panel for platform management",
      requiresAuth: true,
      isAdmin: true,
      keyElements: [
        "User management",
        "Teacher information management",
        "Content moderation (approve blog posts, comments, and replies)",
      ],
    },
  },

  // ============================================
  // USER ROLES & PERMISSIONS
  // ============================================
  
  userRoles: {
    student: {
      name: "Student",
      description: "Language learner seeking teachers and courses",
      permissions: [
        "Create an account, log in, and verify email",
        "Browse teachers and course pages",
        "Create blog posts (moderated)",
        "Use 100 Basic Phrases",
        "Submit feedback/contact",
        "Switch language via the LanguageSwitcher",
      ],
    },
    teacher: {
      name: "Teacher",
      description:
        "Independent language teacher facilitated by the association (not employed by it); profile is added/managed by administrators",
      permissions: [
        "Follow the Teachers Charter and uphold ethical standards",
        "Engage in continuous professional development including a yearly pedagogy seminar",
        "Receive tuition - first month collected and distributed by the association, then paid directly by students one month in advance",
        "Association commission: 5% for private one-to-one, 10% for group classes (from the first month's payment)",
      ],
    },
    admin: {
      name: "Administrator",
      description: "Platform administrator with full access",
      permissions: [
        "User management",
        "Teacher information management",
        "Content moderation (approve blog posts, comments, and replies)",
      ],
    },
  },

  // ============================================
  // TECHNICAL FEATURES
  // ============================================
  
  technical: {
    authentication: "JWT-based authentication with HTTP-only cookies",
    realtime: "Ably real-time notifications",
    payments: "PayPal or credit card for donations only; no lesson payment processing in the UI",
    video: "Intro Video modal and Video Library (YouTube videos on endangered languages); no video classroom",
    richText: "Tiptap editor for blog posts and content creation",
    internationalization: "i18next with multiple languages (EN, ES, FR, AR, HI, KM, MN, PT, QU, RU, UR, etc.)",
    rtl: "Full RTL support",
    responsive: "Mobile-first responsive design",
    pwa: "Progressive Web App (no offline mode)",
    search: "Client-side blog search; no teacher search/filter",
    notifications: "Real-time + email notifications",
    fileUpload: "Cloudinary for images and media",
    database: "MongoDB with Mongoose ODM",
    backend: "Node.js/Express on Vercel serverless",
    frontend: "React 18 + Vite + React Router v6",
    stateManagement: "React Query (TanStack Query) + Context API",
    styling: "SCSS with CSS Modules and global styles",
  },

  // ============================================
  // COMMON USER QUESTIONS (for predefined suggestions)
  // ============================================
  
  commonQuestions: {
    gettingStarted: [
      "How do I start learning a language on Mulinguae?",
      "How do I find the right teacher for me?",
      "What languages are available?",
      "Is there a free trial?",
      "How do I create an account?",
    ],
    teachers: [
      "How do I become a teacher on Mulinguae?",
      "What are the teacher requirements?",
      "How does teacher verification work?",
      "How do teachers get paid?",
      "Can I set my own schedule and prices?",
    ],
    courses: [
      "What types of courses are available?",
      "How do course levels work (A1-C2)?",
      "Do courses include certificates?",
      "Can I learn at my own pace?",
      "What materials are included?",
    ],
    booking: [
      "How do I book a lesson?",
      "What if I need to cancel or reschedule?",
      "How do trial lessons work?",
      "What payment methods are accepted?",
      "Is there a refund policy?",
    ],
    technical: [
      "What devices/browsers are supported?",
      "How do I use the video classroom?",
      "Can I use Mulinguae offline?",
      "How do I change my language preference?",
      "What if I have technical issues?",
    ],
    community: [
      "How do I connect with other learners?",
      "Can I write blog posts?",
      "What is the Unity & Solidarity program?",
      "How do language exchanges work?",
      "Are there community events?",
    ],
  },

  // ============================================
  // VERIFIED ANSWERS (authoritative Q&A, no guessing)
  // ============================================
  
  verifiedAnswers: {
    gettingStarted: [
      {
        question: "How do I start learning a language on Mulinguae?",
        answer:
          "Browse the Courses page and join a course. There is no step-by-step onboarding guide on the site. The home page promotes mother & international languages and links to the Courses page, Multilingualism, and endangered-language preservation.",
      },
      {
        question: "How do I find the right teacher for me?",
        answer:
          "On the Teachers page (/pages/teachers), you will find a 'Meet Our Teachers' carousel with a 'View Profile' link for each tutor. A teacher profile shows Teaching Philosophy, Career Summary, Teaching Methods and Strategies, Qualifications and Certificates, Teacher Collaboration, Classroom Management, Behavior Management, and Additional Information. There is no search/filter by language, price, rating, or availability.",
      },
      {
        question: "What languages are available?",
        answer:
          "100 Basic Phrases languages: Amari, Arabic, Aymara, Cantonese, French, Hindi, Italian, Kreol Haiti, Kreol Morisyen, Mandarin, Portuguese, Quechua, Russian, Spanish, Urdu. Interface switcher: English, Arabic, French, Hindi, Kreol Morisyen, Mandarin, Portuguese, Quechua, Russian, Spanish, Urdu. For any other language, the Courses page states ACS Mulinguae is keen to find teachers - just drop some words in the Contact Box.",
      },
      {
        question: "Is there a free trial?",
        answer:
          "No. There is no free-trial or trial-lesson feature anywhere on the site.",
      },
      {
        question: "How do I create an account?",
        answer:
          "Go to the Register page ('Create an Account'). Provide Name, Email, Password, and Confirm Password, accept the Terms + Privacy Policy, complete reCAPTCHA, and submit (passwords must be strong). Then check your email to verify your account. Login is at /login and password reset is at /forgot-password.",
      },
    ],
    teachers: [
      {
        question: "How do I become a teacher on Mulinguae?",
        answer:
          "Use the Contact page's 'Are you A Teacher?' form: provide Name, Email, Phone, Country, Languages spoken, Subjects taught, Address, and upload your CV, then submit it 'for review'. The route /pages/work-with-us/become-teacher links to this.",
      },
      {
        question: "What are the teacher requirements?",
        answer:
          "Teachers must follow the Teachers Charter and uphold the highest ethical standards, most are bilingual or multilingual, and they must engage in continuous professional development including a yearly pedagogy seminar. There is no concrete list of minimum degrees/experience/certification shown in the UI.",
      },
      {
        question: "How does teacher verification work?",
        answer:
          "There is no user-facing verification process. Applications submitted via the Contact form are 'submitted for review'. Teachers are added and managed by administrators through an admin-only Dashboard 'Add Teacher Information' form (First/Last Name, Email, Job Brief, About, Telephone, profile image). There is no verification-badge process shown to the public.",
      },
      {
        question: "How do teachers get paid?",
        answer:
          "ACS Mulinguae acts strictly as a facilitator and does not employ teachers. First month: the association collects student tuition fees and distributes them to the teacher. Subsequent months: students pay teachers directly one month of classes in advance. Commission: ACS Mulinguae retains 5% for private one-to-one classes and 10% for group classes from the first month's payment. Fees are set by the elected administration, each teacher keeps a personal account, and a financial report is presented quarterly.",
      },
      {
        question: "Can teachers set their own schedule and prices?",
        answer:
          "Teachers have the freedom to manage their page within the framework established by the association. Fees are decided by the elected administration in consultation with the teachers. There is no self-service schedule or pricing tool in the UI.",
      },
    ],
    courses: [
      {
        question: "What types of courses are available?",
        answer:
          "ESL: General English across six levels. English for Specific Purposes (EFP): Accounting, Anthropology, Development Studies, Business English, International Studies, Legal English, Trade Union Studies, Travel and Tourism, Women Studies, and Agriculture. 100 Basic Phrases: a learning module offered across multiple languages.",
      },
      {
        question: "How do course levels work (A1-C2)?",
        answer:
          "ESL General English comprises 6 levels of 50 hours each: Level 1 / A1 Beginner, Level 2 / A1+ Elementary, Level 3 / A2 Pre-Intermediate, Level 4 / B1 Intermediate, Level 5 / B2 Upper Intermediate, Level 6 / C1 Advanced. Learners complete a placement test to determine their level (Levels 3-6). There is no C2 course; the curriculum stops at C1.",
      },
      {
        question: "Do courses include certificates?",
        answer:
          "No. There is no course-completion certificate feature. The Students page mentions 'scholarship, special certificates or other form of recognition' strictly as potential rewards for extra-effort students.",
      },
      {
        question: "Can you learn at your own pace?",
        answer:
          "No. There is no self-paced or on-demand learning functionality within the site.",
      },
      {
        question: "What materials are included?",
        answer:
          "Each course listing outlines Duration, Target Audience, Description, Goals, Methodology, Areas Covered, Required Level, and Learning Outcomes. A detailed syllabus is provided upon joining a course. EFP courses feature communicative, interactive, text-based, and task-based approaches using authentic or semi-authentic reading materials.",
      },
    ],
    booking: [
      {
        question: "How do I book a lesson?",
        answer:
          "Not implemented. There is no lesson booking system in the user interface.",
      },
      {
        question: "What is the cancel/reschedule policy?",
        answer:
          "Not implemented. There is no cancellation or rescheduling policy.",
      },
      {
        question: "How do trial lessons work?",
        answer:
          "Not implemented. There is no trial-lesson functionality.",
      },
      {
        question: "What payment methods are accepted?",
        answer:
          "The only payment reference on the site is for donations via PayPal or credit card on the Donations page. No direct lesson payment processing system is implemented.",
      },
      {
        question: "Is there a refund policy?",
        answer:
          "Not implemented. There is no refund policy.",
      },
    ],
    technical: [
      {
        question: "What devices and browsers are supported?",
        answer:
          "There is no explicit supported-devices statement. However, the Feedback form bug options list browsers Chrome, Firefox, Safari, Edge, Other and operating systems Windows, MacOS, Linux, Other.",
      },
      {
        question: "How do I use the video classroom?",
        answer:
          "Not implemented. There is no video classroom. Available video features are the Intro Video modal and the Video Library (/pages/libraries) featuring YouTube videos on endangered languages.",
      },
      {
        question: "Can I use Mulingua offline?",
        answer:
          "No. There is no offline-use functionality.",
      },
      {
        question: "How do I change my language preference?",
        answer:
          "Use the LanguageSwitcher dropdown in the navigation menu. Selecting a language redirects you to a language-prefixed route (e.g., /en/). Languages are also auto-detected from your browser settings or the path.",
      },
      {
        question: "What if I have technical issues?",
        answer:
          "1) Feedback Page (/pages/feedback): submit a form with E-mail, Full Name, Affiliation, Feedback Type (Bug / Feature Suggestion / Comment / Correction / Help / Site search / Admission question), Details, URL, and system specs (Browser, OS, Screenshot up to 5MB for bugs). 2) Direct contact: phone +51 (939) 499-087 or email acsmulinguae@gmail.com during office hours.",
      },
    ],
    community: [
      {
        question: "How do I connect with other learners?",
        answer:
          "Not implemented. Although marketed as a global community, there are no live chat, messaging, forum, or study group features in the interface.",
      },
      {
        question: "Can I write blog posts?",
        answer:
          "Yes. Any logged-in user can submit a post via /pages/blogs/create-new-blog. The editor includes fields for title, subtitle, rich-text content, and a preview. Moderation: all blog posts, comments, and replies require administrator approval before appearing publicly.",
      },
      {
        question: "What is the Unity & Solidarity program?",
        answer:
          "The /pages/unity-solidarity page ('Equality, Unity and Solidarity') is an educational page focused on core principles: Equality (equal values opposing discrimination and exclusion), Unity (standing together to defend majority interests), Solidarity (shared goals, standards, and awareness creating group unity), and Education (promoting Human Rights Article 26 - Right to Education - and educational equity).",
      },
      {
        question: "How do language exchanges work?",
        answer:
          "Not implemented. There is no language-exchange system or workflow in the UI.",
      },
      {
        question: "Are there community events?",
        answer:
          "Not implemented. There is no community events feature.",
      },
    ],
  },

  // ============================================
  // NAVIGATION & URLS
  // ============================================
  
  navigation: {
    mainMenu: [
      { label: "Teachers", path: "/pages/teachers" },
      { label: "Students", path: "/pages/students" },
      { label: "Courses", path: "/courses" },
      { label: "Blogs", path: "/pages/blogs" },
      { label: "Libraries", path: "/pages/libraries" },
      { label: "100 Phrases", path: "/pages/100-basic-phrases" },
      { label: "Education for All", path: "/pages/education-for-all" },
      { label: "Donations", path: "/pages/donations" },
      { label: "Feedback", path: "/pages/feedback" },
      { label: "Unity & Solidarity", path: "/pages/unity-solidarity" },
      { label: "Work With Us", path: "/pages/work-with-us" },
      { label: "About", path: "/about" },
      { label: "Contact", path: "/contact" },
    ],
    footer: {
      legal: ["Privacy Policy", "Terms of Service"],
      social: ["GitHub", "Twitter", "LinkedIn", "YouTube"],
      support: ["FAQs", "Contact Us", "Help Center"],
    },
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Generate a comprehensive system prompt for the AI assistant
 * @param {string} domain - The domain context (general, teachers, etc.)
 * @param {object} options - Additional options
 * @returns {string} Complete system prompt
 */
export const generateSystemPrompt = (domain = "general", options = {}) => {
  const { includeFullKnowledge = true, userRole = "student", language = "en" } = options;
  
  const basePrompt = `You are Mulinguae's AI assistant. You help users with questions about the Mulinguae platform, language learning, and community features. Be helpful, friendly, and informative.

## PLATFORM OVERVIEW
- **Name**: ${WEBSITE_KNOWLEDGE.platform.name}
- **Mission**: ${WEBSITE_KNOWLEDGE.platform.mission}
- **Description**: ${WEBSITE_KNOWLEDGE.platform.description}

## YOUR ROLE
- Answer questions about Mulinguae's features, pages, and functionality
- Help users navigate the platform
- Provide information about teachers, courses, and community features
- Guide users through common processes (booking, registration, etc.)
- Be encouraging and supportive of language learning journeys
- If you don't know something specific, direct users to the relevant page or suggest they contact support

## CURRENT CONTEXT
- **Domain**: ${domain}
- **User Role**: ${userRole}
- **Language**: ${language}
`;

  if (includeFullKnowledge) {
    // Add key features summary
    const featuresSummary = Object.entries(WEBSITE_KNOWLEDGE.features)
      .filter(([_, feature]) => feature.title)
      .map(([key, feature]) => `- **${feature.title}** (${feature.path}): ${feature.description}`)
      .join("\n");

    const verifiedPrompt = buildVerifiedAnswersPrompt();

    return basePrompt + `\n## KEY PLATFORM FEATURES\n${featuresSummary}\n\n## USER ROLES\n${Object.entries(WEBSITE_KNOWLEDGE.userRoles).map(([_, role]) => `- **${role.name}**: ${role.description}`).join("\n")}\n\n## COMMON QUESTIONS YOU CAN ANSWER\n${Object.entries(WEBSITE_KNOWLEDGE.commonQuestions).flatMap(([category, questions]) => questions.map(q => `- ${q}`)).join("\n")}\n\n${verifiedPrompt}\n\n## IMPORTANT RULES\n- When the user asks one of the AUTHORITATIVE ANSWERS (or a closely related question), answer from those answers directly.\n- Never invent features. If something is marked \"Not implemented\" or \"No\", say it is not available yet and offer the relevant page or contact/feedback.\n- The platform summaries above are intended as context; the AUTHORITATIVE ANSWERS take precedence when they conflict.`;
  }
  
  return basePrompt;
};

/**
 * Build a prompt section with all verified Q&A answers.
 * @returns {string} Markdown section listing every verified Q&A.
 */
export const buildVerifiedAnswersPrompt = () =>
  Object.entries(WEBSITE_KNOWLEDGE.verifiedAnswers)
    .flatMap(([category, items]) =>
      items.map(
        ({ question, answer }) =>
          `- **Q: ${question}**\n  A: ${answer}`
      )
    )
    .join("\n");

/**
 * Find the verified answer matching a user question (best-effort keyword match).
 * @param {string} text - The user's question text.
 * @returns {object|null} The { question, answer } pair or null.
 */
export const getVerifiedAnswer = (text) => {
  if (!text) return null;
  const tokens = text.toLowerCase().split(/\W+/).filter((w) => w.length > 3);
  if (tokens.length === 0) return null;
  const items = Object.values(WEBSITE_KNOWLEDGE.verifiedAnswers).flat();
  let best = null;
  for (const item of items) {
    const qTokens = item.question.toLowerCase().split(/\W+/).filter((w) => w.length > 3);
    const hits = qTokens.filter((t) => tokens.includes(t)).length;
    if (hits > 0 && (!best || hits > best.hits)) {
      best = { hits, ...item };
    }
  }
  return best?.hits ? best : null;
};

/**
 * Get predefined suggestions for a specific category
 * @param {string} category - Category name
 * @returns {Array<string>} Array of suggestion strings
 */
export const getPredefinedSuggestions = (category = "all") => {
  if (category === "all") {
    return Object.values(WEBSITE_KNOWLEDGE.commonQuestions).flat();
  }
  return WEBSITE_KNOWLEDGE.commonQuestions[category] || [];
};

/**
 * Get all suggestions grouped by category
 * @returns {object} Object with categories as keys and suggestion arrays as values
 */
export const getAllSuggestionsByCategory = () => {
  return WEBSITE_KNOWLEDGE.commonQuestions;
};

/**
 * Get navigation links for a specific feature
 * @param {string} featureKey - Feature key from WEBSITE_KNOWLEDGE.features
 * @returns {object|null} Feature object with path and details
 */
export const getFeatureInfo = (featureKey) => {
  return WEBSITE_KNOWLEDGE.features[featureKey] || null;
};

/**
 * Get common questions for a specific category, with a friendly label.
 * @param {string} category - Category key (e.g., "gettingStarted", "teachers").
 * @returns {Array<string>} Questions for that category.
 */
export const getCommonQuestionsByCategory = (category) => {
  return WEBSITE_KNOWLEDGE.commonQuestions[category] || [];
};

/**
 * All suggestion categories with human-readable labels.
 * @returns {object} Mapping of category key -> { label, icon }.
 */
export const getAllSuggestionCategories = () => {
  return {
    gettingStarted: {
      label: "Getting Started",
      icon: "🚀",
    },
    teachers: {
      label: "Teachers",
      icon: "🧑🏫",
    },
    courses: {
      label: "Courses",
      icon: "📚",
    },
    booking: {
      label: "Booking",
      icon: "📅",
    },
    technical: {
      label: "Technical",
      icon: "⚙️",
    },
    community: {
      label: "Community",
      icon: "👥",
    },
  };
};

export default WEBSITE_KNOWLEDGE;