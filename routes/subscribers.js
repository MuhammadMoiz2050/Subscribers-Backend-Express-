const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')
// const subscriber = require('../models/subscriber')

//RESTFul API routes

//Get all
router.get('/', async (req,res) => {
// res.send('Hello world')
try{
    const subscribers = await Subscriber.find()
    res.json(subscribers)
}
catch(err){
    res.status(500).json({message: err.message})
}
})

//Getting one
router.get('/:id',getSubscriber, (req,res)=>{
    // try{
    //     const subscriber = Subscriber.find({""})
    // }
    // catch(err){
    //     res.status(500).json({message: err.message})
    // }
    res.json(res.subscriber)
})

//Creating one
router.post('/',async (req,res)=>{
    const subscriber = new Subscriber({
        name: req.body.name,
        subscriberToChannel: req.body.subscriberToChannel
    })

    try{
        const newSubscriber = await subscriber.save()
        res.status(201).send(newSubscriber)
    }
    catch(err){
        res.status(400).json({message: err.message})
    }

})

//Updating one
router.patch('/:id', getSubscriber, async (req,res)=>{
    if(req.body.name != null){
        res.subscriber.name = req.body.name
    }
    if(req.body.subscriberToChannel != null){
        res.subscriber.subscriberToChannel = req.body.subscriberToChannel
    }
    try{
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    }catch(err){
    res.status(400).json({message: err.message})
        }
})

//Deleting one
router.delete('/:id', getSubscriber, async (req,res)=>{
    try{ 
        await res.subscriber.deleteOne()
        res.json({message: 'Deleted the subscriber'})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//Middleware function
async function getSubscriber(req, res, next){
    let subscriber
    try{
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null){
            res.status(404).json({message: "Cannot find the subscriber"})
        }
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
    res.subscriber = subscriber
    next()
}


module.exports = router