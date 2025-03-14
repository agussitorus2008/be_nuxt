<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Detail Pegawai</h1>


    <div class="bg-white p-6 rounded-md shadow-md">
      <table class="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th class="px-4 py-2 text-left border">Field</th>
            <th class="px-4 py-2 text-left border">Detail</th>
          </tr>
          
        </thead>
        <tbody>

          <tr>
            <td class="px-4 py-2 font-semibold border">NIP</td>
            <td class="px-4 py-2 border">{{ pegawai.nip }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 font-semibold border">Nama</td>
            <td class="px-4 py-2 border">{{ pegawai.nama }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 font-semibold border">Tempat Lahir</td>
            <td class="px-4 py-2 border">{{ pegawai.tempat_lahir }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 font-semibold border">Alamat</td>
            <td class="px-4 py-2 border">{{ pegawai.alamat }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 font-semibold border">Tanggal Lahir</td>
            <td class="px-4 py-2 border">{{ pegawai.tanggal_lahir }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 font-semibold border">Jenis Kelamin</td>
            <td class="px-4 py-2 border">{{ pegawai.jenis_kelamin }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 font-semibold border">Golongan</td>
            <td class="px-4 py-2 border">{{ pegawai.golongan }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 font-semibold border">Eselon</td>
            <td class="px-4 py-2 border">{{ pegawai.eselon }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 font-semibold border">Jabatan</td>
            <td class="px-4 py-2 border">{{ pegawai.jabatan }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 font-semibold border">Tempat Tugas</td>
            <td class="px-4 py-2 border">{{ pegawai.unit_kerja?.alamat_unit_kerja || 'Tidak Diketahui' }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 font-semibold border">Agama</td>
            <td class="px-4 py-2 border">{{ pegawai.agama }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 font-semibold border">Unit Kerja</td>
            <td class="px-4 py-2 border">{{ pegawai.unit_kerja?.nama_unit_kerja || 'Tidak Diketahui' }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 font-semibold border">No HP</td>
            <td class="px-4 py-2 border">{{ pegawai.no_hp }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 font-semibold border">NPWP</td>
            <td class="px-4 py-2 border">{{ pegawai.npwp || '-' }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 font-semibold border">Foto</td>
            <td class="px-4 py-2 border">
              <div v-if="pegawai.image">
                <img :src="getImageUrl(pegawai.image)" alt="Foto Pegawai" class="w-32 h-32 object-cover rounded">
              </div>
              <p v-else class="text-gray-800">-</p>
            </td>
          </tr>
          <tr>
            <td class="px-4 py-2 font-semibold border">Username</td>
            <td class="px-4 py-2 border">{{ pegawai.user?.username || 'Tidak Diketahui' }}</td>
          </tr>

        </tbody>
      </table>


      <div class="mt-6">
        <nuxt-link to="/pegawai" class="bg-blue-500 text-white px-4 py-2 rounded">Kembali</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {

    return {
      pegawai: {}, 
      users: [], 
      errorMessage: '' 
    };
  },
  async mounted() {
    const pegawaiId = this.$route.params.id;
    await this.fetchPegawai(pegawaiId);
    await this.fetchUsers();
  },
  methods: {
    
    getAuthToken() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.errorMessage = 'Token tidak ditemukan, silakan login';
        return null;
      }
      return token;
    },
    getImageUrl(imagePath) {
      
      return `http://127.0.0.1:8000/storage/${imagePath}`;
    },

   
    async fetchPegawai(id) {
      try {
        const token = this.getAuthToken();
        if (!token) return;

        const response = await this.$axios.get(`/pegawai/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.pegawai = response.data; 
        

        console.log('Data Pegawai:', this.pegawai); 
        console.log('User Data:', this.pegawai.user); 


        if (this.pegawai.user?.id) {
          await this.fetchUsers();
        }
      } catch (error) {
        this.errorMessage = 'Error fetching pegawai: ' + (error.response?.data?.message || error.message);
        console.error('Error fetching pegawai:', error);
      }
    },

    async fetchUsers(userId) {
      try {
        const token = this.getAuthToken();
        if (!token) return;

        // Pastikan ada userId sebelum melakukan request
        if (userId) {
          const response = await this.$axios.get(`auth/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          this.user = response.data; // Menyimpan data user sesuai dengan userId
          // Menetapkan user ke pegawai
          this.pegawai.user = this.user;
        }
      } catch (error) {
        this.errorMessage = 'Error fetching users: ' + (error.response?.data?.message || error.message);
        console.error('Error fetching users:', error);
      }
    }

  }
};
</script>
