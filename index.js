const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: 'Spanish Tortilla',
      level: 'Easy Peasy',
      ingredients: ['4 Potatoes', '6 Eggs', '1 Small Onion, 2 Cups of Olive Oil', 'Salt'],
      cuisine: 'Spanish',
      dishType: 'main_course',
      image: 'https://www.recetasderechupete.com/wp-content/uploads/2020/11/Tortilla-de-patatas-4.jpg',
      duration: 45,
      creator: 'Mikel López Iturriaga'
    });
  })
  .then((recipe) => {
    console.log('Created a recipe: ', recipe);
    return Recipe.insertMany(data);
  })
  .then((recipes) => {
    console.log('Created multiple recipes: ', recipes);
    return Recipe.find({}).select('title');
  })
  .then((names) => {
    console.log(names);
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true });
  })
  .then((recipe) => {
    console.log('Recipe was updated: ', recipe);
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then((recipe) => {
    console.log('Recipe was removed: ', recipe);
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Disconnected from MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
