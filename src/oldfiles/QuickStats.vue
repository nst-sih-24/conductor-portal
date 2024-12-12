<template>
  <div class="stats-grid">
    <!-- Today's Routes Stat Card -->
    <q-card class="stat-card blue-card">



      <q-icon color="blue" size="24px" />

      <p class="stat-value blue-text">4</p>
      <p class="stat-label">Today's Routes</p>
    </q-card>

    <!-- Hours Driven Stat Card -->
    <q-card class="stat-card green-card">
      <q-icon color="green" size="24px"  />
      <p class="stat-value green-text">6.5</p>
      <p class="stat-label">Hours Driven</p>
    </q-card>

    <!-- Distance Travelled Stat Card -->
    <q-card class="stat-card orange-card">
      <div class="icon orange-icon">
      </div>
      <p class="stat-value orange-text">8.2 km</p>
      <p class="stat-label">Distance Travelled</p>
    </q-card>

    <!-- Stops Today Stat Card -->
    <q-card class="stat-card purple-card">
      <div class="icon purple-icon">
      </div>
      <p class="stat-value purple-text">28</p>
      <p class="stat-label">Stops Today</p>
    </q-card>
  </div>
</template>

<script setup>
import { QCard } from 'quasar';
</script>

<style scoped>
.stats-grid {
  margin: 0rem 1rem 2rem 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (min-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
    margin: 0;
    padding: 0;
  }
}

.stat-card {
  padding: 1rem;
  border-radius: 0.75rem;
  border-width: 1px;
  border-style: solid;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-card:hover {
  transform: scale(1.05);
}

.blue-card {
  background-color: #ebf8ff;
  border-color: #b3daff;
}

.green-card {
  background-color: #f0fdf4;
  border-color: #bbf7d0;
}

.orange-card {
  background-color: #ffedd5;
  border-color: #ffd8a8;
}

.purple-card {
  background-color: #f3e8ff;
  border-color: #e9d7fe;
}

.icon {
  margin-bottom: 0.5rem;
}

.icon-size-large {
  height: 2.5rem;
  /* Increased size */
  width: 2.5rem;
  /* Increased size */
}

.blue-icon {
  color: #3182ce;
}

.green-icon {
  color: #38a169;
}

.orange-icon {
  color: #dd6b20;
}

.purple-icon {
  color: #6b46c1;
}

.stat-value {
  font-size: 2.25rem;
  /* Slightly larger value */
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.blue-text {
  color: #3182ce;
}

.green-text {
  color: #38a169;
}

.orange-text {
  color: #dd6b20;
}

.purple-text {
  color: #6b46c1;
}

.stat-label {
  font-size: 0.875rem;
  color: #718096;
}
</style>
