const validationMiddleware = (req, res, next) => {
    console.log('Request validated');
    next();
  };
  
module.exports = validationMiddleware;
