<template>
  <div class="grid info-card"
       :style="{
          height: this.height,
          width: this.width,
          backgroundColor: this.backgroundColor,
          borderRadius: this.radius}">

  </div>
</template>

<script>
export default {
  name: 'InfoCard',
  props: {
    height: String,
    width: String,
    backgroundColor: String,
    radius: String
  }
}
</script>
