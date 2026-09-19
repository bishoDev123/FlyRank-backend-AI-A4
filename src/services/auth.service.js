const { supabase } = require('../util/supabase');
const { validateCredentials, checkSuccess, validateToken, checkUser } = require('../util/validate');
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

async function getProfile(authHeader) {
    const token = validateToken(authHeader);

    const { data, error } = await supabase.auth.getUser(token);
    checkSuccess(error);
    checkUser(data);
    
    return data;
}

module.exports = { signUp, login, getProfile };