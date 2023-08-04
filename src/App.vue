<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
import { getRandomParam } from "./lottery";

const rotateStatus = ref("idle");
const rotateAngel = ref({ round: 0, angel: 9 });

async function rotate() {
  reset();
  await nextTick();
  rotateAngel.value = getRandomParam();
  rotateStatus.value = "rotate";
}

function reset() {
}

const combinationStyle = computed(() => {
  return rotateStatus.value === "idle"
    ? { transform: "rotate(0deg)", "transition-duration": "0s" }
    : {
        transform: `rotate(${
          rotateAngel.value.round * 360 + rotateAngel.value.angel
        }deg)`,
        "transition-duration": `${rotateAngel.value.round}s`,
      };
});

function transitionend() {
  rotateStatus.value = "idle";
}

onMounted(() => {
  document.addEventListener("transitionend", transitionend);
});

onUnmounted(() => {
  document.removeEventListener("transitionend", transitionend);
});
</script>

<template>
  <div
    class="w-96 h-96 bg-red-400 rotate-0 rounded-full"
    :style="combinationStyle"
  >
    placeholder
  </div>
  <hr />
  <button :disabled="rotateStatus === 'rotate'" @click="rotate">rotate</button>
</template>
