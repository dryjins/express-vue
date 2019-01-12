import { mount } from '@vue/test-utils';
import BarChart from '@/components/BarChart';

describe('BarChart.vue', () => {
  // Inspect the raw component options
  it('has a mounted hook', () => {
    expect(typeof BarChart.mounted).to.equal('function');
  });

  // Evaluate the results of functions in
  // the raw component options
  it('sets the correct default data', () => {
    const testData = {
      barChart: undefined,
      width: 1200,
      height: 600,
      d: [],
    };
    expect(typeof BarChart.data).to.equal('function');
    const defaultData = BarChart.data();
    expect('barChart' in defaultData).to.equal(true);
    expect(defaultData.width).to.equal(testData.width);
    expect(defaultData.height).to.equal(testData.height);
    expect(defaultData.d).to.deep.equal(testData.d);
  });

  it('should contain proper methods', () => {
    const wrapper = mount(BarChart);
    const vm = wrapper.vm;
    expect(typeof vm.createBarChart).to.be.equal('function');
    expect(typeof vm.initChart).to.be.equal('function');
    expect(typeof vm.updateChart).to.be.equal('function');
  });

  // check if the main container are loaded
  it('should render correct contents', (done) => {
    const wrapper = mount(BarChart);
    expect(wrapper.findAll('#bar-chart').length)
      .to.equal(1);
    done();
  });
});
