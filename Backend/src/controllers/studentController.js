import db from '../model/db.js';
import studentModel from '../model/studentModel.js';
import attendaceModel from "../model/attendaceModel.js"
import jwt from 'jsonwebtoken';
class StudentController {
    studentLogin(req, res) {
        const { email,password } = req.body;    
        if (!email) {
          return res.status(400).json({ error: 'email parameter is required' });
        }
        if (!password) {
          return res.status(400).json({ error: 'Password parameter is required' });
        }
    
        studentModel.studentLogin({email,password}, (user) => {
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
          res.json(user);
        });
      }
    getAllUsers(req, res) {
      studentModel.getAllStudents((users) => {
        res.json({count:users.length,data:users});
      });
    }
    getAllStudentAttendance(req, res) {
      attendaceModel.getAllStudentAttendance((users) => {
        res.json({count:users.length,data:users});
      });
    }
  
    createStudent(req, res) {
      const { password, email } = req.body;
      console.log('req.body: ', req.body);
  
      if (!password || !email) {
        return res.status(400).json({ error: 'Email and Password are required' });
      }
  
      studentModel.createStudent({ password, email }, (newUser) => {
        res.status(201).json(newUser);
      });
    }
  
    createStudentAttendance(req, res) {
      const { photo, email } = req.body;
      console.log('req.body: ', req.body);
  
      if (!photo || !email) {
        return res.status(400).json({ error: 'Email and photo are required' });
      }
  
      attendaceModel.createStudentAttendance({ photo, email }, (newUser) => {
        res.status(201).json(newUser);
      });
    }
  
    searchStudentByEmail(req, res) {
      const { email } = req.params;
  
      if (!email) {
        return res.status(400).json({ error: 'Email parameter is required' });
      }
  
      studentModel.searchStudentByEmail(email, (user) => {
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        res.json(user);
      });
    }
  
    updateStudent(req, res) {
      const { id } = req.params;
      const { name, email } = req.body;
  
      if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
      }
  
      studentModel.updateStudent({ id, name, email }, (updatedUser) => {
        if (!updatedUser) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        res.json(updatedUser);
      });
    }
  
    deleteStudent(req, res) {
      const { id } = req.params;
  
      studentModel.deleteStudent(id, (deletedUser) => {
        if (!deletedUser) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        res.json({ message: 'User deleted successfully' });
      });
    }
  
    // Add other controller methods as needed
  }
  export default new StudentController();