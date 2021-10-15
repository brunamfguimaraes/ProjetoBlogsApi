const { Category } = require('../models');

const ValidTitle = async (req, res, next) => {
    const { title } = req.body; 

    if (!title) { 
        return res.status(400).json({ message: '"title" is required' }); 
    }    
    next();
};

const ValidContent = async (req, res, next) => {
    const { content } = req.body; 

    if (!content) { 
        return res.status(400).json({ message: '"content" is required' }); 
    }    
    next();
};

const ValidCategoryIds = async (req, res, next) => {
    const { categoryIds } = req.body; 

    if (!categoryIds || categoryIds.length === 0) { 
        return res.status(400).json({ message: '"categoryIds" is required' }); 
    }    
    next();
};

const ValidCategoryIdsExist = async (req, res, next) => {
    const { categoryIds } = req.body; 

    const category = await Category.findAll();
    console.log(category.id);

    // Lógica feita com ajuda da Alessandra Rezende
    const verificacao = categoryIds.every((data1) => category
    .some((data2) => data1 === data2.id)); 

    if (!verificacao) {
        res.status(400).json({ message: '"categoryIds" not found' });
    }
    next();
};
 
module.exports = {
    ValidTitle,
    ValidContent,
    ValidCategoryIds,
    ValidCategoryIdsExist,
};