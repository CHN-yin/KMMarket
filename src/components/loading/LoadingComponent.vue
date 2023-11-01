<template>
  <div class="loading">
    <div class="loading__content">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingComponent'
}
</script>

<style lang="scss" scoped>
.loading{
  height: 100vh;
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading__content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: .5rem;
  height: .5rem;
  border-radius: .1rem;
  background-color: #fff;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top-color: #3498db;
  border-radius: 50%;
  animation: spin .5s linear infinite;
}
</style>
