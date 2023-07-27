const {notAuthorizedErr, validationErr} = require('../helpers/errors');

const errorMiddleware = (err, req, res, next) => {
  console.log('ОШИБКА в errorMiddleware');
  // console.log('notAuthorizedErr', notAuthorizedErr);
  // console.log(`err instanceof notAuthorizedErr? ${notAuthorizedErr instanceof Error}`);
const {description, message, status} = err
  if (err instanceof validationErr || err instanceof notAuthorizedErr) {
    res.status(status).json({ message, status, description });
  } else {
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
  // Вызов next() не требуется, так как обработка запроса завершается здесь
};

module.exports = {errorMiddleware}