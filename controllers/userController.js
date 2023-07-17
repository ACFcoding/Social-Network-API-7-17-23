const User = require('../models/User');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //deletes a user
  async deleteUser(req, res) {
    try {
        //If findOneAndDelete doesn't work, use findOneAndRemove
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      else res.json(user);

    } catch (err) {
      res.status(500).json(err);
    }
  }, 
//Update a user
updateUser(req, res) {
    User.findOneAndUpdate(
        {_id: req.params.userId},
        {$set: req.body},
        {runValidators: true, new: true}
    )
    .then((user) => 
    !user ? res.status(404) .json({message: "User not found with stated ID"})
    : res.json(user)
    )
    .catch((err) => res.status(500) .json(err)
    )
},
//add friend section
addAFriend({params}, res) {
    User.findOneAndUpdate(
        {_id:params.userId},
        {$push:{friends: params.friendId}},
        {runValidators:true, new:true}
    )
    .then((user) => 
    !user ? res.status(404) .json({message: "User not found with stated ID"})
    : res.json(user)
    )
    .catch((err) => res.status(500) .json(err)
    )
},
//delete a friend
deleteAFriend({params}, res) {
    User.findOneAndUpdate(
        {_id:params.userId},
        {$pull:{friends: params.friendId}},
        {runValidators:true, new:true}
    )
    .then((user) => 
    !user ? res.status(404) .json({message: "User not found with stated ID"})
    : res.json(user)
    )
    .catch((err) => res.status(500) .json(err)
    )
}
};