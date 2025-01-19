<script setup>
import { ref } from "vue";
import ScanForm from "./ScanForm.vue";

const props = defineProps(["provider"]);
const data = ref({ ...props.provider });
const scanning = ref(false);
</script>

<template>
  <q-card>
    <q-card-section class="text q-pb-none">
      {{ data.name }}
    </q-card-section>
    <q-card-section class="q-gutter-y-md">
      <q-input outlined stack-label label="URL Base" v-model="data.base_url">
      </q-input>
      <q-input
        outlined
        stack-label
        label="Token de Acceso"
        v-model="data.access_token"
      >
      </q-input>

      <q-input
        outlined
        stack-label
        label="Instancia Encomiendas"
        v-model="data.delivery_instance_id"
      >
        <template v-slot:append>
          <q-btn flat round icon="qr_code" @click="scanning = !scanning">
          </q-btn>
        </template>
      </q-input>

      <q-dialog v-model="scanning">
        <ScanForm :provider="provider"></ScanForm>
      </q-dialog>

      <!-- <RootInstanceForm
                v-for="instance in data.instances"
                :key="instance.id"
                :instance="instance"
                v-model="instance.instance_id"
                @requestQr="scanQr"
            >
            </RootInstanceForm> -->
    </q-card-section>
  </q-card>
</template>
