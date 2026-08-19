import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/wishlist", label: "Wishlist ❤️" },
  { to: "/cart", label: "Cart 🛒" },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 sm:px-6">

        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 font-display text-xl font-bold text-ink"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-amber-400">
            M
          </span>

          Marketplace
        </NavLink>

        {/* Navigation */}
        <nav className="ml-auto flex items-center gap-1 sm:gap-2">

          {/* Home / Wishlist / Cart */}
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `relative rounded-full px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-ink text-white"
                    : "text-ink-500 hover:bg-ink-50"
                }`
              }
            >
              {link.label}

              {/* Cart Count */}
              {link.to === "/cart" && totalItems > 0 && (
                <span className="ml-1.5 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] font-bold text-ink">
                  {totalItems}
                </span>
              )}

              {/* Wishlist Count */}
              {link.to === "/wishlist" &&
                wishlistItems.length > 0 && (
                  <span className="ml-1.5 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] font-bold text-ink">
                    {wishlistItems.length}
                  </span>
                )}
            </NavLink>
          ))}

          {/* If NOT logged in */}
          {!user && (
            <>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-ink text-white"
                      : "text-ink-500 hover:bg-ink-50"
                  }`
                }
              >
                Register
              </NavLink>

              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-ink text-white"
                      : "text-ink-500 hover:bg-ink-50"
                  }`
                }
              >
                Login
              </NavLink>
            </>
          )}

          {/* Profile */}
          {user && (
            <div className="relative">

              <button
                type="button"
                onClick={() => setProfileOpen((open) => !open)}
                className="flex items-center gap-2 rounded-full border border-ink-100 px-4 py-2 text-sm font-medium text-ink transition hover:bg-ink-50"
              >
                <span>👤</span>
                <span>Profile</span>
                <span className="text-xs">
                  {profileOpen ? "▲" : "▼"}
                </span>
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 top-12 z-50 w-72 rounded-2xl border border-ink-100 bg-white p-5 shadow-xl">

                  {/* Header */}
                  <div className="border-b border-ink-100 pb-4">
                    <h3 className="font-display text-lg font-bold text-ink">
                      My Profile
                    </h3>

                    <p className="mt-1 text-xs text-ink-400">
                      Your registered account details
                    </p>
                  </div>

                  {/* Name */}
                  <div className="mt-4">
                    <p className="text-xs font-medium text-ink-400">
                      Name
                    </p>

                    <p className="mt-1 text-sm font-semibold text-ink">
                      {user.name || "N/A"}
                    </p>
                  </div>

                  {/* Email */}
                  <div className="mt-3">
                    <p className="text-xs font-medium text-ink-400">
                      Email
                    </p>

                    <p className="mt-1 break-all text-sm font-semibold text-ink">
                      {user.email || "N/A"}
                    </p>
                  </div>

                  {/* Username */}
                  <div className="mt-3">
                    <p className="text-xs font-medium text-ink-400">
                      Username
                    </p>

                    <p className="mt-1 text-sm font-semibold text-ink">
                      {user.username}
                    </p>
                  </div>

                  {/* Logout */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-5 w-full rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}

        </nav>
      </div>
    </header>
  );
}