<script setup lang="ts">
import {HomeIcon} from "@heroicons/vue/24/solid";
</script>

<template>
  <!-- Home Link -->
  <AppHeaderLink to="/">
    <HomeIcon class="p-1 size-7 text-primary" />
  </AppHeaderLink>
  <!-- Activities Link -->
  <AppHeaderLink to="/about-us">
    About Us
  </AppHeaderLink>
  <!-- Activities Dropdown -->
  <AppDropdown title="Activities" to="/activities">
    <AppDropdownContent>
      <!-- All activities Link -->
      <AppDropdownLink to="/activities">
        All
      </AppDropdownLink>
      <!-- Services Link -->
      <AppDropdownLink to="/activities/services">
        Services
      </AppDropdownLink>
      <!-- Projects Link -->
      <AppDropdownLink to="/activities/projects">
        Projects
      </AppDropdownLink>
    </AppDropdownContent>
  </AppDropdown>
  <!-- People Link -->
  <AppHeaderLink to="/team">
    Our Team
  </AppHeaderLink>
  <!-- Contact Us Link -->
  <AppHeaderLink to="/contact-us">
    Contact Us
  </AppHeaderLink>
</template>
