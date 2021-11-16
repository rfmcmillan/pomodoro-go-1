const { UUID, UUIDV4, STRING, INTEGER } = require('sequelize');
const db = require('../db');

//Site model
const Site = db.define('site', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: { type: STRING },
  siteUrl: {
    type: STRING,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  category: {
    type: STRING,
    validate: {
      notEmpty: true,
    },
  },
  visits: {
    type: INTEGER,
    defaultValue: 0,
  },
});

module.exports = Site;
