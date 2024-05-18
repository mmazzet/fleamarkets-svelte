<script lang="ts">
  	import { CldUploadWidget } from 'svelte-cloudinary';
    import UploadWidget from "$lib/ui/UploadWidget.svelte"

    /*let info;
    let error;

    function onUpload(result, widget){
        if(result.event === 'success'){
            info = result.info;
        } else if(result.event === 'error'){
            error = result.error;
        }
        widget.close()
    }
*/
  

</script>

<div class="container">
    <UploadWidget />
</div>

