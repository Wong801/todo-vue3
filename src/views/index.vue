<script setup>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import ActivityCard from "../components/ActivityCard.vue";
import CButton from "../components/CButton.vue";
import { useActivityStore } from "../stores/activity";

const router = useRouter();

const activityStore = useActivityStore();
const activities = computed(() => activityStore.activityList);

const createNewActivity = async () => {
  await activityStore.create("New Activity");
  await activityStore.list();
};

const enterDetail = (id) => {
  router.push({
    name: "detail",
    params: {
      id,
    },
  });
};

const deleteActivity = async (id) => {
  await activityStore.delete(id);
  await activityStore.list();
};

onMounted(async () => {
  await activityStore.list();
});
</script>

<template>
  <div class="container mx-auto">
    <div
      data-cy="activity-header"
      class="flex justify-between items-center mt-[49px] mb-[59px]"
    >
      <h1 data-cy="activity-title" class="font-bold text-4xl leading-[54px]">Activity</h1>
      <c-button
        @click="createNewActivity"
        data-cy="activity-add-button"
        class="pl-[22px] pr-[29px]"
      >
        <span class="text-2xl text-white">+</span>
        <p class="text-xl text-white">Tambah</p>
      </c-button>
    </div>
    <div v-if="!activities.length" data-cy="activity-empty-state">
      <img
        @click="createNewActivity"
        src="@/assets/activity-empty-state.svg"
        alt="activity-empty-state"
        class="mx-auto"
      />
    </div>
    <div v-else class="grid grid-cols-4 gap-x-5 gap-y-[26px]">
      <activity-card
        v-for="activity in activities"
        :key="activity.id"
        @enter="enterDetail(activity.id)"
        @delete="deleteActivity(activity.id)"
        :data-cy="`activity-item`"
      >
        {{ activity.title }}
        <template #date>
          {{ activity.createdAt }}
        </template>
      </activity-card>
    </div>
  </div>
</template>
