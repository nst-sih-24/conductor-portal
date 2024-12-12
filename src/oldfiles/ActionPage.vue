<template>
  <q-page-container>
  <q-page>
  <q-card class="route-card">
    <div class="route-details">
      <div class="route-header">
        <span class="route-time">09:00 AM</span>
        <span class="status-label completed">Upcoming</span>
      </div>
      <div class="route-location">
        <div class="location from-to">
          <q-icon name="location_on" class="location-icon" color="green" />
          <span>Dwarka</span>
        </div>
        <q-icon name="arrow_forward" class="arrow-icon" />
        <div class="location from-to">
          <q-icon name="location_on" class="location-icon" color=""/>
          <span>Nehru Place</span>
        </div>
      </div>
      <div class="route-info">
        Route 423 • 32 stops completed
      </div>
    </div>

    <q-btn
      class="join-button"
      to="conductor-ticket-scanner"
      label="Join"
      color="white"
      rounded
      flat
    />
  </q-card>
  </q-page>
</q-page-container>
</template>

<script setup>
import { QIcon, QBtn } from 'quasar';
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

.route-card {
  position: relative;
  border-radius: 1.5rem;
  padding: 2rem;
  background-color: #ffffff;
  border: none;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin-top: 1rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  overflow: hidden;
}

.route-card:hover {
  transform: translateY(-8px); /* Smooth floating effect */
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.route-details {
  color: #1f2937; /* Dark primary text color */
  z-index: 1;
  font-family: 'Poppins', sans-serif;
}

.route-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.route-time {
  font-size: 1.5rem; /* Larger font size for emphasis */
  font-weight: 600;  /* Bold for prominence */
  color: #2563eb;   /* Highlighting with a distinct blue */
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1); /* Light text shadow for emphasis */
}

.status-label {
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-size: 1.1rem;  /* Slightly larger for clarity */
  font-weight: 500;
  background-color: #d1fae5;  /* Soft green background */
  color: #10b981;    /* Green text to signify success/completion */
  text-transform: capitalize;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); /* Light shadow inside the label */
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
  font-size: 1.125rem;  /* Larger font size for easy reading */
}

.from-to {
  font-weight: 400;
  color: #1f2937;
}

.location-icon {
  height: 1.3rem;
  width: 1.3rem;
  color: #2563eb;  /* Blue icons for location */
}

.arrow-icon {
  height: 1.25rem;
  width: 1.25rem;
  color: #6b7280;  /* Gray color for arrow icon */
}

.route-info {
  font-size: 1.1rem;
  font-weight: 400;
  margin-top: 1rem;
  color: #6b7280; /* Light gray for supplementary info */
}

.join-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #2563eb;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
  z-index: 2;
}

.join-button:hover {
  background-color: #1d4ed8; /* Darker blue for hover */
  transform: scale(1.05);  /* Slight scale effect on hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Adding subtle shadow on hover */
}

.join-button:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(38, 99, 255, 0.3); /* Glow effect when focused */
}

/* Add Gradient Background for the Card */
.route-card {
  background: linear-gradient(135deg, #f7fafc 0%, #e5e7eb 100%);
  background-size: 100% 100%;
  background-position: center;
}

.route-card:hover {
  background: linear-gradient(135deg, #ffffff 0%, #d1d5db 100%);
}

/* Responsive Design */
@media (max-width: 768px) {
  .route-card {
    padding: 1.5rem;
  }

  .route-header {
    flex-direction: row;
    align-items: flex-start;
    gap: 1rem;
  }

  .route-time {
    font-size: 1.2rem;  /* Slightly smaller for mobile */
  }

  .route-location {
    flex-direction: row;
    gap: 0.5rem;
  }

  .join-button {
    position: static;
    width: 100%;
    margin-top: 1.25rem;
  }

  .location {
    font-size: 1rem;  /* Adjust font size for better readability on mobile */
  }

  .arrow-icon {
    display: inline-block;  /* Make the arrow visible on mobile */
  }

  .status-label {
    font-size: 1rem; /* Adjust label size for mobile */
  }

  .route-info {
    font-size: 1rem; /* Adjust info size */
  }
}
</style>
