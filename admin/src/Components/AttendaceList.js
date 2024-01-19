import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersAttendance } from '../redux/userSlice';

const AttendanceList = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsersAttendance());

  },[])
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getAllUsersAttendance());
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
      <h2>Student attendance List</h2>
      <table className='tableData'>
           <tr>
           <th>Sr</th>
            <th>Email</th>
            <th>Photo</th>
            <th>Date and time </th>
           </tr> 
        {users.map((user,index) => (
          <tr key={user.id}>
            <td>
            {index+1}
            </td>
          <td>{user.email}</td>
            {/* <td>
            {user.photo}
            </td> */}
            <td>
                <img src={user.photo} alt={`User ${index + 1}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
              </td>
              <td>{new Date(user.date).toLocaleString()}</td>
            </tr>
        ))}
      </table>
    </div>
  );
};

export default AttendanceList;
