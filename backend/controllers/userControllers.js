// backend/controllers/userController.js
exports.getAllUsers = (req, res) => {
    res.send('Lista de todos os usuários');
  };
  
  exports.createUser = (req, res) => {
    const newUser = req.body;
    res.status(201).send(`Usuario criado: ${newUser.name}`);
  };
  