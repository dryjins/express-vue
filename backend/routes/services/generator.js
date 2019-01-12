const services = require('express').Router();
const {pipeSeq} = require('./pipeSeq/pipeSeq');
const sequencers = require('./sequencers');
const pipelines = require('./pipeSeq/pipelines');
var currentGen; // store latest generator created by post api


function generator(sequencer, pipelines, ...args) {
  // generator takes sequencer(:function), pipelines(:list), rest arguments, args(:list)
  // then return generator object with next method.
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
// POST API
// req.body {sequencer, pipelines(optional), args(optional)}
services.post('/generator', function (req, res) {
  const testArgs = (seq) => {
    // test arguments are valid numbers.
    let test = true;
    seq.forEach(item => {
      if (isNaN(item)) {
        test = false;
      }
    });
    return test;
  };
  if (!req.body.sequencer) {
    // sequencer parameter is mandatory.
    res.status(500);
    res.send({message: 'The sequencer parameter is required.'});
  }

  if (!testArgs(req.body.args)){
    // return error if testArgs fails
    res.status(500);
    res.send({message: 'The arguments should be comma separated numbers'});
  }
  else {
    // store generator if req is okay
    currentGen = generator(sequencers[req.body.sequencer], req.body.pipelines.map(p => {
      return pipelines[p]
    }), ...req.body.args);
    // send information about created generator
    res.status(200).json({
      message: req.body.sequencer
        + ' is generated with args (' + req.body.args
        + '), pipelines ('
        + req.body.pipelines + ')'
    })
  }
});

// GET API
services.get('/generator/next', function (req, res) {
  if (!currentGen) {
    // send error if there is no stored generator.
    res.status(500);
    res.send({message: 'The generator is not ready.'});
  } else {
    let value = currentGen.next();
    if (value === undefined) {
      res.status(500);
      // if generator does not have values anymore return ot of values error.
      res.send({message: 'The generator is out of values.'});
    } else {
      res.status(200).json({value});
    }

  }
});
module.exports = services;
