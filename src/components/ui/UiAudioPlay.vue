<template>
  <div class="d-flex flex-row bio-audio-con">
    <div style="flex: 1">
      <div class="d-flex ">
        <b-link @click.prevent="startPause">
          <i v-if="isAudioLoaded&&audioProps.isPlaying" class="bi-pause-fill" style="font-size: 2rem" />
          <i v-else-if="isAudioLoaded&&!audioProps.isPlaying" class="bi-play-fill" style="font-size: 2rem" />
        </b-link>
        <div style="flex: 1">
          <vue-wave-surfer :src="this.audioFileRoot + this.audio_bio" :options="audioOptions" ref="prosurf" @hook:mounted="audioComponentMounted">
          </vue-wave-surfer>
        </div>
      </div>
      <div class="pl-5 d-flex justify-content-between small" style="color: #959697">
        <p>{{secondToMin(audioProps.currentTime)}}</p>
        <p>{{secondToMin(audioProps.duration)}}</p>
      </div>
    </div>
    <div class="rounded-circle text-right position-relative" style="width: 70px; top: -10px">
      <b-avatar :src="user.avatar" :text="user.initials" :to="user.url" size="50px" />
      <i class="bi bi-mic-fill mic-icon"></i>
    </div>
  </div>
</template>

<script>
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
export default {
  props: [
    "label",
    "user",
    "audio_bio",
    "name",
    "value",
    "errors",
    "type",
    "placeholder",
    "prepend",
    "append",
    "disabled",
    "mask",
    "description",
  ],
  data: function () {
    return {
      recMode: "press",
      audioOptions: {
        plugins: [
          Cursor.create()
        ],

        waveColor: '#C6C7C8',
        progressColor: "#00AFF0",
        barWidth: 4,
        height: 100,
        responsive: true,
        hideScrollbar: true,
        barRadius: 4
      },
      audioFileRoot: process.env.VUE_APP_MEDIA_URL,
      audioProps: {
        duration: 0,
        currentTime: 0,
        isPlaying: false
      },
      isAudioLoaded: false,
      getCurrentTimeInterval: 0,
      key: 0,
      isStreamed: false,
      isSaved: false,
    }
  },

  mounted() {

  },

  methods: {
    startPause() {
      if (this.$refs.prosurf.waveSurfer) {
        this.$refs.prosurf.waveSurfer.playPause()
        this.audioProps.isPlaying = this.$refs.prosurf.waveSurfer.isPlaying()
        if (this.audioProps.isPlaying) {
          this.getCurrentTimeInterval = setInterval(() => {
            this.audioProps.currentTime = this.$refs.prosurf.waveSurfer.getCurrentTime()
          }, 1000);
        }
        else {
          clearInterval(this.getCurrentTimeInterval)
          this.getCurrentTimeInterval = 0
        }
      }
    },
    audioComponentMounted() {
      this.isAudioLoaded = true;
      this.getAudioProps();
      setTimeout(() => {
        this.audioProps.duration = this.$refs.prosurf.waveSurfer.getDuration()
        this.$refs.prosurf.waveSurfer.on('finish', () => {
          this.$refs.prosurf.waveSurfer.stop()
          clearInterval(this.getCurrentTimeInterval)
          this.getCurrentTimeInterval = 0
          this.getAudioProps();
        })
      }, 1000);
    },
    secondToMin(second) {
      let parsedSec = Math.round(second)
      var minutes = Math.floor(parsedSec / 60);
      var seconds = parsedSec - minutes * 60;
      return `${minutes}:${seconds} `
    },

    getAudioProps() {
      this.audioProps.duration = this.$refs.prosurf.waveSurfer.getDuration()
      this.audioProps.currentTime = this.$refs.prosurf.waveSurfer.getCurrentTime()
      this.audioProps.isPlaying = this.$refs.prosurf.waveSurfer.isPlaying()
    }

  }
};
</script>