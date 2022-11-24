<script setup>
import { ref } from "vue";
import CButton from "./CButton.vue";
import CInput from "./CInput.vue";
import CSelect from "./CSelect.vue";
import useDetectOutsideClick from "../composables/detectOutsideClick";
import { useTodoStore } from "../stores/todo";
import { useRoute } from "vue-router";
import { useActivityStore } from "../stores/activity";

const activityStore = useActivityStore();
const todoStore = useTodoStore();
const route = useRoute();
const emit = defineEmits(["closeModal", "addTodo", "updateTodo"]);

const modal = ref(null);

const closeModal = () => {
  emit("closeModal");
};

useDetectOutsideClick(modal, () => {
  closeModal();
});

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  todo: {
    type: Object,
    default: () => ({
      id: null,
      title: "",
      priority: "very-high",
    }),
  },
});

const priorityOptions = ref([
  {
    label: `<div class="flex items-center gap-x-[19px]"> <div class="bg-[#ED4C5C] rounded-full h-[14px] w-[14px]"></div>Very High</div>`,
    value: "very-high",
  },
  {
    label: `<div class="flex items-center gap-x-[19px]"> <div class="bg-[#F8A541] rounded-full h-[14px] w-[14px]"></div>High</div>`,
    value: "high",
  },
  {
    label: `<div class="flex items-center gap-x-[19px]"> <div class="bg-[#00A790] rounded-full h-[14px] w-[14px]"></div>Medium</div>`,
    value: "medium",
  },
  {
    label: `<div class="flex items-center gap-x-[19px]"> <div class="bg-[#428BC1] rounded-full h-[14px] w-[14px]"></div>low</div>`,
    value: "low",
  },
  {
    label: `<div class="flex items-center gap-x-[19px]"> <div class="bg-[#8942C1] rounded-full h-[14px] w-[14px]"></div>Very Low</div>`,
    value: "very-low",
  },
]);

const newTodo = ref({
  id: props.todo.id || null,
  activity_group_id: route.params.id,
  title: props.todo.title || "",
  priority: props.todo.priority || "very-high",
});

const upsertTodo = async () => {
  const { id, ...data } = newTodo.value;
  if (id) {
    await todoStore.update(id, data);
  } else {
    await todoStore.create(data);
  }
  await activityStore.get(route.params.id);
  emit("closeModal");
};
</script>

<template>
  <div
    class="fixed top-0 bottom-0 w-full h-full overflow-x-hidden transition-opacity bg-black bg-opacity-30 flex justify-center items-center"
  >
    <div
      ref="modal"
      class="bg-white pt-6 pb-[19px] w-[830px] rounded-xl"
      data-cy="modal-add"
    >
      <div class="flex justify-between pl-[30px] pr-[41px] border-b pb-5">
        <h6 data-cy="modal-add-title" class="text-lg font-semibold">
          {{ title }}
        </h6>
        <button @click="closeModal" data-cy="modal-add-close-button">
          <img
            src="@/assets/modal-add-close-button.svg"
            alt="modal-add-close-button"
          />
        </button>
      </div>
      <div
        class="pt-[38px] pb-[23px] pl-[30px] pr-[41px] flex flex-col gap-y-[26px]"
      >
        <c-input
          title="nama list item"
          placeholder="Tambahkan nama list item"
          data-cy-title="modal-add-name-title"
          data-cy-input="modal-add-name-input"
          v-model="newTodo.title"
        />
        <c-select
          title="priority"
          placeholder="Pilih priority"
          :options="priorityOptions"
          v-model="newTodo.priority"
        />
      </div>
      <div class="flex justify-end pr-10 border-t pt-[15px]">
        <c-button
          @click="upsertTodo"
          class="px-[39px] disabled:opacity-20"
          data-cy="modal-add-save-button"
        ></c-button>
      </div>
    </div>
  </div>
</template>
