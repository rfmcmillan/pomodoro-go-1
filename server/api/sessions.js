const router = require('express').Router();
const {
  models: { Session, User },
} = require('../db');
const Task = require('../db/models/Task');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const sessions = await Session.findAll({
      include: [{ model: User }],
      order: [['createdAt']],
    });
    res.send(sessions);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { userId, goal, sessionTime } = req.body;
    console.log('sessionTime in post route', sessionTime);
    const createdSession = await Session.create({ userId, goal, sessionTime });
    const eagerLoadedSession = await Session.findOne({
      where: { id: createdSession.id },
      include: [User, Task],
    });
    res.status(201).send(eagerLoadedSession);
  } catch (error) {
    next(error);
  }
});

router.get('/:sessionId', async (req, res, next) => {
  try {
    const session = await Session.findByPk(req.params.sessionId, {
      include: [User, Task],
    });
    res.send(session);
  } catch (err) {
    next(err);
  }
});

router.put('/:sessionId', async (req, res, next) => {
  try {
    const { sessionTime, goal, status, successful } = req.body;
    const { sessionId } = req.params;
    let session = await Session.findByPk(sessionId, {
      include: [User, Task],
    });

    if (status === 'Done' && !successful) {
      return res.send(await session.end({ successful, status }));
    }

    session.goal = goal;

    if (sessionTime) {
      session.sessionTime = sessionTime;
    }
    session.status = status;
    await session.save();
    res.status(200).send(session);
  } catch (error) {
    next(error);
  }
});
// END SESSION
router.put('/:sessionId/end', async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const { successful } = req.body;
    const session = await Session.findByPk(sessionId);
    await session.end({ successful, status: 'Done' });
    const updatedSession = await Session.findByPk(sessionId, {
      include: [User, Task],
    });
    res.send(updatedSession);
  } catch (error) {
    next(error);
  }
});

router.get('/user/:userId', async (req, res, next) => {
  try {
    const userSessions = await Session.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    res.send(userSessions);
  } catch (err) {
    next(err);
  }
});

router.post('/:sessionId/tasks', async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const { task } = req.body;
    await Task.create({ name: task, sessionId });

    const session = await Session.findOne({
      where: { id: sessionId },
      include: [User, Task],
    });
    res.status(201).send(session);
  } catch (error) {
    next(error);
  }
});

router.put('/:sessionId/tasks/:taskId', async (req, res, next) => {
  try {
    const { taskId, sessionId } = req.params;
    const task = await Task.findOne({ where: { sessionId, id: taskId } });
    task.completed = !task.completed;
    await task.save();
    res.send(await Session.findByPk(sessionId, { include: [User, Task] }));
  } catch (err) {
    next(err);
  }
});

router.delete('/:sessionId/tasks/:taskId', async (req, res, next) => {
  try {
    const { taskId, sessionId } = req.params;
    const deleteTask = await Task.findByPk(taskId);
    await deleteTask.destroy();
    const session = await Session.findOne({
      where: { id: sessionId },
      include: [User, Task],
    });
    res.send(session);
  } catch (error) {
    next(error);
  }
});
