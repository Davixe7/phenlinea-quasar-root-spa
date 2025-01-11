<script setup>
import { useAdminStore } from 'src/stores/admins';
import { computed, ref } from 'vue';
const store = useAdminStore()
const props = defineProps(['admin'])
const emits = defineEmits(['saved'])
const admin = ref(props.admin)
const panel = ref('basic')
const loading = ref(false)
const errors = computed(() => {
    if (Object.keys(store.errors).length < 1) { return {}; }
    let newErrors = {}
    Object.keys(store.errors).forEach(attribute => !!store.errors[attribute] ? newErrors[attribute] = store.errors[attribute][0] : '')
    return newErrors
})

async function save() {
    if (admin.value.id) {
        try {
            await store.updateAdmin(admin.value)
            emits('saved')
        } catch (error) { }
        return
    }

    try {
        await store.storeAdmin(admin.value)
        emits('saved')
    } catch (error) { }
}
</script>

<template>
    <div style="background: #fff; width: 420px;">
        <div class="text-h6 q-pa-md">Editar administrador</div>
        <q-option-group
            style="margin-left: 0;"
            v-model="panel"
            inline
            :options="[
                { label: 'Básico', value: 'basic' },
                { label: 'Zhyaf', value: 'zhyaf' },
                { label: 'Credenciales', value: 'credentials' }
            ]"
        />
        <q-tab-panels
            v-model="panel"
            animated
            class="rounded-borders"
        >
            <q-tab-panel
                name="basic"
                class="q-gutter-y-md"
            >
                <q-input
                    v-model="admin.nit"
                    label="NIT"
                    outlined
                    stack-label
                    hide-bottom-space
                    :error-message="errors.nit"
                    :error="!!errors.nit"
                ></q-input>

                <q-input
                    v-model="admin.name"
                    label="Nombre"
                    outlined
                    stack-label
                    hide-bottom-space
                    :error-message="errors.name"
                    :error="!!errors.name"
                >
                </q-input>

                <q-input
                    v-model="admin.contact_email"
                    label="Email"
                    outlined
                    stack-label
                    hide-bottom-space
                    :error-message="errors.contact_email"
                    :error="!!errors.contact_email"
                >
                </q-input>
                <div class="row q-col-gutter-x-md">
                    <div class="q-col">
                        <q-input
                            v-model="admin.phone"
                            label="Teléfono"
                            outlined
                            stack-label
                            hide-bottom-space
                            :error-message="errors.phone"
                            :error="!!errors.phone"
                        >
                        </q-input>
                    </div>
                    <div class="col">
                        <q-input
                            v-model="admin.phone_2"
                            label="Teléfono 2 (opcional)"
                            outlined
                            stack-label
                            hide-bottom-space
                            :error-message="errors.phone_2"
                            :error="!!errors.name"
                        >
                        </q-input>
                    </div>
                </div>
                <q-input
                    v-model="admin.address"
                    label="Dirección"
                    outlined
                    stack-label
                    hide-bottom-space
                    :error-message="errors.address"
                    :error="!!errors.address"
                ></q-input>
            </q-tab-panel>

            <q-tab-panel
                name="zhyaf"
                class="q-gutter-y-md"
            >
                <q-input
                    v-model="admin.device_community_id"
                    label="ID de la comunidad"
                    outlined
                    stack-label
                    hide-bottom-space
                    :error-message="errors.device_community_id"
                    :error="!!errors.device_community_id"
                ></q-input>
                <q-input
                    v-model="admin.device_building_id"
                    label="ID del Edificio"
                    outlined
                    stack-label
                    hide-bottom-space
                    :error-message="errors.device_building_id"
                    :error="!!errors.device_building_id"
                ></q-input>
                <q-input
                    v-model="admin.device_serial_number"
                    label="Serial del dispositivo"
                    outlined
                    stack-label
                    hide-bottom-space
                    :error-message="errors.device_serial_number"
                    :error="!!errors.device_serial_number"
                ></q-input>
                <q-input
                    v-model="admin.visits_lifespan"
                    label="Plazo de validez de las visitas"
                    outlined
                    stack-label
                    hide-bottom-space
                    :error-message="errors.visits_lifespan"
                    :error="!!errors.visits_lifespan"
                ></q-input>
            </q-tab-panel>

            <q-tab-panel
                name="credentials"
                class="q-gutter-y-md"
            >
                <q-input
                    v-model="admin.email"
                    label="Email"
                    outlined
                    stack-label
                    hide-bottom-space
                    :error-message="errors.email"
                    :error="!!errors.email"
                ></q-input>
                <q-input
                    v-model="admin.password"
                    label="Contraseña"
                    outlined
                    stack-label
                    hide-bottom-space
                    :error-message="errors.password"
                    :error="!!errors.password"
                    type="password"
                >
                    <template v-slot:append="">
                        <q-btn
                            flat
                            round
                            icon="remove_red_eye"
                        ></q-btn>
                    </template>
                </q-input>
            </q-tab-panel>
        </q-tab-panels>
        <div class="flex justify-end q-pa-md">
            <q-btn
                color="primary"
                :loading="loading"
                @click="save()"
            >Guardar Cambios</q-btn>
        </div>
    </div>
</template>