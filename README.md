# **weather journal app**

## Table of Contents
> over view
> structure
> description of javaScript
> description of server.js

### over view
In this project `weather journal app` i will build an amazing ui and dynamically update it.
in main page you will find a search field and button.
when you search with zip code and press search button you will add a card to the page with the content of the result of your search.


### structure
  - node_modules
  - website
    - index.html 
    - style.css
    - app.js
  - package-lock.json
  - package.json
  - README.md
  - server.js


### description of javaScript function
`createHolder` crete an div with class name holder and add counter, date, temperature, feeling
`postData` make a request to server to with some data
`UpdateUI` update ui every time press search button with new data searched
`getDataFromApi` make an api request to get data from api with zip code
`getDataFromserver` make a request to server to get all data stored in it

### description of server.js function
install some packages like `express` `body-parser` `cors`
configuring express to use body-parser as middle-ware
Initialize the main project folder
two routes 
  - get all data with get request
  - add new item with post request