# CLI_CollaborativeOrderManagement

This app is made to make online groceries orders easier for families. 1 person is in charge of the order (order manager) and others can add articles to the order. 

The app is composed of 3 files :
 - app.sql creates and initialize Order and Catalogue tables.
 - orderUser.js allows to see the current order OR to add new items to the order from the catalogue.
 - orderManager allows to see the current order, to delete items from It, and to modify quantities.


How to use :
  Install dependencies (mysql, inquierer, chalk, cli-table3)
  Add .sql file to your mysql
  execute : node [js file] 
 

Demo : 

orderUser :

![5hafkz](https://user-images.githubusercontent.com/59146778/126661084-e3e47092-2f20-4727-bb02-e7704f01e23c.gif)



orderManager :

![5hagwa](https://user-images.githubusercontent.com/59146778/126661702-eeac901c-7982-4078-9155-9c8548fd0144.gif)


