import jwt from 'jsonwebtoken';

class AuthMiddleware {
    async verifyToken(req, res, next) {
        const secreteKey = "THIS-IS-SECRET-KEY";
        const token = req.headers.authorization;
        
        if (!token) {
            return res.json({ message: "No token" });
        }else{
            
            
            try {
                console.log('token: ',secreteKey, token);
                const decoded = await jwt.verify(token, secreteKey);
                console.log('decoded: ', decoded);
                req.user = decoded;
                next();
            } catch (error) {
                return res.json({ message: 'Forbidden. Invalid token.' });
            }
        }
    }
}

export default new AuthMiddleware();
