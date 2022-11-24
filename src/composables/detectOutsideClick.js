import { onBeforeUnmount, onMounted } from "vue";

export default function useDetectOutsideClick(component, callback) {
  if (!component) return;
  const listener = (event) => {
    if (
      event.target !== component.value &&
      event.composedPath().includes(component.value)
    ) {
      return;
    }
    if (typeof callback === "function") {
      callback(event);
    }
  };
  onMounted(() => {
    setTimeout(() => {
      window.addEventListener("click", listener);
    }, 1);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("click", listener);
  });

  return { listener };
}
