<template>
  <WeatherWidget />
  <UpcomingSchedule />
  <ActionPage />
  <QuickStats />
</template>

<script>
import UpcomingSchedule from 'src/oldfiles/UpcomingSchedule.vue';
import QuickStats from 'src/oldfiles/QuickStats.vue';
import WeatherWidget from 'src/oldfiles/WeatherWidget.vue';
import ActionPage from 'src/oldfiles/ActionPage.vue';

export default {
  components: {
    UpcomingSchedule,
    QuickStats,
    WeatherWidget,
    ActionPage
  },
};
</script>

<style>
.page{
  background-image: url('');
  background: absolute;
  background-blend-mode:soft-light;
}

</style>
