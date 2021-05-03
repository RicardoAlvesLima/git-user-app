<template>
  <box-icon
      :name="this.name"
      :size="size"
      :type="this.solid ? 'solid' : this.type"
      :color=" this.white ? '#f5f5f5' : '#343434'"
  />
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: String,
    solid: Boolean,
    white: Boolean,
    size: String,
    type: String
  }
}
</script>
