<script setup>
import { api } from "src/boot/axios";
import { ref, onMounted } from "vue";

const search = ref("");
const messages = ref([]);
const columns = ref([
  { name: "id", field: "id", label: "ID", sortable: false, align: "left" },
  {
    name: "admin_id",
    field: (row) => row.admin.name,
    label: "Administrador",
    sortable: false,
    align: "left",
  },
  {
    name: "title",
    field: "title",
    label: "Asunto",
    sortable: false,
    align: "left",
  },
  {
    name: "created_at",
    field: "created_at",
    label: "Fecha",
    sortable: true,
    align: "left",
  },
  {
    name: "status",
    field: "status",
    label: "Estado",
    sortable: true,
    align: "left",
  },
  { name: "actions", label: "Acciones", sortable: true, align: "right" },
]);

onMounted(() => fetchMessages());

async function fetchMessages() {
  messages.value = (await api.get("batch_messages")).data.data;
}

async function deleteMessage(message) {
  await api.post(`batch_messages/${message.id}`);
  messages.value.splice(messages.value.indexOf(message), 1);
}
</script>

<template>
  <div class="flex justify-between items-center q-mb-lg">
    <div class="h2">Mensajes masivos</div>
    <q-input dense outlined clearable v-model="search">
      <template v-slot:append><q-icon name="search"></q-icon></template>
    </q-input>
  </div>
  <q-table
    :filter="search"
    :rows="messages"
    :columns="columns"
    :pagination="{ rowsPerPage: 5 }"
  >
    <template v-slot:body-cell-actions="props">
      <q-td class="flex center">
        <q-btn
          dense
          class="q-ml-auto"
          flat
          round
          icon="delete"
          @click="deleteMessage(props.row)"
        >
        </q-btn>
      </q-td>
    </template>
  </q-table>
</template>
