const { ValidationError, NotFoundError } = require('../errors');

function validateTitle(title) {
    if (!title) throw new ValidationError('Title is required');
    if (typeof title !== 'string') throw new ValidationError('Title must be a string');

    const trimmed = title.trim();

    if (trimmed.length === 0) throw new ValidationError('Title must not be empty');
    if (trimmed.length > 255) throw new ValidationError('Title must not exceed 255 characters');

    return trimmed;
}

function validateId(id) {
    if (!Number.isInteger(id) || id <= 0)
        throw new ValidationError(`Invalid task id: ${id}`);
}

function validateTask(task, id) {
    if (!task)
        throw new NotFoundError(`Couldn't find task with id: ${id}`);
}

function validateDone(done) {
    if (!typeof done === "boolean")
        throw new ValidationError(`couldn't change task status`);
}

module.exports = { validateTitle, validateId, validateTask, validateDone };