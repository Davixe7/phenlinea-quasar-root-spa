<script setup>
import { ref, onMounted } from 'vue'
import { api } from './../boot/axios'
import ScanQr from './ScanQr.vue'
import RootInstanceForm from './../components/RootInstanceForm.vue'
import BatchMessages from './BatchMessages.vue'
import WhatsappClientForm from './WhatsappClientForm.vue'
import PageInstances from './PageInstances.vue'

const dialog = ref(false)
const providers = ref([])
const targetInstance = ref(null)
const targetProvider = ref(null)

async function fetchProviders() {
    providers.value = (await api.get('whatsapp_clients')).data.data
}

function scanQr(instance) {
    targetInstance.value = instance
    targetProvider.value = providers.value.find(provider => targetInstance.value.whatsapp_client_id == provider.id)
    dialog.value = true
}

onMounted(() => fetchProviders())
</script>

<template>
    <div style="max-width: 1000px; margin: 0 auto;">
        <BatchMessages></BatchMessages>

        <PageInstances></PageInstances>

        <div class="h2">
            Proveedores de servicio
        </div>
        <div class="row q-col-gutter-x-md">
            <div
                class="col-12 col-md-3"
                v-for="provider in providers"
                :key="provider.id"
            >
                <WhatsappClientForm :provider="provider">
                </WhatsappClientForm>
            </div>
        </div>
    </div>
</template>

<style>
.h2 {
    font-size: 18px;
    font-weight: 600;
    color: #404040;
}
</style>