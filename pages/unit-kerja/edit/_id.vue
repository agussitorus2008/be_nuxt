<template>
  <div>
    <Navbar />
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 class="text-xl font-bold mb-6">Edit Unit Kerja</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label for="nama_unit_kerja" class="block text-sm font-medium text-gray-700">Nama Unit Kerja</label>
            <input 
              type="text" 
              id="nama_unit_kerja" 
              v-model="form.nama_unit_kerja" 
              required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
  
          <div class="mb-4">
            <label for="alamat_unit_kerja" class="block text-sm font-medium text-gray-700">Alamat Unit Kerja</label>
            <input 
              type="text" 
              id="alamat_unit_kerja" 
              v-model="form.alamat_unit_kerja" 
              required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
  
          <div class="flex justify-end space-x-2">
            <nuxt-link to="/unit-kerja">
              <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded">
                Batal
              </button>
            </nuxt-link>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
  </div>

  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        form: {
          nama_unit_kerja: '',
          alamat_unit_kerja: ''
        },
        errorMessage: '' 
      };
    },
    async created() {
      const unitId = this.$route.params.id; 
      if (unitId) {
        await this.fetchUnitKerja(unitId); 
      }
    },
    methods: {
      getAuthToken() {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('Token tidak ditemukan, silakan login');
          this.errorMessage = 'Token tidak ditemukan, silakan login';
          this.$router.push('/login'); 
          return null; 
        }
        return token; 
      },
  

      async fetchUnitKerja(unitId) {
        try {
          const token = this.getAuthToken();
          if (!token) return;
  
          const response = await this.$axios.get(`/unitkerja/${unitId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          this.form.nama_unit_kerja = response.data.nama_unit_kerja;
          this.form.alamat_unit_kerja = response.data.alamat_unit_kerja;
        } catch (error) {
          console.error('Error fetching unit kerja:', error);
          this.errorMessage = 'Terjadi kesalahan saat mengambil data unit kerja. Silakan coba lagi.';
        }
      },
  

      async submitForm() {
        try {
          const token = this.getAuthToken();
          if (!token) return;
  
          const unitId = this.$route.params.id; 
          const method = unitId ? 'put' : 'post'; 
          const url = unitId ? `/unitkerja/${unitId}` : '/unitkerja';
  
          const response = await this.$axios[method](url, this.form, {
            headers: { Authorization: `Bearer ${token}` }
          });
  

          this.$router.push('/unit-kerja');
        } catch (error) {
          console.error('Error submitting form:', error);
          this.errorMessage = 'Terjadi kesalahan saat menyimpan data unit kerja. Silakan coba lagi.';
        }
      }
    }
  };
  </script>
  