DROP DATABASE IF EXISTS CLI_COM;
CREATE DATABASE CLI_COM;
USE CLI_COM;

CREATE TABLE products (
	item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100),
  price INT,
  quantity INT,
  primary key (item_id)
);

insert into products (product_name, price, quantity)
values ('Cereales Crunch',3.50, 1);

insert into products (product_name, price, quantity)
values ('Chocolat noir',2.50, 2);

insert into products (product_name, price, quantity)
values ('Boite de 6 oeufs bio',5, 2);

insert into products (product_name, price, quantity)
values ('Steack Hachés 5% x4',5.30, 1);

insert into products (product_name, price, quantity)
values ('Cordons bleus format familial',6, 1);

insert into products (product_name, price, quantity)
values ('Pack bieres *12',8.50, 1);

insert into products (product_name, price, quantity)
values ('Pates 500g',1.50, 4);

insert into products (product_name, price, quantity)
values ('Sauce tomate',2.50, 2);


select * from products;
select SUM(products.price) AS somme from products;
