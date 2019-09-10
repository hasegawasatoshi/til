<template>
  <v-layout>
    <v-flex class="text-center">
      <img
        src="/v.png"
        alt="Vuetify.js"
        class="mb-5"
      >
      <blockquote class="blockquote">
        &#8220;Users&#8221;
      </blockquote>
      <div v-for="user in users" :key="user.name">
        {{ user.name }}
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData ({ params }) {
    const { data } = await axios.get(`http://localhost:3000/api/users`)
    return { users: data }
  }
}
</script>
