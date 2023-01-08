



class usersQueriesClass{
    insertLogin = "INSERT INTO users(email, passwordhash) VALUES ($1, $2)";
    insertUserAfterOrder = "INSERT INTO users(email, passwordhash, session_id) VALUES ($1, $2, $3)";
    checkEmailExists = "SELECT email FROM users WHERE users.email = $1";
    getUserId = "SELECT id FROM users WHERE session_id = $1";
    checkPassword = "SELECT passwordhash FROM users WHERE users.email = $1";
}

class productsQueriesClass{
    getProductsData = "SELECT * FROM products";
    productData = "SELECT * FROM products WHERE products.product_name = $1";
    matchProductId = "SELECT * FROM products WHERE products.id = ANY ($1)";
}

class usersProductsQueriesClass{
    checkExists = "SELECT * FROM user_products WHERE user_products.product_id = $1";
    addOne = "UPDATE user_products SET quantity = $1";
}

class orderQueriesClass{
    insertOrder = "INSERT INTO orders(user_id, order_contents) VALUES ($1, $2)";
    retrieveCustomerOrder = "SELECT orders.order_contents FROM orders INNER JOIN users ON users.id = orders.user_id WHERE users.email = $1";
}

class sessionQueriesClass{
    checkSession = "SELECT * FROM session";
    addSessionCartItem = "UPDATE session SET sess = $1";
    fetchCookieSession = "SELECT * FROM session WHERE session.sid LIKE $1";
}

const sessionQueries = new sessionQueriesClass();
const usersProductsQueries = new usersProductsQueriesClass();
const usersQueries = new usersQueriesClass();
const productQueries = new productsQueriesClass();
const orderQueries = new orderQueriesClass();

module.exports = {
    sessionQueries,
    usersProductsQueries,
    usersQueries,
    productQueries,
    orderQueries
};
