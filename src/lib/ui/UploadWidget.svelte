<script lang="ts">
  import { onMount } from "svelte";
  let widget;
  let imageUrl = '';

  const loadImageUrl = () => {
    imageUrl = localStorage.getItem('uploadedImageUrl') || '';
  };

  onMount(() => {
    loadImageUrl();

    const cloudName = import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_PUBLIC_CLOUDINARY_UPLOAD_PRESET;


    if (cloudName && uploadPreset && "cloudinary" in window) {
      widget = window.cloudinary.createUploadWidget({
        cloudName: cloudName,
        uploadPreset: uploadPreset
      }, (error, result) => {
        if (!error && result && result.event === "success") {
          console.log('Upload Result:', result.info);
          imageUrl = result.info.secure_url;
          localStorage.setItem('uploadedImageUrl', imageUrl);
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