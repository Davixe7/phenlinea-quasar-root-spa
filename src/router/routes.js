const routes = [
  {
    path: "/login",
    component: () => import("src/pages/PageLogin.vue"),
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/admins", component: () => import("pages/PageAdmins.vue") },
      { path: "/facturas", component: () => import("pages/PageInvoices.vue") },
      { path: "/whatsapp", component: () => import("pages/PageWhatsapp.vue") },
      {
        path: "/porterias",
        component: () => import("pages/PagePorterias.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
