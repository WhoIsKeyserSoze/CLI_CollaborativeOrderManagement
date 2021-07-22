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
 
