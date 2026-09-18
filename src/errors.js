class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Validation error';
    }
}

module.exports = {NotFoundError, ValidationError};