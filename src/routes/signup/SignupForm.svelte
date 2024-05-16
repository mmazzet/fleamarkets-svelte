<script lang="ts">
  import { goto } from "$app/navigation";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import UserDetails from "$lib/ui/UserDetails.svelte";
  import Message from "$lib/ui/Message.svelte";
  import { fleamarketService } from "$lib/services/fleamarket-service";
  import sanitizeHtml from "sanitize-html";
  

  let firstName = "";
  let lastName = "";
  let email = "";
  let password = "";
  let message = "";

  async function signup() {
    if (!isValidEmail(email)) {
      message = "Invalid email format";
      return;
    }

    if (!isValidPassword(password)) {
      message = "Password must be at least 6 characters long";
      return;
    }

    const sanitizedFirstName = sanitizeHtml(firstName);
    const sanitizedLastName = sanitizeHtml(lastName);

    let user = { firstName: sanitizedFirstName, lastName: sanitizedLastName, email, password };
    let success = await fleamarketService.signup(user);
    if (success) {
      goto("/login");
    } else {
      message = "Error Trying to sign up";
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
<form on:submit|preventDefault={signup}>
  <UserDetails bind:firstName bind:lastName />
  <UserCredentials bind:email bind:password />
  <button class="button is-success is-fullwidth">Create Account</button>
  <br />
</form>
