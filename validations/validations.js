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
const validCategoryId = (categoryIds, categorys) => {
    let count = 0;
    categoryIds.forEach((categoryId) => {
        categorys.forEach((category) => {
            if (category.dataValues.id === categoryId) {
                count += 1;
            }
        });
    });
    return count;
};
const validPost = (post, categorys) => {
    const { title, content, categoryIds } = post;
    // console.log(categorys);
    // console.log('categoryPOst', categoryIds);
    if (!title) return '"title" is required';
    if (!content) return '"content" is required';
    if (!categoryIds) return '"categoryIds" is required';
    const count = validCategoryId(categoryIds, categorys);
     console.log(count);
    if (count !== categoryIds.length) {
        return '"categoryIds" not found';
    }

    return true;
};

module.exports = { validName, validEmail, validPassword, validLogin, validPost };