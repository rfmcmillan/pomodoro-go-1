const router = require('express').Router();
const {
  models: { Site, User, BlackList },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const sites = await Site.findAll({
      include: [User],
    });
    res.send(sites);
  } catch (err) {
    next(err);
  }
});

router.get('/:siteUrl', async (req, res, next) => {
  try {
    console.log('siteUrl in get route:', req.params.siteUrl);
    const site = await Site.findOne({
      // include: [User],
      where: {
        siteUrl: req.params.siteUrl,
      },
    });
    console.log('site in get route:', site);
    res.send(site);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//need to fix the route below cause it's not working fully
router.get('/user/:userId', async (req, res, next) => {
  try {
    const userSites = await Site.findAll({
      include: [
        {
          model: User,
          through: {
            where: {
              userId: req.params.userId,
            },
          },
        },
      ],
    });
    res.send(userSites);
  } catch (err) {
    next(err);
  }
});
//

router.post('/', async (req, res, next) => {
  try {
    const { siteUrl, category, userId } = req.body;
    const sites = await Site.findAll({
      where: {
        siteUrl,
      },
    });

    if (!sites.length) {
      const newSite = await Site.create({
        siteUrl,
        category,
      });

      res.send({ newSite });
    } else {
      const existingSite = sites[0];

      res.send({ existingSite });
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:userId/:siteId', async (req, res, next) => {
  try {
    const associationToDelete = await BlackList.findOne({
      where: {
        userId: req.params.userId,
        siteId: req.params.siteId,
      },
    });
    await associationToDelete.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

router.put('/:siteId', async (req, res, next) => {
  try {
    const site = await Site.findByPk(req.params.siteId);
    const updated = await site.update(req.body);
    res.status(200).send(updated);
  } catch (error) {
    next(error);
  }
});
