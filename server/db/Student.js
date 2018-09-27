const conn = require('./conn');

const Student = conn.define('student', {
  firstName: {
    type: conn.Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
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
