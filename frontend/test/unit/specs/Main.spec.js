import Vue from 'vue';
import Main from '@/components/Main';

describe('Main.vue', () => {
  // check if two containers are loaded
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Main);
    const vm = new Constructor().$mount();

    expect(vm.$el.querySelectorAll('#bar-chart-container, #menu-container').length)
      .to.equal(2);
  });
},
);
