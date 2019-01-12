import { mount } from '@vue/test-utils';
import Menu from '@/components/Menu';

describe('Menu.vue', () => {
  // Evaluate the results of functions in
  // the raw component options
  it('sets the correct default data', () => {
    expect(typeof Menu.data).to.equal('function');
    const defaultData = Menu.data();
    const testData = {
      sequencers: [{ title: 'Factorial', name: 'factorialSeq', args: false, active: true },
        { title: 'Fibonacci', name: 'fibonacciSeq', args: false, active: false },
        { title: 'PartialSum', name: 'partialSumSeq', args: true, active: false },
        { title: 'Prime', name: 'primeSeq', args: false, active: false },
        { title: 'Range', name: 'rangeSeq', args: true, active: false }],
      pipelines: [{ title: 'Accumulator', name: 'accumulator', args: false, active: false },
        { title: 'isEven', name: 'isEven', args: false, active: false },
      ],
      req: { sequencer: '', pipelines: [], args: [] },
      args: undefined,
      generator: 'None',
    };
    expect(defaultData.sequencers).to.deep.equal(testData.sequencers);
    expect(defaultData.pipelines).to.deep.equal(testData.pipelines);
    expect(defaultData.req).to.deep.equal(testData.req);
    expect(defaultData.args).to.equal(testData.args);
    expect(defaultData.generator).to.equal(testData.generator);
  });

  it('should contain proper methods', () => {
    const wrapper = mount(Menu);
    const vm = wrapper.vm;
    expect(typeof vm.clickSeq).to.be.equal('function');
    expect(typeof vm.clickPipe).to.be.equal('function');
    expect(typeof vm.clickGenerate).to.be.equal('function');
    expect(typeof vm.clickNext).to.be.equal('function');
  });

  it('should changes data.req when generate button clicked', () => {
    const wrapper = mount(Menu);
    const vm = wrapper.vm;
    wrapper.find('.btn-rangeSeq').trigger('click');
    wrapper.find('.btn-isEven').trigger('click');
    wrapper.find('.input-args').setValue('1,2');
    wrapper.find('.btn-generate').trigger('click');

    expect(vm.req).to.deep
      .equal({ sequencer: 'rangeSeq', pipelines: ['isEven'], args: ['1', '2'] });
  });

  it('should render correct contents', () => {
    const wrapper = mount(Menu);
    const vm = wrapper.vm;

    // check if 3 menu containers are loaded
    expect(vm.$el.querySelectorAll('.menu-group').length)
      .to.equal(3);
  });
});
