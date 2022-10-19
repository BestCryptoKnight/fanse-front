<template>
    <div class="archives">
      <div v-for="(archive, key) in archives" :key="key">
          <div v-if="archive != null">
            <b-img v-if="archive.type == 0"
              width="170"
              height="100"
              thumbnail fluid
              :src="archive.url"
            >
            </b-img>
          </div>
          <div v-if="archive != null">
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
        </div>
      </div>
    </div>
  </template>
  <style lang="scss" scoped>
  .archives {
    overflow-y: scroll;
    max-height: 500px;
  }
  </style>
  <script>
  export default {
    props: ["archives"],
    components: {},
  };
  </script>