# Content Placement Plan — ECAA Researched Content

This plan maps researched organization content to specific files and components.  
**Rule:** Edit JSON content files first; only change components when structure is required.

---

## Homepage

| Section                | Component                         | Content file                                          | Researched content                                                                                                                                                                                  |
| ---------------------- | --------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hero**               | `HomeHeroSection.jsx`             | `homepage.json` → `hero`                              | Headline: _Empowering Ethiopian and Ethiopian American Communities in Atlanta_; subheadline about culture, families, intergenerational connection; CTAs: Become a Member, Donate Today, View Events |
| **Mission**            | `HomeMissionSection.jsx`          | `homepage.json` → `missionSection`                    | Title: _Our Mission_; full mission paragraph about serving, empowering, cultural pride, education, civic connection                                                                                 |
| **Community pillars**  | `HomeCommunityPillarsSection.jsx` | `homepage.json` → `communityPillars`                  | 3 cards: Preserve Culture & Heritage; Support Families & Newcomers; Empower Youth & Future Generations                                                                                              |
| **Programs preview**   | `ProgramsPreview.jsx`             | `homepage.json` → `programsPreview` + `programs.json` | Youth, newcomer support, health/wellness, financial literacy, legal awareness, sports/social, education                                                                                             |
| **Membership preview** | `MembershipPreview.jsx`           | `homepage.json` → `membershipPreview`                 | Stay connected, support community, attend events, participate, shape ECAA future → CTA: Become a Member                                                                                             |
| **Volunteer preview**  | `VolunteerPreviewSection.jsx`     | `homepage.json` → `volunteerPreview`                  | Youth, events, IT, grants, newcomers, legal, health, financial literacy → CTA: Volunteer With ECAA                                                                                                  |
| **Donation preview**   | `DonationPreview.jsx`             | `homepage.json` → `donationPreview` + `support.json`  | Community center, programs, long-term growth → CTA: Donate Today (Jotform)                                                                                                                          |
| **Events preview**     | `EventsPreview.jsx`               | `homepage.json` → `eventsPreview` + `events.json`     | Live upcoming events OR empty: _Upcoming events will be posted soon…_                                                                                                                               |
| **About preview**      | `AboutPreview.jsx`                | `homepage.json` → `aboutPreview`                      | Founded 1983; newcomers + culture + stronger community → CTA: Learn About ECAA                                                                                                                      |
| **Contact preview**    | `ContactPreview.jsx`              | `contact.json`                                        | 5616 Memorial Dr, phone, email, office hours → CTA: Contact ECAA                                                                                                                                    |

**Homepage order:** Hero → Mission → Pillars → Programs → Membership → Volunteer → Donate → Events → About → Contact

**Retired from homepage (kept in JSON, `visible: false`):** whyJoin, communityImpact, whoWeServe, featuredPrograms, featuredEvents, waysToGetInvolved, trustSection, featuredMedia — available for CMS without deleting work.

---

## About Page

| Section           | Component                | Content file                                                        |
| ----------------- | ------------------------ | ------------------------------------------------------------------- |
| ECAA history      | `AboutHistory.jsx`       | `data/about.json` → `history` — add _Founded in 1983_ narrative     |
| Mission           | `AboutMissionVision.jsx` | `data/about.json` → `missionVision` — align with researched mission |
| Nonprofit status  | `AboutOverview.jsx`      | `data/about.json` → `overview` — 501(c)(3) community nonprofit      |
| Community purpose | `AboutHowItWorks.jsx`    | `data/about.json` → `howItWorks`                                    |

---

## Membership Page

| Section              | Component                    | Content file                               |
| -------------------- | ---------------------------- | ------------------------------------------ |
| Benefits             | `MembershipBenefits.jsx`     | `membership.json` → `benefitsSection`      |
| Eligibility          | `MembershipOptionCards.jsx`  | `membership.json` → `membershipOption`     |
| Member CTA           | `MembershipRegistration.jsx` | Jotform: `forms.json` membership URL       |
| Edir explanation     | `EdirDisclosure.jsx`         | membership + programs edir sections        |
| Membership form link | `ExternalFormCTA`            | `https://form.jotform.com/211111215669043` |
| Pricing note         | `membership.json` → `notice` | Verify dues with ECAA if amounts change    |

---

## Programs Page

| Section                 | Component                               | Content file                                                |
| ----------------------- | --------------------------------------- | ----------------------------------------------------------- |
| Youth programs          | `ProgramsMainGrid` + education          | `programs.json` — youth-education, educationTraining topics |
| College readiness       | `EducationTrainingSection`              | topic: Youth Education / College Readiness                  |
| Newcomer support        | `community-support` category            | expanded description                                        |
| Health and wellness     | `health-wellness` + education topics    | sports, wellness series                                     |
| Legal awareness         | education topic: Legal Awareness        |                                                             |
| Financial literacy      | education topic: Financial Literacy     |                                                             |
| Sports and social clubs | `health-wellness` description           |                                                             |
| Event planning          | `volunteer-civic`                       | volunteer/event support                                     |
| IT/grant volunteer      | `volunteer-civic` form + volunteer page |                                                             |
| Student interest form   | `ProgramAreaCard` form                  | Google Form URL in `forms.json`                             |
| Volunteer form          | `ProgramAreaCard` form                  | Google Form URL in `forms.json`                             |

---

## Events Page

| Section         | Component                               | Content file                        |
| --------------- | --------------------------------------- | ----------------------------------- |
| Upcoming events | `EventsSection` / `EventsStatusSection` | `events.json` → `upcoming`          |
| RSVP links      | `EventCard` + quick actions             | `forms.json` event RSVP Google Form |
| Past events     | events past section                     | `events.json` → `past`              |
| Empty state     | `EmptyState`                            | researched friendly message         |
| Book hall       | `EventHallRentalSection`                | `events.json` → `bookHall`          |

---

## Donate Page (`/support`)

| Section              | Component                       | Content file                                     |
| -------------------- | ------------------------------- | ------------------------------------------------ |
| Fundraising campaign | `Support.jsx`                   | `support.json` → `donationCampaign`              |
| Donation CTA         | `ExternalFormCTA`               | Jotform `240604382753152` — label _Donate Today_ |
| Sponsorship CTA      | donation levels + other options | `support.json`                                   |
| Tax-deductible note  | footer + support section        | 501(c)(3) disclaimer                             |

---

## Volunteer Page

| Section            | Component            | Content file                          |
| ------------------ | -------------------- | ------------------------------------- |
| Volunteer areas    | `Volunteer.jsx` list | `volunteer.json` → `areas` (expanded) |
| Volunteer form CTA | `ExternalFormCTA`    | Google Form URL                       |
| Mailto fallback    | `MailtoForm`         | optional secondary contact            |

---

## Leadership Page

| Section             | Component                | Content file       |
| ------------------- | ------------------------ | ------------------ |
| Executive committee | `LeadershipGroupSection` | `teamMembers.json` |
| Board members       | same                     |                    |
| Advisory board      | same                     |                    |
| Audit committee     | same                     |                    |
| Edir committee      | same                     |                    |

---

## Contact Page

| Section       | Component               | Content file                       |
| ------------- | ----------------------- | ---------------------------------- |
| Address       | `ContactDetailsSection` | `contact.json` → `general.address` |
| Phone / email | same                    | verified values                    |
| Office hours  | same                    | Mon–Fri 10–6, Sat 9–2, Sun closed  |
| Contact form  | mailto or future embed  | `ContactDetailsSection`            |
| Google map    | `#map` anchor           | ContactDetailsSection              |

---

## Governance / Bylaws Page (`/documents`, nav: Governance)

| Section                | Component                                  | Content file                               |
| ---------------------- | ------------------------------------------ | ------------------------------------------ |
| English bylaws         | `DocumentCard`                             | `documents.json` — PDF on ethiopiancaa.org |
| Amharic bylaws         | same                                       |                                            |
| Governance explanation | `DocumentsFeaturedSection` intro           | `documents.json`                           |
| Edir governance        | `AboutLeadershipStructure` + programs edir | cross-link from governance                 |
| Route alias            | `App.jsx`                                  | `/governance` → `/documents`               |

---

## Navigation update

**Target header order:**  
Home · About · Programs · Events · Membership · Volunteer · Donate · Leadership · Governance · Contact

**Header CTAs:** Become a Member (primary) · Donate (secondary)

**Footer quick links:** add Governance (`/documents`), keep Volunteer, Events, Membership, Donate; include office hours in contact column.

---

## External links (canonical in `forms.json`)

| Form             | URL                                                                                                   |
| ---------------- | ----------------------------------------------------------------------------------------------------- |
| Membership       | `https://form.jotform.com/211111215669043`                                                            |
| Donation         | `https://form.jotform.com/240604382753152`                                                            |
| Volunteer        | `https://docs.google.com/forms/d/e/1FAIpQLScqZHcyvOK4aF1GCrVh2pNeTbvQCAOG6Fpo1Zez27k4OLi0fg/viewform` |
| Student interest | `https://docs.google.com/forms/d/e/1FAIpQLSeCofxWdhA6Oc49trML_3uusOLu8dANcMp0Xi3OaxCtbtx1YA/viewform` |
| Event RSVP       | `https://docs.google.com/forms/d/e/1FAIpQLSfhFyDtPFvuKOT1vca1iLZfFnZYcYj3pwyDr6EEKNfFVt8ueg/viewform` |

All external links: `target="_blank"` + `rel="noopener noreferrer"`.

---

## CTA label standardization

| Old / weak           | New                                             |
| -------------------- | ----------------------------------------------- |
| Donate               | Donate Today                                    |
| Open form            | Register Student Interest / Volunteer With ECAA |
| Contact Us           | Contact ECAA                                    |
| Explore All Programs | Explore Programs                                |
| View All Events      | View Upcoming Events                            |
| Learn more           | Learn More                                      |
| Bylaws (hero)        | Read the Bylaws                                 |

---

## Items needing confirmation from ECAA

- Membership dues amount ($30 listed — verify annually)
- Donation sponsorship level amounts
- EDIR fee details (disclaimer already on membership page)
- Bylaws PDF URLs (hosted on ethiopiancaa.org — verify permanence)
- Event dates for announcements without dates
- Hall booking official process (currently contact mailto)
