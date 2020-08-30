<template>
  <page-wrapper :loaded="loaded">
  <h1 class="title">Comedy on Campus</h1>
  <hr/>
  <div class="content">
    This portion of the website is being developed! Please try again later.
  </div>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/PageWrapper';

export default {
  name: 'ComedyPage',
  components: {
   PageWrapper,
  },
  data () {
    return {
      loaded: true,
    }
  }
}
</script>

<style scoped>
.title {
  font-family: Helvetica, Georgia;
}
.content {
  font-family: Verdana;
  font-size: 14pt;
}
</style>
