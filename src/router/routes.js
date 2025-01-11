const routes = [
  {
    path: '/login',
    component: () => import('pages/LoginForm.vue')
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '/admins', component: () => import('pages/PageAdmins.vue')},
      {path: '/porterias', component: () => import('pages/PagePorterias.vue')},
      {path: '/facturas', component: () => import('pages/PageInvoices.vue')},
      {path: '/whatsapp', component: () => import('pages/PageProviders.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
