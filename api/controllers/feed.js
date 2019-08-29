const mongoose = require('mongoose')

const Feed = require('../models/feed')

exports.createFeed = (req, res) => {
    const feed = new Feed({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        tagline: req.body.tagline,
        imageUrl: req.body.imageUrl,
        videoUrl: req.body.videoUrl,
        desc: req.body.desc
    })
    feed.save()
    .then(result => {
        res.status(200).json({
            message: 'Handling post request to /products',
            Feed: result
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'feed not added',
            error: err
        })
    })
}

exports.viewFeeds = (req, res) => {
    Feed.find()
    .exec()
    .then(feeds => {
        res.status(200)
        .json({
            message: 'feed fetch successful',
            count: feeds.length,
            feeds: feeds
        })
    })
}

exports.viewFeed = (req, res) => {
    const id = req.params.id
    Feed.findById({_id:id})
    .exec()
    .then(feeds => {
        if(feeds){
            res.status(200).json(feeds)
        } else {
            res.status(404).json({message: 'id not found'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'id not found'})
    })
}

exports.updateFeed = (req, res) => {
    const updateOps = {}

    for (const Ops of req.body){
        updateOps[Ops.propName] = Ops.value
    }
    Feed.update({_id: req.params.id},{
        $set: updateOps
    })
    .then(result =>
        res.status(200).json(result)
    )
    .catch(err => res.status(500).json({error: rr}))
}

exports.deleteFeed = (req, res) => {
    const id = req.params.id
   Feed.remove({_id: id})
   .exec()
   .then(result => {
       res.status(200).json(result)
   })
   .catch(err => {
       console.log(err)
       res.status(500).json({error: err})
   })

}