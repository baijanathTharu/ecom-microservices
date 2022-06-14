import Head from 'next/head';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const [user, setUser] = useState<{ id: number; email: string } | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  console.log('user', user);

  return (
    <>
      <Head>
        <title>Prisma Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-1/2 mx-auto">
        <nav>
          <ul className="flex justify-between my-4">
            <li className="border px-2 hover:bg-slate-200">
              <Link href="/">
                <a>Shop</a>
              </Link>
            </li>
            <li className="border px-2 hover:bg-slate-200">
              {user ? (
                user.email
              ) : (
                <Link href="/login">
                  <a>Login</a>
                </Link>
              )}
            </li>
            <li className="border px-2 hover:bg-slate-200">
              <Link href="/logout">
                <a>Logout</a>
              </Link>
            </li>
          </ul>
        </nav>
        {children}
      </main>

      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
};
