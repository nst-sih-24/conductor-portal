<template>
  <q-page padding class="help-center-page">
    <q-card class="help-card">
      <q-card-section>
        <h2 class="title">DTC Bus Driver Help Center</h2>
        <p class="subtitle">Quick access to essential emergency contacts, safety protocols, and operational guidelines.</p>
      </q-card-section>

      <q-separator />

      <!-- Emergency Contacts Section -->
      <q-card flat bordered class="contact-card">
        <q-card-section>
          <h4 class="section-title">Emergency Contacts</h4>

          <div class="contact-item">
            <q-icon name="phone" size="md" class="text-primary" />
            <div class="contact-text">
              <strong>Control Center:</strong>
              <span>+91-11-23370236</span>
            </div>
          </div>

          <div class="contact-item">
            <q-icon name="phone" size="md" class="text-danger" />
            <div class="contact-text">
              <strong>Emergency Medical Support:</strong>
              <span>100</span>
            </div>
          </div>

          <div class="contact-item">
            <q-icon name="email" size="md" class="text-grey-6" />
            <div class="contact-text">
              <strong>Support Email:</strong>
              <span>dcgmpld@dtc.nic.in</span>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-separator />

      <!-- Driver Safety Protocols Section -->
      <q-card flat bordered class="safety-card">
        <q-card-section>
          <h4 class="section-title">Driver Safety Protocols</h4>

          <!-- Protocol 1 -->
          <div class="safety-item">
            <q-icon name="warning" size="sm" class="text-warning" />
            <div class="protocol-text">
              <strong>In Case of Accident:</strong>
              <ul>
                <li>Ensure passenger safety first.</li>
                <li>Notify the Control Center immediately.</li>
              </ul>
            </div>
          </div>

          <!-- Protocol 2 -->
          <div class="safety-item">
            <q-icon name="security" size="sm" class="text-primary" />
            <div class="protocol-text">
              <strong>Driver Health & Safety:</strong>
              <ul>
                <li>Be well-rested before your shift.</li>
                <li>Wear your uniform and seat belt at all times.</li>
              </ul>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-separator />
    </q-card>
  </q-page>
</template>

<script setup>
</script>

<style scoped>
.help-center-page {
  background-color: #f4f6f9;
}

.help-card {
  max-width: 900px;
  margin: 20px auto;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
}

.title {
  text-align: center;
  font-size: 24px;
  color: #1976d2;
  font-weight: bold;
}

.subtitle {
  text-align: center;
  font-size: 16px;
  color: #616161;
  margin-bottom: 20px;
}

.q-card-section {
  padding: 20px;
}

.section-title {
  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 10px;
  font-weight: 700;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 5px;
}

.contact-card, .safety-card {
  margin-top: 20px;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid #e0e0e0;
}

.contact-item, .safety-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  padding: 12px;
  background-color: #fafafa;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.contact-item q-icon, .safety-item q-icon {
  margin-right: 12px;
  font-size: 20px;
}

.contact-text, .protocol-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.contact-item span, .safety-item ul {
  font-size: 14px;
  color: #333;
}

.safety-item ul {
  list-style-type: disc;
  margin-left: 20px;
  font-size: 13px;
}

.q-btn {
  width: 100%;
  margin: 10px 0;
}

.q-btn:hover {
  background-color: #f0f0f0;
}

.q-separator {
  margin: 25px 0;
}

@media (max-width: 600px) {
  .help-card {
    margin: 10px;
  }

  .title {
    font-size: 22px;
  }

  .subtitle {
    font-size: 14px;
  }

  .section-title {
    font-size: 16px;
  }

  .contact-item, .safety-item {
    padding: 10px;
    font-size: 14px;
  }

  .contact-item span, .safety-item ul {
    font-size: 12px;
  }

  .safety-item ul {
    font-size: 12px;
    margin-left: 15px;
  }
}

@media (min-width: 1024px) {
  .help-card {
    max-width: 1000px;
  }
}
</style>
