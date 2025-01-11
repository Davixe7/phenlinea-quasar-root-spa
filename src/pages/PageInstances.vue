<script setup>
import { api } from 'src/boot/axios';
import { ref, onMounted } from 'vue'

const search = ref('')
const updating = ref(false)
const instances = ref([])
const instanceColumns = ref([
    { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: 'true' },
    { name: 'name', label: 'Administración', field: 'name', align: 'left', sortable: 'true' },
    { name: 'whatsapp_instance_id', label: 'ID de Instancia', align: 'right', sortable: 'true' },
])

onMounted(() => fetchInstances())

async function fetchInstances() {
    try {
        instances.value = (await api.get('whatsapp_instances')).data.data
    }
    catch (error) {
        console.log(error)
    }
}

async function updateInstance(id, whatsapp_instance_id) {
    try {
        updating.value = true
        await api.post(`whatsapp_instances/${id}`, { whatsapp_instance_id })
    }
    catch (error) {
        console.log(error)
    }
    updating.value = false
}
</script>
<template>
    <div class="flex items-center justify-between q-my-lg">
        <div class="h2">
            Instancias de Administradores
        </div>
        <q-input
            clearable
            outlined
            dense
            v-model="search"
        >
            <template v-slot:append><q-icon name="search"></q-icon></template>
        </q-input>
    </div>
    <q-table
        :filter="search"
        :pagination="{ rowsPerPage: -1 }"
        :rows="instances"
        :columns="instanceColumns"
    >
        <template v-slot:body-cell-whatsapp_instance_id="props">
            <q-td>
                <q-input
                    style="max-width: 180px;"
                    outlined
                    dense
                    class="q-ml-auto"
                    v-model="props.row.whatsapp_instance_id"
                >
                    <template v-slot:append>
                        <q-btn
                            :loading="updating"
                            flat
                            dense
                            icon="check"
                            @click="updateInstance(props.row.id, props.row.whatsapp_instance_id)"
                        ></q-btn>
                    </template>
                </q-input>
            </q-td>
        </template>
    </q-table>
</template>