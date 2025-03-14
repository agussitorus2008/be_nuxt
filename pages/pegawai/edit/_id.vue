<template>
  <div>
    <Navbar />
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 class="text-xl font-bold mb-6">Edit Pegawai</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="nip" class="block text-sm font-medium text-gray-700">NIP</label>
          <input 
            type="text" 
            id="nip" 
            v-model="form.nip" 
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="nama" class="block text-sm font-medium text-gray-700">Nama</label>
          <input 
            type="text" 
            id="nama" 
            v-model="form.nama" 
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="tempat_lahir" class="block text-sm font-medium text-gray-700">Tempat Lahir</label>
          <input 
            type="text" 
            id="tempat_lahir" 
            v-model="form.tempat_lahir" 
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="alamat" class="block text-sm font-medium text-gray-700">Alamat</label>
          <input 
            type="text" 
            id="alamat" 
            v-model="form.alamat" 
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="tanggal_lahir" class="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
          <input 
            type="date" 
            id="tanggal_lahir" 
            v-model="form.tanggal_lahir" 
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="jenis_kelamin" class="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
          <input 
            type="text" 
            id="jenis_kelamin" 
            v-model="form.jenis_kelamin" 
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="golongan" class="block text-sm font-medium text-gray-700">Golongan</label>
          <input 
            type="text" 
            id="golongan" 
            v-model="form.golongan" 
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="eselon" class="block text-sm font-medium text-gray-700">Eselon</label>
          <input 
            type="text" 
            id="eselon" 
            v-model="form.eselon" 
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="jabatan" class="block text-sm font-medium text-gray-700">Jabatan</label>
          <input 
            type="text" 
            id="jabatan" 
            v-model="form.jabatan" 
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="agama" class="block text-sm font-medium text-gray-700">Agama</label>
          <input 
            type="text" 
            id="agama" 
            v-model="form.agama" 
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="no_hp" class="block text-sm font-medium text-gray-700">No HP</label>
          <input 
            type="text" 
            id="no_hp" 
            v-model="form.no_hp" 
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="npwp" class="block text-sm font-medium text-gray-700">NPWP</label>
          <input 
            type="text" 
            id="npwp" 
            v-model="form.npwp" 
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Foto Pegawai</label>
          
          
          <div v-if="form.image_url" class="mb-2">
            <img :src="form.image_url" alt="Foto Pegawai" class="w-32 h-32 rounded-md shadow-md" />
          </div>
          <input 
            type="file" 
            @change="handleImageUpload" 
            required
            accept="image/*"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="unit_kerja_id" class="block text-sm font-medium text-gray-700">Unit Kerja</label>
          <select
            id="unit_kerja_id"
            v-model="form.unit_kerja_id"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option disabled value="">Pilih Unit Kerja</option>
            <option 
              v-for="unit in units" 
              :key="unit.id" 
              :value="unit.id"
            >
              {{ unit.nama_unit_kerja }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label for="user_id" class="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="user_id"
            :value="getUsername(form.user_id)"
            disabled
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200 text-gray-700"
          />
        </div>


        <div class="flex justify-end space-x-2">
          <nuxt-link to="/pegawai">
            <button 
              type="button" 
              class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
            >
              Batal
            </button>
          </nuxt-link>

          <button 
            type="submit" 
            class="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center"
            :class="{ 'button-disabled': loading }"
            :disabled="loading"
          >
            <span v-if="loading" class="loader"></span>
            <span v-if="loading">Menyimpan...</span>
            <span v-else>Simpan</span>
          </button>
        </div>



      </form>
    </div>
    </div>
    <Footer />
  </div>
  
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        nip: '',            
        nama: '',           
        tempat_lahir: '',   
        tanggal_lahir: '',  
        jenis_kelamin: '',  
        alamat: '',         
        golongan: '',       
        eselon: '',         
        jabatan: '',        
        agama: '',          
        no_hp: '',          
        unit_kerja_id: '',  
        image: '',
        image_url: '',
        user_id: '',          
      },
      errorMessage: '', 
      loading: false, 
      users: [],
      units: [],
    };
  },

  async created() {
    const id = this.$route.params.id; 
    if (id) {
      await this.fetchpegawai(id);  
    }
    await this.fetchUsers();
    await this.fetchUnits(); 
  },
  

  methods: {

    getUsername(userId) {
      const user = this.users.find(user => user.id === userId);
      return user ? user.username : "User tidak ditemukan";
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.image = file;
        this.form.image_url = URL.createObjectURL(file); 
      }
    },

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

    async fetchpegawai(id) {
      try {
        const token = this.getAuthToken();
        if (!token) return;

        const response = await this.$axios.get(`/pegawai/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.form = response.data; 
      } catch (error) {
        this.errorMessage = 'Error fetching pegawai data: ' + (error.response?.data?.message || error.message);
        console.error('Error fetching pegawai:', error);
      }
    },

    async fetchUsers() {
      try {
        const token = this.getAuthToken();
        if (!token) return;

        const response = await this.$axios.get('/auth/user', {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.users = response.data || []; 
      } catch (error) {
        this.errorMessage = 'Error fetching users: ' + (error.response?.data?.message || error.message);
        console.error('Error fetching users:', error);
      }
    },

    async fetchUnits() {
      try {
        const token = this.getAuthToken();
        if (!token) return;

        const response = await this.$axios.get('/unitkerja', {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.units = response.data || []; 
      } catch (error) {
        this.errorMessage = 'Error fetching units: ' + (error.response?.data?.message || error.message);
        console.error('Error fetching units:', error);
      }
    },



    async submitForm() {
      try {
        this.loading = true;
        const token = this.getAuthToken();
        if (!token) return;

        const id = this.$route.params.id;
        const formData = new FormData();

        for (const key in this.form) {
          if (this.form[key] !== null && this.form[key] !== undefined) {
            formData.append(key, this.form[key]);
          }
        }

        if (this.form.image instanceof File) {
          formData.append('image', this.form.image);
        }

        let response;
        if (id) {
          formData.append('_method', 'PUT');
          response = await this.$axios.post(`/pegawai/${id}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            }
          });
        }

        this.$router.push('/pegawai');
      } catch (error) {
        console.error('Error submitting form:', error);

        if (error.response && error.response.data && error.response.data.errors) {
          this.errorMessage = Object.values(error.response.data.errors)
            .flat()
            .join(', ');
        } else {
          this.errorMessage = 'Terjadi kesalahan saat mengirimkan data. Silakan coba lagi.';
        }
      } finally {
        this.loading = false;
      }
    }
  }
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
  display: inline-block;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.button-disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
