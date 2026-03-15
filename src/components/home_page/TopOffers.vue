<!-- @format -->
<template>
  <div class="topoffer bg-gray-lighten-4">
    <v-container>
      <!-- الصف الأول -->
      <v-row>
        <v-col
          cols="4"
          v-for="(image, index) in imagesRow1"
          :key="'row1-' + index"
        >
          <v-hover v-slot="{ isHovering, props }">
            <div class="parent pa-2" v-bind="props" style="overflow: hidden">
              <img
                :src="image"
                alt=""
                :style="{
                  width: '100%',
                  height: 'auto',
                  transform: isHovering ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.5s ease-in-out',
                }"
              />
            </div>
          </v-hover>
        </v-col>
      </v-row>

      <!-- الصف الثاني -->
      <v-row mt-9>
        <v-col
          cols="6"
          v-for="(image, index) in imagesRow2"
          :key="'row2-' + index"
        >
          <v-hover v-slot="{ isHovering, props }">
            <div class="parent pa-2" v-bind="props" style="overflow: hidden">
              <img
                :src="image"
                alt=""
                :style="{
                  width: '100%',
                  height: 'auto',
                  transform: isHovering ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.5s ease-in-out',
                }"
              />
            </div>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imagesRow1: [
        require("@/assets/playstations.4d0f61f7.webp"),
        require("@/assets/headset.32bef95b.webp"),
        require("@/assets/chairs.75a398b5.webp"),
      ],
      imagesRow2: [
        require("@/assets/iphones.70f70e6c.webp"),
        require("@/assets/laptops.6291e06e.webp"),
      ],
    };
  },
};
</script>

<style scoped>
.topoffer {
  padding: 16px 0;
}

.parent img {
  display: block;
  border: 1px solid transparent;
  border-radius: 3px;
}
.parent img:hover {
  border: 1px solid #ccc;
  border-radius: 3px;
}
</style>
