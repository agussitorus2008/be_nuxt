<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm animate-fade-in" :class="{ 'loading-form': loading }">
      <h1 class="text-2xl font-semibold text-center mb-6">Daftar</h1>
      <form @submit.prevent="register">

        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 input-focus"
          />
        </div>

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 input-focus"
          />
        </div>

        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 input-focus"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-transform transform button-click flex items-center justify-center"
          :disabled="loading"
        >
          <svg v-if="loading" class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
          <span v-if="loading">Loading...</span>
          <span v-else>Daftar</span>
        </button>

      </form>

      <p class="mt-4 text-center text-sm text-gray-600">
        Sudah punya akun? <nuxt-link to="/login" class="text-blue-500 hover:text-blue-600">Login disini</nuxt-link>
      </p>

      <p v-if="errorMessage" class="mt-4 text-center text-red-500">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      errorMessage: '',
      loading: false,
    };
  },
  methods: {
    async register() {
      this.loading = true; 
      try {
        await new Promise(resolve => setTimeout(resolve, 300));

        const response = await this.$axios.post('/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        });

        localStorage.setItem('token', response.data.token);

        this.$router.push('/login');
      } catch (error) {
        console.error('Registration failed:', error.response?.data?.message);
        this.errorMessage = error.response?.data?.message || 'Gagal mendaftar, coba lagi';
      } finally {
        this.loading = false; 
      }
    },
  },
};
</script>

<style>

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

.input-focus {
  transition: transform 0.2s ease-in-out;
}

.input-focus:focus {
  transform: scale(1.05);
}


.button-click {
  transition: transform 0.1s ease-in-out;
}

.button-click:active {
  transform: scale(0.95);
}


.loading-form {
  opacity: 0.5;
  transition: opacity 0.3s ease-in-out;
}
</style>
