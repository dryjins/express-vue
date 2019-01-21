const services = require('express').Router();
const {pipeSeq} = require('./pipeSeq/pipeSeq');
const sequencers = require('./sequencers');
const pipelines = require('./pipeSeq/pipelines');

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
  console.log(req.sessionID)
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
    let currentGen = generator(sequencers[req.body.sequencer], req.body.pipelines.map(p => {
      return pipelines[p]
    }), ...req.body.args);
    // send information about created generator
    req.app.locals.currentGen[req.session.id] = currentGen;
    let generatorName = req.body.sequencer;
    if (req.body.pipelines.length !== 0)
      generatorName += '-' + req.body.pipelines.join('-');
    if (req.body.args.length !== 0)
      generatorName += '-' + req.body.args.join(',');
    req.session.generatorName = generatorName;
    res.status(200).send({
      message: req.body.sequencer
        + ' is generated with args (' + req.body.args
        + '), pipelines ('
        + req.body.pipelines + ')',
      generatorName
    })
  }
});

// GET API
services.get('/generator/next', function (req, res) {
  let currentGen = req.app.locals.currentGen[req.session.id];
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
