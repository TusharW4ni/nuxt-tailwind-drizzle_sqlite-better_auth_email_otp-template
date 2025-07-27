<script setup lang="ts">
const toast = useToast();

function showToast() {
  toast.add({
    title: "Success",
    description: "Your action was completed successfully.",
    color: "success",
  });
}

const fetchedUsers = await useFetch("/api/users/get");
const newUser = ref({
  firstName: "",
  lastName: "",
  email: "",
});

async function submitUser() {
  if (
    !newUser.value.firstName ||
    !newUser.value.lastName ||
    !newUser.value.email
  ) {
    toast.add({
      title: "Error",
      description: "All fields are required.",
      color: "error",
    });
    return;
  }
  try {
    await $fetch("/api/users/post", {
      method: "POST",
      body: newUser.value,
    }).then(() => {
      showToast();
      fetchedUsers.refresh();
      newUser.value = { firstName: "", lastName: "", email: "" };
    });
  } catch (error) {
    toast.add({
      title: "Error",
      description: "Failed to add user. Please try again.",
      color: "error",
    });
    console.error("Error submitting user:", error);
  }
}
</script>

<template>
  <h1 class="text-3xl font-bold underline">Hello Nuxt 4!</h1>
  <h2 class="text-2xl">
    Fetched Users: {{ fetchedUsers.data || "Database Empty" }}
  </h2>
  <div class="mt-4 flex">
    <form @submit.prevent="submitUser">
      <input
        type="text"
        class="mr-2 rounded border p-2"
        placeholder="Enter first name"
        v-model="newUser.firstName"
      />
      <input
        type="text"
        class="mr-2 rounded border p-2"
        placeholder="Enter last name"
        v-model="newUser.lastName"
      />
      <input
        type="email"
        class="mr-2 rounded border p-2"
        placeholder="Enter email"
        v-model="newUser.email"
      />
      <button type="submit" class="rounded border p-2">Add User</button>
    </form>
  </div>
</template>
