<script lang="ts">
  export let email = "";
  export let password = "";

  function validateEmail(event) {
    const input = event.target;
    const value = input.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!isValid) {
      input.setCustomValidity("Invalid email format");
    } else {
      input.setCustomValidity("");
    }
  }

  function validatePassword(event) {
    const input = event.target;
    const value = input.value;
    if (value.length < 6) {
      input.setCustomValidity("Password must be at least 6 characters long");
    } else {
      input.setCustomValidity("");
    }
  }
</script>

<div class="field">
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="label">Email</label>
  <div class="control has-icons-left">
    <input bind:value={email} on:input={validateEmail} class="input" type="text" placeholder="Email" name="email" />
    <span class="icon is-small is-left">
      <i class="fa fa-envelope"></i>
    </span>
  </div>
</div>
<div class="field">
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="label">Password</label>
  <div class="control has-icons-left">
    <input bind:value={password} on:input={validatePassword} class="input" type="password" placeholder="Password" name="password" />
    <span class="icon is-small is-left">
      <i class="fa fa-key"></i>
    </span>
  </div>
</div>

