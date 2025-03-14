<template>
  <div>

    <Navbar />

    <div class="max-w-6xl mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6 text-gray-700">Daftar Unit Kerja</h1>

      <div class="mb-4" v-if="isAdmin">
        <nuxt-link to="/unit-kerja/create">
          <button class="bg-green-500 text-white px-5 py-2 rounded shadow-md hover:bg-green-600 transition">
            + Tambah Unit Kerja
          </button>
        </nuxt-link>
      </div>


      <div class="overflow-x-auto">
        <table class="w-full bg-white border border-gray-300 rounded-md shadow-md">
          <thead class="bg-gray-200">
            <tr>
              <th class="px-4 py-2 border">No</th>
              <th class="px-4 py-2 border">Nama Unit Kerja</th>
              <th class="px-4 py-2 border">Alamat</th>
              <th class="px-4 py-2 border" v-if="isAdmin">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(unit, index) in unitKerja" :key="unit.id">
              <td class="px-4 py-2 border">{{ index + 1 }}</td>
              <td class="px-4 py-2 border">{{ unit.nama_unit_kerja }}</td>
              <td class="px-4 py-2 border">{{ unit.alamat_unit_kerja }}</td>
              <td class="px-4 py-2 border" v-if="isAdmin">
                <button @click="goToEditPage(unit.id)" class="bg-yellow-500 text-white px-4 py-1 rounded mr-2 hover:bg-yellow-600 transition">
                  Edit
                </button>
                <button @click="deleteUnit(unit.id)" class="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition">
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      unitKerja: [],
      role: localStorage.getItem("role") || "", 
      token: localStorage.getItem("token") || "", 
      errorMessage: "",
    };
  },

  computed: {
    isAdmin() {
      return this.role === "admin";
    }
  },

  async mounted() {
    await this.fetchUnitKerja();
  },

  methods: {
    getAuthToken() {
      if (!this.token) {
        this.errorMessage = "Token tidak ditemukan, silakan login";
        return null;
      }
      return this.token;
    },

    goToEditPage(unitId) {
      this.$router.push(`/unit-kerja/edit/${unitId}`);
    },

    async fetchUnitKerja() {
      try {
        const token = this.getAuthToken();
        if (!token) return; 

        const response = await this.$axios.get("/unitkerja", {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.unitKerja = response.data;
      } catch (error) {
        this.errorMessage =
          "Error fetching unit kerja: " +
          (error.response?.data?.message || error.message);
        console.error("Error fetching unit kerja:", error);
      }
    },

    async deleteUnit(id) {
      try {
        const token = this.getAuthToken();
        if (!token) return; 

        if (!confirm("Apakah Anda yakin ingin menghapus unit kerja ini?")) return;

        await this.$axios.delete(`/unitkerja/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        await this.fetchUnitKerja(); 
      } catch (error) {
        this.errorMessage =
          "Error deleting unit kerja: " +
          (error.response?.data?.message || error.message);
        console.error("Error deleting unit kerja:", error);
      }
    },
  },
};
</script>


<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}

.relative:hover .hidden {
  display: block;
}


.relative {
  position: relative;
  z-index: 10;
}

.relative .hidden {
  z-index: 20;
}
</style>

