<template>
    <b-form-group :label="label" :label-for="name" :description="description" class="mb-3" label-class="small">
      <!-- <b-input-group :prepend="prepend" :append="append">
        <b-form-input :id="name" v-model="inputVal" :type="type" v-mask="mask" :state="errors[name] ? false : null"
          :placeholder="placeholder" :disabled="disabled" />
  
      </b-input-group> -->
      <!-- <div class="d-flex ">
        <b-form-checkbox id="checkbox-1" v-model="recMode" name="checkbox-1" value="press" unchecked-value="hold">
          <div>Recording mode: <strong>{{ recMode.toUpperCase() }}</strong></div>
        </b-form-checkbox>
      </div> -->
      <div class="d-flex py-3 align-items-center" style="">
        <VueRecordAudio v-if="!isStreamed" :mode="recMode" @stream="onStream" @result="onResult" />
        <div v-if="isStreamed || isSaved" class="px-3">
          <b-link @click.prevent="startPause">
            <i v-if="isAudioLoaded&&audioProps.isPlaying" class="bi-pause-fill" style="font-size: 3rem" />
            <i v-else-if="isAudioLoaded&&!audioProps.isPlaying" class="bi-play-fill" style="font-size: 3rem" />
          </b-link>
        </div>
        <div v-if="isStreamed || isSaved" class=""
          style="flex: 1;background: white; box-shadow: 0px 5px 14px 1px #f0f0f0;">
          <vue-wave-surfer :key="key" :src="audioFile" :options="audioOptions" ref="surf"
            @hook:mounted="audioComponentMounted">
          </vue-wave-surfer>
        </div>
      </div>
      <div v-on:click="onDeleteClicked()" v-if="isSaved" style="font-size: 33px;
        height: 50px;
        width: 50px;
        text-align: center;
        border: 1px solid;
        border-radius: 50%;
        margin-left: 6px;
        cursor: pointer;" class="bi bi-trash"></div>
      <div v-if="isStreamed" class="d-flex py-3 justify-content-center" style="width: 100%;">
        <div v-on:click="onSaveClicked()" class="flex-column d-flex py-3 align-items-center"
          style="cursor: pointer; margin-right: 10px;">
          <div style="font-size: 40px; height: 50px;" class="bi bi-check-circle text-success"></div>
          <div style="font-weight: bold;"> Ok </div>
        </div>
        <div v-on:click="onDeleteClicked()" class="flex-column d-flex py-3 align-items-center"
          style="cursor: pointer; margin-left: 10px;">
          <div style="font-size: 40px; height: 50px;" class="bi bi-x-circle text-danger"></div>
          <div style="font-weight: bold;"> Cancel </div>
        </div>
      </div>
  
      <b-form-invalid-feedback :id="name + '-errors'" class="d-block" v-if="errors[name] && errors[name].length > 0">
        <div v-for="error in errors[name]" :key="error">
          {{ error }}
        </div>
      </b-form-invalid-feedback>
    </b-form-group>
  </template>
  <style lang="scss">
  .vue-audio-recorder {
    background-color: #00AFF0 !important;
  }
  
  .vue-audio-recorder:hover {
    background-color: #00AFF0 !important;
  }
  
  .vue-audio-recorder.active {
    background-color: #ef5350 !important;
  }
  </style>
  <script>
  import axios from "axios";
  import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
  export default {
    props: [
      "label",
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
        audioFile: `${process.env.VUE_APP_MEDIA_URL + this.$props.value}`,
        audioGenFile: this.$props.value,
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
    computed: {
      inputVal: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit("input", val);
        },
      },
    },
    mounted() {
      const audio_url = this.$props.value;
      console.log(this.$props.value);
      if (audio_url!=="" && audio_url!==null) {
        this.isSaved = true;
        this.audioFile = process.env.VUE_APP_MEDIA_URL + audio_url;
      }
    },
    methods: {
      onResult(data) {
        console.log({ data })
        this.isStreamed = true;
        this.audioFile = window.URL.createObjectURL(data);
        this.audioGenFile = new File([data], "audio.mp3", { type: 'mp3' });
        this.key = this.key + 1
      },
      onStream() {
        // console.log('STREAM', data);
      },
  
      onDeleteClicked() {
        if(this.$props.value)
        {
          const formData = new FormData();
          formData.append('fileName', this.$props.value);
          const config = {
            headers: {
              'content-type': 'multipart/form-data',
            }
          }
          axios.post(`${process.env.VUE_APP_API_URL}/v1/audio/delete`,
            formData, config
          ).then(({_}) => { // eslint-disable-line no-unused-vars
            this.isStreamed = false;
            this.isSaved = false;
            this.audioFile = "";
            this.$emit("changeAudio", null);
          });
        } else {
          this.isStreamed = false;
        }
      },
      onSaveClicked() {
        const formData = new FormData();
        formData.append('file', this.audioGenFile);
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          }
        }
        axios.post(`${process.env.VUE_APP_API_URL}/v1/audio/save`,
          formData, config
        ).then(({data}) => {
          this.audioFile = process.env.VUE_APP_MEDIA_URL + data.audio;
          this.$emit("changeAudio", data.audio);
        });
        this.isStreamed = false;
        this.isSaved = true;
      },
      startPause() {
        if (this.$refs.surf.waveSurfer) {
          this.$refs.surf.waveSurfer.playPause()
          this.audioProps.isPlaying = this.$refs.surf.waveSurfer.isPlaying()
          if (this.audioProps.isPlaying) {
            this.getCurrentTimeInterval = setInterval(() => {
              this.audioProps.currentTime = this.$refs.surf.waveSurfer.getCurrentTime()
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
          this.audioProps.duration = this.$refs.surf.waveSurfer.getDuration()
          this.$refs.surf.waveSurfer.on('finish', () => {
            this.$refs.surf.waveSurfer.stop()
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
        return `${ minutes }:${ seconds } `
      },
  
      getAudioProps() {
        this.audioProps.duration = this.$refs.surf.waveSurfer.getDuration()
        this.audioProps.currentTime = this.$refs.surf.waveSurfer.getCurrentTime()
        this.audioProps.isPlaying = this.$refs.surf.waveSurfer.isPlaying()
      }
  
    }
  };
  </script>
