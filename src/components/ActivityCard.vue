<script setup>
import { ref } from "vue";

const emits = defineEmits(["enter", "delete"]);
const deleteButton = ref(null);

const onDelete = () => {
  emits("delete");
};

const onEnter = (e) => {
  if (e.target !== deleteButton.value) {
    emits("enter");
  }
};
</script>

<template>
  <div
    @click="onEnter"
    class="bg-white shadow-[0_6px_10px_rgba(0,0,0,0.1)] rounded-xl pt-[22px] pr-[22px] pb-[25px] pl-[27px] h-[234px] flex flex-col justify-between hover:cursor-pointer"
  >
    <h6 data-cy="activity-item-title">
      <slot>New Activity</slot>
    </h6>
    <div class="flex justify-between">
      <p class="text-[#888888]" data-cy="activity-item-date">
        <slot name="date" />
      </p>
      <img
        ref="deleteButton"
        @click="onDelete"
        src="@/assets/activity-item-delete-button.svg"
        alt="activity-item-delete-button"
        data-cy="activity-item-delete-button"
      />
    </div>
  </div>
</template>
