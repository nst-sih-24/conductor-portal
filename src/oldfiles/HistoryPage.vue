History
<template>
    <q-page-container>
      <q-page class="page-background q-px-sm q-pt-xl q-pb-lg">
        <div class="history-page">
          <h2>Journey History Overview</h2>

          <!-- Journeys List -->
          <div class="journeys-list q-mt-lg">xx
            <div v-for="journey in journeys" :key="journey.id" class="journey-card">
              <q-card flat bordered class="full-width card-elevation q-mb-md">
                <q-card-section>
                  <div class="row no-wrap items-start q-col-gutter-sm">
                    <div class="col journey-info">
                      <div class="route-title">{{ journey.routeName }}</div>
                      <div class="route-meta">{{ journey.date }} • {{ journey.duration }}</div>
                    </div>
                    <div class="col-auto">
                      <!-- Map Placeholder -->
                      <div class="map-placeholder">
                        Map placeholder
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
</template>

<script>
export default {
  name: 'JourneyHistoryPage',
  data() {
    return {
      journeys: [
        {
          id: 1,
          routeName: 'Central Station to West End Terminal',
          date: '2024-05-10',
          duration: '4h 30m',
        },
        {
          id: 2,
          routeName: 'East Market to North Plaza',
          date: '2024-05-11',
          duration: '3h 45m',
        },
        {
          id: 3,
          routeName: 'Main Street to City Park',
          date: '2024-05-12',
          duration: '2h 15m',
        }
      ]
    };
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f2f5;
}

.page-background {
  background: linear-gradient(135deg, #fafafa, #ffffff);
  min-height: 100vh;
}

.header-container {
  background: #3949ab;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 56px;
}

.header-logo {
  display: flex;
  align-items: center;
}

.logo-icon {
  font-size: 24px;
}

.logo-text {
  font-size: 20px;
  font-weight: 600;
  margin-left: 10px;
}

.history-page {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.history-page h2 {
  font-size: 26px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.journeys-list {
  text-align: left;
}

.journey-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.journey-card:hover {
  transform: translateY(-2px);
}

/* Card styling */
.card-elevation {
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
}

.journey-info {
  flex: 1;
}

/* Route Title & Meta */
.route-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
}

.route-meta {
  font-size: 0.9rem;
  color: #666;
}

/* Map Placeholder */
.map-placeholder {
  width: 220px;
  height: 100px;
  background: linear-gradient(to bottom right, #dcdcdc, #eaeaea);
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8px;
  font-weight: 500;
}
</style>
