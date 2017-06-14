<template>
  <main>
    <header>
      <h1 class="header-blue" @click="i=i+1">Layout - Default (header)</h1>
      <p>Hello world! {{i}}</p>
    </header>
    <section>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </p>
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
  @import 'variables';

  .header-blue {
    color: @nice-blue;
  }
</style>
