<template>
  <div class="wrapper">
    <BackComponent />
    <div class="content">
      未开发
    </div>
  </div>
</template>

<script>
import BackComponent from '@/components/back/BackComponent.vue'
export default {
  name: 'ReplacePage',
  components: { BackComponent }
}
</script>

<style lang="scss" scoped>
.wrapper{
  bottom: 0;
  padding: .16rem;
}
.content{
  width: 100%;
  text-align: center;
  color: #b1b1b1;
  margin: 1rem auto;
  font-size: .18rem;
}
</style>
