const expressHandler = require("express-async-handler");
const plantModel = require("../DB/models/plantModel");
const userModel = require("../DB/models/userModel");
const stripe = require('stripe')(process.env.STRIPEKEY);

// checks to see if the user exists in out DB when they are logged in.If not add them to the DB.
const verifyUserInDb = expressHandler(async (req,res,next) => {
  if(req.oidc.isAuthenticated()){
    const user = await userModel.findById(req.oidc.user.sub)
    if(!user) {
      const newUser = new userModel({
        _id: req.oidc.user.sub,
        name: req.oidc.user.name,
        email: req.oidc.user.email
      })
      await newUser.save()
      }
  }
  next();
})

// TODO Have to update this to check if the user has any items in the cart. 
// TODO If none render the index.html. If they have something in the cart render the index.ejs with all the items in the cart.
const getPage = expressHandler(async (req,res) => {
  if(req.oidc.isAuthenticated()) {
    const user = await userModel.findOne({_id: req.oidc.user.sub}).populate("cart.plant")
    if(user && user.cart.length > 0) {
      res.render('index.ejs', {isAuthenticated: req.oidc.isAuthenticated(), cart: user.cart})
    }
    else{
      // res.render('index.ejs', {isAuthenticated: req.oidc.isAuthenticated(), cart: user.cart })
      res.render('index.ejs', {isAuthenticated: req.oidc.isAuthenticated(), cart: [] })
    }
  }
  else{
    res.render('index.ejs', {isAuthenticated: req.oidc.isAuthenticated(), cart: [] })
  }
})

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
  console.log('req.params.id:', req.params.id)
  const plants = await plantModel.findById(req.params.id);
  if (!plants) {
    res.status(500).json({ message: `There are no plants with the id: ${req.params.id}` });
  }
  res.status(200).json(plants);
});

// Gets the user's cart and loads the cart
const getCart = expressHandler(async (req,res) => {
  const user = await userModel.findOne({_id:req.oidc.user.sub}).populate("cart");
  if(!user){
    res.status(404).json({message : "User not found"})
  }
  res.status(200).json(user.cart)
});

// This is for the Add to Cart button
const addItemToCart = expressHandler(async (req,res) => {
  const user = await userModel.findOne({_id:req.oidc.user.sub})
  if(!user){
    res.status(404).json({message : 'User not found'})
  }
  const plant = await plantModel.findById(req.params.id)
  if(!plant){
    res.status(500).json({message : `Plant not found with id ${req.params.id}`})
  }

  // Find the cart item with the same plant ID
  const cartItem = user.cart.find((item) => item.plant.toString() === plant._id.toString());

  // If the item is already in the cart, increment its quantity
  // Otherwise, add a new item with a quantity of 1
  if (cartItem) {
    cartItem.quantity++;
  } else {
    user.cart.push({ plant: plant._id, quantity: 1 });
  }
  await user.save()

  res.status(200).json({message: 'Item added to cart of', user})
})

// This is for the trash can icon button which will remove the item from the cart DB of the user
const removeItemFromCart = expressHandler(async (req,res) => {
  const user = await userModel.findOne({_id:req.oidc.user.sub})
  if(!user){
    res.status(404).json({message : "User not found"})
  }
  const plant = await plantModel.findById(req.params.id)
  if(!plant){
    res.status(500).json({message: `Plant not found with id ${req.params.id}`})
  }

  user.cart = user.cart.filter((item) => item.plant.toString() !== req.params.id)
  await user.save()

  res.status(200).json({message: "Item removed from cart of", user})
})

const decrementItemOnCart = expressHandler(async(req,res) => {
  const user = await userModel.findOne({_id:req.oidc.user.sub})
  if(!user){
    res.status(404).json({message : "User not found"})
  }
  const plant = await plantModel.findById(req.params.id)
  if(!plant){
    res.status(500).json({message: `Plant not found with id ${req.params.id}`})
  }

  const cartItem = user.cart.find((item) => item.plant.toString() === plant._id.toString());
  if(cartItem && cartItem.quantity > 1){
    cartItem.quantity--;
  }
  await user.save()
  res.status(200).json({ message: "Item quantity updated" });
})

const incrementItemOnCart = expressHandler(async(req,res) => {
  const user = await userModel.findOne({_id:req.oidc.user.sub})
  if(!user){
    res.status(404).json({message : "User not found"})
  }
  const plant = await plantModel.findById(req.params.id)
  if(!plant){
    res.status(500).json({message: `Plant not found with id ${req.params.id}`})
  }

  const cartItem = user.cart.find((item) => item.plant.toString() === plant._id.toString());
  if(cartItem && cartItem.quantity > 0){
    cartItem.quantity++;
  }
  await user.save()
  res.status(200).json({ message: "Item quantity updated" });
})

// TODO WORK ON THIS REQUEST
const checkout = expressHandler(async(req,res) => {
  const user = await userModel.findOne({_id: req.oidc.user.sub}).populate("cart.plant")
  if(!user){
    res.status(404).json({message : 'User not found'})
  }
  
  const line_items = user.cart.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.plant.name,
      },
      unit_amount: item.plant.price * 100,
    },
    quantity: item.quantity,
  }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      automatic_tax: {
        enabled: true,
      },    
      shipping_address_collection: {
        allowed_countries: ['US']
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {amount: 0, currency: 'usd'},
            display_name: 'Free shipping',
            delivery_estimate: {
              minimum: {unit: 'business_day', value: 3},
              maximum: {unit: 'business_day', value: 5},
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {amount: 1500, currency: 'usd'},
            display_name: 'Next day air',
            delivery_estimate: {
              minimum: {unit: 'business_day', value: 1},
              maximum: {unit: 'business_day', value: 1},
            },
          },
        },
      ],
      success_url: `${process.env.BASEURL}/order/success`,
      cancel_url:`${process.env.BASEURL}/`
    })

    res.status(200).json({url: session.url})
})

const successOrder = expressHandler(async(req,res) => {
  res.send(`<html><body><h1>Congratulations! Your order has been successfully processed and payment has been received. Thank you for choosing Plants A Plenty</h1></body></html>`);
})

//TODO Implement API Endpoints for orders (get (read), post (create), update (put))

module.exports = {
  getPage,
  postPlants,
  getAllPlants,
  updatePlant,
  deletePlant,
  getOnePlant,
  getCart,
  addItemToCart,
  removeItemFromCart,
  verifyUserInDb,
  decrementItemOnCart,
  incrementItemOnCart,
  checkout,
  successOrder,
};