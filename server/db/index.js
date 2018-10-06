const conn = require('./conn');

const School = require('./School');
const Student = require('./Student');

Student.belongsTo(School); //{ foreignKey: { allowNull: true, onDelete: null } }
School.hasMany(Student);

const sync = () => {
  conn.sync().then(() => { console.log('synced') })
}

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
          name: 'Defense of the Dark Arts',
          address: '251 N Bristol Ave',
          description: 'It\'s not unusual!',
        }),
        //_________________________________________________
        Student.create({
          first: 'Trekky',
          last: 'Monster',
          gpa: 1.0,
          schoolId: null,
        }),
        Student.create({
          first: 'Kate',
          last: 'Monster',
          gpa: 3.9,
          schoolId: 1,
        }),
        Student.create({
          first: 'Sashimi',
          last: 'Monster',
          gpa: 4.0,
          schoolId: 3,
        }),
        Student.create({
          first: 'Bobby',
          last: 'Hirtle',
          gpa: 3.5,
          schoolId: 1,
        }),
        Student.create({
          first: 'Alana',
          last: 'Horowitz Friedman',
          gpa: 4.0,
          schoolId: 2,
        }),
        Student.create({
          first: 'Seymour',
          last: 'The Flesh Eating Plant',
          gpa: 3.7,
          schoolId: 3,
        }),
        Student.create({
          first: 'Squid',
          last: 'Man',
          gpa: 1.9,
          schoolId: 2,
        }),
      ])
        .then(() => console.log('DB synced and seeded!'))
        .catch(e => console.error(e));
    }
    )
}

module.exports = { sync, syncAndSeed }
