<template>
  <nuxt-layout name="vault-layout">
    <nuxt-link class="btn" to="/sign-up"> Sign Up </nuxt-link><br />
    <nuxt-link class="btn" to="/sign-in"> Sign In </nuxt-link>
    <div class="h-full flex flex-col ">
      <cos-logo class="" />

      <button @click="signup">SignUp</button>
      <button @click="signin">SignIn</button>

      <div class="h-full">
        <basic-swiper
          class="h-full"
          @slideChange="slides.setActiveIndex($event.activeIndex)"
          @swiper="slides.setSwiper"
        >
          <swiper-slide class="bg-yellow-200 h-full">
            <vault />
          </swiper-slide>

          <swiper-slide class="bg-green-200">
            <vault-message />
          </swiper-slide>

          <swiper-slide class="bg-green-200">
            <vault-storage />
          </swiper-slide>

          <swiper-slide class="bg-green-200">
            <vault-calendar />
          </swiper-slide>
        </basic-swiper>
      </div>
      <navbar>
        <navbar-page-navigation @navigate="slides.setActiveIndex($event)" />
      </navbar>

    </div>

  </nuxt-layout>
</template>

<script setup lang="ts">
import { SwiperSlide } from "swiper/vue";
import { usePageSlider } from "~~/store/slide-store";


const slides = usePageSlider();
const nhost = useNhost();
//const graphql = useGraphql();

const signup = async () => {
  const response = await nhost.client.auth.signUp({
    email: "hexxx@ok.de",
    password: "Fingerweg666",
  });

  console.log(response);
};

const signin = async () => {
  nhost.client.auth.sendVerificationEmail({ email: "hexxx@ok.de" });
  const response = await nhost.client.auth.signIn({
    email: "hexxx@ok.de",
    password: "Fingerweg666",
  });

  console.log(response);
}; 
/* const gq = async () => {
  const test = gql`
    query {
      
    }
  `;
  //const { data, error } = await nhost.graphql.request()
};*/
</script>
