<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 class="text-xl font-bold mb-6">{{ form.id ? 'Edit Pegawai' : 'Tambah Pegawai' }}</h2>
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
          <label class="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
          <div class="flex items-center space-x-4">
            <label class="inline-flex items-center">
              <input 
                type="radio" 
                v-model="form.jenis_kelamin" 
                value="L" 
                class="form-radio text-blue-600"
                required
              />
              <span class="ml-2">L</span>
            </label>
            <label class="inline-flex items-center">
              <input 
                type="radio" 
                v-model="form.jenis_kelamin" 
                value="P" 
                class="form-radio text-pink-600"
                required
              />
              <span class="ml-2">P</span>
            </label>
          </div>
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
          <label for="image" class="block text-sm font-medium text-gray-700">Image</label>
          <input 
            type="file" 
            id="image" 
            @change="handleImageUpload" 
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="user_id" class="block text-sm font-medium text-gray-700">Username</label>
          <select
            id="user_id"
            v-model="form.user_id"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option disabled value="">Pilih User</option>
            <option 
              v-for="user in users" 
              :key="user.id" 
              :value="user.id"
            >
              {{ user.username }}
            </option>
          </select>
        </div>

        <div class="flex justify-end space-x-2">
          <nuxt-link to="/pegawai">
            <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded">
              Batal
            </button>
          </nuxt-link>
          <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">
            Simpan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        users: [],
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
          user_id: '',          
        },
        errorMessage: '', 
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

    computed: {
    selectedUser() {
        return this.users.find(user => user.id === this.form.user_id);
      }
    },
    mounted() {
      this.fetchUsers();
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

      async fetchUsedUsers() {
        try {
          const token = this.getAuthToken();
          if (!token) return;

          const response = await this.$axios.get('/pegawai', {
            headers: { Authorization: `Bearer ${token}` }
          });

          this.usedUserIds = response.data.map(pegawai => pegawai.user_id);
        } catch (error) {
          console.error('Error fetching used users:', error);
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

      handleImageUpload(event) {
        const token = this.getAuthToken();

        
        const file = event.target.files[0]; 
        if (file) {
          this.form.image = file;
        }
      },

      async submitForm() {
        try {
          const token = this.getAuthToken();
          if (!token) return;

          const formData = new FormData();
          
          Object.keys(this.form).forEach((key) => {
            if (this.form[key] !== null) {
              formData.append(key, this.form[key]);
            }
          });

          
          if (this.form.image) {
            formData.append('image', this.form.image);
          }

          const id = this.$route.params.id;
          let response;

          if (id) {
         
            response = await this.$axios.put(`/pegawai/${id}`, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data', 
              },
            });
          } else {

            response = await this.$axios.post('/pegawai', formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data', 
              },
            });
          }


          this.$router.push('/pegawai');
        } catch (error) {
          console.error('Terjadi kesalahan saat mengirimkan form:', error);
          this.errorMessage = 'Terjadi kesalahan saat mengirimkan data. Silakan coba lagi.';
        }
      }

    }
  };
  </script>
  
