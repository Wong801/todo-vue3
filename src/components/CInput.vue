<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
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

const emit = defineEmits(["update:modelValue"]);

const updateValue = (e) => {
  emit("update:modelValue", e.target.value);
};
</script>

<template>
  <div class="w-full flex flex-col gap-y-[9px]">
    <p class="uppercase text-xs font-semibold" :data-cy="dataCyTitle">
      {{ title }}
    </p>
    <input
      :type="type"
      :placeholder="placeholder"
      @input="updateValue"
      :value="modelValue"
      class="border border-[#E5E5E5] rounded-md px-[18px] py-[14px] placeholder:text-[#A4A4A4] focus:outline-primary caret-primary"
      :data-cy="dataCyInput"
    />
  </div>
</template>
