<template>
  <div>
    <div class="row border-bottom sticky-top page-header bg-white mb-4">
      <div class="d-flex align-items-center w-100 mx-3">
        <a href="#" target="_self" class=""><i class="bi-arrow-left"></i></a>
        <h5 class="text-uppercase p-0 my-3 mx-2 flex-grow-1">Archive</h5>
      </div>
    </div>

    <b-button class="mr-2" variant="outline-primary" @click.prevent="buildArchives('all')">All</b-button>
    <b-button class="mr-2" variant="outline-primary" @click.prevent="buildArchives('photos')">Photos</b-button>
    <b-button class="mr-2" variant="outline-primary" @click.prevent="buildArchives('videos')">Videos</b-button>

    <ui-archive :archives="archive_rows" />
  </div>
</template>

<script>
import Media from '../models/Media';
import UiArchive from "../ui/UiArchive.vue";
export default {
  components: { UiArchive },
  data() {
    return {
      archives: [],
      archive_rows: [],
      page: 1,
      hasMore: true,
    }
  },
  mounted() {
    this.loadArchives();
    window.addEventListener("scroll", this.updateScroll);
  },
  methods: {
    updateScroll() {
      const scrollPosition = window.innerHeight + window.scrollY;
      if (
        document.body.offsetHeight &&
        scrollPosition &&
        document.body.offsetHeight - scrollPosition <= 1000 &&
        !this.isLoading &&
        this.hasMore
      ) {
        this.loadMore();
      }
    },
    loadArchives() {
      this.$get(
        "/media?page=" + this.page,
        (data) => {
          let archives = [...this.archives];
          for (let obj of data.media.data) {
            let archive = new Media(obj)
            if(archive.type !== Media.TYPE_AUDIO && !archive.url.includes("/tmp/"))
            {
              archives.push(new Media(obj));
            }
          }
          this.archives = archives;
          this.hasMore = data.media.next_page_url != null;
          this.buildArchives("all");
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    buildArchives(media_type) {
      this.archive_rows = [];
      let current_row = [];
      let index = 0;
      for (let archive of this.archives)
      {
        if(media_type == "videos" && archive.type !== Media.TYPE_VIDEO) continue;
        if(media_type == "photos" && archive.type !== Media.TYPE_IMAGE) continue;

        if(index % 3 == 0 && index != 0)
        {
          this.archive_rows.push([...current_row]);
          current_row = [];
        }
        current_row.push(archive);
        index++;
      }
    },
    loadMore() {
      if (this.hasMore) {
        this.page = this.page + 1;
        this.loadArchives();
      }
    },
  }
}
</script>
