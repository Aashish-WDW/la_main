import React from 'react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-30">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing and using lookaround, you agree to be bound by these Terms of Service
              and all applicable laws and regulations. If you do not agree with any of these terms,
              you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p className="text-gray-600 mb-4">
              Permission is granted to temporarily access the materials (information or software) on
              lookaround's website for personal, non-commercial transitory viewing only.
            </p>
            <p className="text-gray-600">
              This is the grant of a license, not a transfer of title, and under this license you
              may not:
            </p>
            <ul className="list-disc pl-6 mt-4 text-gray-600">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software contained on lookaround</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <p className="text-gray-600 mb-4">
              When you create an account with us, you must provide accurate, complete, and current
              information. Failure to do so constitutes a breach of the Terms, which may result in
              immediate termination of your account.
            </p>
            <p className="text-gray-600">
              You are responsible for safeguarding the password and for all activities that occur
              under your account. You agree not to disclose your password to any third party.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">4. Virtual Tours and Content</h2>
            <p className="text-gray-600 mb-4">
              Our virtual tours and content are provided for informational purposes only. While we
              strive to ensure accuracy, we cannot guarantee that all information is complete,
              current, or accurate.
            </p>
            <p className="text-gray-600">
              Users may not:
            </p>
            <ul className="list-disc pl-6 mt-4 text-gray-600">
              <li>Use our virtual tours for any unauthorized commercial purposes</li>
              <li>Attempt to download or copy our virtual tour content</li>
              <li>Use our platform to harass, abuse, or harm others</li>
              <li>Use our services in any way that violates applicable laws or regulations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">5. Booking and Payments</h2>
            <p className="text-gray-600 mb-4">
              By making a booking through our platform, you agree to:
            </p>
            <ul className="list-disc pl-6 mt-4 text-gray-600">
              <li>Provide accurate booking information</li>
              <li>Pay all applicable fees and charges</li>
              <li>Comply with the property's rules and regulations</li>
              <li>Accept responsibility for any damage caused during your stay</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-600">
              In no event shall lookaround, nor any of its officers, directors, and employees,
              be liable to you for anything arising out of or in any way connected with your use
              of this website, whether such liability is under contract, tort, or otherwise.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
            <p className="text-gray-600">
              We reserve the right to modify these terms at any time. We will notify users of any
              material changes by posting the new Terms of Service on this page and updating the
              "Last updated" date.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
            <p className="text-gray-600">
              If you have any questions about these Terms, please contact us at:
              <br />
              Email: legal@lookaround.com
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 