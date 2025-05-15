<template>
  <button>
    This button has been clicked {{ count }} times.
  </button>
</template>

<script setup lang="ts">
defineProps(['count'])

</script>

<style >
.tiptap .vue-component {
  background-color: var(--purple-light);
  border: 2px solid var(--purple);
  border-radius: 0.5rem;
  margin: 2rem 0;
  position: relative;
}
.tiptap .vue-component label {
    background-color: var(--purple);
    border-radius: 0 0 0.5rem 0;
    color: var(--white);
    font-size: 0.75rem;
    font-weight: bold;
    padding: 0.25rem 0.5rem;
    position: absolute;
    top: 0;
  }

.tiptap .vue-component .content {
  margin-top: 1.5rem;
  padding: 1rem;
}
  

</style>