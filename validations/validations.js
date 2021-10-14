const validName = (displayName) => {
    const tamanho = displayName.length >= 8;
    const tipo = typeof displayName === 'string';
    if (tamanho && tipo) return true;
    return false;
};
const validEmail = (email) => {
    const emailRegex = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
    if (!emailRegex.test(email)) return false;
    return true;
};

const validPassword = (password) => {
    if (password.length >= 6) return true;
    return false;
};
const validLogin = (email, password, find) => {
    console.log(find.email === email && find.password === password);
    if (find.email === email && find.password === password) return true;
    return false;
};

module.exports = { validName, validEmail, validPassword, validLogin };