const router = require("express").Router();
const {
    getAllThoughts,
    getOneThought,
    createAThought,
    updateAThought,
    deleteAThought,
    createReaction,
    deleteReaction
} = require("../../controllers/thoughtController")

router.route('/')
    .get(getAllThoughts)
    .post(createAThought);

router.route('/:thoughtId')
    .get(getOneThought)
    .put(updateAThought)
    .delete(deleteAThought);

router.route('/:thoughtId/reactions')
    .post(createReaction)

router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)
module.exports = router