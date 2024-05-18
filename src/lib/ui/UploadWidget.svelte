<script lang="ts">
  import { onMount } from "svelte";

  let widget;
  let imageUrl = '';

  onMount(() => {
    const cloudName = import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    console.log('Cloudinary Cloud Name:', cloudName); // Debugging line
    console.log('Cloudinary Upload Preset:', uploadPreset); // Debugging line

    if (cloudName && uploadPreset && "cloudinary" in window) {
      widget = window.cloudinary.createUploadWidget({
        cloudName: cloudName,
        uploadPreset: uploadPreset
      }, (error, result) => {
        if (!error && result && result.event === "success") {
          console.log('Upload Result:', result.info); // Log result for debugging
          imageUrl = result.info.secure_url; // Store the image URL
        } else if (error) {
          console.error('Upload Error:', error);
        }
      });
    } else {
      console.error('Cloudinary configuration missing or invalid.');
    }
  });

  function handleClick() {
    if (widget) {
      widget.open();
    }
  }
</script>

<button on:click|preventDefault={handleClick}>Upload Image</button>

{#if imageUrl}
  <div>
    <h2>Uploaded Image</h2>
    <img src={imageUrl} alt="Uploaded Image" />
  </div>
{/if}