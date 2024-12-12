<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="navbar">
      <div class="container">
        <div class="navbar-content">
          <div class="logo">
            <div class="logo-icon">
              <q-icon name="directions_bus" size="32px" class="bus-icon" />
            </div>
            <span class="logo-title">Conductor Portal</span>
          </div>

          <div class="right-side">
            <!-- Notification button -->
            <q-btn
              round
              icon="notifications"
              @click="toggleNotifications"
              flat
              class="notification-btn"
            >
              <q-badge floating color="red" label="" v-if="hasUnreadNotifications" />
            </q-btn>

            <!-- Notifications Dialog -->
            <q-dialog
              v-model="isNotificationsDialogOpen"
              persistent
              transition-show="scale"
              transition-hide="scale"
            >
              <q-card class="notification-card">
                <q-card-section class="q-pt-none">
                  <div class="text-h6">Notifications</div>
                </q-card-section>
                <q-list>
                  <q-item v-for="(notification, index) in notifications" :key="index">
                    <q-item-section avatar>
                      <q-icon name="event_note" size="24px" class="notification-icon" />
                    </q-item-section>
                    <q-item-section>
                      <p class="q-mb-xs">{{ notification.message }}</p>
                      <p class="text-caption text-grey-6">{{ notification.timestamp }}</p>
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-card-actions align="right">
                  <q-btn flat label="Close" color="primary" @click="closeNotifications" />
                </q-card-actions>
              </q-card>
            </q-dialog>

            <!-- Profile dropdown -->
            <div class="profile-dropdown">
              <div class="profile-info">
                <p class="profile-name">XYZABC</p>
                <p class="profile-id">Driver #4872</p>
              </div>

              <q-avatar size="40px" class="cursor-pointer" @click="toggleProfileMenu">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400"
                  alt="Driver profile"
                />
              </q-avatar>

              <q-menu v-model="isProfileMenuOpen" cover auto-close>
                <q-list>
                  <q-item>
                    <q-item-section>
                      <p class="q-mb-xs"><strong>XYZABC</strong></p>
                      <p class="text-h6">Driver #4872</p>
                    </q-item-section>
                  </q-item>
                  <q-item clickable @click="logout">
                    <q-item-section>
                      <q-btn flat label="Log Out" color="negative" />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
          </div>
        </div>
      </div>
    </q-header>

    <q-drawer v-model="isMenuOpen" side="left" overlay bordered>
      <q-list>
        <q-item clickable @click="goHome">
          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item clickable @click="goProfile">
          <q-item-section>Profile</q-item-section>
        </q-item>
        <q-item clickable @click="toggleNotifications">
          <q-item-section>Notifications</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Footer -->
    <q-footer class="footer bg-gradient" elevated>
      <q-tabs
        align="center"
        dense
        class="tabs-container"
        active-color="primary"
        indicator-color="white"
      >
        <q-route-tab icon="home" class="tab-hover" to="/" />
        <q-route-tab icon="history" class="tab-hover" to="/history" />
        <q-route-tab icon="person" class="tab-hover" to="/profile-page" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const hasUnreadNotifications = ref(true)
const isProfileMenuOpen = ref(false)
const isMenuOpen = ref(false)
const isNotificationsDialogOpen = ref(false)

const notifications = ref([
  {
    message: 'New route assignment: Route 42, Sector 15 to Sector 28.',
    timestamp: '2024-12-12 08:00 AM',
  },
  {
    message: 'Maintenance reminder: Engine check required for Bus #4872.',
    timestamp: '2024-12-11 06:00 PM',
  },
  {
    message: 'Weather alert: Heavy rainfall expected between 8 AM to 10 AM.',
    timestamp: '2024-12-12 07:30 AM',
  },
  {
    message: 'Schedule update: Break time extended by 30 minutes.',
    timestamp: '2024-12-12 07:00 AM',
  },
])

const toggleNotifications = () => {
  isNotificationsDialogOpen.value = !isNotificationsDialogOpen.value
}

const closeNotifications = () => {
  isNotificationsDialogOpen.value = false
  hasUnreadNotifications.value = false // Mark notifications as read
}

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value
}

const logout = () => {
  alert('You have logged out!')
}

const goHome = () => {
  alert('Going to Home')
}

const goProfile = () => {
  alert('Going to Profile')
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(145deg, #1d2b64, #284fc3);
  color: white;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 4px 10px,
    rgba(0, 0, 0, 0.1) 0px 1px 6px;
  margin-bottom: 0;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  flex-wrap: wrap;
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-icon {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.5rem;
  border-radius: 50%;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 5px;
}

.logo-icon:hover {
  transform: scale(1.2);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 6px 12px;
}

.bus-icon {
  color: #ffffff;
  transition: color 0.3s ease;
}

.bus-icon:hover {
  color: #ffeb3b;
}

.logo-title {
  font-weight: bold;
  font-size: 1.25rem;
  color: white;
  transition: color 0.3s ease;
}

.logo-title:hover {
  color: #ffeb3b; /* Golden yellow */
}

/* Right-side content (notifications, profile) */
.right-side {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.notification-btn {
  position: relative;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.notification-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: scale(1.1);
}

/* Notification dot */
.notification-dot {
  position: absolute;
  top: 0;
  right: 0;
  height: 0.5rem;
  width: 0.5rem;
  background-color: #f56565;
  border-radius: 50%;
  margin: 0;
}

/* Profile dropdown */
.profile-dropdown {
  display: flex;
  align-items: center;
  gap: 1rem;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  padding-left: 1rem;
  position: relative;
}

/* Profile info styling */
.profile-info {
  text-align: right;
  gap: 0;
}

.profile-name {
  font-weight: 500;
  margin-bottom: 0;
  margin-top: 10px;
}

.profile-id {
  font-size: 0.875rem;
  color: rgba(59, 130, 246, 0.75);
}

/* Profile avatar */
.profile-avatar {
  border-radius: 50%;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.profile-avatar:hover {
  transform: scale(1.1);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 5px;
}

/* Notification card styling */
.notification-card {
  min-width: 300px;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 20px;
  background-color: #fff;
  padding: 1rem;
}

.notification-icon {
  color: #3b82f6;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .logo {
    margin: 0;
    padding-top: 8px;
  }

  .container {
    margin: 0;
    padding: 0;
  }

  .navbar-content {
    display: flex;
    flex-direction: column;
  }

  .side-menu {
    display: none;
  }

  .profile-dropdown {
    margin-left: 0px;
  }

  .profile-menu {
    width: auto;
  }
}
/* Footer Styling */
.footer {
  height: 70px;
  background: linear-gradient(#284fc3, #0a1a3d);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  box-shadow: 0px -4px 15px rgba(0, 0, 0, 0.1); /* Soft shadow for footer */
}

/* Tabs Container */
.tabs-container {
  width: 100%;
  max-width: 500px; /* Prevent tabs from stretching too far */
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  margin: 0 auto;
}

/* Individual Tab Styling */
.q-tab {
  font-size: 16px; /* Adjusted font size for readability */
  font-weight: bold; /* Bold the tab labels */
  color: white; /* Default tab color */
  padding: 8px 16px; /* Add padding for better hit area */
}

/* Hover Effects for Tabs */
.tab-hover {
  position: relative;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  padding: 8px 16px;
  border-radius: 10px; /* Rounded edges for a softer look */
}

.tab-hover:hover {
  transform: scale(1.1); /* Slightly enlarge on hover */
  z-index: 10; /* Bring to the front */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Soft shadow on hover */
  background: linear-gradient(135deg, #0f4b6e, #0099cc); /* Gradient for hover state */
}

/* Tab Indicator */
.q-tabs__indicator {
  background-color: white !important; /* White indicator for active tab */
  height: 4px; /* Slightly thicker indicator */
  border-radius: 2px; /* Rounded corners for the indicator */
}
</style>
