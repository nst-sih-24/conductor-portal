<template>
  <!-- Full screen container -->
  <div class="fullscreen column">
    <!-- Map Section -->
    <div class="map-container">
      <!-- Google Map Implementation -->
      <div class="map-placeholder">
        <GoogleMap api-key="AIzaSyCX7YZQFXhOtlyC-El4uG9baq4qSY68MZg" style="width: 100%; height: 490px" :center="center"
          :zoom="12">
          <!-- Marker for Source (New Delhi Railway Station) -->
          <Marker :position="center" :options="{ title: 'New Delhi Railway Station' }" />

          <!-- Markers for each stop -->
          <Marker v-for="(stop, index) in stops" :key="index" :position="stop.position"
            :options="{ title: stop.name }" />

          <!-- Marker for Destination (West End Terminal) -->
          <Marker :position="destination" :options="{ title: 'West End Terminal' }" />

          <!-- Route (Polyline) between points -->
          <Polyline :path="routePath" :options="{ strokeColor: '#FF0000', strokeWeight: 4, strokeOpacity: 0.7 }" />
        </GoogleMap>
      </div>
    </div>

    <!-- Scrollable Content Section -->
    <div class="content-container relative-position">
      <q-card flat bordered class="full-width card-elevation">
        <!-- Crew Info Inline -->
        <q-card-section class="q-px-xl q-py-md crew-section">
          <div class="row items-center no-wrap text-sm">
            <div class="text-body2 q-mr-sm crew-title">
              Co-Crew: <span class="crew-name">Oashe Mehta</span>
            </div>
            <div class="text-caption text-secondary crew-id">ID: 98765</div>
          </div>
        </q-card-section>

        <!-- Route Timeline -->
        <q-card-section class="q-px-l q-py-md bg-grey-1 route-section">
          <q-timeline color="primary" layout="vertical">
            <!-- Source (clickable) -->
            <q-timeline-entry side="left" icon="home" color="red" class="cursor-pointer timeline-entry"
              @click="toggleStops">
              <div class="stop-name-container">
                <div class="stop-name">New Delhi Railway Station</div>
              </div>
            </q-timeline-entry>

            <!-- Intermediate Stops -->
            <transition name="fade">
              <div v-if="showStops">
                <q-timeline-entry v-for="(stop, index) in stops" :key="index" side="left" icon="location_on"
                  color="secondary" class="timeline-entry">
                  <div class="stop-name-container">
                    <div class="stop-name">{{ stop.name }}</div>
                  </div>
                </q-timeline-entry>
              </div>
            </transition>

            <!-- Destination (clickable) -->
            <q-timeline-entry side="left" icon="flag" color="green" class="cursor-pointer timeline-entry"
              @click="toggleStops">
              <div class="stop-name-container">
                <div class="stop-name">NSIT</div>
              </div>
            </q-timeline-entry>
          </q-timeline>
        </q-card-section>
      </q-card>

      <!-- SOS Floating Button (bottom right corner) -->
      <div v-if="showSOS" class="sos-floating-button">
        <q-btn round size="lg" color="red" text-color="white" icon="warning" @click="handleSOS" />

        <!-- Verify -->

        <q-page-sticky position="bottom-right" :offset="[18, 18] ">
          <q-btn fab icon="qr_code_scanner" color="primary" no-caps @click="startScan">
            <span class="q-mx-sm">Scan</span>
          </q-btn>
        </q-page-sticky>

        <q-dialog v-model="showScanner">
          <q-card>
            <q-inner-loading :showing="loading">
              <q-spinner-gears size="50px" color="primary" />
            </q-inner-loading>
            <qrcode-stream @decode="onDecode" @init="onInit"></qrcode-stream>
          </q-card>
        </q-dialog>

      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { QrcodeStream } from 'vue3-qrcode-reader';
import { GoogleMap, Marker, Polyline } from 'vue3-google-map';

// Google Map Data
const center = { lat: 28.6128, lng: 77.2295 };  // Center of the map (New Delhi Railway Station)
const destination = { lat: 28.7041, lng: 77.1025 };  // Destination coordinates (West End Terminal)

const stops = ref([
  { name: "City Park", position: { lat: 28.6300, lng: 77.2098 } },  // City Park
  { name: "India Gate", position: { lat: 28.6128, lng: 77.2295 } },  // India Gate
  { name: "Connaught Place", position: { lat: 28.6355, lng: 77.2216 } }  // Connaught Place
]);

const routePath = ref([
  center,
  ...stops.value.map(stop => stop.position),
  destination
]);

const showStops = ref(false);  // Toggle to show/hide stops on the map
const showSOS = ref(true);     // Toggle to show/hide SOS button

// QR Scanner State
const showScanner = ref(false); // Initially hide the scanner
const errorMessage = ref(null);
const loading = ref(false);

// Method to toggle stops visibility on map
function toggleStops() {
  showStops.value = !showStops.value;
}

// Method for SOS button click action
function handleSOS() {
  alert("SOS button clicked! Implement the desired SOS action here.");
}

// Start scanning when the button is clicked
function startScan() {
  showScanner.value = true;
}

// Action when QR code is decoded
const onDecode = (content) => {
  showScanner.value = false;
  console.log(content);
};

// Initialization of QR scanner (if needed)
const onInit = (promise) => {
  loading.value = true;
  promise
    .then(() => {
      console.info('Successfully initialized! Ready for scanning now!');
      loading.value = false;
    })
    .catch((error) => {
      if (error.name === 'NotAllowedError') {
        errorMessage.value = 'Hey! I need access to your camera';
      } else if (error.name === 'NotFoundError') {
        errorMessage.value = 'Do you even have a camera on your device?';
      } else if (error.name === 'NotSupportedError') {
        errorMessage.value = 'Seems like this page is served in non-secure context (HTTPS, localhost or file://)';
      } else if (error.name === 'NotReadableError') {
        errorMessage.value = "Couldn't access your camera. Is it already in use?";
      } else if (error.name === 'OverconstrainedError') {
        errorMessage.value = "Constraints don't match any installed camera. Did you ask for the front camera although there is none?";
      } else {
        errorMessage.value = 'UNKNOWN ERROR: ' + error.message;
      }

      loading.value = false;
    });
};
</script>


<style scoped>
.fullscreen {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: #f5f5f5;
}

.column {
  display: flex;
  flex-direction: column;
}

/* Map Section */
.map-container {
  height: 60vh;
  background: linear-gradient(135deg, #76b2fe 0%, #b69efe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.map-placeholder {
  width: 100%;
  height: 90%;
  border: 2px dashed #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.1rem;
  text-align: center;
  border-radius: 8px;
  padding: 1em;
}

/* Content Container */
.content-container {
  flex: 1;
  overflow-y: auto;
  background: #fff;
  padding: 1em;
  position: relative;
}

.relative-position {
  position: relative;
}

.full-width {
  width: 100%;
}

/* Card styling */
.card-elevation {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

/* Crew Section Styling */
.crew-section {
  background: #f0f0f0;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.crew-title {
  font-weight: 600;
  color: #333;
}

.crew-name {
  font-weight: 700;
  color: #000;
  margin-left: 4px;
}

.crew-id {
  margin-left: auto;
  font-size: 0.8rem;
  color: #555;
}

/* Route Section */
.route-section {
  background: #fafafa;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

/* Timeline Entries */
.timeline-entry {
  position: relative;
  margin-bottom: 16px;
}

.cursor-pointer {
  cursor: pointer;
}

/* Stop Name Container */
.stop-name-container {
  margin-top: 8px;
  margin-left: 16px;
  background: #ffffff;
  border-radius: 6px;
  padding: 8px 12px;
  border: 1px solid #eee;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stop-name {
  font-size: 0.95rem;
  font-weight: 500;
  color: #333;
  line-height: 1.4;
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slightly smaller font sizes */
.text-body2 {
  font-size: 0.9rem;
}

.text-sm {
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Verify Section */
.verify-section {
  border-top: 1px solid #ddd;
  margin-top: 16px;
  padding-top: 20px;
}

/* SOS Button Styling */
.sos-floating-button {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 999;
}
</style>
