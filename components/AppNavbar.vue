<script setup lang="ts">
import {HomeIcon} from "@heroicons/vue/24/solid";
</script>

<template>
  <!-- Home Link -->
  <AppHeaderLink to="/" aria-label="Homepage" exact-match>
    <HomeIcon class="p-1 size-7 " />
  </AppHeaderLink>
  <!-- Activities Link -->
  <AppHeaderLink to="/about-us">
    About Us
  </AppHeaderLink>

  <!-- Activities Dropdown (dropdown on large screens) -->
  <AppDropdown title="Activities" to="/activities" class="hidden sm:inline-block">
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

  <!-- Activities Links (visible on small screens) -->
  <div class="flex flex-wrap justify-center sm:hidden gap-2 items-center">
    <AppHeaderLink to="/activities" exact-match>
      Activities
    </AppHeaderLink>
    •
    <!-- Services Link -->
    <AppHeaderLink to="/activities/services">
      Services
    </AppHeaderLink>
    •
    <!-- Projects Link -->
    <AppHeaderLink to="/activities/projects">
      Projects
    </AppHeaderLink>
  </div>

  <!-- People Link -->
  <AppHeaderLink to="/team">
    Our Team
  </AppHeaderLink>
  <!-- Contact Us Link -->
  <AppHeaderLink to="/contact-us">
    Contact Us
  </AppHeaderLink>
</template>
