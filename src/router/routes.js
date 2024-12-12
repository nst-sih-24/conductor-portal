const routes = [
  {
    path: '/',
    component: () => import('layouts/CrewLayout.vue'),
    children: [
      { path: '/', component: () => import('src/oldfiles/HomePage.vue') },
      { path: 'profile-page', component: () => import('src/oldfiles/ProfilePage.vue') },
      { path: 'driver-join-page', component: () => import('src/oldfiles/DriverJoinPage.vue') },
      { path: 'conductor-ticket-scanner', component: () => import('src/oldfiles/ConductorTicketScanner.vue') },
      { path: 'feedback', component: () => import('src/oldfiles/FeedbackPage.vue') },
      { path: 'history', component: () => import('src/oldfiles/HistoryPage.vue') },
      { path: 'help', component: () => import('src/oldfiles/HelpPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
