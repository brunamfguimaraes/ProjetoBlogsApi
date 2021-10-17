// Requisições que precisam de token mas não o receberam devem retornar um código de status 401;

// Requisições que não seguem o formato pedido pelo servidor devem retornar um código de status 400;

// Um problema inesperado no servidor deve retornar um código de status 500;

// Um acesso ao criar um recurso, no nosso caso usuário ou post, deve retornar um código de status 201.

const statusCode = {
    TOKEN_INVALID: 401,
    WRONG_FORMAT: 400,
    CREATED: 201,
    CONFLICT: 409,
    OK: 200,
};

const message = {
    DISPLAY_NAME_TOO_SHORT: '"displayName" length must be at least 8 characters long',
    INVALID_EMAIL: '"email" must be a valid email',
    EMAIL_NOT_EXISTS: '"email" is required',
    PASSWORD_TOO_SHORT: '"password" length must be 6 characters long',
    PASSWORD_NOT_EXISTS: '"password" is required',
    USER_REGISTERED: 'User already registered',
    EMAIL_EMPTY: '"email" is not allowed to be empty',
    PASSWORD_EMPTY: '"password" is not allowed to be empty',
    TOKEN_NOT_EXISTS: 'Token not found',
    INVALID_TOKEN: 'Expired or invalid token',
    NAME_NOT_EXISTS: '"name" is required',
    USER_EXISTS: 'User already registered',
    INVALID_FIELDS: 'Invalid fields',
};

module.exports = {
    statusCode,
    message,
};