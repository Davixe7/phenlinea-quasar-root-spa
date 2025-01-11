<script setup>
import { api } from 'src/boot/axios';
import { ref, onMounted } from 'vue';

const props = defineProps(['provider'])
const newInstanceId = ref('')
const base64 = ref('')

async function scan() {
    let response = (await api.get(`whatsapp_clients/scan/${props.provider.id}`, { 'instance_type': 'delivery' })).data.data
    newInstanceId.value = response.instance_id
    base64.value = response.base64
}

onMounted(() => scan())
</script>

<template>
    <q-card>
        <q-card-section>
            <div>Instancia de Encomiendas</div>
        </q-card-section>
        <q-card-section>
            <div class="flex justify-center q-mb-lg">
                <q-img
                    :src="base64"
                    style="max-width: 200px;"
                ></q-img>
            </div>
            <q-input
                outlined
                dense
                v-model="newInstanceId"
            >
                <template v-slot:append>
                    <q-btn color="primary">Asignar</q-btn>
                </template>
            </q-input>
        </q-card-section>
    </q-card>
</template>