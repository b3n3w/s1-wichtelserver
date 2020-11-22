<template>
  <div class="row">
    <div class="col-md-2 col-sm-2">
      <img
        v-bind:src="'data:image/jpeg;base64,'+image"
        alt="user"
        class="profile-photo-lg"
      />
    </div>
    <div class="col-md-5 col-sm-5">
      <h5 class="profile-link">{{ username }}</h5>
    </div>
    <div class="col-md-3 col-sm-3">
      <button class="btn btn-primary pull-right">Zeige Wichtel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "member-card",
  props: {
    username: String,
    image: String
  },
};
</script>
<style scoped>
.profile-photo-lg {
  width: 100%;
  border-radius: 50%;
  padding-top: 5px;
  padding-bottom: 5px;
}

.row {
  background: hsl(229, 22%, 10%, 0.631);
  border-radius: 32px;
  padding-top: 5px;
}
.btn-primary{
  background: #757CA3;
  border: none;
  border-radius: 32px;
  
  }


.btn-primary:hover{
  background: #424763;
}


.profile-link {
  color: white;
}

/* Large Devices, Wide Screens */

@media only screen and (max-width: 1281px) {

}

@media only screen and (max-width: 1100px) {

}

/* Medium Devices, Desktops */

@media only screen and (max-width: 992px) {

}

/* Small Devices, Tablets */

@media only screen and (max-width: 768px) {

}

/* Extra Small Devices, Phones */

/*OnePlus*/

@media only screen and (max-width: 480px) {
.profile-photo-lg {
  width: 20%;
  border-radius: 50%;
}
.btn-primary {
 margin-bottom: 5px;
}
}

/* Custom, iPhone Retina */

@media only screen and (max-width: 320px) {

}

</style>