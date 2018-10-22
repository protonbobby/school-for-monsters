const expect = require('chai').expect;
const app = require('supertest')(require('./app'));
const jwt = require('jwt-simple');
const { syncAndSeed } = require('./db');

describe('Authentication Tests', () => {
  beforeEach(() => syncAndSeed);

  it('Recognizes username and password', () => {
    return app.post('/api/auth')
      .send({ name: 'sashimi', password: 'SASHIMI' })
      .expect(200)
  })
  it('Token exists', () => {
    return app.post('/api/auth')
      .send({ name: 'sashimi', password: 'SASHIMI' })
      .then(res => expect(res.body.token).to.be.ok)
  })
  it('User can authenticate', () => {
    return app.post('/api/auth')
      .send({ name: 'sashimi', password: 'SASHIMI' })
      .then(res => {
        return app.get('/api/auth')
          .set('authorization', res.body.token)
          .expect(200);
      })
  })
  it('Rejects incorrect username and password combo', () => {
    return app.post('/api/auth')
      .send({ name: 'sashimi', password: 'KITTEN' })
      .expect(401);
  })
  it('Rejects a bad token', () => {
    return app.post('/api/auth')
      .send({ name: 'sashimi', password: 'SASHIMI' })
      .then(res => {
        return app.get('/api/auth')
          .set('authorization', res.body.token)
      })
      .then(res => {
        expect(res.body.name).to.equal('sashimi');
        const badToken = jwt.encode({ id: 1 }, 'bar');
        return app.get('/api/auth')
          .set('authorization', badToken)
          .expect(401);
      })
  })
  it('Rejects bad authentication', () => {
    return app.get('/api/auth')
      .expect(401);
  })
  it('Rejects invalid id data type', () => {
    return app.post('/api/auth')
      .send({ name: 'sashimi', password: 'SASHIMI' })
      .then(res => {
        return app.get('/api/auth')
          .set('authorization', res.body.token)
      })
      .then(() => {
        const badToken = jwt.encode({ id: 'xyz' }, process.env.JWT_SECRET);
        return app.get('/api/auth')
          .set('authorization', badToken)
          .expect(500);
      })
  })
});
