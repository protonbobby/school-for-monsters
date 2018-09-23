const conn = require('./conn');

const Student = conn.define('student', {
  firstName: {
    type: conn.Sequelize.STRING,
  },
  lastName: {
    type: conn.Sequelize.STRING,
  },
  gpa: {
    type: conn.Sequelize.INTEGER,
  },
});

module.exports = Student;
