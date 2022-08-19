<template>
  <div class="d-flex flex-column content landing" >
    <div class="flex-grow-1 d-flex flex-row" v-if="$router.currentRoute.path != '/welcome'" >
      <div class="w-50 promo position-relative d-none d-md-block">
        <div class="middle">
          <h2 style="margin: 0;color: inherit;font-weight: 700;">{{ $t("general.signup-slogan") }}</h2>
        </div>
      </div>
      <div class="w-50 position-relative">
        <div class="middle main main-login" style="padding-top: 30px;padding-bottom: 30px;">
          <!-- <div class="px-5 pb-5">
            <ui-logo class="logo d-md-none text-primary" />
          </div> -->
          <router-view name="login"></router-view>
        </div>
      </div>
    </div>
    <div v-if="$router.currentRoute.path == '/welcome'" style="background-color: rgb(3 15 28);    overflow-x: hidden;">
     <div class="home-slide">
      <div class="home-slide-1">
        <div class="home-slide-2">
          <img src="https://www.ybhltd.com/fanse/fansecreators.png" alt="Creators Avatars" class="creators-home">
          <div class="home-text">
            <h2 class="home-h2">Creators <span class="home-dot">.</span>
            </h2>
            <h2 class="home-h2">Earn <span class="home-dot">.</span>
            </h2>
            <h2 class="home-h2">Freedom <span class="home-dot">!</span>
            </h2>
            <div class="home-describe">
              <h3 class="home-h3">A social subscription platform for all creators to connect with their fans.</h3>
            </div>
          </div>
      <div class="home-login">
        <router-view name="login"></router-view>
          </div>
        </div>
          
      </div>
    </div>
        <div style="background-color: white;color:black !important;">
          <aside class="text-center bg-gradient-primary-to-secondary" style="background: #2181e2;color: white;padding-top: 4rem;padding-bottom: 4rem;">
            <div class="container px-5" style="max-width: 1150px;" >
                <div class="row gx-5 justify-content-center">
                    <div class="col-xl-8">
                        <div class="home-h4 phone-margin">Sign up now to earn 85% of everything you sell on Fanse!</div>
                    </div>
                    <div  style="flex: 1 1 0%;"><a style="width:70%" tabindex="0" href="/signup" class="a-box">Get Started</a></div>
                </div>
            </div>
        </aside>
        <section id="features" style="margin-top: 50px;color:white;">
            <div class="container px-5">
              <h2 class="home-h5" style="color: #2181e2;text-align: center;font-size: 3.2rem;margin-bottom: 50px;margin-top: 50px;">Why join Fanse ?</h2>

                <div class="row gx-5 align-items-center">
                    <div class="col-lg-8 order-lg-1 mb-5 mb-lg-0">
                        <div class="container-fluid px-5">
                            <div class="row gx-5" style="margin-left:-35px;margin-right:-35px;">
                                <div class="col-md-6 mb-5">
                                    <!-- Feature item-->
                                    <div class="text-center">
                                        <i class="bi bi-cash-coin icon-feature text-gradient d-block mb-3"></i>
                                        <h4 class="font-alt">High Tips</h4>
                                        <p class="text-muted mb-0">Max tip limit set to $1000 on Fanse!</p>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-5">
                                    <!-- Feature item-->
                                    <div class="text-center">
                                        <i class="bi bi-megaphone icon-feature text-gradient d-block mb-3"></i>
                                        <h4 class="font-alt">Free Promotions</h4>
                                        <p class="text-muted mb-0">Fanse Legend Creators are getting social media Promotions FOR FREE!</p>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-5 mb-md-0">
                                    <!-- Feature item-->
                                    <div class="text-center">
                                        <i class="bi bi-envelope-open-heart icon-feature text-gradient d-block mb-3"></i>
                                        <h4 class="font-alt">Monetize Features</h4>
                                        <p class="text-muted mb-0">Maximize your earnings with Mass DM's & PPV!</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <!-- Feature item-->
                                    <div class="text-center">
                                        <i class="bi-patch-check icon-feature text-gradient d-block mb-3"></i>
                                        <h4 class="font-alt">Earn More</h4>
                                        <p class="text-muted mb-0">Join NOW and earn 85% for a lifetime!</p>
                                        <a tabindex="0" href="/signup" class="a-box" style="width: 90%;padding: 5px;height: 40px;color: white;margin-top: 10px;background-color: black;">Sign Up</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 order-lg-0 none" style="margin-top:50px">
                        <!-- Features section device mockup-->
                        <div  class="features-device-mockup"><img style="margin-left:-50px" src="https://ybhltd.com/fanse/mockup.png" alt="Girl in a jacket" width="500" height="500"></div>
                    </div>
                </div>
            </div>
        </section>
        <div style="text-align: center;background-color: #f2f2f2;padding: 30px;margin-top: 20px;margin-bottom: 20px;">
        <h2 data-v-0c95d942="" class="home-h5" style="color: rgb(33, 129, 226);text-align: center;font-size: 3.2rem;">How to Get Started</h2>
      <img data-v-0c95d942="" src="https://ybhltd.com/fanse/moc-how.png
      " alt="Girl in a jacket" width="348" height="196">  
      <div class="" style="
    margin-top: 40px;
    text-align: center;
    width: 100%;
        margin-bottom: 70px;
">

<h3 data-v-0c95d942="" class="home-h3" style="
    text-align: center;
    color: #707a85;
    font-size: 1.75rem;
">1. Create your Fanse account

</h3><div style="
    text-align: -webkit-center;
">
    <h3 class="home-h3" style="
    text-align: center;
    color: #676767c4;
    font-size: 20px;
    margin-top: 25px;
    max-width: 465px;
    font-weight: 500;
    letter-spacing: 0em;
    line-height: 1.4;
    -webkit-font-smoothing: antialiased;
    font-size: calc((1.2 - 1) * 1.2vw + 1rem);
    white-space: pre-wrap;
     color: #8A96A3;">Joining Fanse is free and easy to set up with instant verification for creators!
There is no contract for you or your subscribers.
</h3>
</div>

</div>
<div class="" style="
    margin-top: 40px;
    text-align: center;
    width: 100%;
        margin-bottom: 70px;
">

<h3 data-v-0c95d942="" class="home-h3" style="
    text-align: center;
    color: #707a85;
    font-size: 1.75rem;
    
">2. Set your subscription rate
</h3><div style="
    text-align: -webkit-center;
">
    <h3 class="home-h3" style="
    text-align: center;
    color: #676767c4;
    font-size: 20px;
    margin-top: 25px;
    max-width: 465px;
    font-weight: 500;
    letter-spacing: 0em;
    line-height: 1.4;
    -webkit-font-smoothing: antialiased;
    font-size: calc((1.2 - 1) * 1.2vw + 1rem);
    white-space: pre-wrap;
     color: #8A96A3;">Your subscription can be free or paid.
Free subscription allow your fans to access your content without paywall and gives you the option to earn from creating content by using features like tips, paid DM’s, pay-per-view posts and more!
Paid subscription will require your fans to pay a monthly fee / any kind of payment bundle you set before viewing your content.
</h3>
</div>

</div>
<div class="" style="
    margin-top: 40px;
    text-align: center;
    width: 100%;
    margin-bottom: 70px;">

<h3 data-v-0c95d942="" class="home-h3" style="
    text-align: center;
    color: #707a85;
    font-size: 1.75rem;
">3. Create content &amp; promote your Fanse

</h3><div style="
    text-align: -webkit-center;
">
    <h3 class="home-h3" style="
    text-align: center;
    color: #676767c4;
    font-size: 20px;
    margin-top: 25px;
    max-width: 465px;
    font-weight: 500;
    letter-spacing: 0em;
    line-height: 1.4;
    -webkit-font-smoothing: antialiased;
    font-size: calc((1.2 - 1) * 1.2vw + 1rem);
    white-space: pre-wrap;
     color: #8A96A3;">Now you finally can start sharing content on your Fanse profile &amp; promote your Fanse link on your other social media streams to start earn and share exclusive content with your fans!
<a tabindex="0" href="/signup" class="a-box" style="width: 90%;padding: 5px;height: 60px;color: white;margin-top: 10px;background-color: #207ddb;margin-top: 30px;">Sign Up</a>

</h3>
</div>

</div>
      </div>
        <div class="preguntas-frecuentes-contenedor serif" style="color:black !important;">
              <h2 class="home-h5" style="color: #2181e2;text-align: center;font-size: 3.2rem;">FAQ</h2>
                <div class="preguntas">
                  <li>
                    <input class="pregunta-input" type="checkbox" name="pregunta-frecuente" id="pregunta-n1" />
                    <label for="pregunta-n1" class="pregunta">Who can become a Fanse Creator?</label>
                    <div class="respuesta"><p>Fanse is a place for all types of content creators! influencer, adult creator, athlete, artist, and much more! Fanse gives you the Freedom to create & earn without limitations!</p></div>
                  </li>
                  <li>
                    <input class="pregunta-input" type="checkbox" name="pregunta-frecuente" id="pregunta-n2" />
                    <label for="pregunta-n2" class="pregunta">How much can I earn?</label>
                    <div class="respuesta"><p>With Fanse your earnings are unlimited! Fanse give you built-in monetization features to maximize your earnings. Content Creators on Fanse are taking home 85% of their earnings! Lower than anywhere else!</p></div>
                  </li>
                  <li>
                    <input class="pregunta-input" type="checkbox" name="pregunta-frecuente" id="pregunta-n3" />
                    <label for="pregunta-n3" class="pregunta">What is Fanse legend Creator?</label>
                    <div class="respuesta"><p>Fanse Legend Creator plan is an exclusive promotional program for the top unknown influencers.<br> Maximize your potential through paid ads on the entire social media platform! (FOR FREE!)</p></div>
                  </li>
                   <li>
                    <input class="pregunta-input" type="checkbox" name="pregunta-frecuente" id="pregunta-n4" />
                    <label for="pregunta-n4" class="pregunta">What is the Safety & Security level of Fanse?</label>
                    <div class="respuesta"><p>We wanted to make sure that we offer you the safest and most securest platform possible. Sensitive information like your name and address are stored on separate secure servers and fully encrypted. <br> Financial data is powered by stripe, certified PCI Service Provider Level <br> 1. This is the most stringent level of certification available in the payments industry. <a tabindex="0" href="/signup" class="a-box" style="width: 90%;padding: 5px;height: 40px;color: white;margin-top: 10px;background-color: black;">Sign Up</a></p></div>
                  </li>
                </div> 
            </div>    
      </div>  
    </div>
    <app-footer />
  </div>
</template>
<style scoped lang="scss">
@import "~@/assets/scss/_variables.scss";
body {
  margin: 0;
}
.font-alt{
  color: #000 !important;
}
.preguntas-frecuentes {
  background: #dbe0e8;
	position: relative;
	width: 70%;
	z-index: 89;
	}
.preguntas-frecuentes-contenedor {
  margin: 0 auto;
	padding: 4rem 1.25rem 6rem;
	position: relative;
	overflow: hidden;
	width: 70%;
  color: white;
	max-width: 106.25rem;
}
.preguntas-frecuentes-encabezado-linea-roja {
	margin: 15px auto 21px;
	width: 40px;
}
.preguntas-frecuentes-encabezado {
  font-size: 1.21rem;
  text-align: center;
}
.preguntas {
  padding-top: 3.21rem;
  list-style: none outside;
}
.pregunta-input {
  clip: rect(0 0 0 0);
  margin: -1;
  overflow: hidden;
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
}
.pregunta {
  background-color: #0000000d;
  border-radius: 8px;
  cursor: pointer;
  display: block;
	font-size: 1.1875rem;
	letter-spacing: -.0225rem;
	line-height: 1.36842;
	margin-bottom: 16px;
	padding: 20px 10px;
  position: relative;
	transition: all 0.35s ease;
}
.pregunta:hover {
	color: black;
	cursor: pointer;
}
.pregunta::before {
  content: "\276f";
	font-size: 18px;
	float: left;
	line-height: 30px;
	margin: 0 15px 0 5px;
	transition: all 0.15s ease;
}
.pregunta:hover::before {
  color: black;
  opacity: 0.55;
  transform: rotate(90deg);
}
.pregunta-input:checked ~ .pregunta {
	color: black;
}
.pregunta-input:checked ~ .pregunta::before {
  transform: rotate(-90deg);
}
.pregunta-input:checked ~ .pregunta::after {
  content: "\2715";
	float: right;
	font-size: 11px;
	line-height: 30px;
}
.pregunta-input:checked ~ .pregunta:hover {
  background: #f2f2f2;
	color: black;
}
.pregunta-input:checked ~ .pregunta:hover::before {
  opacity: 1;
}
.pregunta-input:checked ~ .respuesta {
  max-height: 1000px;
  padding-top: 15px;
  margin-bottom: 15px;
  transition: max-height 1s ease-in, margin .3s ease-in, padding .3s ease-in;
}
.respuesta {
  background: #36353500;
  border-radius: 11px;
  line-height: 1.8em;
  margin-bottom: 25px;
  margin-top: -17px;
  max-height: 0;
  overflow: hidden;
}
.respuesta p {
  margin: 0;
  padding: 25px 25px;
}
.respuesta-enlace-dotted {
  border-bottom: 1px dotted #000;
}
a {
  text-decoration: none;
  color: #000;
}
@media (min-width: 400px) {
  .preguntas-frecuentes-encabezado {
    font-size: 1.59rem;
  }
}
	
@media (min-width: 768px) {
  .preguntas-frecuentes-encabezado {
    font-size: 1.7rem;
  }
  .preguntas {
    padding-top: 5.21rem;
  }
  .pregunta {
    font-size: 1.3125rem;
    letter-spacing: -.01875rem;
    line-height: 1.33333;
    padding: 20px;
  }
  .respuesta p {
    font-size: 1.21rem;
    letter-spacing: 0.021rem;
    line-height: 2.1;
    padding: 25px 50px;
  }
}
@media (min-width: 1000px) {
  .preguntas-frecuentes-encabezado {
    font-size: 2.35rem;
  }
}
.promo {
  background: $primary;
  color: $white;
  .middle {
    width: 100%;
    max-width: 444px;
    .logo {
      height: 4rem;
    }
    h2 {
      font-weight: normal;
    }
  }
}
.home-login{
      -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    color: white;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    font-size: 1rem;
    box-sizing: inherit;
    font-family: "system-ui";
    position: relative;
    z-index: 2;
}
.home-h3{
      -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    box-sizing: inherit;
    margin: 0;
    font-family: "system-ui";
    font-size: 1.825rem;
    letter-spacing: 0.00735em;
    text-align: left;
    color: 000;
    line-height: 1;
    font-weight: bold;
}
.home-h4{
      -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    box-sizing: inherit;
    margin: 0;
    font-family: "system-ui";
    font-size: 1.625rem;
    letter-spacing: 0.00735em;
    text-align: left;
    color: 000;
    line-height: 1;
    font-weight: bold;
}
.home-describe{
      -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    color: white;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    font-size: 1rem;
    font-family: "system-ui";
    box-sizing: inherit;
    margin-top: 16px;
    padding-right: 24px;
    display: block;
}
.home-dot{
      -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    color: #2081e2cc !important;
    font-family: "system-ui";
    font-weight: bold;
    font-size: 5rem;
    line-height: 1.167;
    text-align: left;
    box-sizing: inherit;
    margin: 0;
}
.home-h2{
      -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    box-sizing: inherit;
    margin: 0;
    color: white;
    font-family: "system-ui";
    font-weight: bold;
    font-size: 5rem;
    letter-spacing: -0.01562em;
    text-align: left;
}
.home-h5{
      -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    box-sizing: inherit;
    margin: 0;
    color: white;
    font-family: "system-ui";
    font-weight: bold;
    font-size: 3.5rem;
    letter-spacing: -0.01562em;
    text-align: left;
}
.home-text{
      -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    color: white;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    font-size: 1rem;
    box-sizing: inherit;
    -webkit-box-flex: 1;
    flex-grow: 1;
    padding-top: 16px;
    padding-bottom: 16px;
    margin-bottom: 32px;
    font-family: "system-ui";
    position: relative;
    z-index: 2;
}
.creators-home{
  -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    color: #fff;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: .00938em;
    font-size: 1rem;
    box-sizing: inherit;
    font-family: "system-ui";
    max-height: 100%;
    vertical-align: middle;
    position: absolute;
    top: 0;
    z-index: 1;
    left: -120px;
    max-width: 170%;
    width: auto;
}
.home-slide{
      -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    color: white;
    font-family: "system-ui";
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    font-size: 1rem;
    box-sizing: inherit;
    margin-top: 60px;
    margin-bottom: 160px;
}
.home-slide-1{
      -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    color: white;
    font-family: "system-ui";
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    font-size: 1rem;
    width: 100%;
    margin-left: auto;
    box-sizing: border-box;
    margin-right: auto;
    display: block;
    padding-left: 10px;
    padding-right: 10px;
    max-width: 1150px;
}
.home-slide-2{
      -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    color: white;
    font-family: "system-ui";
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    font-size: 1rem;
    box-sizing: inherit;
    padding-top: 104px;
    position: relative;
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    flex-direction: row;
    -webkit-box-pack: start;
    justify-content: flex-start;
}
.box-become{
    background: linear-gradient(95.92deg, rgba(28, 115, 203, 0.9 ) 0%, rgba(29, 111, 194, 0.9) 20.05%, rgba(61, 133, 205, 0.9) 100%);
    border-radius: 8px;
    margin-bottom: 8px;
    padding: 20px;
    margin-top: 50px;
}
.inner-box{
  width: 100%;
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
    text-align: -webkit-center !important;
        
}
.p-inner{
  flex: 1 1 0%;
    margin: 10px;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    color: rgb(255, 255, 255);
    text-align: initial;
}
.span-box{
  margin: 0px;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    color: inherit;
    font-weight: bold;
}
.a-box{
    border: none;
    margin: 8px 0px;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    outline: 0px;
    border: 0px;
    margin: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.75;
    min-width: 64px;
    width: 90%;
    box-shadow: none;
    border-radius: 25px;
    text-transform: initial;
    white-space: nowrap;
    letter-spacing: 0.025em;
    font-weight: 700;
    transition: color 0.01s ease 0s;
    height: 48px;
    font-size: 1rem;
    padding: 6px 24px;
    background: #fff;
    color: #2196f3;
}
.icon-feature{
  font-size: 3rem;
  background: linear-gradient(95.92deg,rgba(28,115,203,.9),rgba(29,111,194,.9) 20.05%,rgba(61,133,205,.9));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
@media (max-width:720px){
  .home-h4{
font-size: 1.425rem  !important;
text-align: center;
}
.home-h5{
font-size: 2.3rem  !important;
text-align: center;
}
.phone-margin{
    margin-bottom: 15px;
  }
.p-inner{
text-align: -webkit-center !important;
}
.preguntas-frecuentes{
  width: 95%;
}
.icon-feature{
  font-size: 2rem;
}
.preguntas-frecuentes-contenedor{
  width: 95%;
}
.none{
  display: none;
}
.inner-box{
display: inherit;
}
  
}
@media only screen and (max-width: 800px) {
 .home-slide-2
{
  display: block !important;
}
.home-slide{
  margin-top: 15px;
}
.home-h3{
font-size: 1.125rem  !important;
text-align: center;
}
.home-h2{
  font-size: 4rem !important;
  line-height: 0.927 !important;
  text-align: center;
}
.home-dot{
  font-size: 3rem  !important;
}
.home-describe{
  text-align: center;
}
}
@media only screen and (min-width: 800px) {
 .main-login
{
  width: 55% !important;
}
}
.main {
  width: 344px;
  .logo {
    width: 80%;
    max-height: 4rem;
    margin: 0 auto;
  }
}
@include media-breakpoint-down(sm) {
  .w-50 {
    width: 100% !important;
  }
  .main {
    width: 90%;
  }
}
</style>
<script>
import AppFooter from "../AppFooter.vue";
export default {
  components: { AppFooter },
  computed: {
    appname() {
      return process.env.VUE_APP_APP_NAME;
    },
    logo() {
      return require("@/assets/logo.svg");
    },
  },
};
</script>