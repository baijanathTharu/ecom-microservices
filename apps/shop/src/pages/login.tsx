import { useRouter } from 'next/router';
import { trpc } from '../utils/trpc';

export default function login() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  const login = trpc.useMutation('user-login', {
    async onSuccess(data) {
      // set localstorage
      const user = { ...data };
      localStorage.setItem('user', JSON.stringify(user));

      router.push('/');
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    console.log('email', email);

    const input = { email };

    await login.mutateAsync(input);
  };

  return (
    <div className="mx-auto p-8 border my-4">
      <h2 className="text-center font-bold my-2">Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col my-2">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            disabled={login.isLoading}
            type="email"
            name="email"
            id="email"
            className="w-full p-2 border"
          />
        </div>
        <div className="flex flex-col">
          <button
            disabled={login.isLoading}
            type="submit"
            className="w-full p-2 border bg-gray-300"
          >
            {login.isLoading ? 'Loading...' : 'Login'}
          </button>

          {login.isError && login.error.message}
        </div>
      </form>
    </div>
  );
}
