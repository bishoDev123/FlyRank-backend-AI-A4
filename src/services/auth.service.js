const { supabase } = require('../util/supabase');
const { validateCredentials, checkSuccess } = require('../util/validate');
const { AuthError } = require('../errors');

async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    checkSuccess(error);

    validateCredentials(email, password);

    return data;
}

async function login(email, password) {
    validateCredentials(email, password);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    checkSuccess(error);

    const accessToken = data.session.access_token;
    const refreshToken = data.session.refresh_token;

    return {
        accessToken,
        refreshToken
    };
}

function getToken(authHeader) {
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1];
    } else {    
        throw new AuthError('Access token required');
    }
}

module.exports = { signUp, login, getToken };