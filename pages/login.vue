<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
      <h1 class="text-2xl font-semibold text-center mb-6">Login</h1>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md flex items-center justify-center"
        >
          <span v-if="isLoading" class="loader"></span>
          <span v-else>Login</span>
        </button>
      </form>
      <p class="mt-4 text-center text-sm text-gray-600">
        Belum punya akun? <nuxt-link to="/register" class="text-blue-500 hover:text-blue-600">Daftar disini</nuxt-link>
      </p>
      <p v-if="errorMessage" class="mt-4 text-center text-red-500">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      isLoading: false, 
    };
  },
  methods: {
    async login() {
      this.isLoading = true;

      try {
        const response = await this.$axios.post('/auth/login', {
          email: this.email,
          password: this.password,
        }, {
          withCredentials: true,
        });

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.user.role);
        
        setTimeout(() => { 
          this.$router.push('/pegawai');
        }, 500); 
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Email atau password salah';
      } finally {
        this.isLoading = false; 
      }
    },
  },
};
</script>

<style>
.loader {
  border: 3px solid white;
  border-top: 3px solid transparent;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
