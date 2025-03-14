<template>
  <footer class="bg-blue-500 text-white text-center py-4 mt-auto shadow-md sticky bottom-0 w-full">
    <p>&copy; {{ currentYear }} Test Ke PT. Traspac Makmur Sejahtera.</p>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(), 
    };
  },
};
</script>


