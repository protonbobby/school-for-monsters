const express = require('express');
const app = express();
const path = require('path');

const School = require('./db/School');
const Student = require('./db/Student');

app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/schools', (req, res, next) => {
  School.findAll({
    include: [Student],
  })
    .then(schools => res.send(schools))
    .catch(next)
});

app.get('/schools/:id', (req, res, next) => {
  School.findById(req.params.id, {
    include: [Student]
  })
    .then(school => res.send(school))
    .catch(next)
});

app.use(require('body-parser').json());
app.post('/schools', (req, res, next) => {
  School.create(req.body)
    .then((school) => res.send(school))
    .catch(next)
});

app.delete('/schools/:id', (req, res, next) => {
  School.findById(req.params.id)
    .then(school => school.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
});

app.put('/schools/:id', (req, res, next) => {
  School.findById(req.params.id)
    .then(school => school.update(req.body))
    .then(school => res.send(school))
    .catch(next)
});

//_____________________________________________
app.get('/students', (req, res, next) => {
  Student.findAll({
    order: [['gpa', 'DESC']],
    include: [School]
  })
    .then(students => res.send(students))
    .catch(next)
});

app.get('/students/:id', (req, res, next) => {
  Student.findById(req.params.id, {
    include: [School]
  })
    .then(student => res.send(student))
    .catch(next)
});

app.post('/', (req, res, next) => {
  Student.create(req.body)
    .then(student => res.send(student))
    .catch(next)
});

app.delete('/student/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => student.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
});

app.put('/student/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => student.update(req.body))
    .then(student => res.send(student))
    .catch(next)
});

app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message })
});

module.exports = app;
