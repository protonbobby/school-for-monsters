const router = require('express').Router();
const School = require('../db/School');

router.get('/', (req, res, next) => {
  School.findAll({
    order: [['name', 'ASC']],
  })
    .then(schools => res.status(200).send(schools))
    .catch(next)
});

router.get('/:id', (req, res, next) => {
  School.findById(req.params.id)
    .then(school => res.status(200).send(school))
    .catch(next)
});

router.delete('/:id', (req, res, next) => {
  School.findById(req.params.id)
    .then(school => school.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
});

router.post('/', (req, res, next) => {
  School.create(req.body)
    .then((school) => res.status(201).send(school))
    .catch(next)
});

router.put('/:id', (req, res, next) => {
  School.findById(req.params.id)
    .then(school => school.update(req.body))
    .then(school => res.status(200).send(school))
    .catch(next)
});

module.exports = router;
