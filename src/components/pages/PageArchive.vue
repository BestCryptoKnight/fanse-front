<template>
  <div>
    <div class="row border-bottom sticky-top page-header bg-white mb-4">
      <div class="d-flex align-items-center w-100 mx-3">
        <a href="#" target="_self" class=""><i class="bi-arrow-left"></i></a>
        <h5 class="text-uppercase p-0 my-3 mx-2 flex-grow-1">Archive</h5>
      </div>
    </div>

    <b-button class="mr-2" variant="outline-primary">All</b-button>
    <b-button class="mr-2" variant="outline-primary">Photos</b-button>
    <b-button class="mr-2" variant="outline-primary">Videos</b-button>


    <ui-archive v-model="archives" />
   <UIUploadInput/>
  </div>
</template>

<script>
import Media from '../models/Media';
import UIUploadInput from '../ui/UiUploadInput.vue'
import UiArchive from "../ui/UiArchive.vue";
export default {
  components: { UIUploadInput, UiArchive },
  data() {
    return {
      archives: [],
      hasMore: true,
    }
  },
  mounted() {
    this.loadArchives();
  },
  methods: {
    loadArchives() {
      this.$get(
        "/media",
        (data) => {
          let archives = [...this.archives];
            for (let obj of data.data) {
              let archive = new Media(obj)
              if(archive.type !== Media.TYPE_AUDIO)
              {
                archives.push(new Media(obj));
              }
            }
            this.archives = archives;
            this.hasMore = data.next_page_url != null;
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
  }
}
</script>
