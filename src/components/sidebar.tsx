'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Home', icon: '⌂' },
  { href: '/transfer', label: 'Transfer', icon: '⇄' },
];

const edgeItems = [
  { href: '/support', label: 'Support', icon: '💬' },
  { href: '/profile', label: 'Profile', icon: '👤' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function linkClass(href: string) {
    const active = pathname === href;
    return `flex items-center gap-3 px-4 py-2.5 rounded-lg transition text-sm font-medium ${
      active
        ? 'bg-[#7c5cfc]/15 text-[#7c5cfc]'
        : 'text-[#8888a0] hover:text-white hover:bg-[#1a1a26]'
    }`;
  }

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-[#12121a] border border-[#2a2a3a] text-white"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span className={`block w-5 h-0.5 bg-current transition relative
          before:block before:w-5 before:h-0.5 before:bg-current before:absolute before:-top-1.5 before:transition
          after:block after:w-5 after:h-0.5 after:bg-current after:absolute after:top-1.5 after:transition
          ${open ? 'rotate-45 before:rotate-90 before:top-0 after:opacity-0' : ''}`}
        />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-full w-60 z-40 flex flex-col bg-[#0e0e16] border-r border-[#2a2a3a] transition-transform md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Edge items — Support & Profile at the very top edge */}
        <div className="flex items-center gap-1 px-3 pt-3 pb-1 border-b border-[#2a2a3a]/50">
          {edgeItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition ${
                pathname === item.href
                  ? 'bg-[#7c5cfc]/15 text-[#7c5cfc]'
                  : 'text-[#8888a0] hover:text-white hover:bg-[#1a1a26]'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Brand name */}
        <div className="px-4 py-4">
          <Link href="/" className="text-lg font-bold tracking-tight text-white" onClick={() => setOpen(false)}>
            Alveron
          </Link>
        </div>

        {/* Main nav */}
        <nav className="flex flex-col gap-1 px-3 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={linkClass(item.href)}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 text-[10px] text-[#5555] border-t border-[#2a2a3a]/50">
          Zubbycrypt &middot; Resale
        </div>
      </aside>
    </>
  );
}
