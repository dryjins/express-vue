const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../../app');
var testReq = {
  "sequencer": "partialSumSeq",
  "pipelines": ["isEven"],
  "args": [1, 3, 7, 2, 0]
}
describe('GET /services/generator/next', () => {
  it('should error out error out if the res is not 500 and res.body is not {"message":"The generator is not ready."}',
    (done) => {
      request(app)
        .get('/services/generator/next')
        .expect(500)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res.body).to.deep.equal({"message": "The generator is not ready."});
          done();
        });
    });
});

describe('POST /services/generator', () => {
  it('should error out error out if the res is not 200 and res.body ' +
    'is not {"message": "partialSumSeq is generated with args (1,3,7,2,0), pipelines (undefined)"}',
    (done) => {
      request(app)
        .post('/services/generator')
        .send(testReq)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res.body).to.deep.equal({
            "message": "partialSumSeq is generated with args (1,3,7,2,0), pipelines (isEven)"
          });
          done();
        });
    });
});

describe('GET /services/generator/next', () => {
  it('should error out error out if the res is not 200 and res.body is not { "value":{"status":false,"number":"1"}}',
    (done) => {
      request(app)
        .get('/services/generator/next')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res.body).to.deep.equal({
            "value": {
              "status": false,
              "number": "1"
            }
          });
          done();
        });
    });

  it('should error out error out if the res is not 200 and res.body is not { "value":{"status":true,"number":"4"}}',
    (done) => {
      request(app)
        .get('/services/generator/next')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res.body).to.deep.equal({
            "value": {
              "status": true,
              "number": "4"
            }
          });
          done();
        });
    });
  it('should error out error out if the res is not 200 and res.body is not { "value":{"status":false,"number":"11"}}',
    (done) => {
      request(app)
        .get('/services/generator/next')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res.body).to.deep.equal({
            "value": {
              "status": false,
              "number": "11"
            }
          });
          done();
        });
    });

  it('should error out error out if the res is not 200 and res.body is not { "value":{"status":false,"number":"13"}}',
    (done) => {
      request(app)
        .get('/services/generator/next')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res.body).to.deep.equal({
            "value": {
              "status": false,
              "number": "13"
            }
          });
          done();
        });
    });
  it('should error out error out if the res is not 200 and res.body is not { "value":{"status":false,"number":"13"}}',
    (done) => {
      request(app)
        .get('/services/generator/next')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res.body).to.deep.equal({
            "value": {
              "status": false,
              "number": "13"
            }
          });
          done();
        });
    });
  it('should error out error out if the res is not 200 and res.body is not  "message": "The generator is out of values."',
    (done) => {
      request(app)
        .get('/services/generator/next')
        .expect(500)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res.body).to.deep.equal( {"message": "The generator is out of values."});
          done();
        });
    });
});

