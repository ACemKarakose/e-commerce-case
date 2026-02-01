import { Link } from "react-router-dom";
import { FOOTER_LINKS } from "@/data";
import {
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  GitHubIcon,
  EmailIcon,
  VisaIcon,
  MastercardIcon,
  PaypalIcon,
  ApplePayIcon,
  GooglePayIcon,
} from "./icons";

// Social links configuration
const SOCIAL_LINKS = [
  { name: "Twitter", icon: <TwitterIcon />, href: "#" },
  { name: "Facebook", icon: <FacebookIcon />, href: "#" },
  { name: "Instagram", icon: <InstagramIcon />, href: "#" },
  { name: "GitHub", icon: <GitHubIcon />, href: "#" },
];

// Payment methods as icons
const PAYMENT_ICONS = [
  { name: "Visa", icon: <VisaIcon /> },
  { name: "Mastercard", icon: <MastercardIcon /> },
  { name: "PayPal", icon: <PaypalIcon /> },
  { name: "Apple ", icon: <ApplePayIcon /> },
  { name: "Google Pay", icon: <GooglePayIcon /> },
];

export function Footer() {
  return (
    <footer className="relative mt-auto bg-bg-secondary pt-32 md:pt-40">
      {/* Newsletter Section - Floating */}
      <div className="absolute left-0 right-0 top-0 -translate-y-1/2 px-4">
        <div className="mx-auto max-w-[1200px] rounded-[20px] bg-primary px-6 py-8 shadow-lg md:rounded-3xl md:px-12 md:py-9 lg:px-16">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row lg:gap-8">
            <h2 className="text-center text-2xl font-black uppercase leading-tight text-text-white md:text-left md:text-3xl lg:text-4xl">
              Stay Up to Date About
              <br className="hidden md:block" />
              Our Latest Offers
            </h2>
            <div className="flex w-full flex-col gap-3 sm:max-w-sm lg:w-96">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                  <EmailIcon />
                </span>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full rounded-full bg-bg-primary py-3 pl-12 pr-4 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-text-white/50"
                />
              </div>
              <button className="w-full rounded-full bg-bg-primary py-3 text-sm font-medium text-text-primary transition-colors hover:bg-bg-secondary">
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-10 md:pt-0 lg:px-8">
        {/* Grid Layout */}
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          {/* Brand Column */}
          <div className="lg:max-w-[280px]">
            <Link
              to="/"
              className="text-3xl font-black tracking-tight text-text-primary"
            >
              SHOP.CO
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              We have clothes that suits your style and which you're proud to
              wear. From women to men.
            </p>
            {/* Social Icons */}
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border-dark bg-bg-primary text-text-secondary transition-colors hover:border-primary hover:bg-primary hover:text-text-white"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid - 2 cols on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 gap-8 gap-y-10 md:grid-cols-4 lg:gap-12">
            {Object.entries(FOOTER_LINKS).map(([key, section]) => (
              <div key={key}>
                <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-text-primary">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-border-dark pt-6 md:flex-row md:justify-between">
          <p className="text-center text-sm text-text-muted md:text-left">
            Shop.co © 2000-2023, All Rights Reserved
          </p>
          {/* Payment Method Icons */}
          <div className="flex flex-wrap justify-center gap-3">
            {PAYMENT_ICONS.map((payment) => (
              <div
                key={payment.name}
                className="flex h-8 w-12 items-center justify-center rounded-md bg-bg-primary shadow-sm"
                title={payment.name}
              >
                {payment.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
