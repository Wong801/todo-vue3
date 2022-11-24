import dayjs from "dayjs";
import { defineStore } from "pinia";
import api from "../plugins/axios";

export const useActivityStore = defineStore("activity", {
  state: () => ({
    activityList: [],
    detail: null,
  }),
  actions: {
    async list() {
      const res = await api.get("/activity-groups", {
        params: {
          email: `${encodeURI("catur.satriowicaksono@")}gmail.com`,
        },
      });
      this.activityList = res.data.data.map((item) => ({
        id: item.id,
        title: item.title,
        createdAt: dayjs(item.created_at).format("DD MMMM YYYY"),
      }));
    },
    async get(id) {
      const res = await api.get(`/activity-groups/${id}`);
      this.detail = res.data;
    },
    async create(title) {
      const body = {
        email: `${encodeURI("catur.satriowicaksono")}@gmail.com`,
        title,
      };
      await api.post("/activity-groups", body);
      return true;
    },
    async update(id, title) {
      await api.patch(`/activity-groups/${id}`, { title });
      return true;
    },
    async delete(id) {
      await api.delete(`/activity-groups/${id}`);
      return true;
    },
  },
});
