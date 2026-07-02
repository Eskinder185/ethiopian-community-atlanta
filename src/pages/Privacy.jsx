import LegalPageLayout, { LegalSection, LegalSubsection } from '../components/layout/LegalPageLayout'

export default function Privacy() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="Privacy Policy of Ethiopian Community Association In Atlanta Inc. (ECAA) Website"
      effectiveDate="July 18, 2023"
      breadcrumbLabel="Privacy Policy"
      documentTitle="Privacy Policy | Ethiopian Community Association in Atlanta"
    >
      <p className="text-base leading-relaxed text-ecaa-ink-muted sm:text-lg">
        At Ethiopian Community Association In Atlanta Inc. (ECAA), we are committed to protecting the
        privacy and personal information of our website users. This Privacy Policy outlines how we
        collect, use, disclose, and protect the information you provide to us through our website. By
        accessing and using our website, you consent to the practices described in this Privacy Policy.
      </p>

      <LegalSection title="Information We Collect">
        <LegalSubsection label="a. Personal Information:">
          We may collect personal information such as your name, email address, phone number, and
          mailing address when you voluntarily provide it to us through our website. This information
          is typically collected when you fill out forms, make donations, subscribe to our
          newsletter, or engage in other activities on our website.
        </LegalSubsection>
        <LegalSubsection label="b. Non-Personal Information:">
          We may also collect non-personal information, such as your IP address, browser type,
          operating system, and browsing behavior. This information is collected through the use of
          cookies, web beacons, and other tracking technologies.
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="Use of Information">
        <LegalSubsection label="a. Personal Information:">
          We may use your personal information to communicate with you, process your donations,
          provide you with information about our programs and services, respond to your inquiries,
          and send you newsletters or other promotional materials, if you have opted to receive them.
        </LegalSubsection>
        <LegalSubsection label="b. Non-Personal Information:">
          We may use non-personal information to analyze trends, administer our website, track
          users&apos; movements, and gather demographic information. This information helps us
          improve our website and tailor our content to better meet the needs and preferences of our
          users.
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="Disclosure of Information">
        <LegalSubsection label="a.">
          Ethiopian Community Association In Atlanta Inc. (ECAA) does not sell, trade, or rent your
          personal information to third parties.
        </LegalSubsection>
        <LegalSubsection label="b.">
          We may disclose your personal information to trusted third-party service providers who
          assist us in operating our website, conducting our business, or servicing you. These
          service providers are contractually obligated to keep your information confidential and are
          prohibited from using it for any other purpose.
        </LegalSubsection>
        <LegalSubsection label="c.">
          We may also disclose your information when required by law, to enforce our website
          policies, or to protect our or others&apos; rights, property, or safety.
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="Data Security">
        <p>
          We employ industry-standard security measures to protect the personal information you
          provide to us. However, no data transmission over the internet or electronic storage method
          is completely secure. Therefore, while we strive to protect your information, we cannot
          guarantee its absolute security.
        </p>
      </LegalSection>

      <LegalSection title="Third-Party Links">
        <p>
          Our website may contain links to third-party websites. We are not responsible for the
          privacy practices or content of these websites. We encourage you to review the privacy
          policies of those third parties before providing any personal information.
        </p>
      </LegalSection>

      <LegalSection title="Children's Privacy">
        <p>
          Our website is not intended for children under the age of 13. We do not knowingly collect
          personal information from children under the age of 13. If you believe we have
          inadvertently collected information from a child under 13, please contact us immediately,
          and we will take steps to remove the information from our systems.
        </p>
      </LegalSection>

      <LegalSection title="Changes to the Privacy Policy">
        <p>
          Ethiopian Community Association In Atlanta Inc. (ECAA) reserves the right to update or
          modify this Privacy Policy at any time without prior notice. Any changes will be effective
          immediately upon posting the revised Privacy Policy on our website. We encourage you to
          review this Privacy Policy periodically for any updates.
        </p>
      </LegalSection>

      <LegalSection title="Contact Information">
        <p>If you have any questions or concerns about our Privacy Policy or our practices regarding your personal information, please contact us at:</p>
        <address className="not-italic">
          <p className="font-medium text-ecaa-ink">Ethiopian Community Association In Atlanta Inc. (ECAA)</p>
          <p className="mt-2">5616 MEMORIAL DR,</p>
          <p>Stone Mountain, GA 30083</p>
          <p className="mt-2">
            Email:{' '}
            <a
              href="mailto:legal@ethiopiancaa.org"
              className="font-medium text-ecaa-green-800 hover:text-ecaa-green-950 hover:underline"
            >
              legal@ethiopiancaa.org
            </a>
          </p>
        </address>
      </LegalSection>

      <p className="border-t border-ecaa-border/80 pt-8 text-base leading-relaxed text-ecaa-ink-muted sm:text-lg">
        By using our website, you acknowledge that you have read, understood, and agree to abide by
        this Privacy Policy.
      </p>
    </LegalPageLayout>
  )
}
