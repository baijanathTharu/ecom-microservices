import React from 'react';
import { trpc } from '../utils/trpc';

const UserComponent: React.FC = () => {
  const { data } = trpc.useQuery(['product-all']);
  return (
    <div>
      <p>Shop page</p>
    </div>
  );
};

export default UserComponent;
