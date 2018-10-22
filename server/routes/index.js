const router = require('express').Router();

router.use('/schools', require('./schoolRoutes'));
router.use('/students', require('./studentRoutes'));
router.use('/auth', require('./userRoutes'));

router.use((req, res, next) => {
  res.status(404).send('<h1>Oops, ¯\\_(ツ)_/¯ that page doesn\'t exist!</h1>'
  );
});

module.exports = router;
