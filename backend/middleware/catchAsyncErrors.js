//catches the errors of asyc Once you have the async keyword, you can await something immediately in your code for the  request handlers

module.exports = (theFunc) => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };