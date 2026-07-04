import { slugifyTitle } from "../utils/programs";

function field(key, label, labelAm, type, options = {}) {
  return {
    fieldKey: key,
    label,
    labelAm: labelAm || "",
    helpText: options.helpText || "",
    helpTextAm: options.helpTextAm || "",
    fieldType: type,
    required: options.required ?? false,
    placeholder: options.placeholder || "",
    placeholderAm: options.placeholderAm || "",
    options: options.options || [],
    displayOrder: options.displayOrder ?? 999,
    visible: true,
  };
}

function selectOptions(items) {
  return items.map(([value, label, labelAm]) => ({
    value,
    label,
    labelAm: labelAm || label,
  }));
}

export const FORM_TEMPLATES = [
  {
    id: "volunteer-sign-up",
    name: "Volunteer Sign-Up",
    nameAm: "የበጎ ፈቃድ ምዝገባ",
    slug: "volunteer-sign-up",
    formType: "volunteer",
    title: "Volunteer Sign-Up",
    titleAm: "የበጎ ፈቃድ ምዝገባ",
    description:
      "Share your interest in volunteering with ECAA. A team member will follow up with next steps.",
    descriptionAm: "በ ECAA የበጎ ፈቃድ ፍላጎትዎን ያስተላልፉ። ቡድናችን በቀጣይ ደረጃዎች ይገናኝዎታል።",
    confirmationMessage: "Thank you for signing up to volunteer with ECAA.",
    confirmationMessageAm: "በ ECAA የበጎ ፈቃድ ለመስራት ስለተመዘገቡ እናመሰግናለን።",
    fields: [
      field("full_name", "Full Name", "ሙሉ ስም", "text", { required: true, displayOrder: 1 }),
      field("email", "Email", "ኢሜይል", "email", { required: true, displayOrder: 2 }),
      field("phone", "Phone", "ስልክ", "phone", { required: true, displayOrder: 3 }),
      field("area_of_interest", "Area of Interest", "የፍላጎት ዘርፍ", "select", {
        required: true,
        displayOrder: 4,
        options: selectOptions([
          ["events", "Events", "ዝግጅቶች"],
          ["programs", "Programs", "ፕሮግራሞች"],
          ["outreach", "Community Outreach", "የማህበረሰብ አገልግሎት"],
          ["admin", "Administrative Support", "አስተዳደራዊ ድጋፍ"],
          ["other", "Other", "ሌላ"],
        ]),
      }),
      field("availability", "Availability", "የሚገኙበት ጊዜ", "textarea", {
        displayOrder: 5,
        placeholder: "Weekdays, weekends, evenings, etc.",
        placeholderAm: "የሳምንት ቀናት፣ ቅዳሜና እሁድ፣ ማታ ወዘተ",
      }),
      field("message", "Message", "መልዕክት", "textarea", { displayOrder: 6 }),
    ],
  },
  {
    id: "program-interest",
    name: "Program Interest Form",
    nameAm: "የፕሮግራም ፍላጎት ቅጽ",
    slug: "program-interest",
    formType: "program_interest",
    title: "Program Interest Form",
    titleAm: "የፕሮግራም ፍላጎት ቅጽ",
    description: "Tell us which ECAA program you are interested in and how we can help.",
    descriptionAm: "የሚፈልጉትን ECAA ፕሮግራም እና እንዴት እንድንረዳዎ ይንገሩን።",
    confirmationMessage: "Thank you for your program interest. ECAA will follow up soon.",
    confirmationMessageAm: "ለፕሮግራም ፍላጎትዎ እናመሰግናለን። ECAA በቅርቡ ይገናኝዎታል።",
    fields: [
      field("full_name", "Full Name", "ሙሉ ስም", "text", { required: true, displayOrder: 1 }),
      field("email", "Email", "ኢሜይል", "email", { required: true, displayOrder: 2 }),
      field("phone", "Phone", "ስልክ", "phone", { required: true, displayOrder: 3 }),
      field("program_interest", "Program Interested In", "የሚፈልጉት ፕሮግራም", "select", {
        required: true,
        displayOrder: 4,
        options: selectOptions([
          ["youth-education", "Youth Education", "የወጣቶች ትምህርት"],
          ["health-wellness", "Health & Wellness", "ጤና እና ደህንነት"],
          ["community-support", "Community Support", "የማህበረሰብ ድጋፍ"],
          ["cultural", "Cultural Programs", "ባህላዊ ፕሮግራሞች"],
          ["other", "Other", "ሌላ"],
        ]),
      }),
      field("participant_age", "Student/Participant Age (if applicable)", "የተሳታፊ/ተማሪ ዕድሜ (ካለ)", "text", {
        displayOrder: 5,
      }),
      field("message", "Message", "መልዕክት", "textarea", { displayOrder: 6 }),
    ],
  },
  {
    id: "event-registration",
    name: "Event Registration",
    nameAm: "የዝግጅት ምዝገባ",
    slug: "event-registration",
    formType: "event_registration",
    title: "Event Registration",
    titleAm: "የዝግጅት ምዝገባ",
    description: "Register for an upcoming ECAA event.",
    descriptionAm: "ለሚቀርበው ECAA ዝግጅት ይመዝገቡ።",
    confirmationMessage: "Thank you for registering. We look forward to seeing you.",
    confirmationMessageAm: "ስለተመዘገቡ እናመሰግናለን። ለመገናኘት እንጠብቃለን።",
    fields: [
      field("full_name", "Full Name", "ሙሉ ስም", "text", { required: true, displayOrder: 1 }),
      field("email", "Email", "ኢሜይል", "email", { required: true, displayOrder: 2 }),
      field("phone", "Phone", "ስልክ", "phone", { required: true, displayOrder: 3 }),
      field("number_of_guests", "Number of Guests", "የእንግዶች ብዛት", "number", {
        required: true,
        displayOrder: 4,
      }),
      field("notes", "Questions or Notes", "ጥያቄዎች ወይም ማስታወሻዎች", "textarea", {
        displayOrder: 5,
      }),
    ],
  },
  {
    id: "community-feedback",
    name: "Community Feedback",
    nameAm: "የማህበረሰብ አስተያየት",
    slug: "community-feedback",
    formType: "feedback",
    title: "Community Feedback",
    titleAm: "የማህበረሰብ አስተያየት",
    description: "Share feedback, suggestions, or ideas to help ECAA serve the community better.",
    descriptionAm: "ECAA ማህበረሰቡን በተሻለ ለማገልገል አስተያየት፣ ሀሳብ ወይም ጥቆማ ያስተላልፉ።",
    confirmationMessage: "Thank you for your feedback.",
    confirmationMessageAm: "ለአስተያየትዎ እናመሰግናለን።",
    fields: [
      field("full_name", "Full Name (optional)", "ሙሉ ስም (አማራጭ)", "text", { displayOrder: 1 }),
      field("email", "Email (optional)", "ኢሜይል (አማራጭ)", "email", { displayOrder: 2 }),
      field("feedback_category", "Feedback Category", "የአስተያየት ምድብ", "select", {
        required: true,
        displayOrder: 3,
        options: selectOptions([
          ["programs", "Programs", "ፕሮግራሞች"],
          ["events", "Events", "ዝግጅቶች"],
          ["membership", "Membership", "አባልነት"],
          ["facilities", "Facilities", "መገልገያዎች"],
          ["general", "General", "አጠቃላይ"],
        ]),
      }),
      field("message", "Message", "መልዕክት", "textarea", { required: true, displayOrder: 4 }),
    ],
  },
  {
    id: "membership-question",
    name: "Membership Question Form",
    nameAm: "የአባልነት ጥያቄ ቅጽ",
    slug: "membership-question",
    formType: "membership",
    title: "Membership Question Form",
    titleAm: "የአባልነት ጥያቄ ቅጽ",
    description: "Ask a question about ECAA membership.",
    descriptionAm: "ስለ ECAA አባልነት ጥያቄ ያቅርቡ።",
    confirmationMessage: "Thank you. A membership team member will respond soon.",
    confirmationMessageAm: "እናመሰግናለን። የአባልነት ቡድናችን በቅርቡ ይመልስልዎታል።",
    fields: [
      field("full_name", "Full Name", "ሙሉ ስም", "text", { required: true, displayOrder: 1 }),
      field("email", "Email", "ኢሜይል", "email", { required: true, displayOrder: 2 }),
      field("phone", "Phone", "ስልክ", "phone", { required: true, displayOrder: 3 }),
      field("membership_question", "Membership Question", "የአባልነት ጥያቄ", "textarea", {
        required: true,
        displayOrder: 4,
      }),
    ],
  },
  {
    id: "summer-school-application",
    name: "Summer School / Application Interest",
    nameAm: "የበጋ ትምህርት / የምዝገባ ፍላጎት",
    slug: "summer-school-application",
    formType: "application",
    title: "Summer School Application Interest",
    titleAm: "የበጋ ትምህርት የምዝገባ ፍላጎት",
    description: "Express interest in ECAA summer school or application programs.",
    descriptionAm: "ለ ECAA የበጋ ትምህርት ወይም የምዝገባ ፕሮግራሞች ፍላጎት ያስተላልፉ።",
    confirmationMessage: "Thank you for your interest. ECAA will follow up with program details.",
    confirmationMessageAm: "ለፍላጎትዎ እናመሰግናለን። ECAA የፕሮግራም ዝርዝሮችን ይላክልዎታል።",
    fields: [
      field("parent_name", "Parent/Guardian Name", "የወላጅ/አሳዳጊ ስም", "text", {
        required: true,
        displayOrder: 1,
      }),
      field("student_name", "Student Name", "የተማሪ ስም", "text", { required: true, displayOrder: 2 }),
      field("student_age_grade", "Student Age/Grade", "የተማሪ ዕድሜ/ክፍል", "text", {
        required: true,
        displayOrder: 3,
      }),
      field("email", "Email", "ኢሜይል", "email", { required: true, displayOrder: 4 }),
      field("phone", "Phone", "ስልክ", "phone", { required: true, displayOrder: 5 }),
      field("program_interest", "Program Interest", "የፕሮግራም ፍላጎት", "select", {
        required: true,
        displayOrder: 6,
        options: selectOptions([
          ["summer-school", "Summer School", "የበጋ ትምህርት"],
          ["tutoring", "Tutoring", "አጋዥ ትምህርት"],
          ["youth", "Youth Program", "የወጣቶች ፕሮግራም"],
          ["other", "Other", "ሌላ"],
        ]),
      }),
      field("notes", "Notes", "ማስታወሻዎች", "textarea", { displayOrder: 7 }),
    ],
  },
];

export function createFormFromTemplate(templateId) {
  const template = FORM_TEMPLATES.find((item) => item.id === templateId);
  if (!template) return null;

  const contentAm = {
    title: template.titleAm || "",
    description: template.descriptionAm || "",
  };

  return {
    slug: template.slug,
    title: template.title,
    description: template.description,
    contentAm,
    status: "draft",
    formType: template.formType,
    confirmationMessage: template.confirmationMessage,
    confirmationMessageAm: template.confirmationMessageAm,
    submitButtonLabel: "Submit",
    submitButtonLabelAm: "አስገባ",
    allowMultipleSubmissions: true,
    requireLogin: false,
    collectEmail: true,
    notificationEmail: "",
    visiblePublic: false,
    displayOrder: 999,
    coverImageUrl: "",
    coverImageAlt: "",
    backgroundTheme: "warm",
    accentTheme: "green",
    layoutStyle: "standard",
    fields: template.fields.map((item, index) => ({
      ...item,
      id: `temp-${index}`,
      displayOrder: index + 1,
    })),
  };
}

export function createBlankForm() {
  return {
    slug: "",
    title: "",
    description: "",
    contentAm: { title: "", description: "" },
    status: "draft",
    formType: "general",
    confirmationMessage: "Thank you for your submission.",
    confirmationMessageAm: "ስለላኩት መረጃ እናመሰግናለን።",
    submitButtonLabel: "Submit",
    submitButtonLabelAm: "አስገባ",
    allowMultipleSubmissions: true,
    requireLogin: false,
    collectEmail: false,
    notificationEmail: "",
    visiblePublic: false,
    displayOrder: 999,
    coverImageUrl: "",
    coverImageAlt: "",
    backgroundTheme: "warm",
    accentTheme: "green",
    layoutStyle: "standard",
    fields: [],
  };
}

export function slugifyFieldKey(label = "") {
  return slugifyTitle(label).replace(/-/g, "_") || `field_${Date.now()}`;
}
