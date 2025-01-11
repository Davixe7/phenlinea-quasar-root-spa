<template>
  <q-layout view="hHh Lpr lFf">
    <q-header color="grey">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          PHenlinea
        </q-toolbar-title>

        <div>
          <q-btn
            flat
            round
            icon="logout"
            @click="logout"
          ></q-btn>
        </div>
      </q-toolbar>
      <q-tabs align="left">
        <q-route-tab
          to="/admins"
          label="Admins"
        />
        <q-route-tab
          to="/porterias"
          label="Porterias"
        />
        <q-route-tab
          to="/facturas"
          label="Facturas"
        />
        <q-route-tab
          to="/whatsapp"
          label="Mensajería"
        />
      </q-tabs>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Navegación
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="q-pa-lg">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';

const router = useRouter()

async function logout() {
  let baseUrl = new URL(api.defaults.baseURL).origin
  await api.post(`${baseUrl}/logout`)
  router.push('/login')
}

defineOptions({
  name: 'MainLayout'
})

const linksList = [
  {
    title: 'Inicio',
    caption: '',
    icon: 'sym_o_dashboard',
    link: 'https://quasar.dev'
  },
  {
    title: 'Administradores',
    caption: 'Listar, crear, actualizar, eliminar',
    icon: 'sym_o_domain',
    link: 'https://quasar.dev'
  },
  {
    title: 'Porterias',
    caption: 'Listar, crear, actualizar, eliminar',
    icon: 'sym_o_gate',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Facturas',
    caption: 'Historial, importar',
    icon: 'sym_o_receipt_long',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Mensajería',
    caption: 'Historial, instancias, proveedores',
    icon: 'sym_o_record_voice_over',
    link: 'https://forum.quasar.dev'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
