import React from 'react';
import { trpc } from '../utils/trpc';

const UserComponent: React.FC = () => {
  const { data } = trpc.useQuery(['user.get-user', { email: 'test@test.com' }]);
  return (
    <div>
      <p>{data?.user?.email}</p>
    </div>
  );
};

export default UserComponent;
