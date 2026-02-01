import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCartStore, selectCartItemCount } from "@/store";
import { NAV_LINKS } from "@/data";
import {
  SearchIcon,
  CartIcon,
  UserIcon,
  MenuIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "./icons";
import { Announcement } from "./Announcement";

export function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const totalItems = useCartStore(selectCartItemCount);

  return (
    <>
      <header className="sticky top-0 z-50 bg-bg-primary">
        <Announcement />
        <nav className="mx-auto flex max-w-7xl items-center gap-8 px-4 py-5 lg:px-8">
          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 lg:hidden"
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-black tracking-tight text-text-primary"
          >
            SHOP.CO
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-1 text-sm transition-colors ${
                    isActive
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`
                }
              >
                {link.label}
                {link.hasDropdown && <ChevronDownIcon />}
              </NavLink>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden flex-1 lg:block">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                <SearchIcon />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full rounded-full bg-bg-secondary py-3 pl-12 pr-4 text-sm text-text-primary placeholder-text-muted focus:outline-none"
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="ml-auto flex items-center gap-3 lg:ml-0 lg:gap-4">
            {/* Mobile Search */}
            <button className="p-1 lg:hidden" aria-label="Search">
              <SearchIcon />
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative p-1" aria-label="Cart">
              <CartIcon />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Account */}
            <button className="p-1" aria-label="Account">
              <UserIcon />
            </button>
          </div>
        </nav>

        {/* Border line with side padding */}
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="border-b border-border" />
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-text-primary/50 lg:hidden"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-80 transform bg-bg-primary shadow-xl transition-transform duration-300 lg:hidden ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-border-light p-4">
          <Link
            to="/"
            onClick={() => setIsDrawerOpen(false)}
            className="text-2xl font-black tracking-tight text-text-primary"
          >
            SHOP.CO
          </Link>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="rounded-full p-2 hover:bg-bg-secondary"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Drawer Search */}
        <div className="border-b border-border-light p-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full rounded-full bg-bg-secondary py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>

        {/* Drawer Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  onClick={() => setIsDrawerOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? "bg-bg-secondary text-text-primary"
                        : "text-text-secondary hover:bg-bg-hover hover:text-text-primary"
                    }`
                  }
                >
                  {link.label}
                  {link.hasDropdown && <ChevronRightIcon />}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
