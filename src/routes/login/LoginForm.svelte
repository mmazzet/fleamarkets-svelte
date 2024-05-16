<script lang="ts">
  import { goto } from "$app/navigation";
  import { fleamarketService } from "$lib/services/fleamarket-service";
  import { currentSession } from "$lib/stores";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";

  let email = "";
  let password = "";
  let message = "";

  async function login() {
    if (!isValidEmail(email)) {
      message = "Invalid email format";
      return;
    }

    if (!isValidPassword(password)) {
      message = "Password must be at least 6 characters long";
      return;
    }

    console.log(`attemting to log in email: ${email} with password: ${password}`);
    let session = await fleamarketService.login(email, password);
    if (session) {
      currentSession.set(session);
      localStorage.fleamarket = JSON.stringify(session);
      goto("/addmarket");
    } else {
      email = "";
      password = "";
      message = "Invalid Credentials";
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password: string) {
    return password.length >= 6;
  }
</script>

{#if message}
  <Message {message} />
{/if}
<form on:submit|preventDefault={login}>
  <UserCredentials bind:email bind:password />
  <button class="button is-success is-fullwidth">Log In</button>
</form>
