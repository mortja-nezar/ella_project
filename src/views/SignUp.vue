<template>
  <div class="sign_up pt-15">
    <v-card style="width: 99%; text-align: center; padding: 20px">
      <!-- Toggle Buttons -->
      <v-btn @click="sign_up = true">Sign Up</v-btn>
      <span> | </span>
      <v-btn @click="sign_up = false">Sign In</v-btn>

      <!-- SIGN UP FORM -->
      <v-form v-if="sign_up" @submit.prevent="submitForm">
        <v-text-field label="Name" v-model="form.name"></v-text-field>
        <v-text-field label="Email" v-model="form.email"></v-text-field>
        <v-text-field label="Phone" v-model="form.phone"></v-text-field>
        <v-text-field label="Address" v-model="form.address"></v-text-field>
        <v-text-field label="Cart Number" v-model="form.cartnum"></v-text-field>
        <v-text-field label="CVV" v-model="form.cvv"></v-text-field>
        <v-text-field
          label="Expire Date"
          v-model="form.ExpireDate"
        ></v-text-field>
        <v-btn color="primary" type="submit">Submit</v-btn>
      </v-form>

      <!-- SIGN IN FORM -->
      <v-form v-else @submit.prevent="signIn">
        <v-text-field label="Email" v-model="loginForm.email"></v-text-field>
        <v-text-field
          label="CVV"
          v-model="loginForm.cvv"
          type="password"
        ></v-text-field>
        <v-btn color="primary" type="submit">Login</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserInfoStore } from "@/stores/UserInformation";

const userStore = useUserInfoStore();
userStore.loadUserInfo();

const sign_up = ref(true);

const form = ref({
  name: "",
  email: "",
  phone: "",
  address: "",
  cartnum: 0,
  cvv: 0,
  ExpireDate: "",
});

const loginForm = ref({
  email: "",
  cvv: "",
});

const submitForm = () => {
  const newId = userStore.userinfo.length
    ? Math.max(...userStore.userinfo.map((u) => u.id)) + 1
    : 1;

  userStore.addUser({
    id: newId,
    name: form.value.name,
    email: form.value.email,
    phone: form.value.phone,
    address: form.value.address,
    cartnum: form.value.cartnum,
    cvv: form.value.cvv,
    ExpireDate: form.value.ExpireDate,
  });

  userStore.setCurrentUser(newId);

  form.value = {
    name: "",
    email: "",
    phone: "",
    address: "",
    cartnum: 0,
    cvv: 0,
    ExpireDate: "",
  };
  alert("User registered successfully!");
};

const signIn = () => {
  const user = userStore.userinfo.find(
    (u) =>
      u.email === loginForm.value.email &&
      String(u.cart.cvv) === loginForm.value.cvv
  );

  if (user) {
    userStore.setCurrentUser(user.id);
    alert(`Welcome back, ${user.name}!`);
  } else {
    alert("Invalid email or CVV!");
  }

  loginForm.value = { email: "", cvv: "" };
};

</script>
