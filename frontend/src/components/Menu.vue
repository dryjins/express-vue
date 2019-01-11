<template>
  <div>
    <div class="card-header p-0">
      <div class="row ml-auto mr-auto">
        <div class="col-md-5 px-0">
          <ul class="nav justify-content-center border border-dark">
            <li class="nav-item">
              <a class="nav-link navbar-brand" href="#">Sequencer</a>
            </li>
          </ul>
        </div>
        <div class="col-md-2 pr-0 pl-1">
          <ul class="nav justify-content-center bg-secondary border border-dark">
            <li class="nav-item">
              <a class="nav-link navbar-brand" href="#" style="color: white">Pipeline</a>
            </li>
          </ul>
        </div>
        <div class="col-md-5 pr-0 pl-1">
          <ul class="nav justify-content-center border border-dark">
            <li class="nav-item">
              <a class="nav-link navbar-brand" href="#">Argument</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="card-header p-0 bg-white">
      <div class="row ml-auto mr-auto">
        <div class="col-md-5 pr-0 pl-0">
          <nav class="nav navbar bg-white align-content-center py-1 px-1">
            <button class="btn btn-sm btn-outline-dark"
                    type="button">Smaller button
            </button>
            <button class="btn btn-sm btn-outline-dark"
                    type="button">Smaller button
            </button>
          </nav>
        </div>
        <div class="col-md-2 pr-0 pl-1">
          <nav class="nav navbar bg-white align-content-center py-1 px-1">
            <button class="btn btn-sm btn-outline-secondary"
                    type="button">Smaller button
            </button>
            <button class="btn btn-sm btn-outline-secondary"
                    type="button">Smaller button
            </button>
          </nav>
        </div>
        <div class="col-md-5 pr-0 pl-1">
          <ul class="nav navbar bg-white align-content-center py-1">
            <li class="w-100 ml-auto mr-auto nav-item input-group-sm">
              <input class="form-control rounded-0" placeholder="args">
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="py-2 px-2">
      <div class="row ml-auto mr-auto bg-white">
        <div class="col-md-10 px-1">

        </div>
        <div class="col-md-2 px-1">
          <div class="btn-group btn-group-sm btn-block justify-content-center float-right">
            <button class="btn btn-outline-dark"
                    type="button">Generate
            </button>
            <button class="btn btn-outline-dark"
                    type="button">Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
    };
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
</style>
