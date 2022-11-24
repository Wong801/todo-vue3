import { defineStore } from "pinia";
import api from "../plugins/axios";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    list: [],
    detail: null,
  }),

  actions: {
    async list(id) {
      const res = await api.get("/todo-items", {
        params: {
          activity_group_id: id,
        },
      });
      this.list = res.data.data;
    },
    async create(body) {
      await api.post("/todo-items", body);
      return true;
    },
    async update(id, body) {
      await api.patch(`/todo-items/${id}`, body);
      return true;
    },
    async delete(id) {
      await api.delete(`/todo-items/${id}`);
      return true;
    },
  },
});
