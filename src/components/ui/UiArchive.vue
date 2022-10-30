<template>
    <div class="archives">
      <b-row v-for="(row, key) in archives" :key="key">
        <b-col v-for="(archive, k) in row" :key="k" style="background-color: #d2d7db61;padding: 10px;text-align: center;border-radius: 10px;margin: 10px;">
          <b-img v-if="archive.type == 0"
          width="100%"
          height="100%"
          thumbnail fluid
          :src="archive.url"
          >
          </b-img>

          <video v-if="archive.type == 1"
          :poster="archive.screenshot"
          width="100%"
          height="100%"
          controls
          >
            <source
              :src="archive.url"
              type="video/mp4"
            />
        </video>

        </b-col>
      </b-row>
    </div>
  </template>
  <script>
  export default {
    props: ["archives"],
    components: {},
  };
  </script>