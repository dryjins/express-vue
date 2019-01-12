<template>
  <div class="container-fluid h-100">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="card">
          <Menu/>
          <BarChart/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from './Menu';
import BarChart from './BarChart';

export default {
  name: 'Main',
  components: { BarChart, Menu },
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  a {
    color: black;
  }

  html, body {
    height: 100%;
  }
</style>
