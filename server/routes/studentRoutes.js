const router = require('express').Router();
const Student = require('../db/Student');

router.get('/', (req, res, next) => {
  Student.findAll({
    order: [['last', 'ASC']],
  })
    .then(students => res.status(200).send(students))
    .catch(next)
});

router.get('/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => res.status(200).send(student))
    .catch(next)
});

router.delete('/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => student.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
});

router.post('/', (req, res, next) => {
  Student.create(req.body)
    .then(student => res.status(201).send(student))
    .catch(next)
});

router.put('/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => student.update(req.body))
    .then(student => res.status(200).send(student))
    .catch(next)
});

module.exports = router;
