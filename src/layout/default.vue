<template>
  <main>
    <header>
      <h1>Typography</h1>
    </header>
    <section>
      <h1>Header 1</h1>
      <h2>Header 2</h2>
      <h3>Header 3</h3>
      <h4>Header 4</h4>
      <h5>Header 5</h5>
      <h6>Header 6</h6>
    </section>
    <footer>
      <p>Layout - Default (footer)</p>
    </footer>
  </main>
</template>

<script>
  export default {
    data() {
      return { i: 0 };
    }
  }
</script>

<style scoped lang="less">
  @import '../less/variables';

  .header-blue {
    color: @primary;
  }
</style>
