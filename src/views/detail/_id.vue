<script setup>
import { computed, defineAsyncComponent, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import CButton from "../../components/CButton.vue";
import useDetectOutsideClick from "../../composables/detectOutsideClick";
import { useActivityStore } from "../../stores/activity";
import { useTodoStore } from "../../stores/todo";

const AddTodo = defineAsyncComponent(() =>
  import("../../components/AddTodo.vue")
);

const TodoCard = defineAsyncComponent(() =>
  import("../../components/TodoCard.vue")
);

const activityStore = useActivityStore();
const todoStore = useTodoStore();
const route = useRoute();
const router = useRouter();

const activity = computed(() => activityStore.detail);
const isTitleEdit = ref(false);
const editTitle = ref(null);

const todoTitleEditButton = ref(null);

onMounted(async () => {
  await activityStore.get(route.params.id);
});

useDetectOutsideClick(todoTitleEditButton, (e) => {
  if (e.target !== editTitle.value) {
    isTitleEdit.value = false;
  }
});

const todoTitle = (title, state) => {
  return [
    {
      label: `<div class="flex items-center gap-x-[16px]"> <div data-cy="todo-item-priority-indicator" class="bg-[#ED4C5C] rounded-full h-[14px] w-[14px]"></div>
        <p data-cy="todo-item-title" ${
          state === 0 ? 'class="line-through text-[#888888]"' : ""
        }>${title}</p>
      </div>`,
      value: "very-high",
    },
    {
      label: `<div class="flex items-center gap-x-[16px]"> <div data-cy="todo-item-priority-indicator" class="bg-[#F8A541] rounded-full h-[14px] w-[14px]"></div>
        <p data-cy="todo-item-title" ${
          state === 0 ? 'class="line-through text-[#888888]"' : ""
        }>${title}</p>
      </div>`,
      value: "high",
    },
    {
      label: `<div class="flex items-center gap-x-[16px]"> <div data-cy="todo-item-priority-indicator" class="bg-[#00A790] rounded-full h-[14px] w-[14px]"></div>
        <p data-cy="todo-item-title" ${
          state === 0 ? 'class="line-through text-[#888888]"' : ""
        }>${title}</p>
      </div>`,
      value: "medium",
    },
    {
      label: `<div class="flex items-center gap-x-[16px]"> <div data-cy="todo-item-priority-indicator" class="bg-[#428BC1] rounded-full h-[14px] w-[14px]"></div>
        <p data-cy="todo-item-title" ${
          state === 0 ? 'class="line-through text-[#888888]"' : ""
        }>${title}</p>
      </div>`,
      value: "low",
    },
    {
      label: `<div class="flex items-center gap-x-[16px]"> <div data-cy="todo-item-priority-indicator" class="bg-[#8942C1] rounded-full h-[14px] w-[14px]"></div>
        <p data-cy="todo-item-title" ${
          state === 0 ? 'class="line-through text-[#888888]"' : ""
        }>${title}</p>
      /div>`,
      value: "very-low",
    },
  ];
};

const newActivityTitle = ref("");

const isAddTodo = ref(false);

const createNewTodo = () => {
  isAddTodo.value = true;
  todo.value = {};
};

const setTodoState = async (id, state) => {
  await todoStore.update(id, { is_active: state === 0 ? 1 : 0 });
  await activityStore.get(route.params.id);
};

const todo = ref({});

const editTodo = (detail) => {
  todo.value = detail;
  isAddTodo.value = true;
};

const deleteTodo = async (id) => {
  await todoStore.delete(id);
  await activityStore.get(route.params.id);
};

watch(
  () => isTitleEdit.value,
  async () => {
    if (!isTitleEdit.value && newActivityTitle.value !== activity.value.title) {
      await activityStore.update(route.params.id, newActivityTitle.value);
      await activityStore.get(route.params.id);
    }
  }
);
</script>

<template>
  <div v-if="activity" class="container mx-auto">
    <div
      data-cy="activity-header"
      class="flex justify-between items-center mt-[49px] mb-[59px]"
    >
      <div class="flex items-center gap-x-[19px]">
        <button
          @click="router.push({ name: 'home' })"
          data-cy="todo-back-button"
        >
          <img src="@/assets/todo-back-button.svg" alt="todo-back-button" />
        </button>
        <h1 v-if="!isTitleEdit" data-cy="todo-title" class="font-bold text-4xl leading-[54px]">
          {{ activity.title }}
        </h1>
        <input
          v-else
          ref="editTitle"
          type="text"
          v-model="newActivityTitle"
          class="font-bold text-4xl leading-[54px] bg-[#f4f4f4] border-b border-black focus:outline-none"
        />
        <button
          @click="
            isTitleEdit = !isTitleEdit;
            newActivityTitle = activity.title;
          "
          ref="todoTitleEditButton"
          data-cy="todo-title-edit-button"
        >
          <img
            src="@/assets/todo-title-edit-button.svg"
            alt="todo-title-edit-button"
          />
        </button>
      </div>
      <div class="flex items-center gap-x-[19px]">
        <button v-if="activity.todo_items.length" data-cy="todo-sort-button">
          <img src="@/assets/todo-sort-button.svg" alt="todo-sort-button" />
        </button>
        <c-button
          @click="createNewTodo"
          data-cy="todo-add-button"
          class="pl-[22px] pr-[29px]"
        >
          <span class="text-2xl text-white">+</span>
          <p class="text-xl text-white">Tambah</p>
        </c-button>
      </div>
    </div>
    <div v-if="!activity.todo_items.length" data-cy="todo-empty-state">
      <img
        @click="createNewTodo"
        src="@/assets/todo-empty-state.svg"
        alt="todo-empty-state"
        class="mx-auto"
      />
    </div>
    <div v-else class="flex flex-col gap-x-[10px]">
      <todo-card
        v-for="(todo, index) in activity.todo_items"
        :key="todo.id"
        :data-cy="`todo-item-${index}`"
        @edit="editTodo(todo)"
        @delete="deleteTodo(todo.id)"
      >
        <div class="flex items-center gap-x-[16px]">
          <input
            data-cy="todo-item-checkbox"
            class="h-5 w-5 rounded-none"
            type="checkbox"
            :id="todo.id"
            :checked="todo.is_active === 0"
            @click="setTodoState(todo.id, todo.is_active)"
          />
          <div
            v-html="
              todoTitle(todo.title, todo.is_active).find(
                (priority) => priority.value === todo.priority
              ).label
            "
          ></div>
        </div>
      </todo-card>
    </div>
  </div>
  <add-todo
    v-if="isAddTodo"
    @close-modal="isAddTodo = false"
    :title="!Object.keys(todo).length ? 'Tambah List Item' : 'Edit List Item'"
    :todo="todo"
  ></add-todo>
</template>
