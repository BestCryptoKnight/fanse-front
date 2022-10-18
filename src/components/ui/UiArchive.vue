<template>
    <div class="archives">
      <b-row v-for="(archive, index) in archives" :key="index">
        <b-col>
          <b-img v-if="archive.type == 0" thumbnail fluid :src="archive.url"></b-img>

          <video v-if="archive.type == 1"
          :poster="archive.screenshot"
          width="170"
          height="100"
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
  