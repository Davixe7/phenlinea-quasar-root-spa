import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify } from "quasar";

export const useAdminStore = defineStore("admins", {
  state: () => ({
    admins: [],
    errors: {},
  }),
  actions: {
    async fetchAdmins() {
      this.admins = (await api.get("admins")).data.data;
    },
    async storeAdmin(data) {
      try {
        this.errors = {};
        let newAdmin = (await api.post("admins", data)).data.data;
        this.admins.unshift(newAdmin);

        Notify.create("Creado con éxito.");
      } catch (error) {
        this.errors = error.response ? error.response.data.errors : this.errors;
        throw error;
      }
    },
    async updateAdmin(data) {
      try {
        this.errors = {};

        if (Object.keys(data).includes("password") && data["password"] == "") {
          delete data["password"];
        }

        let newAdmin = (
          await api.post(`admins/${data.id}`, { ...data, _method: "PUT" })
        ).data.data;
        this.admins = this.admins.map((admin) => {
          return admin.id != newAdmin.id ? admin : newAdmin;
        });

        Notify.create("Actualizado con éxito.");
      } catch (error) {
        this.errors = error.response ? error.response.data.errors : this.errors;
        throw error;
      }
    },
  },
});
