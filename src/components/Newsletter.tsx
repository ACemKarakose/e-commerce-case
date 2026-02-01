import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="rounded-3xl bg-black px-8 py-10 text-white md:px-16">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        {/* Text */}
        <h2 className="text-3xl font-black uppercase leading-tight md:text-4xl">
          Stay Up to Date About
          <br />
          Our Latest Offers
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-3">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full rounded-full bg-white py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-white py-3 font-medium text-black transition-colors hover:bg-gray-100"
          >
            {subscribed ? "✓ Subscribed!" : "Subscribe to Newsletter"}
          </button>
        </form>
      </div>
    </section>
  );
}
