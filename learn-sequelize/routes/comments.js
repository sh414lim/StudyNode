const express = require('express');
const { User,Comment } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
try{
    const user= await User.findOne({where:{id : req.body.id}});
    const comment = await Commnet.create({
        comment:req.body.comment,
    });
    const userComment = await user.addCommnet(comment);
    console.log(comment);
    res.status(201).json(userComment);
}catch(err){
    console.error(err);
    next(err);
} 
});

router.route('/:id')
  .patch(async (req, res, next) => {
    try {
      const result = await Comment.update({
        comment: req.body.comment,
      }, {
        where: { id: req.params.id },
      });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Comment.destroy({ where: { id: req.params.id } });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;