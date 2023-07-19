const{Thought, User} = require("../models")

module.exports = {
    getAllThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500) .json(err))
    },
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtsId })
        .then((thoughts) => 
        !thoughts ? res.status(404) .json({message:"No thought with that ID"})
        :res.json(thoughts))
        .catch((err) => res.status(500) .json(err))
},
    createAThought({body}, res) {
        Thought.create(body)
        .then(thoughtBody => {
            User.findOneAndUpdate(
                {_id: body.userId},
                {$push:{thoughts:thoughtBody._id}},
                {new:true}
            )
            .then(userData => {
                if (!userData) {
                    res.status(404) .json({message:"Thought was created, no user found"});
                    return;
                }
                res.json(userData)
            })
            .catch(err => res.json(err))
        })
        .catch(err => res.status(400).json(err));
    },
    updateAThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtsId},
            {$set: request.body},
            {runValidators: true, new: true}
        )
        .then((thoughtData) => 
        !thoughtData ? res.status(404) .json({
            message: "No thought found with states ID"

        }) : res.json(thoughtData))
        .catch((err) => {
            res.status(500) .json(err)
        });
    },
    deleteAThought(req,res) {
        Thought.findOneAndRemove(
            {_id: req.params.thoughtsId}
        )
        .then((thoughtData) =>
        !thoughtData ? res.status(404) .json({message: "No thought with stated ID"}) : res.json({message: "Delete successful"})
        ) 
        User.findOneAndUpdate(
            {username: req.params.thoughtId.username},
            {$pull: {thoughts: req.params.thoughtId}}
        )
        .catch((err) => 
            res.status(500) .json(err)
        )
    },
    createReaction({params, body}, res){
        Thought.findOneAndUpdate(
            {_id:params.thoughtsId},
            {$addToSet:{reactions:body}},
            {runValidators:true, new:true}
        ) .then((thoughtData) => 
        !thoughtData ? res.status(404) .json({message: "No thought with that ID"})
        : res.json(thoughtData))
            .catch((err) =>
            res.status(500) .json(err))
    },
    deleteReaction({params, body}, res){
        Thought.findOneAndUpdate(
            {_id:params.thoughtsId},
            {pull:{reactions:{reactionId:req.params.reactionId}}},
            {runValidators:true, new:true}
        ) .then((thoughtData) => 
        !thoughtData ? res.status(404) .json({message: "No thought with that ID"})
        : res.json(thoughtData))
            .catch((err) =>
            res.status(500) .json(err))
    },
}
