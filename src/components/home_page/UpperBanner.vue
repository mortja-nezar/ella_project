<template>
  <div class="banner" padding-left="10px">
    <div class="parent">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="6">
            <div class="cont">
              <h3><span>Huge Savings on</span> UHD Televisions</h3>
              <p class="heant">Sale up to 70% off on Sony Televisions</p>
              <v-btn
                variant="outlined"
                class="py-4 px-8 mt-4"
                density="comfortable"
                style="
                  border-radius: 30px;
                  text-transform: none;
                  text-align: center;
                "
              >
                Shop Now
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 390px;

  .parent {
    padding: auto;
    width: 110%;
    height: 100%;
    background-image: url("@/assets/banner-bg.c9efd7f9.jpg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;

    .cont {
      color: white;
      padding-left: 80px;

      h3 {
        font-size: 42px;
        font-weight: 900;
        line-height: 1.2;

        span {
          color: #19ffff;
        }
      }

      .heant {
        margin-top: 20px;
        font-size: 18px;
        opacity: 0.9;
      }
    }
  }
}
</style>
