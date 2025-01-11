<script setup>
import { usePorteriaStore } from 'src/stores/porterias';
import { computed, onMounted, ref } from 'vue'
import PorteriaForm from 'src/components/PorteriaForm.vue';
import { api } from 'src/boot/axios';

const store = usePorteriaStore()
const dialog = ref(false)
const porteria = ref({})
const search = ref('')

const porterias = computed(() => store.porterias)
const columns = ref([
    { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: 'true' },
    { name: 'adminName', label: 'Admin', field: row => row.admin.name, align: 'left', sortable: 'true' },
    { name: 'name', label: 'Nombre', field: 'name', align: 'left', sortable: 'true' },
    { name: 'email', label: 'Email', field: 'email', align: 'left', sortable: 'true' },
    { name: 'actions', label: '', align: 'right' },
])

function editPorteria(target) {
    porteria.value = target
    console.log(porterias.value.indexOf(target))
    dialog.value = true
}

onMounted(async () => {
    store.fetchPorterias()
})
</script>

<template>
    <q-table
        title="Porterias"
        :columns="columns"
        :rows="porterias"
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
        <template v-slot:body-cell-actions="props">
            <q-td>
                <q-btn
                    flat
                    round
                    :icon="'edit'"
                    @click="editPorteria(props.row)"
                ></q-btn>
            </q-td>
        </template>
    </q-table>

    <q-dialog v-model="dialog">
        <PorteriaForm :porteria="porteria"></PorteriaForm>
    </q-dialog>

    <q-page-sticky
        position="bottom-right"
        :offset="[18, 18]"
    >
        <q-btn
            fab
            icon="add"
            color="primary"
            @click="porteria = {}; dialog = true"
        />
    </q-page-sticky>
</template>