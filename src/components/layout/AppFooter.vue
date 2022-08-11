<template>
  <footer>
    <div class="footer  border-top">
    <div class="row">
    <a href="#" style="padding-bottom: 10px;"><i style="font-size: 20px;" class="bi bi-facebook"></i></a>
    <a href="#" style="padding-bottom: 10px;"><i style="font-size: 20px;" class="bi bi-instagram"></i></a>
    <a href="#" style="padding-bottom: 10px;" ><i style="font-size: 20px;" class="bi bi-youtube"></i></a>
    <a href="#" style="padding-bottom: 10px;padding-right: 0px;" ><i style="font-size: 20px;" class="bi bi-twitter"></i></a>
    </div>

    <div class="row" style="padding-bottom: 7px;">
    <ul style="margin-bottom: 7px;display: -webkit-inline-box;text-align: -webkit-center; display: contents;">
    <li><a href="#">Contact us</a></li>
    <li><a href="#">Our Services</a></li>
    <li><a href="#">Privacy Policy</a></li>
    <li><a href="#">Terms & Conditions</a></li>
    <li><a href="#">Career</a></li>
    </ul>
    </div>

    <div class="row" style="
      justify-content: center;
      font-size: 10px;
      color: #bbb7b7;">
    FANSE Copyright © 2021 Fanse - All rights reserved 
    </div>
    </div>
</footer>

</template>
<style scoped>

.footer{
background: #fffcfc;
padding:10px 0px;
font-family: 'Play', sans-serif;
text-align:center;
}

.footer .row{
width:100%;
color:#bcb8b8;
font-size:0.8em;
justify-content: center;
margin-right: 0px !important;
margin-left: 0px !important;
}

.footer .row a{
text-decoration:none;
color:#bcb8b8;
transition:0.5s;
padding: 7px;
}

.footer .row a:hover{
color:rgb(87, 87, 87);
}

.footer .row ul{
width:100%;
}

.footer .row ul li{
display:inline-block;
margin:0px 5px;
}

.footer .row a i{
font-size:2em;
}

@media (max-width:720px){
.footer{
text-align:left;
padding:3%;
}
.footer .row ul li{
display:block;
margin:2px 0px;
text-align:left;
}

}
</style>