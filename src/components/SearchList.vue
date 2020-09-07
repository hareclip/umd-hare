<template>
  <page-wrapper :loaded="loaded">
    Hi
  </page-wrapper>
</template>

<script>
import PageWrapper from "@/components/PageWrapper";
export default {
  name: "SearchList",
  components: {
    PageWrapper,
  },
  data() {
    return {
      loaded: false,
    }
  },
  methods: {
    async load() {
      try {
        this.loaded = true;
      } catch(ex) {
        console.log(ex);
      }
    }
  },
  mounted() {
    console.log(this.$route);
    this.load();  
  }
}
</script>
