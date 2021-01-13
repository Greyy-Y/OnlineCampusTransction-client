<template>
  <div class="home">
    <Navbar />
    <Main />
    <Footer />
  </div>
</template>

<script>
  // @ is an alias to /src
  import Navbar from '@/components/Navbar'
  import Main from '@/components/Main'
  import Footer from '@/components/Footer'
  export default {
    name: 'Index',
    components: {
      Navbar,
      Main,
      Footer,
    },
  }
</script>
