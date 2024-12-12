Profile
<template>
    <q-page-container>
      <q-page class="page-background q-px-sm q-pt-xl q-pb-lg">
        <div class="profile-page">

          <!-- Profile Icon Section -->
          <div class="profile-photo">
            <i class="fas fa-user-circle profile-icon"></i>
          </div>

          <!-- Content Area -->
          <div class="content">
            <h2>{{ activeSection.title }}</h2>
            <p>{{ activeSection.description }}</p>

            <div class="profile-details">
              <div class="detail-item">
                <label>Name:</label>
                <div v-if="!isEditing">{{ name }}</div>
                <q-input v-else filled v-model="editedName" dense />
              </div>

              <div class="detail-item q-mt-md">
                <label>Email:</label>
                <div v-if="!isEditing">{{ email }}</div>
                <q-input v-else filled v-model="editedEmail" type="email" dense />
              </div>

              <div class="detail-item q-mt-md">
                <label>Phone:</label>
                <div v-if="!isEditing">{{ phone }}</div>
                <q-input v-else filled v-model="editedPhone" type="tel" dense />
              </div>
            </div>

            <!-- Edit / Save / Cancel Buttons -->
            <div class="button-row q-mt-xl">
              <q-btn
                v-if="!isEditing"
                label="Edit"
                color="primary"
                @click="startEditing"
                class="edit-btn q-mr-sm"
              />
              <div v-else class="edit-buttons">
                <q-btn label="Save" color="positive" class="q-mr-sm" @click="saveChanges" />
                <q-btn label="Cancel" color="negative" @click="cancelEditing" />
              </div>
            </div>

            <!-- Navigation Links -->
            <div class="links q-mt-xl">
              <ul>
                <li><a href="#home" @click="setActiveSection('home')"><i class="fas fa-home"></i> Home <i class="fas fa-chevron-right"></i></a></li>
                <!-- Removed Profile option here -->
                <li><a href="#history" @click="setActiveSection('history')"><i class="fas fa-history"></i> History of Past Journeys <i class="fas fa-chevron-right"></i></a></li>
                <li><a href="#" @click="setActiveSection('helpSupport')"><i class="fas fa-question-circle"></i> Help & Support <i class="fas fa-chevron-right"></i></a></li>
                <li><a href="#feedback" @click="setActiveSection('feedback')"><i class="fas fa-comment-dots"></i> Feedback <i class="fas fa-chevron-right"></i></a></li>
                <li><a href="#" @click="setActiveSection('leaveRequest')"><i class="fas fa-plane"></i> Leave Request <i class="fas fa-chevron-right"></i></a></li>
              </ul>
            </div>

            <!-- Logout Button -->
            <button class="logout-btn q-mt-xl" @click="logout">
              <i class="fas fa-sign-out-alt"></i> Log Out
            </button>
          </div>
        </div>
      </q-page>
    </q-page-container>
</template>

<script>
export default {
  name: "ProfilePage",
  data() {
    return {
      name: "Example",
      email: "abc@example.com",
      phone: "1234567890",
      isEditing: false,
      editedName: "",
      editedEmail: "",
      editedPhone: "",
      activeSection: {
        title: 'Welcome, Example !',
        description: 'Please select a section to get started.',
      },
      sections: {
        home: { title: 'Home', description: 'Welcome to your dashboard.' },
        // profile option removed
        history: { title: 'History of Past Journeys', description: 'Review all your previous trips.' },
        helpSupport: { title: 'Help & Support', description: 'Find answers or contact support.' },
        feedback: { title: 'Feedback', description: 'Share your thoughts to help us improve.' },
        leaveRequest: { title: 'Leave Request', description: 'Submit a leave request for upcoming days.' }
      }
    };
  },
  methods: {
    logout() {
      alert("You have been logged out.");
    },
    setActiveSection(section) {
      this.activeSection = this.sections[section];
    },
    startEditing() {
      this.isEditing = true;
      this.editedName = this.name;
      this.editedEmail = this.email;
      this.editedPhone = this.phone;
    },
    saveChanges() {
      // Simple validation
      if (this.editedName && this.editedEmail && this.editedPhone) {
        this.name = this.editedName;
        this.email = this.editedEmail;
        this.phone = this.editedPhone;
        this.isEditing = false;
      } else {
        alert("Please fill in all fields.");
      }
    },
    cancelEditing() {
      this.isEditing = false;
    }
  },
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
  background: linear-gradient(135deg, #f5f5f5, #ffffff);
  min-height: 100vh;
}

.header-container {
  background: #3f51b5;
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

.profile-page {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  margin: 20px auto;
  max-width: 600px;
}

.profile-photo {
  width: 100%;
  height: 25vh;
  background: #3f51b5;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-bottom-left-radius: 50% 15%;
  border-bottom-right-radius: 50% 15%;
  overflow: hidden;
  box-shadow: inset 0 -10px 30px rgba(0,0,0,0.1);
}

.profile-icon {
  color: #fff;
  font-size: 120px;
}

.content {
  flex: 1;
  padding: 40px 20px;
  background-color: #ffffff;
  border-top: 2px solid #ddd;
  position: relative;
  font-size: 16px;
  line-height: 1.6;
  text-align: center;
}

.content h2 {
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
}

.content p {
  color: #666;
  font-size: 16px;
  margin-bottom: 30px;
}

.profile-details {
  text-align: left;
  max-width: 300px;
  margin: 0 auto;
}

.detail-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
}

.detail-item label {
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.links {
  margin-top: 40px;
}

.links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.links ul li {
  margin: 12px 0;
  border-radius: 8px;
  background: #f7f7f9;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.links ul li a {
  color: #333;
  text-decoration: none;
  font-size: 17px;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 14px 20px;
  border-radius: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.links ul li a i {
  margin-right: 15px;
  font-size: 20px;
}

.links ul li a .fa-chevron-right {
  margin-left: auto;
  font-size: 14px;
  color: #aaa;
  transition: color 0.3s ease;
}

.links ul li:hover {
  transform: translateX(3px);
  background-color: #e8eaf6;
}

.links ul li:hover a {
  color: #333;
}

.links ul li:hover a .fa-chevron-right {
  color: #5c6bc0;
}

.logout-btn {
  margin-top: 30px;
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 14px 20px;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logout-btn i {
  margin-right: 10px;
}

.logout-btn:hover {
  background-color: #d84332;
  transform: translateY(-2px);
}

.logout-btn:active {
  transform: translateY(1px);
}

@media (max-width: 767px) {
  .profile-page {
    margin: 20px;
  }

  .profile-photo {
    height: 20vh;
  }

  .content {
    padding: 20px;
  }
}
</style>
