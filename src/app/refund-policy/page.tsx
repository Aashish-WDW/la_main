import React from 'react';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Refund Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">1. Overview</h2>
            <p className="text-gray-600">
              At lookaround, we strive to ensure complete satisfaction with your booking experience. This policy outlines our guidelines for cancellations and refunds for both guests and hosts.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">2. Guest Cancellations</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-medium mb-2">Standard Cancellation Windows:</h3>
              <ul className="list-disc pl-6 text-gray-600">
                <li><strong>Flexible:</strong> Full refund if cancelled at least 24 hours before check-in</li>
                <li><strong>Moderate:</strong> Full refund if cancelled at least 5 days before check-in</li>
                <li><strong>Strict:</strong> 50% refund if cancelled at least 7 days before check-in</li>
              </ul>
              <p className="text-gray-600 mt-4">
                The specific cancellation policy for each property is clearly displayed on the property listing page.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">3. Host Cancellations</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                If a host cancels a confirmed booking:
              </p>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Guests receive a full refund</li>
                <li>Hosts may be subject to penalties, including:
                  <ul className="list-disc pl-6 mt-2">
                    <li>Financial penalties</li>
                    <li>Lower listing visibility</li>
                    <li>Account suspension for repeated cancellations</li>
                  </ul>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">4. Extenuating Circumstances</h2>
            <p className="text-gray-600 mb-4">
              We understand that unexpected situations may arise. In cases of extenuating circumstances, such as:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Natural disasters or severe weather</li>
              <li>Government travel restrictions</li>
              <li>Serious illness or death</li>
              <li>Significant property damage</li>
            </ul>
            <p className="text-gray-600 mt-4">
              We may offer full or partial refunds outside of the standard cancellation policy. Each case is reviewed individually.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">5. Refund Process</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                When a refund is approved:
              </p>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Refunds are processed within 5-10 business days</li>
                <li>The refund will be issued to the original payment method</li>
                <li>You will receive an email confirmation when the refund is processed</li>
                <li>Processing times may vary depending on your payment provider</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">6. Service Fees</h2>
            <p className="text-gray-600">
              Our service fees are non-refundable unless the cancellation is due to a host cancellation or extenuating circumstances. This helps us maintain our platform and provide support services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">7. Disputes</h2>
            <p className="text-gray-600">
              If you believe you are entitled to a refund that hasn't been processed, please contact our support team. We will review your case and respond within 48 hours.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
            <p className="text-gray-600">
              For any questions about our refund policy or to request a refund, please contact us at:
              <br />
              Email: support@lookaround.com
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 