import contactData from '../content/contact.json'
import formsData from '../content/forms.json'
import programsData from '../content/programs.json'

const { street, city, state, zip } = contactData.general.address
const contactAddress = `${street}, ${city}, ${state} ${zip}`

function getPublishedFormUrl(formId) {
  const form = formsData.forms.find((item) => item.id === formId && item.published)
  return form?.url || ''
}

function getYouthProgramFormUrl(linkId) {
  const program = programsData.mainPrograms?.find((item) => item.slug === 'youth-education')
  const link =
    program?.registrationLinks?.find((item) => item.id === linkId) ||
    program?.resourceLinks?.find((item) => item.id === linkId)
  return link?.url || ''
}

const studentInterestFormUrl =
  getPublishedFormUrl('student-interest-form') || getYouthProgramFormUrl('student-interest-form')

const summerSchoolFormUrl = getYouthProgramFormUrl('summer-school-application')

export const CHAT_INTRO_MESSAGE =
  'Hi! I can help you find ECAA membership, programs, events, hall rental, media, leadership, documents, and contact information.'

export const CHAT_NO_MATCH_MESSAGE =
  'I may not have that information yet. You can contact ECAA directly or try one of the quick links below.'

export const quickActions = [
  { label: 'Become a Member', href: '/membership' },
  { label: 'Upcoming Events', href: '/events' },
  { label: 'Book the Event Hall', href: '/events#book-hall' },
  { label: 'Programs', href: '/programs' },
  { label: 'Media Gallery', href: '/media' },
  { label: 'Contact ECAA', href: '/contact' },
]

export const fallbackButtons = [
  { label: 'Contact ECAA', href: '/contact' },
  { label: 'Programs', href: '/programs' },
  { label: 'Events', href: '/events' },
  { label: 'Membership', href: '/membership' },
]

export const intents = [
  {
    id: 'membership',
    title: 'Membership',
    keywords: ['join', 'member', 'membership', 'register', 'registration', 'fee', 'become member', 'sign up'],
    answer: 'You can learn about ECAA membership and start the registration process on the Membership page.',
    buttons: [{ label: 'Become a Member', href: '/membership' }],
  },
  {
    id: 'events',
    title: 'Events',
    keywords: ['event', 'events', 'announcement', 'meeting', 'community update', 'upcoming', 'calendar'],
    answer:
      'You can view ECAA events, announcements, community news, and past events on the Events page.',
    buttons: [{ label: 'View Events', href: '/events' }],
  },
  {
    id: 'book-hall',
    title: 'Book the Event Hall',
    keywords: [
      'hall',
      'rent',
      'rental',
      'book hall',
      'event hall',
      'reservation',
      'availability',
      'venue',
      'space',
      'party',
      'celebration',
      'gathering',
    ],
    answer:
      'You can request ECAA event hall availability on the Events page. Submitting a request does not guarantee a reservation. ECAA must confirm availability, requirements, pricing, and approval.',
    buttons: [{ label: 'Request Hall Availability', href: '/events#book-hall' }],
  },
  {
    id: 'media',
    title: 'Media Gallery',
    keywords: ['media', 'photo', 'photos', 'picture', 'pictures', 'video', 'videos', 'youtube', 'gallery', 'flyer', 'flyers'],
    answer: 'Photos, flyers, videos, and community links are available in the Media Gallery.',
    buttons: [{ label: 'Open Media Gallery', href: '/media' }],
  },
  {
    id: 'programs',
    title: 'Programs',
    keywords: ['program', 'programs', 'service', 'services', 'education', 'training'],
    answer:
      'You can explore ECAA programs for children, youth, families, wellness, education, legal awareness, financial literacy, and community growth.',
    buttons: [{ label: 'View Programs', href: '/programs' }],
  },
  {
    id: 'special-needs',
    title: 'Throb of Our Hearts',
    keywords: [
      'special needs',
      'autism',
      'children with special needs',
      'throb of our hearts',
      'yelbachne terta',
    ],
    answer:
      'The Throb of Our Hearts program supports children and families with special needs through community awareness, education, family connection, and shared support.',
    buttons: [{ label: 'View Program Details', href: '/programs/special-needs-children-family' }],
  },
  {
    id: 'youth-education',
    title: 'Youth and Education',
    keywords: [
      'youth',
      'student',
      'students',
      'school',
      'college',
      'college readiness',
      'mentorship',
      'summer school',
      'student interest',
    ],
    answer:
      'The Youth and Education page includes information about student support, college readiness, mentorship, and youth program forms.',
    buttons: [
      { label: 'Youth Education', href: '/programs/youth-education' },
      ...(studentInterestFormUrl
        ? [{ label: 'Student Interest Form', href: studentInterestFormUrl, external: true }]
        : []),
      ...(summerSchoolFormUrl
        ? [{ label: 'Summer School Application', href: summerSchoolFormUrl, external: true }]
        : []),
    ],
  },
  {
    id: 'community-wellness',
    title: 'Community Wellness',
    keywords: ['mental health', 'addiction', 'homelessness', 'wellness support', 'community wellness'],
    answer:
      'The Community Wellness program focuses on education and awareness around mental health, addiction, homelessness, prevention, and support resources.',
    buttons: [{ label: 'View Program Details', href: '/programs/community-wellness' }],
  },
  {
    id: 'family-education',
    title: 'Family Education',
    keywords: ['family', 'parenting', 'parents', 'strong families', 'family education'],
    answer:
      'The Family Education program supports parenting education and family-strengthening programs for healthy homes and strong relationships.',
    buttons: [{ label: 'View Program Details', href: '/programs/family-education' }],
  },
  {
    id: 'health-wellness',
    title: 'Health and Wellness',
    keywords: ['health', 'wellness', 'sport', 'fitness', 'health education'],
    answer:
      'The Health and Wellness program supports health education, wellness, sport, prevention education, and community well-being.',
    buttons: [{ label: 'View Program Details', href: '/programs/health-wellness' }],
  },
  {
    id: 'financial-literacy',
    title: 'Financial Literacy',
    keywords: ['financial', 'finance', 'money', 'budgeting', 'saving', 'financial literacy'],
    answer:
      'The Financial Literacy program supports practical financial education for individuals, families, and the community.',
    buttons: [{ label: 'View Program Details', href: '/programs/financial-literacy' }],
  },
  {
    id: 'leadership-growth',
    title: 'Leadership and Community Growth',
    keywords: ['leadership growth', 'community growth', 'volunteer leadership', 'committee training'],
    answer:
      'The Leadership and Community Growth program supports leadership development, volunteer growth, committee participation, and community development.',
    buttons: [{ label: 'View Program Details', href: '/programs/leadership-community-growth' }],
  },
  {
    id: 'legal-education',
    title: 'Legal Education',
    keywords: ['legal', 'rights', 'know your rights', 'law', 'prevention', 'legal awareness'],
    answer:
      'The Legal Education page is for community education and awareness only. It does not provide legal advice.',
    buttons: [{ label: 'View Program Details', href: '/programs/legal-education' }],
  },
  {
    id: 'volunteer',
    title: 'Volunteer',
    keywords: ['volunteer', 'help', 'serve', 'get involved', 'civic engagement'],
    answer:
      'You can support ECAA through volunteering, service, outreach, programs, events, and community support.',
    buttons: [{ label: 'Volunteer / Support ECAA', href: '/support' }],
  },
  {
    id: 'donate',
    title: 'Support ECAA',
    keywords: ['donate', 'donation', 'give', 'support', 'sponsor'],
    answer: 'You can support ECAA programs, services, and community work through the Support page.',
    buttons: [{ label: 'Support ECAA', href: '/support' }],
  },
  {
    id: 'leadership',
    title: 'Leadership',
    keywords: ['leader', 'leadership', 'board', 'committee', 'executive', 'advisory', 'edir committee'],
    answer:
      'You can view ECAA executive leadership, board members, audit committee members, advisory board members, and EDIR committee leaders on the Leadership page.',
    buttons: [{ label: 'View Leadership', href: '/leadership' }],
  },
  {
    id: 'documents',
    title: 'Documents',
    keywords: ['document', 'documents', 'bylaws', 'forms', 'report', 'election', 'public report'],
    answer:
      'You can find ECAA public documents, bylaws, forms, election-related documents, and public reports on the Documents page.',
    buttons: [{ label: 'View Documents', href: '/documents' }],
  },
  {
    id: 'contact',
    title: 'Contact ECAA',
    keywords: ['contact', 'address', 'phone', 'email', 'location', 'hours', 'visit', 'directions'],
    answer: `ECAA is located at ${contactAddress}. You can contact ECAA by phone or email on the Contact page.`,
    buttons: [{ label: 'Contact ECAA', href: '/contact' }],
  },
  {
    id: 'about',
    title: 'About ECAA',
    keywords: ['about', 'mission', 'vision', 'history', 'who we are', 'ecaa'],
    answer: 'Learn about ECAA’s mission, history, and how the association serves the Atlanta community.',
    buttons: [{ label: 'About ECAA', href: '/about' }],
  },
  {
    id: 'home',
    title: 'Home',
    keywords: ['home', 'homepage', 'main page', 'start'],
    answer: 'Return to the homepage for featured events, programs, media, and ways to get involved.',
    buttons: [{ label: 'Go to Home', href: '/' }],
  },
  {
    id: 'admin',
    title: 'Admin Login',
    keywords: ['admin', 'login', 'edit website', 'editor', 'staff login', 'dashboard'],
    answer: 'If you are an approved ECAA website editor, you can log in through the admin portal.',
    buttons: [{ label: 'Admin Login', href: '/admin/login' }],
  },
  {
    id: 'language',
    title: 'Language',
    keywords: ['language', 'amharic', 'english', 'translate', 'አማርኛ'],
    answerKey: 'chat.languageHelp',
    buttons: [],
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    keywords: ['privacy', 'policy', 'data', 'personal information'],
    answer: 'You can read ECAA’s privacy policy on the Privacy page.',
    buttons: [{ label: 'Privacy Policy', href: '/privacy' }],
  },
  {
    id: 'terms',
    title: 'Terms and Conditions',
    keywords: ['terms', 'conditions', 'rules', 'website terms'],
    answer: 'You can read ECAA’s website terms and conditions on the Terms page.',
    buttons: [{ label: 'Terms & Conditions', href: '/terms' }],
  },
]
