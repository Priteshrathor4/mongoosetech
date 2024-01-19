import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/userSlice';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.user);
  useEffect(() => {

    dispatch(getAllUsers());
  }, [])
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getAllUsers());
    }

  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Student List</h2>
      <table className='tableData'>
        <tr>
          <th>Sr</th>
          <th>Email</th>
          <th>Password</th>
        </tr>
        {users.map((user, index) => (
          <tr key={user.id}>
            <td>
              {index + 1}
            </td>
            <td>{user.email}</td>
            <td>
              {user.password}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default UserList;
