<script lang="ts">
  import { onMount } from "svelte";
  let widget: { open: () => void; };
  let fleaMarketId = 'fleaMarket1';
  let imageUrl = '';

  const loadImageUrl = () => {
    imageUrl = localStorage.getItem(`uploadedImageUrl_${fleaMarketId}`) || '';
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
          localStorage.setItem(`uploadedImageUrl_${fleaMarketId}`, imageUrl);
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

  function handleDelete() {
    localStorage.removeItem(`uploadedImageUrl_${fleaMarketId}`);
    imageUrl = '';
  }
</script>

<style>
  .button-container {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .image-container {
    margin-top: 20px;
  }

  .image-container img {
    max-width: 100%;
    height: auto;
  }
</style>

<div class="button-container">
  <button class="button is-primary" on:click|preventDefault={handleClick}>Upload Image</button>
  <button class="button is-danger" on:click|preventDefault={handleDelete}>Delete Image</button>
</div>

{#if imageUrl}
  <div class="image-container">
    <h4>Uploaded Image</h4>
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img src={imageUrl} alt="Uploaded Image" />
  </div>
{:else}
  <div class="image-container">
    <h4>No Image Uploaded Yet</h4>
  </div>
{/if}