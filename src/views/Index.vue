<template>
  <div class="home">
    <Navbar />
    <IndexMain class="banner" />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src

import IndexMain from "@/components/IndexMain";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default {
  name: "Index",
  components: {
    IndexMain,
    Navbar,
    Footer
    // Menu,
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
}
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
</style>
