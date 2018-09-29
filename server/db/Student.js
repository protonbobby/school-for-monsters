const conn = require('./conn');

const Student = conn.define('student', {
  first: {
    type: conn.Sequelize.STRING,
    allowNull: false,
  },
  last: {
    type: conn.Sequelize.STRING,
    allowNull: false,
  },
  gpa: {
    type: conn.Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      min: 0,
      max: 4,
    },
    defaultValue: 0,
  },
});

module.exports = Student;
