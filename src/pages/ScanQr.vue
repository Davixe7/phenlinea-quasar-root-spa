<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { api } from 'src/boot/axios';

const props = defineProps(['provider', 'instance'])
const instanceId = ref(null)
const qrCode = ref(null)
const updatingInstance = ref(false)

const providerApi = axios.create({ baseURL: props.provider.base_url })

async function getQrCode() {
    let params = { params: { instance_id: instanceId.value, access_token: props.provider.access_token } }
    qrCode.value = (await providerApi.get(`get_qrcode`, params)).data.base64
}

async function getInstanceId() {
    instanceId.value = (await providerApi.get(`create_instance`)).data.instance_id
}

async function updateInstance() {
    updatingInstance.value = true
    try {
        await api.post('whatsapp_instances', { ...props.instance, instance_id: instanceId.value })
    }
    catch (e) {
        console.log('error saving instance to backend: '.e)
    }
    updatingInstance.value = false
}

onMounted(async () => {
    await getInstanceId()
    await getQrCode()
    setInterval(async () => getQrCode(), 15000);
})
</script>

<template>
    <q-card style="width: 260px;">
        <q-card-section class="q-pb-none">
            <div class="text-h6">{{ provider.name }}</div>
            <div>Tipo de instancia: {{ instance.type }}</div>
            <div>ID de instancia: {{ !!instanceId ? instanceId : 'pendiente' }}</div>
        </q-card-section>
        <q-card-section class="q-py-none">
            <div class="flex justify-center items-center">
                <q-spinner
                    v-if="!qrCode"
                    color="primary"
                    size="3em"
                    style="margin-top:75px; margin-bottom: 75px;"
                />
                <q-img
                    v-else
                    width="246px"
                    height="246px"
                    :src="qrCode"
                ></q-img>
            </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
            <q-btn
                :loading="updatingInstance"
                @click="updateInstance"
                class="full-width"
                color="primary"
            >Confirmar</q-btn>
        </q-card-section>
    </q-card>
</template>