<script setup>
import { ref, onMounted, computed } from 'vue'
import { api } from './../boot/axios'
import { Notify } from 'quasar';

const monthsName = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', ' Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const search = ref('')
const invoices = ref([])
const month = ref('')
const year = ref('')
const fetching = ref(false)

const dialog = ref(false)
const importing = ref(false)
const uploading = ref(false)
const file = ref(null)
const attachmentInput = ref(null)

const columns = ref([
    { name: 'number', label: 'Número', field: 'number', align: 'left', sortable: true },
    { name: 'nit', label: 'NIT', field: row => row.nit, align: 'left', sortable: true },
    { name: 'name', label: 'Nombre', field: row => row.admin.name, align: 'left', sortable: true },
    { name: 'status', label: 'Status', field: 'status', align: 'left', sortable: true },
    { name: 'total', label: 'Total', field: 'total', align: 'left', sortable: true },
    { name: 'paid_at', label: 'Pagado él', field: 'paid_at', align: 'left', sortable: true },
    { name: 'actions', label: 'Acción', align: 'left', sortable: true },
])

const results = computed(() => {
    if (search.value == '') return [...invoices.value]
    return invoices.value.filter(invoice => invoice.admin.name.toLowerCase().includes(search.value.toLowerCase()))
})

async function updateInvoice(invoice) {
    if (!window.confirm('seguro que desea actualizar el estado de la factura?')) return
    let response = await api.post(`invoices/${invoice.id}`, { status: invoice.status, '_method': 'PUT' })
    invoices.value.splice(invoices.value.indexOf(invoice), 1, response.data.data)
    Notify.create('Actualizado con éxito')
}

async function fetchInvoices() {
    fetching.value = true
    let data = { year: year.value, month: month.value }
    let response = await api.get('invoices', { params: data })
    invoices.value = Object.values(response.data.data)
    fetching.value = false
}

async function uploadInvoices() {
    if (!month.value || !year.value) return
    if (typeof file.value == null) return

    let data = new FormData()
    data.append('year', year.value)
    data.append('month', month.value)
    data.append('file', file.value)

    uploading.value = true

    try {
        let response = await api.post('/invoices/', data)
        file.value = null
        fetchInvoices()
    } catch (error) {
        console.log(error)
    }
}

onMounted(async () => {
    let date = new Date()
    year.value = date.getFullYear()
    month.value = date.getMonth() + 1
    fetchInvoices()
})
</script>

<template>
    <q-table
        title="Facturas"
        :rows="invoices"
        :columns="columns"
        :loading="fetching"
        :pagination="{ rowsPerPage: -1 }"
    >
        <template v-slot:top-right="">
            <form>
                <div class="flex q-gutter-x-md q-mb-md">
                    <q-select
                        dense
                        outlined
                        label="Mes"
                        v-model="month"
                        :options="monthsName.map((m, i) => ({ label: m, value: i + 1 }))"
                        emit-value
                        map-options
                        @update:modelValue="fetchInvoices"
                    >
                    </q-select>
                    <q-select
                        dense
                        outlined
                        v-model="year"
                        label="Año"
                        :options="[2022, 2023, 2024]"
                        @update:modelValue="fetchInvoices"
                    >
                    </q-select>
                    <q-input
                        dense
                        outlined
                        v-model="search"
                        type="search"
                        placeholder="Buscar por nombre de unidad"
                    >
                        <template v-slot:append><q-icon name="search"></q-icon></template></q-input>
                </div>
            </form>
        </template>
        <template v-slot:body-cell-actions="props">
            <q-td>
                <q-select
                    outlined
                    dense
                    :disabled="(props.row.payment_method == 'pse' && props.row.status == 'pagado')"
                    v-model="props.row.status"
                    @update:modelValue="updateInvoice(props.row)"
                    :options="['pagado', 'pendiente']"
                >
                </q-select>
            </q-td>
        </template>
    </q-table>
    <q-page-sticky
        position="bottom-right"
        :offset="[18, 18]"
    >
        <q-btn
            fab
            @click="dialog = true"
            icon="add"
            color="primary"
        >
        </q-btn>
    </q-page-sticky>

    <q-dialog v-model="dialog">
        <q-card>
            <q-card-section>
                <div class="text-h6">Cargar XLS</div>
            </q-card-section>
            <q-card-section>
                <form
                    @submit.prevent="uploadInvoices"
                    action="#"
                    method="POST"
                    enctype="multipart/form-data"
                >
                    <div class="q-gutter-y-md">
                        <q-select
                            outlined
                            required
                            v-model="month"
                            label="Mes"
                            :options="monthsName.map((m, i) => ({ label: m, id: i + 1 }))"
                            option-value="id"
                            emit-value
                            map-options
                        >
                        </q-select>
                        <q-select
                            outlined
                            label="Año"
                            required
                            v-model="year"
                            :options="[2022, 2023, 2024]"
                        >
                        </q-select>
                        <q-file
                            outlined
                            label="Archivo Excel"
                            v-model="file"
                            type="file"
                            required
                        >
                        </q-file>
                        <q-btn
                            type="submit"
                            color="primary"
                            :disabled="uploading"
                        >
                            {{ !uploading ? 'Importar facturas' : 'Cargando...' }}
                        </q-btn>
                    </div>
                </form>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>