import db from '../model/db.js';
import jwt from 'jsonwebtoken';
class StudentModel {
    studentLogin(student,callback){
        const {email,password}=student;
        db.query('SELECT * FROM students WHERE email = ? AND password = ?',[email,password],(err,results)=>{
            if (err) throw err;

            if (results.length === 0) {
              callback(null); // User not found
            } else {
              const user = results[0];
          const token =jwt.sign({id:user.id,email:user.email},"THIS-IS-SECRETE-KEY",{expiresIn:'1h'});
            
              callback({
                id: user.id,
                email: user.email,
                password: user.password,
                token:token,
              });
            }
          });
        }
    getAllStudents(callback) {
      db.query('SELECT * FROM students', (err, results) => {
        if (err) throw err;
        callback(results);
      });
    }
  
    createStudent(user, callback) {
      const { password, email } = user;
  
      db.query('INSERT INTO students (email,password) VALUES (?, ?)', [email,password], (err, result) => {
        if (err) throw err;
  
        const newUser = {
          id: result.insertId,
          email,
          password,
        };
  
        callback(newUser);
      });
    }
  
    searchStudentByEmail(email, callback) {
      db.query('SELECT * FROM students WHERE email = ?', [email], (err, results) => {
        if (err) throw err;
  
        if (results.length === 0) {
          callback(null); // User not found
        } else {
          const user = results[0];
          callback({
            id: user.id,
            name: user.name,
            email: user.email,
          });
        }
      });
    }
  
    updateStudent(user, callback) {
      const { id, name, email } = user;
  
      db.query('UPDATE students SET name = ?, email = ? WHERE sr = ?', [name, email, id], (err, result) => {
        if (err) throw err;
  
        if (result.affectedRows === 0) {
          callback(null); // User not found
        } else {
          callback({ id, name, email });
        }
      });
    }
  
    deleteStudent(id, callback) {
      db.query('DELETE FROM students WHERE sr = ?', [id], (err, result) => {
        if (err) throw err;
  
        if (result.affectedRows === 0) {
          callback(null); // User not found
        } else {
          callback({ id });
        }
      });
    }
  
    // Add other CRUD operations for students as needed
  }
  
  export default new StudentModel();