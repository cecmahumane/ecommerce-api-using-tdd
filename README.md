<p align="center">
  <a href="https://ecommerce.cecilmahumane.com" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">Codecademy E-Commerce API</h3>

<div align="center">

  [![GitHub Issues](https://img.shields.io/github/issues/cecmahumane/ecommerce-api-using-tdd)](https://github.com/cecmahumane/ecommerce-api-using-tdd/issues)
  [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/cecmahumane/ecommerce-api-using-tdd)](https://github.com/cecmahumane/ecommerce-api-using-tdd/pulls)

</div>

---

<p align="center"> This project is a simple e-commerce API that allows basic CRUD functionality on products, user accounts user carts and orders.
    <br> 
</p>

## 📝 Table of Contents
- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>
The purpose of this project is to build an e-commerce REST API using our knowledge of server side development.

This project required that I build a fully-functioning e-commerce application REST API that allows users to perform various CRUD operations such as registering an account, signing in, browsing products for sale, making orders, and checking their order history.

## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for the link to the live application.

### Prerequisites
Before doing anything remember to install all the dependencies using

```
npm install
```

### Setting up environment variables, Opening the App and Testing Suite

Firstly to avoid having server and front end connection errors you will need add a .env file in the root folder of the React App. Your environment variable for the React App should take this format:

```
REACT_APP_ORIGIN=http://localhost:5000
```

Secondly to connect to your PostgreSQL Database you will then want to create another .env file inside the server folder. The .env file should contain the following environment variables in this format, but please note that where (*) are used represent your own unique PostgreSQL databse credentials: 

```
USER=*****
PASSWORD=*****
HOST=*****
DBPORT=****
DATABASE=ecommerceapi
```

You will then need to get the server and the React App up and running. These are set to open simultaneously as per the npm concurrently package. 

```
npm run dev
```

Then to get Cypress testing suite running you will need to run

```
npx cypress open
```

## 🔧 Running the tests <a name = "tests"></a>

### Example end to end tests
This is an end-to-end test describing the process of a new user creating a new login and adding their credentials, if unique, to the databse. This is a great test to implement as it tests the flow of a user on the happy path, also known as the path which results in a positive result, not only engaging with the front end, but sending a POST request to the server and entering their unique credentials into the databse. This is an excellent test to see if the backend and frontend are working correctly. 

```
describe('Operations on user accounts', () => {
  it('Register for account', () => {
    cy.visit('http://localhost:3000')

    cy.get("[data-test='accounts-image']")
      .should('be.visible')

    cy.get('[data-test="accounts-image"]')
      .click();

    cy.get('[data-test="login"]')
      .contains('No account? Register here');

    cy.get('[data-test="no-account"]')
      .click();

    cy.get("[data-test='register']")
      .contains('Register')

    cy.get('[data-test="email"]')
      .type('JohnDoe@JDmail.com');

    cy.get('[data-test="password"]')
      .type('123456');

    cy.get('[data-test="confirmpassword"]')
      .type('123456');
    
    cy.get('[data-test="register-button"]')
      .click();
    
    cy.get('[data-test="login"]')
      .contains('Welcome');
  })
})
```

### And component tests
These tests test the functionality of the components and the functionality surrounding the happy path. These may also test the "sad paths" also known as the cases where the registration was not able to be completed. Completion of the regisstration can be halted to due to a variety of factors such as incorrect format of email addresses, non-matching passwords or trying to register with an email that already exists.

```
describe('Register button functionality', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080)
        cy.mount(<Router>
                    <Register />
                </Router>)
    })
    it('Register button sends user info', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:5000/api/profile',
            body: {
                email: 'JohnDoe@jdmail.com',
                password: '123456',
                confirmPassword: '123456'
            }
        }).then( profile => {
            expect(profile.status).to.eq(200)
        })
    })
  })
```

## 🎈 Usage <a name="usage"></a>
Feel free to click through the e-commerce store like you would any online shop. You can make orders and see your order history if you sign in after the checkout process.

Please note that is a demonstration project only, and no personal data such as real credit card information or email addresses should be entered into the checkout form. 

To proceed through the checkout flow enter your credentials as described below:
```
Email: Enter a valid email address
Credit card number: 4242424242424242
Expiry: 12/34
CVC: 123
Name on card: Enter a name
Country: Canada
Postal Code: Enter a valid postal code
```

## 🚀 Deployment <a name = "deployment"></a>
The app is live here [https://ecommerce.cecilmahumane.com](https://ecommerce.cecilmahumane.com). This app was deployed using Dokku and AWS. 

## ⛏️ Built Using <a name = "built_using"></a>
- [PostgreSQL](https://www.postgresql.org/) - Database
- [ExpressJs](https://expressjs.com/) - Server Framework
- [ReactJs](https://reactjs.org/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Cypress](https://www.cypress.io/) - Testing Suite

## ✍️ Authors <a name = "authors"></a>
- [@cecmahumane](https://github.com/cecmahumane) - Idea & Initial work

## 🎉 Acknowledgements <a name = "acknowledgement"></a>
- Michael Wiltfong
- Frank Davies
- @crespo from the Remix discord