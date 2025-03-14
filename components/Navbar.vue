<template>
    <nav class="bg-blue-500 text-white p-4 shadow-md">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="text-xl font-semibold">
          <router-link to="/dashboard" class="text-white hover:text-gray-300">Dashboard</router-link>
        </div>
  
        <div class="flex items-center space-x-6">
          <div class="relative group">
            <button class="hover:bg-blue-600 px-4 py-2 rounded-md focus:outline-none">
              Menu
            </button>
            <div
              class="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <router-link to="/pegawai" class="block px-4 py-2 text-sm hover:bg-blue-600 hover:text-white">Pegawai</router-link>
              <router-link to="/unit-kerja" class="block px-4 py-2 text-sm hover:bg-blue-600 hover:text-white">Unit Kerja</router-link>
            </div>
          </div>
  

          <button @click="logout" class="logout-btn" :disabled="isLoading">
            <span v-if="isLoading" class="loader"></span>
            <span v-else>Logout</span>
          </button>
        </div>
      </div>
    </nav>
</template>
  
  <script>
  export default {
    data() {
      return {
        isLoading: false, 
      };
    },
    methods: {
      async logout() {
        this.isLoading = true;
        console.log("Logging out...");
  
        const token = localStorage.getItem("token");
  
        if (!token) {
          console.log("Token tidak ditemukan, silakan login");
          this.$router.push("/login");
          return;
        }

        try {
          const response = await this.$axios.post(
            "auth/logout",
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
  
          console.log("Logout successful:", response);
          localStorage.removeItem("token");
  
          setTimeout(() => {
            this.$router.push("/login");
          }, 1000);
        } catch (error) {
          console.error("Error during logout:", error);
        } finally {
          setTimeout(() => {
            this.isLoading = false; 
          }, 1000);
        }
      },
    },
  };
  </script>
  
  <style scoped>

  .logout-btn {
    background-color: #dc2626;
    color: white;
    padding: 8px 16px;
    border-radius: 5px;
    transition: background 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 100px;
  }
  

  .logout-btn:hover {
    background-color: #b91c1c;
  }
  

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
  
  .logout-btn:disabled {
    background-color: #f87171;
    cursor: not-allowed;
  }
  </style>
  