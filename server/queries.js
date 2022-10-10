



class usersQueriesClass{
    insertLogin = "INSERT INTO users(email, passwordhash) VALUES ($1, $2)";
    checkEmailExists = "SELECT email FROM users WHERE users.email = $1";
    
}

class productsQueriesClass{
    getProductsData = "SELECT * FROM products";
    productData = "SELECT * FROM products WHERE products.product_name = $1";
    productId = "SELECT products.id FROM products WHERE products.product_name = $1";
}

class usersProductsQueriesClass{
    checkExists = "SELECT * FROM user_products WHERE user_products.product_id = $1";
    addOne = "UPDATE user_products SET quantity = $1";
}


class sessionQueriesClass{
    checkSession = "SELECT * FROM session";
}

const sessionQueries = new sessionQueriesClass();
const usersProductsQueries = new usersProductsQueriesClass();
const usersQueries = new usersQueriesClass();
const productQueries = new productsQueriesClass();


module.exports = {
    sessionQueries,
    usersProductsQueries,
    usersQueries,
    productQueries
};
