const admin = require('../config/firebase-admin');

const protect = async (req, res, next) => {
    try {
        if (!req.headers.authorization?.startsWith('Bearer ')) {
            return res.status(401).json({ 
                success: false,
                message: 'Token de autenticação não fornecido' 
            });
        }

        const token = req.headers.authorization.split('Bearer ')[1];
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Erro na autenticação:', error);
        res.status(401).json({ 
            success: false,
            message: 'Não autorizado, token inválido' 
        });
    }
};

module.exports = { protect }; 