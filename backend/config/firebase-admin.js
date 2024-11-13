const admin = require("firebase-admin");

try {
    if (!admin.apps.length) {
        const serviceAccount = require('./firebase-key.json');
        
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        
        console.log('Firebase Admin inicializado com sucesso!');
    }
} catch (error) {
    console.error('Erro ao inicializar Firebase Admin:', error);
    process.exit(1);
}

module.exports = admin; 