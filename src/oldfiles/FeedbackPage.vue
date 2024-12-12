<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <!-- Feedback page container -->
      <q-page class="q-pa-md">
        <q-card class="my-card q-mb-md shadow-10" style="max-width: 800px; margin: auto; border-radius: 16px;">
          <q-card-section class="q-pa-none">
            <div class="text-h4 text-center q-mb-md" :class="titleClass">
              We Value Your Feedback
            </div>
            <div class="text-body2 text-center q-mb-md text-muted">
              Share your thoughts with us to help us improve and serve you better.
            </div>
          </q-card-section>

          <q-form @submit="submitFeedback" ref="form" class="q-px-md q-pb-md">
            <!-- Name Input -->
            <q-input
              filled
              v-model="name"
              label="Your Name"
              autofocus
              :rules="[val => val && val.length > 0 || 'Name is required']"
              class="q-mb-md custom-input"
              dense
            />

            <!-- Email Input -->
            <q-input
              filled
              v-model="email"
              label="Your Email"
              :rules="[val => val && /.+@.+\..+/.test(val) || 'Please enter a valid email']"
              class="q-mb-md custom-input"
              dense
            />

            <!-- Phone Number Input -->
            <q-input
              filled
              v-model="phone"
              label="Your Phone Number"
              type="tel"
              :rules="[val => val && /^\d{10}$/.test(val) || 'Please enter a valid 10-digit phone number']"
              class="q-mb-md custom-input"
              dense
            />

            <!-- Suggestions Textarea -->
            <q-input
              filled
              v-model="feedback"
              label="Your Suggestions"
              type="textarea"
              :rules="[val => val && val.length > 10 || 'Suggestions must be at least 10 characters long']"
              class="q-mb-md custom-input"
              rows="4"
            />

            <!-- Rating Section -->
            <div class="q-mb-md">
              <div class="text-subtitle2 text-center mb-1">How would you rate us?</div>
              <div class="rating-container text-center">
                <q-btn
                  v-for="i in 5"
                  :key="i"
                  :icon="i <= rating ? 'star' : 'star_border'"
                  @click="toggleRating(i)"
                  class="rating-btn q-btn--round q-btn--flat"
                  color="yellow-8"
                  size="lg"
                  :class="{ 'active': i <= rating, 'clicked': i === rating }"
                  style="transition: transform 0.2s ease-in-out;"
                  @mouseover="hoverRating(i)"
                  @mousedown="onButtonPress(i)"
                  @mouseup="onButtonRelease(i)"
                />
              </div>
            </div>

            <!-- Submit Button -->
            <q-btn
              label="Submit Feedback"
              color="primary"
              type="submit"
              :disable="loading || !isValid"
              class="full-width q-mt-md custom-btn"
              :loading="loading"
              loading-color="white"
              style="transition: all 0.3s ease-out;"
            />

            <!-- Loading Spinner -->
            <q-spinner bubbles v-if="loading" color="primary" size="30px" class="q-mt-md" />
          </q-form>
        </q-card>

        <!-- Success or Error Message -->
        <q-dialog v-model="showSuccess">
          <q-card class="bg-teal-3 text-white shadow-6 rounded-lg">
            <q-card-section class="q-pt-none">
              <div class="text-h6 q-mb-xs">Thank You!</div>
              <div>Your feedback has been submitted successfully.</div>
            </q-card-section>
            <q-card-actions>
              <q-btn label="Close" color="white" @click="showSuccess = false" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="showError">
          <q-card class="bg-red-4 text-white shadow-6 rounded-lg">
            <q-card-section class="q-pt-none">
              <div class="text-h6 q-mb-xs">Oops!</div>
              <div>Something went wrong. Please try again later.</div>
            </q-card-section>
            <q-card-actions>
              <q-btn label="Close" color="white" @click="showError = false" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- Login Dialog -->
        <q-dialog v-model="loginDialog">
          <q-card>
            <q-card-section>
              <div class="text-h6">Login</div>
              <q-input filled v-model="loginEmail" label="Email" />
              <q-input filled v-model="loginPassword" label="Password" type="password" />
            </q-card-section>
            <q-card-actions>
              <q-btn flat label="Cancel" @click="loginDialog = false" />
              <q-btn flat label="Login" color="primary" @click="loginUser" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "FeedbackPage",
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      feedback: "",
      loading: false,
      showSuccess: false,
      showError: false,
      rating: 0,
      titleClass: "text-primary",
      inputClass: "custom-input",
      btnClass: "custom-btn",
      userLoggedIn: false,
      loginDialog: false,
      loginEmail: "",
      loginPassword: "",
      pressedStar: null, // Keeps track of the pressed star for button press effect
    };
  },
  computed: {
    isValid() {
      return (
        this.name.length > 0 &&
        this.email.length > 0 &&
        this.phone.length === 10 &&
        this.feedback.length > 10 &&
        this.rating > 0
      );
    },
  },
  methods: {
    toggleRating(value) {
      // Toggle the rating value if the clicked star is already selected
      if (this.rating === value) {
        this.rating = 0;
      } else {
        this.rating = value;
      }
    },
    hoverRating(i) {
      // Slight scaling effect when hovering over a star
      this.$nextTick(() => {
        const btns = this.$el.querySelectorAll(".rating-btn");
        btns[i - 1].style.transform = "scale(1.1)";
      });
    },
    onButtonPress(i) {
      // Handle button press animation effect
      this.pressedStar = i;
      const btn = this.$el.querySelectorAll(".rating-btn")[i - 1];
      if (btn) {
        btn.style.transform = "scale(0.95)"; // Press down effect
      }
    },
    onButtonRelease(i) {
      // Reset button after release
      this.$nextTick(() => {
        const btn = this.$el.querySelectorAll(".rating-btn")[i - 1];
        if (btn) {
          btn.style.transform = "scale(1)"; // Release effect
        }
      });
    },
    async submitFeedback() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.loading = true;

      try {
        const isSuccess = Math.random() > 0.5;
        await new Promise((resolve, reject) =>
          setTimeout(isSuccess ? resolve : reject, 2000)
        );

        if (isSuccess) {
          this.showSuccess = true;
        } else {
          throw new Error("Failed to submit feedback");
        }
      } finally {
        this.loading = false;
      }
    },
    loginUser() {
      if (this.loginEmail && this.loginPassword) {
        this.userLoggedIn = true;
        this.loginDialog = false;
        this.$q.notify({
          message: 'Login successful!',
          color: 'green',
          position: 'top',
        });
      } else {
        this.$q.notify({
          message: 'Please enter valid credentials.',
          color: 'red',
          position: 'top',
        });
      }
    },
    logout() {
      this.userLoggedIn = false;
      this.$q.notify({
        message: 'Logout successful!',
        color: 'blue',
        position: 'top',
      });
    },
  },
};
</script>

<style scoped>
.my-card {
  border: none;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.my-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.my-card:active {
  transform: translateY(4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.text-subtitle2 {
  color: #757575;
}

.text-h4 {
  font-size: 2rem;
  font-weight: bold;
  color: #1e88e5;
}

.text-body2 {
  font-size: 1.1rem;
  color: #616161;
}

.q-btn {
  border-radius: 50px;
  transition: transform 0.2s ease-in-out, background-color 0.3s ease;
  padding: 12px 24px;
  font-size: 1rem;
}

.q-btn:hover {
  background-color: #0288d1;
  transform: scale(1.05);
}

.q-btn:disabled {
  background-color: #bdbdbd;
}

.q-btn--round {
  border-radius: 50%;
  padding: 12px;
  width: 50px;
  height: 50px;
  transition: transform 0.2s ease-in-out;
}

.rating-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.rating-btn {
  margin: 0 8px;
  cursor: pointer;
}

.custom-input input {
  font-size: 1rem;
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.custom-btn {
  border-radius: 30px;
  padding: 14px;
  font-weight: bold;
  background: linear-gradient(45deg, #ff7e5f, #feb47b); /* Gradient background */
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.custom-btn:hover {
  background: linear-gradient(45deg, #ff7e5f, #ff6347);
  transform: translateY(-4px);
}

.custom-btn:active {
  background: linear-gradient(45deg, #feb47b, #ff7e5f);
  transform: translateY(2px);
}

.full-width {
  width: 100%;
}

.q-dialog {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.q-dialog .q-card {
  background-color: #ffffff;
  border-radius: 12px;
}

.q-spinner-bubbles {
  animation: spin 1.5s infinite linear;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.active {
  transform: scale(1.1);
}

.clicked {
  transform: scale(1.1);
}
</style>
