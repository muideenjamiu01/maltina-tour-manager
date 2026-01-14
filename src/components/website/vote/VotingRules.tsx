export default function VotingRules() {
  return (
    <section className="relative py-6">
      <div className="mx-6 sm:mx-10 md:ml-60 text-black">
        <h2 className="font-['Poppins'] text-2xl md:text-3xl mb-4 font-bold">
          Voting Rules
        </h2>

        <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
          <li>One vote per person per mobile number</li>
          <li>Phone verification required via SMS OTP</li>
          <li>Email and mobile number must be unique</li>
          <li>System detects and prevents duplicate voting</li>
          <li>Voting closes on [End Date]</li>
          <li>The winning design will be featured on limited edition Maltina lunch bags</li>
        </ul>
      </div>
    </section>
  )
}
