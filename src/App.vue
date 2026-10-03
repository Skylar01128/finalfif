<script setup>
import SiteNav from './components/SiteNav.vue'
import HeroSection from './components/HeroSection.vue'
import MarqueeTicker from './components/MarqueeTicker.vue'
import BrandStatement from './components/BrandStatement.vue'
import VisitReasons from './components/VisitReasons.vue'
import MenuSection from './components/MenuSection.vue'
import WorkSection from './components/WorkSection.vue'
import EventsSection from './components/EventsSection.vue'
import TriviaSection from './components/TriviaSection.vue'
import ReviewsSection from './components/ReviewsSection.vue'
import VisitSection from './components/VisitSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import FloatingEventCard from './components/FloatingEventCard.vue'
</script>

<template>
  <SiteNav />
  <main>
    <HeroSection />
    <MarqueeTicker />
    <BrandStatement />
    <VisitReasons />
    <MenuSection />
    <WorkSection />
    <EventsSection />
    <TriviaSection />
    <ReviewsSection />
    <VisitSection />
  </main>
  <SiteFooter />
  <FloatingEventCard />
</template>
