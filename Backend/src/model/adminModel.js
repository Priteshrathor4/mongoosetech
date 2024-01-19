import db from './db.js';
import jwt from 'jsonwebtoken';
class adminModel {
    adminLogin(student,callback){
        const {username,password}=student;
        console.log('student: ', student);
        db.query('SELECT * FROM admin WHERE username = ? AND password = ?',[username,password],(err,results)=>{
            if (err) throw err;

            if (results.length === 0) {
              callback(null); // User not found
            } else {
              const user = results[0];
            const token =jwt.sign({id:user.id,username:user.username},"THIS-IS-SECRETE-KEY",{expiresIn:'1h'});

              callback({
                id: user.id,
                username: user.username,
                password: user.password,
                token:token,
              });
            }
          });
        }
}
export default new adminModel();