const request = require('supertest');
const session = require('supertest-session');
const expect = require('chai').expect;
const app = require('../../../app');
var testReq = {
  "sequencer": "partialSumSeq",
  "pipelines": ["isEven"],
  "args": [1, 3, 7, 2, 0]
};

describe('GET /services/generator/next', () => {
  var testSession = null;
  beforeEach(function (done) {
    testSession = session(app);
    return done();

  });

  it('should error out error out if the res is not 500 and res.body is not {"message":"The generator is not ready."}',
    (done) => {
      testSession
        .get('/services/generator/next')
        .expect(500)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res.body).to.deep.equal({"message": "The generator is not ready."});
          return done();
        });
    });
});

describe('POST /services/generator', () => {
  var testSession = null;
  beforeEach(function (done) {
    testSession = session(app);
    return done();
  });
  it('should error out error out if the res is not 200 and res.body ' +
    'is not {"message": "partialSumSeq is generated with args (1,3,7,2,0), pipelines (undefined)"}',
    (done) => {
      testSession
        .post('/services/generator')
        .send(testReq)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res.body).to.deep.equal({
            "message": "partialSumSeq is generated with args ('1,3,7,2,0'), pipelines (isEven)",
            "genName": "partialSumSeq-isEven-1,3,7,2,0"
          });
          return done();
        });
    });
});

describe('GET /services/generator/next', () => {
  var testSession;
  beforeEach(function (done) {
    testSession = session(app);
    testSession
      .post('/services/generator')
      .send(testReq)
      .expect(200)
      .end(function (err) {
        if (err) return done(err);
        return done();
      });
  });

  it('should error out error out if the res is not 200 and res.body is not { "value":{"status":false,"number":"1"}}',
    (done) => {
      testSession.get('/services/generator/next')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err, res);
            return;
          }
          expect(res.body).to.deep.equal({
            "value": {
              "status": false,
              "number": "1"
            }
          });
          return done();
        });
    });
});

describe('GET /services/generator', () => {
  var testSession;
  beforeEach(function (done) {
    testSession = session(app);
    testSession
      .post('/services/generator')
      .send(testReq)
      .expect(200)
      .end(function (err) {
        if (err) return done(err);
        return done();
      });
  });

  it('should error out error out if the res is not 200 and res.body is not {"genName": "partialSumSeq-isEven-1,3,7,2,0"}',
    (done) => {
      testSession
        .get('/services/generator')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res.body).to.deep.equal({
            "genName": "partialSumSeq-isEven-1,3,7,2,0"
          });
          return done();
        });
    });
});
