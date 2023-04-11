const expressHandler = require("express-async-handler");
const plantModel = require("../db/models/plantModel");
const path = require("path");

// TODO Have to update this to check if the user has any items in the cart. 
// TODO If none render the index.html. If they have something in the cart render the index.ejs with all the items in the cart.
const getPage = expressHandler(async (req, res) => {
  // if(req.oidc.isAuthenticated){
  //   res.sendFile(path.join(__dirname, "..", "index.html"));
  // }
  // else {
    res.render('index.ejs', {isAuthenticated: req.oidc.isAuthenticated()})
  // }
});

const getAllPlants = expressHandler(async (req, res) => {
  const plants = await plantModel.find({});
  if (!plants) {
    res.status(500).json({ message: "There are no plants in the DB" });
  }
  res.status(200).json(plants);
});

const postPlants = expressHandler(async (req, res) => {
  const plants = await plantModel.create({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    price: req.body.price,
  });

  if (!plants) {
    res.status(500).json({ error: "Plant was not created" });
  }
  res.status(200).json(plants);
});

const updatePlant = expressHandler(async (req, res) => {
  const plant = await plantModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      price: req.body.price,
    },
    {
      new: true,
    }
  );

  if (!plant) {
    res.status(500).json({ message: `Plant not found for id: ${req.params.id}` });
  }
  res.status(200).json(plant);
});

const deletePlant = expressHandler(async (req, res) => {
  const plant = await plantModel.findByIdAndDelete(
    req.params.id,
    {
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      price: req.body.price,
    },
    {
      new: true,
    }
  );

  if (!plant) {
    res.status(500).json({ message: `Plant not found for id: ${req.params.id}` });
  }
  res.status(200).json(plant);
});

const getOnePlant = expressHandler(async (req, res) => {
  const plants = await plantModel.findById(req.params.id);
  if (!plants) {
    res.status(500).json({ message: `There are no plants with the id: ${req.params.id}` });
  }
  res.status(200).json(plants);
});

//TODO Create API Endpoints for user authntication (sign up, log in, log out, pw reset)
//TODO Implement API Endpoints for orders (get (read), post (create), update (put))

module.exports = {
  getPage,
  postPlants,
  getAllPlants,
  updatePlant,
  deletePlant,
  getOnePlant,
};