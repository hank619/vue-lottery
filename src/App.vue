<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
import { getRandomParam } from "./lottery";
import { sleep } from "./utils";
import LotteryBg from "./assets/lottery.png";

// idle, rotating, end
const rotateStatus = ref("idle");
const rotateDeg = ref({ round: 0, angel: 9 });

async function rotate() {
  if (rotateStatus.value === "end") {
    reset();
    await sleep();
  }
  rotateDeg.value = getRandomParam();
  rotateStatus.value = "rotating";
}

function reset() {
  rotateStatus.value = "idle";
}

const combinationStyle = computed(() => {
  return rotateStatus.value === "idle"
    ? { transform: "rotate(0deg)", "transition-duration": "0s" }
    : {
        // rotating and end
        transform: `rotate(${
          rotateDeg.value.round * 360 + rotateDeg.value.angel
        }deg)`,
        "transition-duration": `${
          rotateDeg.value.round + rotateDeg.value.angel / 360
        }s`,
      };
});

function transitionend() {
  rotateStatus.value = "end";
}

onMounted(() => {
  document.addEventListener("transitionend", transitionend);
});

onUnmounted(() => {
  document.removeEventListener("transitionend", transitionend);
});
</script>

<template>
  <div class="flex w-screen h-screen">
    <div class="m-auto flex flex-col items-center relative">
      <img
        class="w-48 md:w-96 h-48 md:h-96 rotate-0 ease-out"
        :style="combinationStyle"
        :src="LotteryBg"
      />

      <div
        class="w-0 h-0 border-8 border-transparent border-b-[96px] md:border-b-[192px] border-b-lime-400 absolute left-1/2 -translate-x-1/2"
      ></div>
      <button
        class="m-10 bg-green-400 px-6 py-2 rounded-full text-white hover:bg-green-300 disabled:bg-gray-200"
        :disabled="rotateStatus === 'rotating'"
        @click="rotate"
      >
        rotate
      </button>
      <a
        href="https://www.flaticon.com/free-icons/roulette"
        class="text-xs"
        title="roulette icons"
        >Roulette icons created by Nikita Golubev - Flaticon</a
      >
    </div>
  </div>
</template>
