<template>
  <div>
    <Navbar />
    <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Daftar Pegawai</h1>
      <nuxt-link v-if="isAdmin" to="/pegawai/create">
          <button class="bg-green-500 text-white px-4 py-2 rounded mb-6">Tambah Data Pegawai</button>
      </nuxt-link>
      <button v-if="isAdmin" @click="generatePDF" class="bg-blue-500 text-white px-4 py-2 rounded mb-6">
        Cetak PDF
      </button>

      <div v-if="isAdmin" class="flex items-center mb-6 space-x-4">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Cari berdasarkan nama atau NIP"
          class="border border-gray-300 rounded px-4 py-2 flex-grow"
        /> 
        <select
          v-model="selectedUnitKerja"
          @change="fetchPegawai"
          class="border border-gray-300 rounded px-4 py-2"
        >
          <option value="">Semua Unit Kerja</option>
          <option
            v-for="unit in unitKerjaOptions"
            :key="unit.id"
            :value="unit.id"
          >
            {{ unit.nama_unit_kerja }}
          </option>
        </select>
        <button
          @click="fetchPegawai"
          class="bg-green-500 text-white px-4 py-2 rounded"
        >
          Cari
        </button>
      </div>

      <table class="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 text-left font-semibold text-gray-700">No</th>
            <th class="px-4 py-2 text-left font-semibold text-gray-700">NIP</th>
            <th class="px-4 py-2 text-left font-semibold text-gray-700">Nama</th>
            <th class="px-4 py-2 text-left font-semibold text-gray-700">Jabatan</th>
            <th class="px-4 py-2 text-left font-semibold text-gray-700">Unit Kerja</th>
            <th class="px-4 py-2 text-left font-semibold text-gray-700">Username</th>
            <th v-if="isAdmin" class="px-4 py-2 text-left font-semibold text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in combinedData" :key="item.id">
            <td class="px-4 py-2 border">{{ index + 1 }}</td>
            <td class="px-4 py-2 border">{{ item.nip || '-' }}</td>
            <td class="px-4 py-2 border">{{ item.nama || '-' }}</td>
            <td class="px-4 py-2 border">{{ item.jabatan || '-' }}</td>
            <td class="px-4 py-2 border">{{ item.unit_kerja?.nama_unit_kerja || '-' }}</td>
            <td class="px-4 py-2 border">{{ item.user?.username || '-' }}</td>
            <td v-if="isAdmin" class="px-4 py-2 border">
                <button @click="goToShowPage(item.id)" class="bg-green-500 text-white px-4 py-1 rounded mr-2">Show</button>
                <button @click="goToEditPage(item.id)" class="bg-yellow-500 text-white px-4 py-1 rounded mr-2">Edit</button>
                <button @click="deleteItem(item.id)" class="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-between mt-4">
        <button 
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
          class="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <span class="text-gray-700">Page {{ currentPage }} of {{ totalPages }}</span>
        <button 
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
          class="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>

      <div v-if="errorMessage" class="text-red-500 mt-4">
        {{ errorMessage }}
      </div>
    </div>
    <Footer />
  </div>
  
</template>


<script>
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
  layout: "default",
  data() {
    return {
      pegawai: [],
      users: [], 
      searchQuery: '', 
      selectedUnitKerja: '', 
      unitKerjaOptions: [], 
      currentPage: 1,  
      perPage: 3,  
      totalPages: 1,  
      role: localStorage.getItem("role") || "",
      token: localStorage.getItem("token") || "", 
      errorMessage: '' 
    };
  },

  computed: {
    isAdmin() {
      return this.role === "admin"; 
    },
    combinedData() {
    return [...this.pegawai, ...this.users];
  }
  },
  
  async mounted() {
    await this.fetchUnitKerjaOptions(); 
    await this.fetchPegawai(); 
  },
  methods: {
    getAuthToken() {
      if (!this.token) {
        this.errorMessage = "Token tidak ditemukan, silakan login";
        return null;
      }
      return this.token;
    },
    goToShowPage(id) {
      this.$router.push(`/pegawai/show/${id}`);
    },

    goToEditPage(id) {
      this.$router.push(`/pegawai/edit/${id}`);
    },

    async fetchPegawai() {
      try {
        const token = this.getAuthToken();
        if (!token) return;

        const params = {
          search: this.searchQuery || undefined,
          unit_kerja_id: this.selectedUnitKerja || undefined,
          limit: this.perPage,  
          page: this.currentPage,
        };

        const response = await this.$axios.get('/pegawai?export=true', {
          params,
          headers: { Authorization: `Bearer ${token}` }
        });

        this.pegawai = response.data.data || [];
        this.totalPages = response.data.last_page;
      } catch (error) {
        this.errorMessage = 'Error fetching pegawai: ' + (error.response?.data?.message || error.message);
        console.error('Error fetching pegawai:', error);
      }
    },

    async fetchUnitKerjaOptions() {
      try {
        const token = this.getAuthToken();
        if (!token) return;

        const response = await this.$axios.get('/unitkerja', {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.unitKerjaOptions = response.data || [];
      } catch (error) {
        this.errorMessage = 'Error fetching unit kerja: ' + (error.response?.data?.message || error.message);
        console.error('Error fetching unit kerja:', error);
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

    async deletePegawai(id) {
      try {
        const token = this.getAuthToken();
        if (!token) return;

        await this.$axios.delete(`/pegawai/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.fetchPegawai();
      } catch (error) {
        this.errorMessage = 'Error deleting pegawai: ' + (error.response?.data?.message || error.message);
        console.error('Error deleting pegawai:', error);
      }
    },

    async generatePDF() {
    const token = this.getAuthToken();
    if (!token) {
        alert("Token tidak ditemukan. Harap login kembali.");
        return;
    }

    const pdf = new jsPDF();


    const columns = ['No', 'NIP', 'Nama', 'Jabatan', 'Unit Kerja', 'Username'];
    const rows = [];


    this.pegawai.forEach((pegawai, index) => {
        rows.push([
            index + 1,
            pegawai.nip || '-',
            pegawai.nama || '-',
            pegawai.tempat_lahir || '-',
            pegawai.jabatan || '-',
            pegawai.unit_kerja?.nama_unit_kerja || '-',
            pegawai.user?.username || '-'
        ]);
    });


    pdf.autoTable({
        head: [columns],
        body: rows,
        startY: 20,
        theme: 'grid', 
        headStyles: {
            fillColor: [255, 255, 255], 
            textColor: [0, 0, 0], 
            fontStyle: 'bold' 
        },
        bodyStyles: {
            textColor: [0, 0, 0] 
        }
    });
    pdf.save('pegawai.pdf');
},

    async deleteUser(id) {
      try {
        const token = this.getAuthToken();
        if (!token) return;

        await this.$axios.delete(`/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.fetchUsers();
      } catch (error) {
        this.errorMessage = 'Error deleting user: ' + (error.response?.data?.message || error.message);
        console.error('Error deleting user:', error);
      }
    },

    async changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
      await this.fetchPegawai();  
    },
    async deleteItem(id) {
      if (this.pegawai.find(p => p.id === id)) {
        await this.deletePegawai(id);
      } else {
        await this.deleteUser(id);
      }
    }
  }
};
</script>
