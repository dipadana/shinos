const express = require('express')
const Joi = require('joi')
const router = express.Router()

const Menus = require('../models/menu')

// SEARCH feature
router.get('/', (req, res) => {
  if(req.query.search) {
    const regexp = new RegExp(req.query.search, 'gi')
    Menus.find({ food_name: regexp }, (err, menus) => {
      if(err) return console.error(err)
      res.render('home', {
        title: 'MENU\'s',
        menus: menus
      })
    })
  } else {
    Menus.find({}, (err, menus) => {
      if(err) return console.error(err)
      res.render('home', {
        title: 'MENU\'s',
        menus: menus
      })
    })
  }
})

// CREATE operation
router.route('/add')
  .get((req, res) => {
    res.render('add_menus', {
      title: "ADD MENU\'s"
    })
  })
  .post((req, res) => {
    const schema = {
      food_name: Joi.string().required(),
      food_type: Joi.string().required(),
      food_description: Joi.string().required(),
      food_price: Joi.string().required()
    }
    const result = Joi.validate(req.body, schema)
    if(result.error) return res.status(400).render('add_menus', {
      title: 'ADD MENU\'s',
      error: true,
      error_message: "All fields must be filled and not allowed to be empty"
    })
    const menu = new Menus({
      food_name: req.body.food_name,
      food_type: req.body.food_type,
      food_description: req.body.food_description,
      food_price: req.body.food_price
    })
    menu.save(err => {
      if(err) console.error(err)
      else res.redirect('/')
    })
  })

// READ operation
router.route('/detail/:id')
  .get((req, res) => {
    Menus.findById(req.params.id, (err, food) => {
      res.render('detail', {
        title: "DETAIL\'s FOOD",
        food_details: food
      })
    })
  })

// UPDATE operation
router.route('/edit/:id')
  .get((req, res) => {
    Menus.findById(req.params.id, (err, food) => {
      res.render('edit', {
        title: "EDIT FOOD",
        food: food
      })
    })
  })
  .post((req, res) => {
    let upFood = {}
    upFood.food_name = req.body.food_name,
    upFood.food_type = req.body.food_type,
    upFood.food_description = req.body.food_description,
    upFood.food_price = req.body.food_price
    Menus.updateOne({ _id: req.params.id }, upFood, err => {
      if(err) return console.error(err)
      else res.redirect(`/admin/menus/detail/${req.params.id}`)
    })
  })

// DELETE operation
router.route('/delete/:id')
  .delete((req, res) => {
    Menus.deleteOne({ _id: req.params.id }, err => {
      if(err) return console.error(err)
      else res.status(200).send('Success')
    })
  })

module.exports = router