<script setup>
import { ref, onMounted } from "vue";
import { api } from "../../boot/axios";
import WAProviderForm from "./WAClientForm.vue";

const dialog = ref(false);
const providers = ref([]);
const targetInstance = ref(null);
const targetProvider = ref(null);

async function fetchProviders() {
  providers.value = (await api.get("whatsapp_clients")).data.data;
}

function scanQr(instance) {
  targetInstance.value = instance;
  targetProvider.value = providers.value.find(
    (provider) => targetInstance.value.whatsapp_client_id == provider.id
  );
  dialog.value = true;
}

onMounted(() => fetchProviders());
</script>

<template>
  <div style="max-width: 1000px; margin: 0 auto">
    <div class="h2 q-my-md">Proveedores de servicio</div>
    <div class="row q-col-gutter-x-md">
      <div
        class="col-12 col-md-3"
        v-for="provider in providers"
        :key="provider.id"
      >
        <WAProviderForm :provider="provider"></WAProviderForm>
      </div>
    </div>
  </div>
</template>

<style>
.h2 {
  font-size: 18px;
  font-weight: 500;
  color: #404040;
}
</style>
