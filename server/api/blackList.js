const router = require('express').Router();
const {
  models: { BlackList, User, Site },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const blacklist = await BlackList.findAll({ include: [User, Site] });
    res.send(blacklist);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const blackList = await BlackList.findAll({
      where: {
        userId: req.params.userId,
      },
    });
  } catch (err) {
    console.error('Error in blackList "get by userId" route');
    next(err);
  }
});

router.put('/:blackListId', async (req, res, next) => {
  try {
    const blackList = await BlackList.findByPk(req.params.blackListId, {
      include: [User, Site],
    });
    const updated = await blackList.update(req.body);
    res.status(200).send(updated);
  } catch (error) {
    next(error);
  }
});

router.put('/:userId/:siteId', async (req, res, next) => {
  try {
    const blackList = await BlackList.findAll({
      where: {
        siteId: req.params.siteId,
        userId: req.params.userId,
      },
    });
    if (blackList[0].blockingEnabled) {
      blackList[0].blockingEnabled = false;
      await blackList[0].save();
    } else {
      blackList[0].blockingEnabled = true;
      await blackList[0].save();
    }
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
