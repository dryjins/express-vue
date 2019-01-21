<template>
  <div id="menu-container">
    <div class="menu-group card-header p-0">
      <div class="row ml-auto mr-auto">
        <div class="col-md-5 px-0">
          <ul class="nav justify-content-center border border-dark">
            <li class="nav-item">
              <a class="nav-link navbar-brand">Sequencer</a>
            </li>
          </ul>
        </div>
        <div class="col-md-2 pr-0 pl-1">
          <ul class="nav justify-content-center bg-secondary border border-dark">
            <li class="nav-item">
              <a class="nav-link navbar-brand" style="color: white">Pipeline</a>
            </li>
          </ul>
        </div>
        <div class="col-md-5 pr-0 pl-1">
          <ul class="nav justify-content-center border border-dark">
            <li class="nav-item">
              <a class="nav-link navbar-brand">Argument</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="menu-group card-header p-0 bg-white">
      <div class="row ml-auto mr-auto">
        <div class="col-md-5 pr-0 pl-0">
          <nav class="nav navbar bg-white align-content-center p-1">
            <button class="btn btn-sm btn-outline-dark btn-seq"
                    type="button" v-for="seq in sequencers"
                    v-bind:class="[{active : seq.active},'btn-'+seq.name]"
                    @click="clickSeq(seq.name)" v-bind:key="seq.name">{{seq.title}}
            </button>
          </nav>
        </div>
        <div class="col-md-2 pr-0 pl-1">
          <nav class="nav navbar bg-white align-content-center p-1">
            <button class="btn btn-sm btn-outline-secondary btn-pipe"
                    type="button" v-for="pipe in pipelines"
                    v-bind:class="[{active : pipe.active},'btn-'+pipe.name]"
                    @click="clickPipe(pipe.name)" v-bind:key="pipe.name">{{pipe.title}}
            </button>
          </nav>
        </div>
        <div class="col-md-5 pr-0 pl-1">
          <ul class="nav navbar bg-white align-content-center p-1">
            <li class="w-100 ml-auto mr-auto nav-item input-group-sm">
              <input class="form-control rounded-0 input-args"
                     placeholder="args for partialSum(1,2,...n) or Range(start, step), Ex) 1, 2"
                     :disabled="isDisabled"
                     v-model="args">
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="menu-group py-2 px-1">
      <div class="row ml-auto mr-auto bg-white">
        <div class="col-md-10 ml-auto mr-0 text-lg-left">
          <span class="label w-100">Generator : {{generator}}</span>
        </div>
        <div class="col-md-2 px-1">
          <div class="btn-group btn-group-sm btn-block justify-content-center float-right">
            <button class="btn btn-outline-dark btn-generate"
                    type="button" @click="clickGenerate">Generate
            </button>
            <button class="btn btn-outline-dark btn-next"
                    type="button" @click="clickNext">Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import EventBus from '../services/EventBus';

export default {
  name: 'Menu',
  data() {
    return {
      sequencers: [{title: 'Factorial', name: 'factorialSeq', args: false, active: true},
        {title: 'Fibonacci', name: 'fibonacciSeq', args: false, active: false},
        {title: 'PartialSum', name: 'partialSumSeq', args: true, active: false},
        {title: 'Prime', name: 'primeSeq', args: false, active: false},
        {title: 'Range', name: 'rangeSeq', args: true, active: false}],
      pipelines: [{title: 'Accumulator', name: 'accumulator', args: false, active: false},
        {title: 'isEven', name: 'isEven', args: false, active: false},
      ],
      req: {sequencer: '', pipelines: [], args: []},
      args: undefined,
      generator: 'None',
      isDisabled: false
    };
  },
  methods: {
    clickSeq(seq) {
      let self = this;
      // mark sequencer item using active
      self.args = undefined;
      this.sequencers.forEach((d) => {
        d.active = seq === d.name;
        if (d.active) {
          self.isDisabled = !d.args;
        }
      });
    },
    clickPipe(pipe) {
      // mark pipe item using active
      this.pipelines.forEach((d) => {
        if (d.name === pipe) {
          d.active = !d.active;
        }
      });
    },
    clickGenerate() {
      const self = this;
      this.req ={sequencer: '', pipelines: [], args: []};
      // create request parameter object
      this.req.pipelines = [];
      this.sequencers.forEach((d) => {
        if (d.active) {
          self.req.sequencer = d.name;
          self.args = self.isDisabled ? undefined : self.args;
        }
      });
      this.pipelines.forEach((d) => {
        if (d.active) self.req.pipelines.push(d.name);
      });
      if (!this.isDisabled) this.req.args = this.args ? this.args.split(',') : [];

      // call postGenerator to invoke
      //ApiHandler.postGenerator(this.req);
      EventBus.$emit('callPostGenerator',this.req);
      return this.req;
    },
    clickNext() {
      // call getGeneratorNext for the next value;
      //ApiHandler.getGeneratorNext();
      EventBus.$emit('callGetGeneratorNext');
    },
  },
  mounted() {
    let self = this;
    EventBus.$on('postGenerator', function (data) {
      // create generator label when postGenerator res is okay
      self.generator = data.genName;
    });
    // if there is a generator previously created, set it into the name label
    EventBus.$on('getGenerator', function (generatorName) {
      // create generator label when getGenerator res is okay
      self.generator = generatorName;
    });
    EventBus.$emit('callGetGenerator');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
