const admin = require('../config/firebase-admin');

const protect = async (req, res, next) => {
  try {
    // Verifica primeiro a sessão
    if (req.session.userId) {
      req.user = { uid: req.session.userId };
      return next();
    }

    // Se não houver sessão, verifica o token
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Não autorizado' 
      });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    
    // Cria a sessão após verificar o token
    req.session.userId = decodedToken.uid;
    req.session.email = decodedToken.email;
    
    next();
  } catch (error) {
    console.error('Erro na autenticação:', error);
    res.status(401).json({ 
      success: false, 
      message: 'Token inválido' 
    });
  }
};

module.exports = { protect }; 