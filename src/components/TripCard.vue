<template>
  <q-card class="route-card">
    <div class="route-details">
      <div class="route-header">
        <span class="route-time">{{ startTime }}</span>
        <span
          :class="[
            'status-label',
            {
              completed: props.trip.status === 'Completed',
              inProgress: props.trip.status === 'In Progress',
              upcoming: props.trip.status === 'Upcoming',
            },
          ]"
        >
          {{ props.trip.status }}
        </span>
      </div>
      <div class="route-location" v-if="routeStops.length">
        <div class="location from-to">
          <q-icon name="location_on" class="location-icon" />
          <span>{{ routeStops[0].stop.name }}</span>
        </div>
        <q-icon name="arrow_forward" class="arrow-icon" />
        <div class="location from-to">
          <q-icon name="location_on" class="location-icon" />
          <span>{{ routeStops[routeStops.length - 1].stop.name }}</span>
        </div>
      </div>
      <div class="route-info">
        {{ props.trip.route }} •
        {{ props.trip.status === 'Completed' ? '32 stops completed' : '45 min estimated' }}
      </div>
    </div>

    <q-btn class="join-button" @click="joinRoute(route)" label="Join" color="white" rounded flat />
  </q-card>
</template>

<script setup>
import { supabase } from 'src/boot/supabase.js'
import { ref, onMounted } from 'vue'

const props = defineProps({
  trip: Object,
})

const route_id = props.trip.route_id

const routeStops = ref([])

const fetchRouteStops = async () => {
  try {
    const { data, error } = await supabase
      .from('route_stop')
      .select('stop_id, stop: stop_id(*)')
      .eq('route_id', route_id)

    if (error) throw error

    routeStops.value = data
  } catch (err) {
    console.error(err)
  }
}

const startTime = new Date(props.trip.expected_start_time).toLocaleTimeString([], {
  hour: '2-digit',
  minute: '2-digit',
})

onMounted(() => {
  fetchRouteStops()
})
</script>

<style scoped>
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
