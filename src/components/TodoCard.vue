<script setup>
import { ref } from "vue";

const emits = defineEmits(["edit", "delete"]);
const deleteButton = ref(null);

const onDelete = () => {
  emits("delete");
};

const onEdit = (e) => {
  if (e.target !== deleteButton.value) {
    emits("edit");
  }
};
</script>

<template>
  <div
    class="w-full flex items-center justify-between bg-white shadow-[0_6px_10px_rgba(0,0,0,0.1)] rounded-xl pl-7 pr-6 pt-[26px] pb-[27px]"
  >
    <div class="flex items-center gap-x-[16px]">
      <slot />
      <button
        @click="onEdit"
        ref="todoTitleEditButton"
        data-cy="todo-title-edit-button"
      >
        <img
          src="@/assets/todo-title-edit-button.svg"
          alt="todo-item-edit-button"
        />
      </button>
    </div>
    <img
      ref="deleteButton"
      @click="onDelete"
      class="hover:cursor-pointer"
      src="@/assets/activity-item-delete-button.svg"
      alt="activity-item-delete-button"
      data-cy="todo-item-delete-button"
    />
  </div>
</template>
