<template>
    <div class="archives">
      <b-row v-for="(row, key) in archives" :key="key">
        <b-col v-for="(archive, k) in row">
          <b-img v-if="archive.type == 0"
          width="170"
          height="100"
          thumbnail fluid
          :src="archive.url"
          >
          </b-img>

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


  <div
  class="swiper-slide d-block"
  v-for="(item, key) in chunkedArr"
  :key="key"
>
  <ui-suggestion
    :user="user"
    v-for="(user, k) in item"
    :key="k"
    class="mb-2"
  />
</div>