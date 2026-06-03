const express = require('express')
//const router = express.Router();
const Conspiracy = require('../models/conspiracy')
const generateConspiracy = require("../services/conspiracyGenerator");


async function getConspiracy(req, res, next) {
    let conspiracy;
    try {
        conspiracy = await Conspiracy.findById(req.params.id)
        if (conspiracy == null) {
            return res.status(404).json({message:"can't find conpiracy"})
        }
    } catch (error) {
        return res.status(500).json({message:error})
    }
    res.conspiracy = conspiracy;
    next()
}
const getAllConspiracies = async (req, res) => {
    try {
        let query = Conspiracy.find();

        if (req.query.sort === 'date') {
            query = query.sort({ createAT : 1 });
        } else if (req.query.sort === 'likes') {
            query = query.sort({ likes: -1 });
        }

        const conspiracys = await query;
        res.json(conspiracys);
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }
}
const getConspiracyById = async(req, res)=>{
    try {
        const conspiracy = res.conspiracy;
        res.json(conspiracy)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
const createNewConspiracy = async(req, res)=>{
    const conspiracy  = new Conspiracy({
    text: req.body.text,
    likes: req.body.likes ?? 0,
    disLikes: req.body.disLikes ?? 0
    });
    try {
        const newConspiracy = await conspiracy.save();
        res.status(201).json(newConspiracy);
        
    } catch (error) {
        console.error(error)
        res.status(400).json({message: error.message})
    }
}
const likeConspiracy = async(req, res) =>{
   res.conspiracy.likes += 1;
  try {
    const updatedConspiracy = await res.conspiracy.save();
    res.json(updatedConspiracy)
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}
const disLikeConspiracy = async(req, res) =>{
   res.conspiracy.disLikes += 1;
  try {
    const updatedConspiracy = await res.conspiracy.save();
    res.json(updatedConspiracy)
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}
const addComment = async(req, res) => {
  if (!req.body.text) {
    return res.status(400).json({ message: 'Comment text is required' })
  }
  res.conspiracy.comments.push({
    author: req.body.author || 'משתמש אנונימי',
    text: req.body.text
  })
  try {
    const updatedConspiracy = await res.conspiracy.save();
    res.status(201).json(updatedConspiracy)
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}
const generateConspiracyController = async (req, res) => {
    const text = generateConspiracy();

    const conspiracy = new Conspiracy({
    text: text,
    });
    try {
      res.json(conspiracy);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
}
const updateConspiracy = async(req, res) =>{
  if (req.body.text != null) {
    res.conspiracy.text = req.body.text
  }
  if (req.body.likes != null) {
    res.conspiracy.likes = req.body.likes
  }
  if (req.body.disLikes != null) {
  res.conspiracy.disLikes = req.body.disLikes
}
if (req.body.comments != null) {
  res.conspiracy.comments = req.body.comments
}
  
  try {
    const updatedConspiracy = await res.conspiracy.save();
    res.json(updatedConspiracy)
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}
const deleteConspiracy = async(req, res)=>{
    try {
        await res.conspiracy.deleteOne();
        res.json({message: 'Conspiracy Deleted'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}
const deletePopConspiracies = async(req, res)=>{
    try {
        const conspiracy = await Conspiracy.findOneAndDelete({}, {sort: {createAT: -1}});
        if (!conspiracy) {
            return res.status(404).json({message: 'No conspiracy found to delete'})
        }
        res.json({message: `${conspiracy.text} Conspiracy Deleted`})
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

module.exports = {getConspiracy, 
                getAllConspiracies,
                getConspiracyById,
                createNewConspiracy,
                updateConspiracy,
                deleteConspiracy,
                likeConspiracy,
                disLikeConspiracy,
                addComment,
                generateConspiracyController,
                deletePopConspiracies
};