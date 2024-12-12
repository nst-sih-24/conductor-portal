<template>
  <q-card class="route-card-container">
    <div class="header">
      <h2 class="title">
        <q-icon name="schedule" class="title-icon" />
        Route Schedule
      </h2>
      <div class="tabs">
        <q-btn
          v-for="tab in ['today', 'tomorrow']"
          :key="tab"
          @click="activeTab = tab"
          :class="['tab-button', activeTab === tab ? 'active-tab' : 'inactive-tab']"
          flat
        >
          {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
        </q-btn>
      </div>
    </div>

    <div class="route-list">
      <TripCard v-for="(trip, index) in trips" :key="index" :trip="trip" />
    </div>
  </q-card>
</template>

<script setup>
import { ref, /*computed,*/ onMounted } from 'vue'
import { supabase } from 'src/boot/supabase.js'

import TripCard from 'components/TripCard.vue'

const activeTab = ref('today')

// const routes = [
//   { time: '09:00 AM', route: 'Route 423', from: 'Dwarka', to: 'Nehru Place', status: 'Completed' },
//   {
//     time: '11:30 AM',
//     route: 'Route 340',
//     from: 'Nehru Place',
//     to: 'Karol Bagh',
//     status: 'In Progress',
//   },
//   { time: '14:00 PM', route: 'Route 423', from: 'Karol Bagh', to: 'Dwarka', status: 'Upcoming' },
//   { time: '16:30 PM', route: 'Route 340', from: 'Dwarka', to: 'Nehru Place', status: 'Upcoming' },
// ]

const trips = ref([])

const fetchTrips = async () => {
  try {
    const { data, error } = await supabase
      .from('trip') // Replace 'trips' with your actual table name
      .select('*') // Select only necessary fields
      .order('expected_start_time', { ascending: true })

    if (error) throw error

    trips.value = data
  } catch (err) {
    console.error('Error fetching trips:', err.message)
  }
}

// const fetchRoutes = async () => {
//   try {
//     const { data, error } = await supabase
//       .from('route') // Replace 'routes' with your actual table name
//       .select('time, route, from, to, status') // Select only necessary fields

//     if (error) throw error

//     routes.value = data
//   } catch (err) {
//     console.error('Error fetching routes:', err.message)
//   }
// }

// const filteredRoutes = computed(() => {
//   return routes.filter(() => {
//     return activeTab.value === 'today' || activeTab.value === 'tomorrow'
//   })
// })

// const joinRoute = (route) => {
//   alert(`Joined ${route.route} from ${route.from} to ${route.to}!`)
// }
onMounted(() => {
  // fetchRoutes()
  fetchTrips()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

.route-card-container {
  background-color: white;
  border-radius: 1.25rem;
  padding: 1.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 60%;
  margin-left: 1rem;
  margin-bottom: 2rem;
  color: #1f2937;
  font-family: 'Poppins', sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.title {
  padding-top: 0;
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  color: #1f2937;
}

.title-icon {
  height: 1.5rem;
  width: 1.5rem;
  color: #2563eb;
}

.tabs {
  display: flex;
  border-radius: 0.75rem;
  gap: 0.75rem;
  height: 55px;
}

.tab-button {
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  transition:
    background-color 0.3s,
    color 0.3s;
  color: #1f2937;
}

.tab-button:hover {
  background-color: #e5e7eb;
  color: #1f2937;
}

.active-tab {
  background-color: #2563eb;
  color: white;
}

.inactive-tab {
  background-color: #f3f4f6;
  color: #1f2937;
}

.route-list {
  gap: 1.5rem;
}

.route-card {
  position: relative;
  border-radius: 1.5rem;
  padding: 1.25rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    background-color 0.3s ease;
  cursor: pointer;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
}

.route-card:hover {
  transform: translateY(-8px);
  /* Smooth floating effect */
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.route-details {
  position: relative;
  z-index: 1;
  color: #1f2937;
}

.route-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.route-time {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2563eb;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.status-label {
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-size: 1.1rem;
  font-weight: 500;
  text-transform: capitalize;
  color: #10b981;
  background-color: #d1fae5;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.completed {
  background-color: #d1fae5;
  color: #10b981;
}

.inProgress {
  background-color: #fffbeb;
  color: #eab308;
}

.upcoming {
  background-color: #f3f4f6;
  color: #6b7280;
}

.route-location {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1rem;
}

.location {
  display: flex;
  align-items: center;
  font-size: 1.125rem;
}

.from-to {
  font-size: 1.125rem;
  font-weight: 400;
  color: #1f2937;
}

.location-icon {
  height: 1.25rem;
  width: 1.25rem;
  margin-right: 0.25rem;
  color: #2563eb;
}

.arrow-icon {
  height: 1.25rem;
  width: 1.25rem;
  color: #6b7280;
}

.route-info {
  font-size: 1rem;
  font-weight: 400;
  margin-top: 0.75rem;
  color: #6b7280;
}

.join-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #2563eb;
  color: white;
  font-size: 0.875rem;
  font-weight: 400;
  padding: 0.75rem 1.25rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 2;
}

.join-button:hover {
  background-color: #1d4ed8;
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .route-card-container {
    width: 90%;
    margin-left: 1rem;
    padding: 1.25rem;
  }

  .header {
    flex-direction: row;
    align-items: flex-start;
  }

  .title {
    font-size: 0.8rem;
  }

  .tabs {
    justify-content: center;
    margin-top: 1rem;
  }

  .tab-button {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
  }

  .route-card {
    flex-direction: column;
    padding: 1.5rem;
  }

  .join-button {
    position: static;
    margin-top: 1rem;
    width: 100%;
  }
}
</style>
