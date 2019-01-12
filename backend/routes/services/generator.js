const services = require('express').Router();
const {pipeSeq} = require('./pipeSeq/pipeSeq');
const sequencers = require('./sequencers');
const pipelines = require('./pipeSeq/pipelines');
var currentGen;

function generator(sequencer, pipelines, ...args) {
  let seq = pipeSeq(sequencer, ...args);
  if (pipelines)
    pipelines.forEach(pipe => {
      seq.pipeline(pipe);
    });
  seq = seq.invoke();
  return {
    next: function () {
      let o = seq();
      return o;
    }
  };
}

services.post('/generator', function (req, res) {
  const testArgs = (seq) => {
    let test = true;
    seq.forEach(item => {
      if (isNaN(item)) {
        test = false;
      }
    });
    return test;
  }
  if (!req.body.sequencer) {
    res.status(500);
    res.send({message: 'The sequencer parameter is required.'});
  }
  if (!testArgs(req.body.args)){
    res.status(500);
    res.send({message: 'The arguments should be comma separated numbers'});
  }
  else {
    currentGen = generator(sequencers[req.body.sequencer], req.body.pipelines.map(p => {
      return pipelines[p]
    }), ...req.body.args);
    res.status(200).json({
      message: req.body.sequencer
        + ' is generated with args (' + req.body.args
        + '), pipelines ('
        + req.body.pipelines + ')'
    })
  }
});

services.get('/generator/next', function (req, res) {
  if (!currentGen) {
    res.status(500);
    res.send({message: 'The generator is not ready.'});
  } else {
    let value = currentGen.next();
    if (value === undefined) {
      res.status(500);
      res.send({message: 'The generator is out of values.'});
    } else {
      res.status(200).json({value});
    }

  }
});
module.exports = services;
