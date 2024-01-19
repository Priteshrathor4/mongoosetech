import db from '../model/db.js';
import adminModel from '../model/adminModel.js';
class adminController{
    adminLogin(req, res) {
        const { username,password } = req.body;
        console.log(' req.body: ',  req.body);
    
        if (!username) {
          return res.status(400).json({ error: 'Usrename parameter is required' });
        }
        if (!password) {
          return res.status(400).json({ error: 'Password parameter is required' });
        }
    
        adminModel.adminLogin({username,password}, (user) => {
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
    
          res.json(user);
        });
      }
}
export default new adminController();