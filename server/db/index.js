const conn = require('./conn');

const School = require('./School');
const Student = require('./Student');

Student.belongsTo(School);
School.hasMany(Student);

const syncAndSeed = () => {
  conn.sync({ force: true })
    .then(() => {
      Promise.all([
        School.create({
          name: 'One Eyed Monsters',
          address: '1313 Mockingbird Lane',
          description: 'Very scary indeed!',
        }),
        School.create({
          name: 'Ghouls Ghouls Ghouls',
          address: '10 Downing Street',
          description: 'Attend if you dare!',
        }),
        School.create({
          name: 'Not-so-fresh Princes of Bel Air',
          address: '251 N Bristol Ave',
          description: 'It\'s not unusual!',
        }),
        //_________________________________________________
        Student.create({
          firstName: 'Trekky',
          lastName: 'Monster',
          gpa: 1.0,
          schoolId: 2,
        }),
        Student.create({
          firstName: 'Kate',
          lastName: 'Monster',
          gpa: 3.9,
          schoolId: 1,
        }),
        Student.create({
          firstName: 'Sashimi',
          lastName: 'Monster',
          gpa: 4.0,
          schoolId: 3,
        }),
        Student.create({
          firstName: 'Bobby',
          lastName: 'Hirtle',
          gpa: 3.5,
          schoolId: 1,
        }),
        Student.create({
          firstName: 'Alana',
          lastName: 'Horowitz Friedman',
          gpa: 4.0,
          schoolId: 2,
        }),
        Student.create({
          firstName: 'Seymour',
          lastName: 'The Flesh Eating Plant',
          gpa: 3.7,
          schoolId: 3,
        }),
        Student.create({
          firstName: 'Squid',
          lastName: 'Man',
          gpa: 1.9,
          schoolId: 2,
        }),
      ])
        .then(() => console.log('DB synced and seeded!'))
        .catch(e => console.error(e));
    }
    )
}

module.exports = syncAndSeed;
