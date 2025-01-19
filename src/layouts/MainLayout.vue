<template>
  <q-layout view="hHh Lpr lFf">
    <!-- <q-header color="grey">
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
    </q-header> -->

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="miniState"
      :width="240"
    >
      <q-list padding>
        <q-item clickable tag="a" target="_blank">
          <q-item-section avatar>
            <q-avatar rounded>
              <q-img src="/src/assets/logo.png" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label style="font-size: 15.5px; color: #000"
              >PHenlinea</q-item-label
            >
          </q-item-section>
        </q-item>

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
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";

const router = useRouter();
const miniState = ref(false);

async function logout() {
  let baseUrl = new URL(api.defaults.baseURL).origin;
  await api.post(`${baseUrl}/logout`);
  router.push("/login");
}

defineOptions({
  name: "MainLayout",
});

const linksList = [
  {
    title: "Inicio",
    caption: "",
    icon: "sym_o_dashboard",
    link: "inicio",
  },
  {
    title: "Administradores",
    caption: "Listar, crear, actualizar, eliminar",
    icon: "sym_o_domain",
    link: "admins",
  },
  {
    title: "Porterias",
    caption: "Listar, crear, actualizar, eliminar",
    icon: "sym_o_gate",
    link: "porterias",
  },
  {
    title: "Facturas",
    caption: "Historial, importar",
    icon: "sym_o_receipt_long",
    link: "facturas",
  },
  {
    title: "Mensajería",
    caption: "Historial, instancias, proveedores",
    icon: "sym_o_record_voice_over",
    link: "whatsapp",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style>
.q-drawer {
  top: 24px;
  left: 12px;
  bottom: 12px;
  border-radius: 5px;
}
.q-list {
  padding: 0.5rem;
}
.q-item {
  border-radius: 5px;
  font-weight: 500;
  color: #404040;
}
</style>
