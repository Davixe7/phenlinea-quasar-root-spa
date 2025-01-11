<script setup>
import { usePorteriaStore } from 'src/stores/porterias';
import { useAdminStore } from 'src/stores/admins';
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

const adminStore = useAdminStore();
const admins = storeToRefs(adminStore).admins.value
const store = usePorteriaStore()
const props = defineProps(['porteria'])
const porteria = ref(props.porteria)
const panel = ref('basic')
const loading = ref(false)
const errors = computed(() => {
    if (Object.keys(store.errors).length < 1) { return {}; }
    let newErrors = {}
    Object.keys(store.errors).forEach(attribute => !!store.errors[attribute] ? newErrors[attribute] = store.errors[attribute][0] : '')
    return newErrors
})
onMounted(() => adminStore.fetchAdmins())
</script>

<template>
    <q-card style="width: 420px;">
        <q-card-section>
            <div class="text-h6">Configurar Porteria</div>
        </q-card-section>
        <q-card-section class="q-gutter-y-md">
            <!-- emit-value along with option-value -->
            <!-- map-options to show option-label in selection -->
            <q-select
                :loading="!!admins.legnth"
                v-model="porteria.admin_id"
                label="Administrador"
                stack-label
                outlined
                :options="admins"
                :option-label="'name'"
                emit-value
                option-value="id"
                map-options
            >
            </q-select>
            <q-input
                v-model="porteria.name"
                label="Nombre"
                outlined
                stack-label
                hide-bottom-space
                :error-message="errors.name"
                :error="!!errors.name"
            ></q-input>

            <q-input
                v-model="porteria.email"
                label="Email"
                outlined
                stack-label
                hide-bottom-space
                :error-message="errors.email"
                :error="!!errors.email"
            ></q-input>

            <q-input
                v-model="porteria.password"
                label="Contraseña"
                outlined
                stack-label
                hide-bottom-space
                :error-message="errors.password"
                :error="!!errors.password"
            ></q-input>
        </q-card-section>
        <div class="flex justify-end q-pa-md">
            <q-btn
                color="primary"
                :loading="loading"
                @click="porteria.id ? store.updatePorteria(porteria) : store.storePorteria(porteria)"
            >Guardar Cambios</q-btn>
        </div>
    </q-card>
</template>