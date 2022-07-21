<template>
  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <!-- Background of PhotoSwipe. 
         It's a separate element as animating opacity is faster than rgba(). -->
    <div class="pswp__bg"></div>

    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">
      <!-- Container that holds slides. 
            PhotoSwipe keeps only 3 of them in the DOM to save memory.
            Don't modify these 3 pswp__item elements, data is added later on. -->
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>

      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <!--  Controls are self-explanatory. Order can be changed. -->

          <div class="pswp__counter"></div>

          <button
            class="pswp__button pswp__button--close"
            title="Close (Esc)"
          ></button>

          <button
            class="pswp__button pswp__button--share"
            title="Share"
          ></button>

          <button
            class="pswp__button pswp__button--fs"
            title="Toggle fullscreen"
          ></button>

          <button
            class="pswp__button pswp__button--zoom"
            title="Zoom in/out"
          ></button>

          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"
        >
          <div class="pswp__share-tooltip"></div>
        </div>

        <button
          class="pswp__button pswp__button--arrow--left"
          title="Previous (arrow left)"
        ></button>

        <button
          class="pswp__button pswp__button--arrow--right"
          title="Next (arrow right)"
        ></button>

        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.pswp__top-bar {
  background-color: rgba(0, 0, 0, 0);
}
.pswp__button--close,
.pswp__button--zoom,
.pswp__button--fs,
.pswp__button--share,
.pswp__button--arrow--left:before,
.pswp__button--arrow--right:before {
  background-color: rgba(0, 0, 0, 0) !important;
}
</style>
<style lang="scss">
.video {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  max-height: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 1;
  outline: 0;
  .video-js {
    width: 100%;
    height: auto !important;
    max-height: 100%;
    background-color: transparent;
    .vjs-tech {
      position: unset;
      height: auto !important;
      vertical-align: top;
      max-height: 100vh;
    }
    .vjs-poster {
      background-color: transparent;
      opacity: 1;
      pointer-events: none;
      left: -5px;
      right: -5px;
      top: -5px;
      bottom: -5px;
      background-position: 50%;
      background-size: cover;
      filter: blur(5px) opacity(80%);
      z-index: -1;
      display: block;
      height: auto;
    }
  }
}
</style>
<script>
import PhotoSwipe from "photoswipe/dist/photoswipe";
import PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import videojs from "video.js";
import "video.js/dist/video-js.css";
export default {
  props: {
    items: {
      default: () => [],
      type: Array,
    },
    options: {
      default: () => ({}),
      type: Object,
    },
  },
  data() {
    return {
      pswp: null,
      player: null,
    };
  },
  mounted() {
    let that = this;
    let options = {
      closeEl: true,
      captionEl: false,
      fullscreenEl: false,
      zoomEl: false,
      shareEl: false,
      counterEl: false,
      arrowEl: true,
      preloaderEl: true,
      bgOpacity: 0.6,
      barsSize: { top: 0, bottom: "auto" },
      isClickableElement: function (el) {
        return el.classList.contains("vjs-control-bar");
      },
    };
    let gallery = new PhotoSwipe(
      that.$el,
      PhotoSwipeUI_Default,
      that.items,
      Object.assign(options, that.options)
    );
    gallery.listen("gettingData", function (index, item) {
      if (item.w < 1 || item.h < 1) {
        // unknown size
        let img = new Image();
        img.onload = function () {
          // will get size after load
          item.w = this.width; // set image width
          item.h = this.height; // set image height
          gallery.invalidateCurrItems(); // reinit Items
          gallery.updateSize(true); // reinit Items
        };
        img.src = item.src; // let's download image
      }
    });

    gallery.listen("afterChange", function () {
      if (gallery.currItem.html) {
        const el = gallery.currItem.container.querySelector(
          "[data-video-instance]"
        );
        this.player = videojs(el, {});
      }
    });
    gallery.listen("beforeChange", function () {
      if (this.player) {
        this.player.pause();
      }
    });
    gallery.init();
    gallery.container.addEventListener("pointerdown", this.preventSwipe);
    gallery.container.addEventListener("MSPointerDown", this.preventSwipe);
    gallery.container.addEventListener("touchstart", this.preventSwipe);
    gallery.container.addEventListener("mousedown", this.preventSwipe);

    that.pswp = gallery;

    // trigger open event after swiper is opened
    that.$emit("open");

    // trigger close event after swiper is closed
    gallery.listen("destroy", () => that.$emit("close"));
  },
  methods: {
    preventSwipe: function (e) {
      const classes = [
        "vjs-slider-bar",
        "vjs-volume-level",
        "vjs-control",
        "vjs-slider",
      ];
      const els = [e.target, e.target.parentElement];

      for (let el of els) {
        if (el) {
          for (let cl of classes) {
            if (el.classList.contains(cl)) {
              e.stopPropagation();
              return;
            }
          }
        }
      }
    },
  },
};
</script>
