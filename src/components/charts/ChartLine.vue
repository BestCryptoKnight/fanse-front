<script>
import { Line, mixins } from "vue-chartjs";
import "chartjs-plugin-colorschemes/src/plugins/plugin.colorschemes";
import { Tableau10 } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.tableau";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: null,
    },
    height: {
      default: 250,
    },
  },
  mounted() {
    let options = {
      plugins: {
        colorschemes: {
          scheme: Tableau10,
        },
      },
    };
    options = Object.assign(options, this.options);
    this.renderChart(this.chartData, options);
  },
};
</script>