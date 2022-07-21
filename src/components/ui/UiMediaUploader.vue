<template>
  <div class="w-100">
    <vue-dropzone
      ref="mediaDropzone"
      id="dropzone"
      :options="dropzoneOptions"
      :include-styling="false"
      v-on:vdropzone-complete="mediaComplete"
      v-on:vdropzone-removed-file="mediaRemoved"
      v-on:vdropzone-file-added="mediaAdded"
      v-on:vdropzone-error="mediaError"
    />

    <div class="swiper px-3 w-100 overflow-hidden">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="dropzonePreviewContent" />
        </div>
      </div>
    </div>

    <div
      class="invalid-feedback d-block px-3 py-2"
      v-if="errors._ && errors._.length > 0"
    >
      <div v-for="(error, key) in errors._" :key="key">
        {{ error }}
      </div>
    </div>

    <b-modal
      ref="modalScreenshot"
      id="modalScreenshot"
      centered
      scrollable
      body-class="p-0 m-0"
      ok-only
      @close="hideScreenshots()"
      :title="$t('general.select-screenshot')"
    >
      <div class="screenshots">
        <a
          href="#"
          @click.prevent="selectScreenshot(item)"
          class="item"
          v-for="item in getScreenshots()"
          :key="item.id"
        >
          <div>
            <img :src="item.url" />
            <i
              class="bi-check-circle-fill check text-primary"
              v-if="item.selected"
              style="font-size: 120%; line-height: 1"
            />
            <i
              class="bi-circle check text-white"
              v-else
              style="font-size: 120%; line-height: 1"
            />
          </div>
        </a>
      </div>
    </b-modal>
  </div>
</template>
<style lang="scss">
.swiper-slide {
  width: unset;
  display: flex;
  flex: 0 0 auto;
}
.dropzonePreviewContent {
  display: flex;
  flex: 0 0 auto;
  min-width: 120px;
}
.dz-progress.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: unset;
  right: unset;
}
.dz-preview {
  flex: 0 0 120px;
  width: 120px;
  height: 120px;
  position: relative;
  line-height: 1;
  cursor: pointer;
  max-width: 100%;
  overflow: hidden;
}
.dz-image {
  width: 100%;
  height: 100%;
}
.dz-preview img {
  background-size: cover;
  width: 100% !important;
  height: 100% !important;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -o-object-fit: cover !important;
  object-fit: cover !important;
}
.dz-remove {
  position: absolute;
  top: 5%;
  right: 5%;
}
.dz-edit {
  position: absolute;
  bottom: 5%;
  right: 5%;
  visibility: hidden;
  opacity: 0;
  z-index: 100;
}
.dz-preview.dz-complete .dz-edit {
  opacity: 1;
  transition: all 0.4s ease-in;
  visibility: visible;
}
.dz-progress {
  position: absolute;
  bottom: 10%;
  left: 0;
  right: 0;
}
.playB {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all 0.2s linear;
  z-index: 100;
}
.dz-preview.dz-processing {
  .dz-progress {
    opacity: 1;
    transition: all 0.2s linear;
  }
  .playB {
    opacity: 0;
  }
}
.dz-preview.dz-complete {
  .dz-progress {
    opacity: 0;
    transition: opacity 0.4s ease-in;
  }
  .playB {
    opacity: 0.5;
  }
  &:hover {
    .playB {
      opacity: 1;
    }
  }
}
</style>
<style scoped lang="scss">
#modalScreenshot {
  .modal-body {
    .screenshots {
      flex: 1;
      display: grid;
      grid-gap: 2px;
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: min-content;
      .item {
        > div {
          height: 0;
          padding-bottom: 100%;
          position: relative;
          img {
            overflow: hidden;
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            top: 0;
            left: 0;
          }
          .check {
            position: absolute;
            top: 5%;
            right: 5%;
          }
        }
      }
    }
  }
}
</style>
<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
export default {
  props: ["value"],
  computed: {
    media: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  components: {
    vueDropzone: vue2Dropzone,
  },
  data: function () {
    return {
      errors: {},
      swiper: null,
      screenshots: null,
      dropzoneOptions: {
        url:
          process.env.VUE_APP_API_URL +
          "/" +
          process.env.VUE_APP_API_VERSION +
          "/media",
        thumbnailWidth: 240,
        thumbnailHeight: 240,
        addRemoveLinks: false,
        paramName: "media",
        previewTemplate: this.template(),
        method: "post",
        parallelUploads: 1,
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
          "Cache-Control": null,
          "X-Requested-With": null,
        },
        previewsContainer: ".dropzonePreviewContent",
        maxFilesize: process.env.VUE_APP_MEDIA_MAXSIZE,
        acceptedFiles: process.env.VUE_APP_MEDIA_MIMES,
        timeout: 0,
      },
    };
  },
  mounted() {
    this.swiper = new Swiper(".swiper", {
      // Optional parameters
      direction: "horizontal",
      freeMode: {
        enabled: true,
        sticky: false,
      },
      loop: false,
      slidesPerView: "auto",
    });
  },
  methods: {
    manual() {
      for (let m of this.media) {
        this.$refs.mediaDropzone.manuallyAddFile(
          { name: m.id, size: 1 },
          m.url
        );
      }
    },
    click() {
      this.$refs.mediaDropzone.$el.click();
    },
    clean() {
      this.$refs.mediaDropzone.removeAllFiles();
    },
    template() {
      return `<div class="dz-preview dz-file-preview mr-2 mt-3 bg-light rounded">
        <div class="dz-image">
            <img data-dz-thumbnail src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" />
        </div>
        <div class="dz-progress spinner">
          <span data-v-6f498ff4="" aria-hidden="true" class="spinner-border spinner-border-sm text-secondary"><!----></span>
        </div>
        <svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="play circle fill" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-play-circle-fill playB b-icon bi text-white" style="font-size: 200%;"><g><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"></path></g></svg>
        <a data-dz-remove href="#" target="_self" class="dz-remove fs-4"><svg viewBox="0 0 16 16" width="1em"
            height="1em" focusable="false" role="img" aria-label="x circle fill" xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" class="bi-x-circle-fill b-icon bi">
            <g>
                <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z">
                </path>
            </g>
        </svg></a>
        <a data-dz-edit href="#" target="_self" class="dz-edit fs-4">
          <svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="pencil fill" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-pencil-fill b-icon bi"><g ><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"></path></g></svg>
        </a>
        <div class="progress mx-2 dz-progress" style="height: 4px;">
            <div data-dz-uploadprogress
                class="progress-bar dz-upload"></div>
        </div>
        </div>`;
    },
    dataFromResponse(response) {
      let data = null;
      if (response && response.manuallyAdded) {
        for (let m of this.media) {
          if (m.id == response.name) {
            data = m;
            break;
          }
        }
      } else if (
        response &&
        response.xhr &&
        response.xhr.status &&
        response.xhr.response &&
        response.xhr.status == 200
      ) {
        data = JSON.parse(response.xhr.response);
      }
      return data;
    },
    mediaError(_, message) {
      this.errors = { _: [message] };
    },
    mediaAdded() {
      this.swiper.update();
    },
    mediaComplete(response) {
      let data = this.dataFromResponse(response);
      if (data) {
        response.previewElement.dataset.media_id = data.id;
        response.previewElement.addEventListener("click", () => {
          this.showPhotoSwipe(data.id);
        });

        const eEl = response.previewElement.querySelector("[data-dz-edit]");
        const pEl = response.previewElement.querySelector(".playB");

        if (data.type == 1) {
          if (!data.scr) {
            data.scr = data.thumbs[0];
            data.screenshot = data.scr.url;
          }
          const tEl = response.previewElement.querySelector(
            "[data-dz-thumbnail]"
          );
          if (tEl) {
            tEl.style.backgroundImage = "url('" + data.scr.url + "')";
          }
          if (eEl) {
            eEl.addEventListener("click", (e) => {
              this.showScreenshots(response);
              e.preventDefault();
              e.stopPropagation();
            });
          }
        } else {
          if (eEl) {
            eEl.style.display = "none";
          }
          if (pEl) {
            pEl.style.display = "none";
          }
        }

        if (!response.manuallyAdded) {
          this.media.push(data);
        }
      }
    },
    mediaRemoved(response) {
      let data = this.dataFromResponse(response);
      this.media = this.media.filter(function (item) {
        return item.id !== data.id;
      });
      this.swiper.update();
      this.errors = {};
    },
    showPhotoSwipe(id) {
      this.$showPhotoSwipe(this.media, id);
    },
    showScreenshots(response) {
      this.screenshots = response;
      this.$refs.modalScreenshot.show();
    },
    hideScreenshots() {
      this.screenshots = null;
    },
    getScreenshots() {
      let data = this.dataFromResponse(this.screenshots);
      let screenshots = [];
      if (data) {
        for (let m of this.media) {
          if (m.id == data.id) {
            for (let t of m.thumbs) {
              screenshots.push({
                id: t.id,
                url: t.url,
                selected: t.id === m.scr.id,
              });
            }
          }
        }
      }

      return screenshots;
    },
    selectScreenshot(thumb) {
      let data = this.dataFromResponse(this.screenshots);
      let media = [...this.media];
      for (let i in media) {
        if (media[i].id == data.id) {
          media[i].scr = thumb;
          media[i].screenshot = thumb.url;
          const tEl = this.screenshots.previewElement.querySelector(
            "[data-dz-thumbnail]"
          );
          if (tEl) {
            tEl.style.backgroundImage = "url('" + thumb.url + "')";
          }
          break;
        }
      }
      this.media = media;
    },
  },
};
</script>
