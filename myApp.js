require('dotenv').config();
// Exercise one, import mongoose and connect to db
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({
    name: 'Mathew',
    age: 12,
    favoriteFoods: ['Salchi papa', 'Pollo asado']
  })
  person.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
  /** Test */
  // person.save(function(err, data) {
  //   if (err) return console.error(err);
  //   console.log("Persona creada con exito")
  // });
  /** End test */
};

/** Test */
// createAndSavePerson();
/** End test */

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, function(err, data) {
    if (err) return console.error(err);
    
    data.favoriteFoods.push(foodToAdd)    
    let person = new Person(data)
    
    person.save(function(err, data) {
      if (err) return console.error(err);
      done(null, data)
    });
  });
  /** Test */
  // Person.findById({_id: "642ef9b2ade3be727078845e"}, function(err, data) {
  //   if (err) return console.error(err);
  //   console.log("La persona es: ", data)
  //   if (data) {
  //     data.favoriteFoods.push(foodToAdd)
  //     console.log("Se añadio: ", data.favoriteFoods[data.favoriteFoods.length - 1] )
  //     console.log("Nueva persona: ", data)
  //   }
  //   // done(null, data)
  // });
  /** End test */
};

/** Test */
// findEditThenSave();
/** End test */

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  })
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
