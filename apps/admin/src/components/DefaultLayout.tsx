import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const router = useRouter();

  const [user, setUser] = useState<{ id: number; email: string } | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const handleSubmit = () => {
    localStorage.removeItem('user');
    setUser(null);

    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-1/2 mx-auto">
        <nav>
          <ul className="flex justify-between my-4">
            <li className="border px-2 hover:bg-slate-200">
              <Link href="/">
                <a>Admin Home</a>
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
              <button onClick={handleSubmit}>
                <a>Logout</a>
              </button>
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
