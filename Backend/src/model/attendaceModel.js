import db from './db.js';
class attendanceModel {
    createStudentAttendance(user, callback) {
        const { email,photo } = user;
    
        db.query('INSERT INTO attendance (email,photo) VALUES (?, ?)', [email,photo], (err, result) => {
          if (err) throw err;
    
          const newUser = {
            id: result.insertId,
            email,
            photo,
          };
    
          callback(newUser);
        });
      }
      getAllStudentAttendance(callback) {
        db.query('SELECT * FROM attendance', (err, results) => {
          if (err) throw err;
          callback(results);
        });
      }
}
export default new attendanceModel();