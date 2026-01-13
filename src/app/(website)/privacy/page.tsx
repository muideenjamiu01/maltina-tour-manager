import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div 
      className="min-h-screen py-12 px-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/websites/challenge/step-four.png')",
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 mt-12 md:mt-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-lilita mb-4">
            Privacy Policy
          </h1>
          <p className="text-base md:text-lg text-gray-900 font-semibold">
            Last updated: December 15, 2025
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-900">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold mb-3">Introduction</h2>
            <p className="leading-relaxed">
              This Privacy Policy explains how Maltina Nourishment Tour ("we", "us", or "our") collects, 
              uses, and protects your personal information when you use our website and services.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold mb-3">Information We Collect</h2>
            <p className="leading-relaxed">
              We collect information you provide directly to us, such as when you nominate a school, 
              enter the Design Competition, or contact us. This may include your name, email 
              address, phone number, and other information you choose to provide.
            </p>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold mb-3">How We Use Your Information</h2>
            <p className="leading-relaxed">
              We use the information we collect to operate and improve our services, communicate 
              with you, process your nominations and entries, and fulfill our mission of nourishing 
              young minds across Nigeria.
            </p>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-bold mb-3">Information Sharing</h2>
            <p className="leading-relaxed">
              We do not sell your personal information. We may share your information with service 
              providers who help us operate our program, or when required by law.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold mb-3">Data Security</h2>
            <p className="leading-relaxed">
              We implement reasonable security measures to protect your personal information 
              from unauthorized access, alteration, or destruction.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold mb-3">Your Rights</h2>
            <p className="leading-relaxed">
              You have the right to access, correct, or delete your personal information. Contact us if 
              you wish to exercise these rights.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-2xl font-bold mb-3">Contact Us</h2>
            <p className="leading-relaxed">
              If you have questions about this Privacy Policy, please contact us through our Contact 
              page.
            </p>
          </section>

          {/* Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-bold mb-3">Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using the Maltina Nourishment Tour website, you accept and agree 
              to be bound by these Terms of Use.
            </p>
          </section>

          {/* Use of the Website */}
          <section>
            <h2 className="text-2xl font-bold mb-3">Use of the Website</h2>
            <p className="leading-relaxed">
              You may use this website for lawful purposes only. You agree not to use the website in 
              any way that could damage, disable, or impair the website or interfere with any other 
              party's use.
            </p>
          </section>

          {/* School Nominations */}
          <section>
            <h2 className="text-2xl font-bold mb-3">School Nominations</h2>
            <p className="leading-relaxed">
              When nominating a school, you agree to provide accurate and truthful information. We 
              reserve the right to verify any information provided and to reject nominations that do 
              not meet our criteria.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold mb-3">Intellectual Property</h2>
            <p className="leading-relaxed">
              All content on this website, including text, graphics, logos, and images, is the property 
              of Maltina or its licensors and is protected by copyright and other intellectual property 
              laws.
            </p>
          </section>

          {/* Disclaimer of Warranties */}
          <section>
            <h2 className="text-2xl font-bold mb-3">Disclaimer of Warranties</h2>
            <p className="leading-relaxed">
              This website is provided "as is" without any warranties, express or implied. We do not 
              guarantee that the website will be uninterrupted or error-free.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold mb-3">Limitation of Liability</h2>
            <p className="leading-relaxed">
              To the fullest extent permitted by law, Maltina shall not be liable for any indirect, 
              incidental, or consequential damages arising from your use of this website.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold mb-3">Changes to Terms</h2>
            <p className="leading-relaxed">
              We reserve the right to modify these Terms of Use at any time. Changes will be 
              effective immediately upon posting to the website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
