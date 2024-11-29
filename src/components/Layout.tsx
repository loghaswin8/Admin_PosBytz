import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const menuItems = [
    { href: '/homeSettings', label: 'Home' },
    { href: '/aboutSettings', label: 'About Us' },
    { href: '/contactSettings', label: 'Contact Us' },
    { href: '/supportSettings', label: 'Support' },
    { href: '/careersSettings', label: 'Careers' },
    { href: '/userSettings', label: 'Users' },
    { href: '/permissionSettings', label: 'Permission' },
    { href: '/rolesSettings', label: 'Roles' },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="w-1/6 bg-zinc-800 fixed h-full text-white p-4">
        <h2 className="text-xl font-bold mb-4">
          <Link href="/">Admin</Link>
        </h2>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block p-2 rounded ${
                  router.pathname === item.href
                    ? 'bg-blue-500'
                    : 'hover:bg-gray-500'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 bg-gray-100">{children}</main>
    </div>
  );
};

export default Layout;

