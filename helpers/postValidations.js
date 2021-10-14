const titleValidate = (title) => {
  if (!title) {
    return { isError: true, message: '"title" is required' };
  }
  
  return { isError: false, message: 'ok' };
};

const contentValidate = (content) => {
  if (!content) {
    return { isError: true, message: '"content" is required' };
  }
  
  return { isError: false, message: 'ok' };
};

const categoryIdsValidate = (id) => {
  if (!id) {
    return { isError: true, message: '"categoryIds" is required' };
  }
  
  return { isError: false, message: 'ok' };
};

module.exports = {
  titleValidate,
  contentValidate,
  categoryIdsValidate,
};
