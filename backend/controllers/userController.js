const admin = require('../config/firebase-admin');
const db = admin.firestore();

// Registrar usuário
exports.registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const userRecord = await admin.auth().createUser({
            email,
            password
        });

        await db.collection('users').doc(userRecord.uid).set({
            email,
            role: 'user',
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        res.status(201).json({
            success: true,
            message: 'Usuário criado com sucesso',
            uid: userRecord.uid
        });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(400).json({ 
            success: false,
            message: error.message 
        });
    }
};

// Deletar usuário
exports.deleteUser = async (req, res) => {
    try {
        const { uid } = req.params;
        
        await admin.auth().deleteUser(uid);
        await db.collection('users').doc(uid).delete();

        res.json({ 
            success: true,
            message: 'Usuário deletado com sucesso' 
        });
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(400).json({ 
            success: false,
            message: error.message 
        });
    }
};

// Obter perfil do usuário
exports.getUserProfile = async (req, res) => {
    try {
        const userDoc = await db.collection('users')
            .doc(req.user.uid)
            .get({ source: 'cache' });

        if (!userDoc.exists) {
            return res.status(404).json({ 
                success: false,
                message: 'Usuário não encontrado' 
            });
        }

        res.json({
            success: true,
            data: userDoc.data()
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

exports.login = async (req, res) => {
  try {
    const { token } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    req.session.userId = decodedToken.uid;
    req.session.email = decodedToken.email;
    
    res.json({ 
      success: true, 
      message: 'Login realizado com sucesso' 
    });
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: error.message 
    });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.json({ 
    success: true, 
    message: 'Logout realizado com sucesso' 
  });
}; 