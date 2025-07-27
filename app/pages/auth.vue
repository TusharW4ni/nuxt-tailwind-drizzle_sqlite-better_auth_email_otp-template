<script setup lang="ts">
const email = ref("");
const otp = ref("");
const toast = useToast();
const userLoggedIn = ref(false); // To demonstrate successful login

async function sendSignInOtp() {
  if (!email.value) {
    toast.add({
      title: "Error",
      description: "Email is required.",
      color: "error",
    });
    return;
  }
  try {
    await $fetch("/api/auth/email-otp/send-verification-otp", {
      method: "POST",
      body: {
        email: email.value,
        type: "sign-in",
      },
    });
    toast.add({
      title: "Success",
      description: "OTP sent to your email.",
      color: "success",
    });
  } catch (error: any) {
    toast.add({
      title: "Error",
      description: error.data?.message || "Failed to send OTP.",
      color: "error",
    });
    console.error("Error sending OTP:", error);
  }
}

async function signInWithOtp() {
  if (!email.value || !otp.value) {
    toast.add({
      title: "Error",
      description: "Email and OTP are required.",
      color: "error",
    });
    return;
  }
  try {
    const response = await $fetch("/api/auth/sign-in/email-otp", {
      method: "POST",
      body: {
        email: email.value,
        otp: otp.value,
      },
    });
    toast.add({
      title: "Success",
      description: "Logged in successfully!",
      color: "success",
    });
    console.log("Login response:", response);
    userLoggedIn.value = true; // Update state to reflect login
  } catch (error: any) {
    toast.add({
      title: "Error",
      description: error.data?.message || "Failed to sign in with OTP.",
      color: "error",
    });
    console.error("Error signing in with OTP:", error);
  }
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold underline">Better Auth Email OTP</h1>

    <div v-if="!userLoggedIn" class="mt-8 rounded border p-4 shadow-md">
      <h2 class="mb-4 text-xl">Sign In / Sign Up with Email OTP</h2>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700"
          >Email:</label
        >
        <input
          id="email"
          type="email"
          class="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          v-model="email"
          placeholder="your.email@example.com"
        />
      </div>
      <button
        @click="sendSignInOtp"
        class="mr-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Send OTP
      </button>

      <div class="mt-6 mb-4">
        <label for="otp" class="block text-sm font-medium text-gray-700"
          >OTP:</label
        >
        <input
          id="otp"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          v-model="otp"
          placeholder="Enter OTP"
        />
      </div>
      <button
        @click="signInWithOtp"
        class="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
      >
        Sign In with OTP
      </button>
    </div>

    <div v-else class="mt-8 rounded border bg-green-100 p-4 shadow-md">
      <p class="text-lg text-green-800">You are successfully logged in!</p>
    </div>

    <hr class="my-8" />
  </div>
</template>
