import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import UserList from './Components/UserList';
import UserForm from './Components/UserForm';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import './App.css';
import AttendanceList from './Components/AttendaceList';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <nav>
            <ul className='navbar'>
              <li className='navbaritem'>
                <Link to="/">Home</Link>
              </li>
              <li className='navbaritem'>
                <Link to="/user-list">Student List</Link>
              </li>
              <li className='navbaritem'>
                <Link to="/student-attendance">Attendance</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/user-list" element={<UserList />}></Route>
            <Route path="/" element={<UserForm />}></Route>
            <Route path="/student-attendance" element={<AttendanceList />}></Route>
          </Routes>

        </div>
      </Router>
    </Provider>
  );
}

export default App;
