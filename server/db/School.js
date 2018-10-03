const conn = require('./conn');

const School = conn.define('school', {
  name: {
    type: conn.Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: conn.Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: conn.Sequelize.TEXT,
    allowNull: true,
  },
});

module.exports = School;
