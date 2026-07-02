import { Link } from 'react-router-dom'

import LegalPageLayout, { LegalSection, LegalSubsection } from '../components/layout/LegalPageLayout'

export default function Terms() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      subtitle="Terms and Conditions of Ethiopian Community Association In Atlanta Inc. (ECAA) Website"
      breadcrumbLabel="Terms & Conditions"
      documentTitle="Terms & Conditions | Ethiopian Community Association in Atlanta"
    >
      <LegalSection title="Acceptance of Terms and Conditions">
        <p>
          By accessing and using the Ethiopian Community Association In Atlanta Inc. (ECAA) website,
          referred to as &ldquo;the website&rdquo; or &ldquo;our website,&rdquo; you agree to comply
          with and be bound by the following terms and conditions. If you do not agree to these
          terms, please refrain from using our website.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual Property Rights">
        <p>
          All content, materials, and information on the website, including but not limited to text,
          graphics, logos, images, videos, and software, are the intellectual property of Ethiopian
          Community Association In Atlanta Inc. (ECAA) unless otherwise stated. These materials are
          protected by applicable copyright, trademark, and other intellectual property laws. You may
          not reproduce, distribute, modify, or otherwise use any content from our website without
          prior written permission from Ethiopian Community Association In Atlanta Inc. (ECAA).
        </p>
      </LegalSection>

      <LegalSection title="Donations and Tax Deductibility">
        <p>
          Ethiopian Community Association In Atlanta Inc. (ECAA) is a registered 501(c)(3) nonprofit
          organization. All donations made through our website are tax deductible to the extent
          permitted by law. However, we recommend consulting with a tax professional to determine the
          eligibility of your donation for tax deductions.
        </p>
      </LegalSection>

      <LegalSection title="Use of Website">
        <LegalSubsection label="a.">
          You may use our website for lawful purposes only and in accordance with these terms and
          conditions.
        </LegalSubsection>
        <LegalSubsection label="b.">
          You agree not to engage in any activity that could disrupt or interfere with the proper
          functioning of the website.
        </LegalSubsection>
        <LegalSubsection label="c.">
          You are responsible for maintaining the confidentiality of any account information and
          passwords associated with our website and agree to notify Ethiopian Community Association
          In Atlanta Inc. (ECAA) immediately of any unauthorized use of your account.
        </LegalSubsection>
        <LegalSubsection label="d.">
          You must not use our website in any way that could harm, damage, or impair the
          website&apos;s performance or availability.
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="External Links">
        <p>
          Our website may contain links to third-party websites for your convenience. Ethiopian
          Community Association In Atlanta Inc. (ECAA) does not endorse or control the content,
          products, or services offered by these third-party websites. By accessing these links, you
          acknowledge and agree that Ethiopian Community Association In Atlanta Inc. (ECAA) is not
          responsible for the accuracy, completeness, legality, or any other aspect of the content or
          functionality of such websites.
        </p>
      </LegalSection>

      <LegalSection title="Privacy Policy">
        <p>
          By using our website, you agree to the collection, use, and disclosure of your information
          as described in our Privacy Policy, which can be found at{' '}
          <Link
            to="/privacy"
            className="font-medium text-ecaa-green-800 hover:text-ecaa-green-950 hover:underline"
          >
            /privacy
          </Link>
          . It is your responsibility to review and understand our Privacy Policy.
        </p>
      </LegalSection>

      <LegalSection title="Disclaimer of Warranties">
        <LegalSubsection label="a.">
          Ethiopian Community Association In Atlanta Inc. (ECAA) strives to provide accurate and
          up-to-date information on our website. However, we make no warranties or representations
          regarding the accuracy, completeness, reliability, or suitability of the information
          provided. You acknowledge that any reliance on such information is at your own risk.
        </LegalSubsection>
        <LegalSubsection label="b.">
          Ethiopian Community Association In Atlanta Inc. (ECAA) does not warrant that the website
          will be uninterrupted, error-free, or free from viruses or other harmful components. You
          agree that your use of the website is at your own risk.
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="Limitation of Liability">
        <p>
          In no event shall Ethiopian Community Association In Atlanta Inc. (ECAA) be liable for any
          direct, indirect, incidental, special, or consequential damages arising out of or in
          connection with your use of the website or reliance on any information provided, even if
          Ethiopian Community Association In Atlanta Inc. (ECAA) has been advised of the possibility
          of such damages.
        </p>
      </LegalSection>

      <LegalSection title="Modifications and Termination">
        <p>
          Ethiopian Community Association In Atlanta Inc. (ECAA) reserves the right to modify, suspend,
          or terminate the website or any part thereof at any time without prior notice. We may also
          update these terms and conditions from time to time. It is your responsibility to review the
          terms periodically for any changes.
        </p>
      </LegalSection>

      <LegalSection title="Contact Information">
        <p>
          If you have any questions or concerns regarding these terms and conditions, please contact
          us at:
        </p>
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
        these terms and conditions.
      </p>
    </LegalPageLayout>
  )
}
