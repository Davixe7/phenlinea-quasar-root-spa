<script setup>
import { ref, onMounted } from 'vue'
import { api } from './../boot/axios'
import { useRouter } from 'vue-router';
const email = ref('root@phenlinea.com')
const password = ref('123456')
const loading = ref(false)
const errors = ref({})
const passVisible = ref(false)
const router = useRouter()

async function attemptLogin() {
    loading.value = true
    let data = { email: email.value, password: password.value }
    try {
        await api.post('login', data)
        router.push('admins')
    }
    catch (error) {
        if (error.response) {
            console.log(error.response.data)
        }
    }
    loading.value = false
}

onMounted(async () => {
    try {
        loading.value = true
        let apiBaseUrl = new URL(api.defaults.baseURL).origin
        await api.get(`${apiBaseUrl}/sanctum/csrf-cookie`)
        loading.value = false
    } catch (error) {
        console.log(error)
    }
})
</script>
<template>
    <div
        class="row"
        style="height: 100vh;"
    >
        <div
            class="col-12 col-md-4"
            style="background: #fff;"
        >
            <q-card flat>
                <q-card-section>
                    <div style="font-size: 18px; font-weight: 500; color: #404040;">
                        Ingresar al sistema
                    </div>
                </q-card-section>
                <q-card-section class="q-gutter-y-sm">
                    <q-input
                        v-model="email"
                        label="Email"
                        outlined
                        stack-label
                        hide-bottom
                        :error-message="errors.email"
                        :error="!!errors.email"
                    >
                    </q-input>
                    <q-input
                        v-model="password"
                        label="Contraseña"
                        :type="passVisible ? 'text' : 'password'"
                        outlined
                        stack-label
                        hide-bottom
                    >
                        <template v-slot:append>
                            <q-btn
                                @click="passVisible = !passVisible"
                                flat
                                round
                                :icon="passVisible ? 'sym_o_visibility_off' : 'sym_o_visibility'"
                            >
                            </q-btn>
                        </template>
                    </q-input>
                </q-card-section>
                <q-card-actions class="flex justify-end">
                    <q-btn
                        color="primary"
                        :loading="loading"
                        @click="attemptLogin"
                    >
                        Ingresar
                    </q-btn>
                </q-card-actions>
            </q-card>
        </div>
    </div>
</template>

<style>
body {
    background: #f3f6fc;
}
</style>