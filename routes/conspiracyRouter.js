const express = require('express')
const router = express.Router();
const User = require('../models/conspiracy')
const Contoroller = require('../contorollers/conspiracyController')

//get all
router.get('/', Contoroller.getAllConspiracies);
//get one by id
router.get('/:id', Contoroller.getConspiracy, Contoroller.getConspiracyById);

//create one
router.post('/', Contoroller.createNewConspiracy);

//like and dislike
router.post("/:id/like", Contoroller.getConspiracy, Contoroller.likeConspiracy);
router.post("/:id/dislike", Contoroller.getConspiracy, Contoroller.disLikeConspiracy);

//create comment
router.post("/:id/comment", Contoroller.getConspiracy, Contoroller.addComment);

//generate Conspiracy
router.post("/generate", Contoroller.generateConspiracyController);

//update one
router.patch('/:id',Contoroller.getConspiracy, Contoroller.updateConspiracy);

//delete one not by id
router.delete('/', Contoroller.deletePopConspiracies);

//delete one
router.delete('/:id', Contoroller.getConspiracy, Contoroller.deleteConspiracy);

module.exports = router

