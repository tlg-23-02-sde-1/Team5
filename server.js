const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const env = require('dotenv').config()
const path = require('path')
const PORT = process.env.PORT
const ejs = require('ejs')
const plantModel = require('./models/plantModel')
const userModel = require('./models/userModel')
const orderModel = require('./models/orderModel')


mongoose.connect('mongodb+srv://Plants-A-Plenty-DB-J:pibZrU3zLqS5thwB@plantsaplentydb.nysaty2.mongodb.net/?retryWrites=true&w=majority')
    .then( () => {
        console.log('Established connection with the DB')

        app.set('view engine','ejs')

        app.use(bodyParser.urlencoded({ extended: true }))
        
        app.use(bodyParser.json())

        app.use(express.static('public'))
        
        app.listen(PORT, ()=> {
            console.log("Port Connected");
        })
        
        //TODO Create API Endpoints for user authntication (sign up, log in, log out, pw reset)
        //TODO Develop API Endpoints for plant products (get, post, update, delete)
        //TODO Implement API Endpoints for orders (get (read), post (create), update (put))

        app.get('/', async (req, res) => {
            try{
                res.sendFile(path.join(__dirname, 'index.html'))
                // res.status(200).json({message: 'Should get this'})
            }
            catch(error) {
                res.status(500).json({message: error.message})
            }
        })

        app.post('/', async (req,res) => {
            try{
                res.status(200).json({message: 'Should still get this'})
            }
            catch(error) {
                res.status(500).json({message: error.message})
            }
        })

        app.delete('/', async (req,res) => {
            try{
                res.status(200).json({message: 'Should still get this'})
            }
            catch(error) {
                res.status(500).json({message: error.message})
            }
        })

        app.put('/', async (req,res) => {
            try{
                res.status(200).json({message: 'Should still get this'})
            }
            catch(error) {
                res.status(500).json({message: error.message})
            }
        })
    })
    .catch(error => console.error(error))
