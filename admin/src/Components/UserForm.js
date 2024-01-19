import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/userSlice';

const UserForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(formData));
    setFormData({ email: '', password: '' });
  };

  return (
    <div>
      <h2>Add student</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
        Password:
          <input type="text" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default UserForm;
