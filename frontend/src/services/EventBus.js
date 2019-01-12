import Vue from 'vue';
import ApiHandler from './ApiHandler';

const EventBus = new Vue();
ApiHandler.init(EventBus);
export default EventBus;
