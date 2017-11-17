DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;


CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Item1", "Depart1", 1, 1), ("Item2", "Depart2", 2, 2), ("Item3", "Depart3", 3, 3),  ("Item4", "Depart4", 4, 4), ("Item5", "Depart5", 5, 5),  ("Item6", "Depart6", 6, 6), ("Item7", "Depart7", 7, 7), ("Item8", "Depart8", 8, 8), ("Item9", "Depart9", 9, 9), ("Item10", "Depart10", 10, 10);