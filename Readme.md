# Meals Web App


Meals Web App is a meal tracker app in which user can keep the track of his daily meals. Users can add meals along with it's calories and can select the date on which they want to consume that meal. It helps the users to keep their diet healthy and mantain their calorie levels on the daily basis. Users can also edit and delete their already added meals. It has a good UI to view all the added meals. All the meals are gouped by their date of consuming so that they are easily distinguishable, accessible and searchable.

### Design

  - Welcome page has a navigation bar to navigate to login and signup page.
  - After signing in, all the added meals are displayed using Accordion in the home page.
  - Home page has a navigation bar which shows who is logged in and can also sign out using it.
  - A message "No meals added. Add meals to continue" is displayed if no meals have been added.
  - Colour of the meals turns red if the total calories of that day is greater than or equal to 2000.
  - Colour of the meals turns green if the total calories of that day is less than 2000.
  - Background of the full app is the beautifull image of the healthy meals.

### Folder Structure
 
 Following is the Directory structure of Meal web app.
 
 ```
Meals web app
├── Routes
│   └── Router.js               #Server Routes
├── Client
│   └── src
│   │   ├── Components          #React Components
│   │   │   ├─ AccordionForMeals.js        #To display meals 
│   │   │   ├─ Home.js                      #Home Page
│   │   │   │─HomeNav.js
│   │   │   │─Navbar.js.js          #To navigate between login and signup page
│   │   │   │─Login.js              #To authenticate
│   │   │   │─Signup.js.js          #To register
│   │   │   │─Welcome.js            #Welcome Page
│   │   │   └── Course
│   │   │─ Validation 
│   │   │   │─Validations.js        #Email format verification
│   │   │         
│   │   │─index.js
│   │   └── App.js
│   │
│   │└── public
│   │       │─ index.html
│──  Model
│       │─ db.js                #Server Mongodb Database
│
│── server.js                   #Node Server
```


### Todos

* Calorie level should not be fixed to 2000.
* User's bio data should also be added which can be used to calculate mantainance calories.
* User should be able to select a meal from given meals in which calories are already calculated.
* Notifications should be send to remind the user of his daily meals.

### Installation

Meal web app requires [Node.js](https://nodejs.org/) , [Express.js](https://expressjs.com/), [MongoDb](https://www.mongodb.com/), and [React.js](https://reactjs.org/) to execute the code.

Install the dependencies and start the server.

```sh
$ npm install
$ node server
```

For production environments...

```sh
$ NODE_ENV=production 
$ node server
```
