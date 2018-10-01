const router = require('express').Router();
const Student = require('../db/Student');
const School = require('../db/School');

router.get('/', (req, res, next) => {
  Student.findAll({
    order: [['last', 'ASC']],
    include: [School]
  })
    .then(students => res.send(students))
    .catch(next)
});

router.get('/:id', (req, res, next) => {
  Student.findById(req.params.id, {
    include: [School]
  })
    .then(student => res.send(student))
    .catch(next)
});

router.delete('/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => student.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
});

router.use(require('body-parser').json());
router.post('/', (req, res, next) => {
  Student.create(req.body)
    .then(student => res.send(student))
    .catch(next)
});

router.put('/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => student.update(req.body))
    .then(student => res.send(student))
    .catch(next)
});

module.exports = router;
