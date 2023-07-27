class notAuthorizedErr extends Error {
  constructor(message, status) {
    super(message);
    this.message = message;
    this.description = 'Authorithation Error'
    this.status = status || 401;
  }
}

class validationErr extends Error {
  constructor(message, description) {
    super(message, description)
    this.message = message;
    this.description = description;
    this.status = 401
  }
}

module.exports = {notAuthorizedErr, validationErr}