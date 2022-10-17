<template>
  <div>
    <b-breadcrumb :items="items" class="mt-2"></b-breadcrumb>

    <b-button class="mr-2" variant="outline-primary">All</b-button>
    <b-button class="mr-2" variant="success">Pictures</b-button>
    <b-button class="mr-2" variant="danger">Videos</b-button>

    <div>
      <b-container fluid class="p-4">
        <b-row>
          <b-col>
            <b-img
              thumbnail
              fluid
              src="http://images.fineartamerica.com/images-medium-large/starry-night-alex-ruiz.jpg"
              alt="Image 1"
            ></b-img>
          </b-col>
          <b-col>
            <b-img
              thumbnail
              fluid
              src="http://images.fineartamerica.com/images-medium-large/starry-night-alex-ruiz.jpg"
              alt="Image 2"
            ></b-img>
          </b-col>
          <b-col>
            <b-img
              thumbnail
              fluid
              src="http://images.fineartamerica.com/images-medium-large/starry-night-alex-ruiz.jpg"
              alt="Image 3"
            ></b-img>
          </b-col>
        </b-row>
      </b-container>

      <b-container fluid class="p-4">
        <b-row>
          <b-col>
            <video
              poster="http://images.fineartamerica.com/images-medium-large/starry-night-alex-ruiz.jpg"
              width="170"
              height="100"
              controls
            >
              <source
                src="http://techslides.com/demos/sample-videos/small.mp4"
                type="video/mp4"
              />
            </video>
          </b-col>
          <b-col>
            <video
              poster="http://images.fineartamerica.com/images-medium-large/starry-night-alex-ruiz.jpg"
              width="170"
              height="100"
              controls
            >
              <source
                src="http://techslides.com/demos/sample-videos/small.mp4"
                type="video/mp4"
              />
            </video>
          </b-col>
          <b-col>
            <video
              poster="http://images.fineartamerica.com/images-medium-large/starry-night-alex-ruiz.jpg"
              width="170"
              height="100"
              controls
            >
              <source
                src="http://techslides.com/demos/sample-videos/small.mp4"
                type="video/mp4"
              />
            </video>
          </b-col>
        </b-row>
      </b-container>
    </div>
   <UIUploadInput/>
  </div>
</template>

<script>
import UIUploadInput from '../ui/UiUploadInput.vue' ;
export default {
components: { UIUploadInput },
  data() {
    return {
      items: [
        {
          text: 'Archive',
          href: '#',
        },
      ],
    }
  },
}
</script>
