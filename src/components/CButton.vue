<script setup>
const emit = defineEmits(["onClick"]);

const onClick = () => {
  emit("onClick");
};
</script>

<template>
  <button
    @click="onClick"
    class="flex gap-x-[6px] bg-primary text-white items-center rounded-full py-[13.5px]"
  >
    <slot>Simpan</slot>
  </button>
</template>
