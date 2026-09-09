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
    languages: "Multilingual - supports 100+ languages",
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
        "Teacher search and filtering (by language, price, rating, availability)",
        "Teacher profiles with bios, qualifications, teaching style",
        "Student reviews and ratings",
        "Booking system for trial lessons",
        "Teacher verification badges",
        "Languages offered filter",
      ],
      subFeatures: {
        teacherProfile: {
          path: "/pages/teachers/:teacherId",
          title: "Teacher Profile",
          description: "Detailed view of a specific teacher's profile",
          keyElements: [
            "Teacher bio and qualifications",
            "Languages taught and proficiency levels",
            "Teaching methodology and approach",
            "Course offerings and pricing",
            "Availability calendar",
            "Student reviews and testimonials",
            "Contact/booking button",
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
        "Student success stories",
        "Learning tips and strategies",
        "Study groups and language exchange",
        "Progress tracking tools",
        "Resource library",
      ],
    },

    // Courses Pages
    courses: {
      path: "/courses",
      title: "Courses",
      description: "Structured language courses for all levels",
      keyElements: [
        "Course catalog with filtering",
        "Course details: curriculum, duration, price",
        "Level-based courses (A1-C2 CEFR)",
        "Enrollment and progress tracking",
        "Certificate of completion",
        "Video lessons and materials",
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
        "Digital textbooks and workbooks",
        "Audio and video resources",
        "Grammar references",
        "Vocabulary builders",
        "Practice exercises",
        "Downloadable materials",
      ],
    },

    // 100 Basic Phrases
    hundredPhrases: {
      path: "/pages/100-basic-phrases",
      title: "100 Basic Phrases",
      description: "Essential phrases for quick language start",
      keyElements: [
        "100 most common phrases per language",
        "Audio pronunciation guides",
        "Categorized by situation (greetings, dining, travel, etc.)",
        "Available in 100+ languages",
        "Offline download option",
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
        "One-time and recurring donations",
        "Impact transparency",
        "Donation tiers and rewards",
        "Tax receipt generation",
        "Corporate sponsorship",
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
        "Language exchange events",
        "Cultural celebration calendar",
        "Community forums",
        "Pen pal program",
        "Virtual meetups",
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
            "Application form with qualifications",
            "Verification process overview",
            "Teacher benefits and support",
            "Revenue sharing model",
            "Training resources",
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
        "Teacher verification",
        "Content moderation",
        "Analytics and reports",
        "System settings",
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
        "Browse teachers and courses",
        "Book trial lessons",
        "Enroll in courses",
        "Create blog posts",
        "Leave reviews",
        "Participate in community",
        "Access resource libraries",
        "Use 100 Basic Phrases",
      ],
    },
    teacher: {
      name: "Teacher",
      description: "Verified language teacher offering lessons",
      permissions: [
        "All student permissions",
        "Create and manage teacher profile",
        "Set availability and pricing",
        "Manage bookings and lessons",
        "Create courses",
        "Access teacher dashboard",
        "Receive payments",
      ],
    },
    admin: {
      name: "Administrator",
      description: "Platform administrator with full access",
      permissions: [
        "All teacher permissions",
        "User management",
        "Teacher verification",
        "Content moderation",
        "System configuration",
        "Analytics access",
        "Financial reports",
      ],
    },
  },

  // ============================================
  // TECHNICAL FEATURES
  // ============================================
  
  technical: {
    authentication: "JWT-based authentication with HTTP-only cookies",
    realtime: "Ably real-time messaging for notifications and chat",
    payments: "PayPal integration for course/lesson payments",
    video: "Video.js for course content delivery",
    richText: "Tiptap editor for blog posts and content creation",
    internationalization: "i18next with 12+ language support (EN, ES, FR, AR, etc.)",
    rtl: "Full RTL support for Arabic and Hebrew",
    responsive: "Mobile-first responsive design",
    pwa: "Progressive Web App with offline support",
    search: "Client-side search with filtering",
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
    
    return basePrompt + `\n## KEY PLATFORM FEATURES\n${featuresSummary}\n\n## USER ROLES\n${Object.entries(WEBSITE_KNOWLEDGE.userRoles).map(([_, role]) => `- **${role.name}**: ${role.description}`).join("\n")}\n\n## COMMON QUESTIONS YOU CAN ANSWER\n${Object.entries(WEBSITE_KNOWLEDGE.commonQuestions).flatMap(([category, questions]) => questions.map(q => `- ${q}`)).join("\n")}`;
  }
  
  return basePrompt;
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