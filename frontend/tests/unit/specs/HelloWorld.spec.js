import Vue from 'vue';
import Main from '@/components/Main';

describe('Main.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(HelloWorld);
    const vm = new Constructor().$mount();
    Main;
    // expect(vm.$el.querySelector('.hello h1').textContent);
  });
});
