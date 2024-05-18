const adminController = {
    login: (req, res) => {
      const { email, password } = req.body;
      if (email === 'antony@gmail.com' && password === 'correctPassword') {
        res.json({ admin: true, token: 'adminToken' });
      } else {
        res.status(400).json({ error: 'Invalid email or password' });
      }
    },
  };
  
  module.exports = adminController;
  