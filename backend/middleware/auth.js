const admin = require('../config/firebase-admin');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split('Bearer ')[1];
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'Token não fornecido' 
            });
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Erro na autenticação:', error);
        res.status(401).json({ 
            success: false, 
            message: 'Token inválido' 
        });
    }
};

module.exports = authMiddleware; 