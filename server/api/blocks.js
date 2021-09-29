const router = require('express').Router();
const {
  models: { Site, Block, User },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const blocks = await Block.findAll({
      include: [User, Site],
      order: [['createdAt', 'DESC']],
    });
    res.send(blocks);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    if (req.body.siteId) {
      const { siteId } = req.body;
      const block = await Block.create({
        siteId,
      });
      res.send(block);
    } else if (req.body.userAttempted) {
      const matchingSite = await Site.findOne({
        where: {
          siteUrl: req.body.userAttempted,
        },
      });
      if (matchingSite) {
        const { userId } = req.body;
        const block = await Block.create({
          siteId: matchingSite.id,
          userId,
        });
        const date = block.createdAt;
        block.date = date;
        await block.save();
        res.send(block);
      }
    }
  } catch (err) {
    next(err);
  }
});
