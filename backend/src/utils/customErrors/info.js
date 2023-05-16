export const generateProductErrorInfo = (product) => {
    const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category', 'thumbnails'];
    const missingFields = requiredFields.filter((field) => !product[field]);
    const fieldDescriptions = {
        title: 'Formato requerido: "String"',
        description: 'Formato requerido: "String"',
        code: 'Formato requerido: "String"',
        price: 'Formato requerido: "Number"',
        stock: 'Formato requerido: "Number"',
        category: 'Formato requerido: "String"',
        thumbnails: 'Formato requerido: "Array"'
    };
    const missingFieldsInfo = missingFields
        .map((field) => ` * ${field}: ${fieldDescriptions[field]}`)
        .join('\n');
    const errorMessage = `Una o más campos están incompletos. Campos requeridos faltantes:${missingFieldsInfo}`;
    return errorMessage;
};

export const generateUserErrorInfo = (user) => {
    const requiredFields = ['first_name', 'last_name', 'email', 'age', 'password'];
    const missingFields = requiredFields.filter((field) => !user[field]);
    const fieldDescriptions = {
        first_name: 'Formato requerido: "String"',
        last_name: 'Formato requerido: "String"',
        email: 'Formato requerido: "String"',
        age: 'Formato requerido: "Number"',
        password: 'Formato requerido: "String"'
    };
    const missingFieldsInfo = missingFields
        .map((field) => ` * ${field}: ${fieldDescriptions[field]}`)
        .join('\n');
    const errorMessage = `Una o más campos están incompletos. Campos requeridos faltantes:${missingFieldsInfo}`;
    return errorMessage;
}

export const generateQuantityErrorInfo = (quantity, stock) => {
    return `El producto no tiene suficiente stock.
    Cantidad ingresada: ${quantity}.
    Stock disponible: ${stock}`
}
