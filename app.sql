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

CREATE TABLE catalogue (
	item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100),
  price INT,
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



insert into catalogue (product_name, price)
values ('Cereales Crunch',3.50);

insert into catalogue (product_name, price)
values ('biscuits apéritifs',2.50);

insert into catalogue (product_name, price)
values ('sangria 1.5L',4.50);

insert into catalogue (product_name, price)
values ('Pot de Nutella',3.50);

insert into catalogue (product_name, price)
values ('Café',3.20);

insert into catalogue (product_name, price)
values ('Gel douche',1.50);

insert into catalogue (product_name, price)
values ('Dentifrice',2.50);

insert into catalogue (product_name, price)
values ('Brosse à dents',2.50);

insert into catalogue (product_name, price)
values ('Shampoing',3.50);

insert into catalogue (product_name, price)
values ('Riz 1kg',1.50);

insert into catalogue (product_name, price)
values ('Pommes de terre 2kg',2.40);

insert into catalogue (product_name, price)
values ('Bananes',3.50);

insert into catalogue (product_name, price)
values ('Frites',2.70);

insert into catalogue (product_name, price)
values ('Ketchup',2.50);

insert into catalogue (product_name, price)
values ('Lait 6L',5);


select * from products;
select SUM(products.price) AS somme from products;
