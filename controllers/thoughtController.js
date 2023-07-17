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
        .then(thoughtBody) => {
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
        }
    }
}