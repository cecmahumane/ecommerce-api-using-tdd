const insertLogin = "INSERT INTO users(email, passwordhash) VALUES ($1, $2)";
const checkEmailExists = "SELECT email FROM users WHERE users.email = $1";
const getProductsData = "SELECT * FROM products";
const productData = "SELECT * FROM products WHERE products.product_name = $1";

module.exports = {
    insertLogin,
    checkEmailExists,
    getProductsData,
    productData
}