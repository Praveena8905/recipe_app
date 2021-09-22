## Vegan recipes app

Your task is to build a vegan recipe app to create and view recipes. You should use React or React Native in the frontend, and Node.js and MongoDB on the backend. Please add tests for the backend and frontend.

### Features:

- A user should be able to create, view, update and delete recipes.
- Each recipe must have a title, image, list of ingredients and instructions.
- Ingredients should exist as a combination of two fields - name and amount.
- The instructions for the recipe should be divided into steps.

### Bonus:

- Add one extra feature to highlight your expertise: search, authentication, sharing recipes, or any other you can think of.
- Make it visually appealing.
- Make it available to test at a hosted domain (Heroku/Vercel/AWS/etc).

### Limitations/Assumptions:

- Recipe name should be a single word and unique(No duplicate recipe names allowed).
- Updating ingredients only add at the end of the ingredient list
- Updating instructions only add at the end of the instruction list

## High Level Architecture

![](images/high-level-architecture.png)

## How to start Server:

Make sure that Mongo DB database is up and running.
I deployed this server on [Heroku](http://chrecipeserver.herokuapp.com). You can directly integrate in your application if needed.

1. Navigate to the `server` folder from the project root folder `recipe_app`
2. Run `npm install` to install all dependencies
3. Run `npm run server.js` to start the server

## How to start Web App:

1. Navigate to the `webui` folder from the project root folder `recipe_app`
2. Run `npm install` to install all dependencies
3. Run `npm start` to start Web App server
