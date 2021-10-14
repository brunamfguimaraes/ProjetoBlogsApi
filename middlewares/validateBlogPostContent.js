module.exports = (req, _res, next) => {
  const { content, title, categoryIds } = req.body;

  if (!title) { 
    return next({ code: 'BAD_REQUEST', message: '"title" is required' });
  }

  if (!content) { 
    return next({ code: 'BAD_REQUEST', message: '"content" is required' });
  }

  if (!categoryIds) { 
    return next({ code: 'BAD_REQUEST', message: '"categoryIds" is required' });
  }

  return next();
};
