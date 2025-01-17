<script setup>
import { useAdminStore } from "src/stores/admins";
import { computed, onMounted, ref } from "vue";
import AdminForm from "./../components/AdminForm.vue";

const store = useAdminStore();
const dialog = ref(false);
const admin = ref({});
const search = ref("");

const admins = computed(() => store.admins);
const columns = ref([
  { name: "id", label: "ID", field: "id", align: "left", sortable: "true" },
  {
    name: "name",
    label: "Nombre",
    field: "name",
    align: "left",
    sortable: "true",
  },
  { name: "nit", label: "NIT", field: "nit", align: "left", sortable: "true" },
  {
    name: "phone",
    label: "Teléfono 1",
    field: "phone",
    align: "left",
    sortable: "true",
  },
  {
    name: "phone_2",
    label: "Teléfono 2",
    field: "phone_2",
    align: "left",
    sortable: "true",
  },
  {
    name: "email",
    label: "Email",
    field: "email",
    align: "left",
    sortable: "true",
  },
  { name: "actions", label: "", align: "right" },
]);

function editAdmin(target) {
  admin.value = target;
  console.log(admins.value.indexOf(target));
  dialog.value = true;
}

onMounted(() => {
  store.fetchAdmins();
});
</script>

<template>
  <q-table
    title="Administradores"
    :columns="columns"
    :rows="admins"
    :filter="search"
    :pagination="{ rowsPerPage: -1 }"
  >
    <template v-slot:top-right>
      <q-input
        v-model="search"
        type="search"
        outlined
        rounded
        stack-label
        clearable
      >
        <template v-slot:append><q-icon name="search"></q-icon></template>
      </q-input>
    </template>
    <template v-slot:body-cell-name="props">
      <q-td class="text-limited">
        {{ props.row.name }}
      </q-td>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td>
        <q-btn flat round :icon="'edit'" @click="editAdmin(props.row)"></q-btn>
      </q-td>
    </template>
  </q-table>

  <q-dialog v-model="dialog">
    <AdminForm :admin="admin" @saved="dialog = false"></AdminForm>
  </q-dialog>

  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn
      fab
      icon="add"
      color="primary"
      @click="
        admin = {};
        dialog = true;
      "
    />
  </q-page-sticky>
</template>
