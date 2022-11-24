<script setup>
import { onMounted, ref, watch } from "vue";
import useDetectOutsideClick from "../composables/detectOutsideClick";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Select",
  },
  options: {
    type: Array,
    default: () => [],
  },
  dataCyTitle: {
    type: String,
    default: "",
  },
  dataCyInput: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
});

const currentItem = ref({
  label: props.placeholder,
  value: null,
});

const emit = defineEmits(["update:modelValue"]);

const showMenu = ref(false);
const select = ref(null);

const setShowMenu = () => {
  showMenu.value = !showMenu.value;
};

const selectOptions = ref([]);

function emitSelected(item) {
  currentItem.value = item;
  emit("update:modelValue", item.value);
  showMenu.value = false;
}

const setSelectedValue = () => {
  const options = ref([
    {
      label: props.placeholder,
      value: null,
    },
    ...selectOptions.value,
  ]);
  currentItem.value = options.value.find(
    (data) => data.value === props.modelValue
  );
};

useDetectOutsideClick(select, () => {
  showMenu.value = false;
});

onMounted(() => {
  selectOptions.value = props.options.map((val) => {
    if (typeof val === "string") {
      return {
        label: val,
        value: val,
      };
    }
    return val;
  });
  if (props.modelValue) {
    setSelectedValue();
  }
});

watch(
  () => props.modelValue,
  () => {
    setSelectedValue();
  }
);
</script>

<template>
  <div class="w-full flex flex-col gap-y-[9px]">
    <p class="uppercase text-xs font-semibold" :data-cy="dataCyTitle">
      {{ title }}
    </p>
    <div class="relative" ref="select">
      <div
        @click="setShowMenu"
        class="flex w-[205px] justify-between py-[14px] px-[17px] border rounded-t-md"
        :class="showMenu ? 'bg-[#F4F4F4]' : 'rounded-b-md'"
        data-cy="modal-add-priority-item"
      >
        <div v-html="showMenu ? placeholder : currentItem.label"></div>
        <button>{{ showMenu ? "&#9652;" : "&#9662;" }}</button>
      </div>
      <div v-show="showMenu" class="absolute w-[205px] bg-white">
        <div
          v-for="(item, i) in selectOptions"
          :key="i"
          @click="emitSelected(item)"
          class="pl-[17px] pr-[23px] py-[14px] border flex justify-between items-center hover:bg-primary"
          :data-cy="`modal-add-priority-${item.value}`"
        >
          <div v-html="item.label"></div>
          <img
            v-if="item.value === currentItem.value"
            src="@/assets/tabler_check.svg"
          />
        </div>
      </div>
    </div>
  </div>
</template>
