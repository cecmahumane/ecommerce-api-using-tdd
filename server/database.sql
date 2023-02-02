CREATE DATABASE ecommerceapi;

CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255), 
    passwordhash VARCHAR(255),
    order_id VARCHAR (255)    
);

CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255),
    product_description VARCHAR(1000),
    unit_price numeric,
    quantity_small numeric,
    quantity_med numeric,
    quantity_large numeric,
    image1 VARCHAR(255),
    image2 VARCHAR(255),
    image3 VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS orders(
  id SERIAL PRIMARY KEY,
  order_contents VARCHAR(1000),
  user_id INT,
  CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");


INSERT INTO products(product_name, unit_price, quantity_small, quantity_med, quantity_large, image1, image2, image3)
VALUES ('T-Shirt', 35, 25, 25, 25, '/images/Tshirt.jpg', '/images/Greytshirt.png', '/images/Cart-sized-tshirt.png');
INSERT INTO products(product_name, unit_price, quantity_small, quantity_med, quantity_large, image1, image2, image3)
VALUES ('Hoodie', 49, 25, 25, 25, '/images/Hoodie.jpg', '/images/Greyhoodie.png', '/images/Cart-sized-hoodie.png');   
INSERT INTO products(product_name, unit_price, quantity_small, quantity_med, quantity_large, image1, image2, image3)
VALUES ('Hat', 30, 25, 25, 25, '/images/Hat.jpg', '/images/Greyhat.png', '/images/Cart-sized-hat.png');
INSERT INTO products(product_name, unit_price, quantity_small, quantity_med, quantity_large, image1, image2, image3)
VALUES ('Mug', 20, 25, 25, 25, '/images/Mug.jpg', '/images/Greymug.png', '/images/Cart-sized-mug.png');


UPDATE products SET product_description ='<h2 data-test="title">Classic</h2>
                                          <p data-test="price">$35.00</p>
                                          <p data-test="p1">So classy it hurts.</p> 
                                          <p data-test="p2">100% combed ring-spun cotton</p> 
                                          <p data-test="p3">Printed on Next Level garment</p> 
                                          <p data-test="p4">Pre-shrunk</p> 
                                          <p data-test="p5">Tear-away label</p>'
WHERE product_name = 'T-Shirt';
UPDATE products SET product_description ='<h2 data-test="title">Hoodie</h2>
                                          <p data-test="price">$49.00</p>
                                          <p data-test="p1">Comfy. Cozy.</p> 
                                          <p data-test="p2">100% California fleece cotton</p> 
                                          <p data-test="p3">Super sweet drawstrings</p> 
                                          <p data-test="p4">Raglan sleeves</p> 
                                          <p data-test="p5">Front pouch pocket</p>'
WHERE product_name = 'Hoodie';
UPDATE products SET product_description ='<h2 data-test="title">5-Panel Hat</h2>
                                          <p data-test="price">$30.00</p>
                                          <p data-test="p1">Wear it forwards, backwards, or sideways. Just make sure you wear it.</p> 
                                          <p data-test="p2">Five-panel, low-profile cap</p> 
                                          <p data-test="p3">100% cotton</p> 
                                          <p data-test="p4">Nylon strap clip closure</p> 
                                          <p data-test="p5">One size fits all</p>'
WHERE product_name = 'Hat';
UPDATE products SET product_description ='<h2 data-test="title">Decaf</h2>
                                          <p data-test="price">$20.00</p>
                                          <p data-test="p1">You know the deal everyone - be caffeinated, be hydrated, peace out everyone.</p> 
                                          <p data-test="p2">Ceramic</p> 
                                          <p data-test="p3">11oz mug</p> 
                                          <p data-test="p4">Dishwasher Safe</p> 
                                          <p data-test="p5">Microwave Safe</p>'
WHERE product_name = 'Mug';