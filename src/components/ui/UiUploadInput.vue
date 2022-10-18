<template>
  <div class="space-y-1 p-2 text-center">
    <div class="flex text-sm text-gray-600 text-center">
      <label
        for="file-upload"
        class="relative cursor-pointer bg-transparent rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
    
        ><span><i class="bi-image" /> Upload a file</span
        ><input id="file-upload" name="file-upload" type="file" class="sr-only"
      /></label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
}
</script>
