<script setup></script>

<template>
  <div data-cy="header" class="bg-primary flex items-center h-[105px]">
    <div data-cy="header-background" class="container m-auto">
      <h2
        data-cy="header-title"
        class="uppercase text-white text-2xl font-bold mb-2 leading-[36px]"
      >
        To do List App
      </h2>
    </div>
  </div>
  <router-view />
</template>

<style scoped></style>
