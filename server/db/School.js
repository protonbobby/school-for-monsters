const conn = require('./conn');

const School = conn.define('school', {
  name: {
    type: conn.Sequelize.STRING,
  },
  address: {
    type: conn.Sequelize.STRING,
  },
  description: {
    type: conn.Sequelize.TEXT,
  },
});

module.exports = School;
