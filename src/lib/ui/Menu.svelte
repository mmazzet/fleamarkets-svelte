<script lang="ts">
  import { currentSession } from "$lib/stores";
</script>

<nav class="navbar is-full-width">
  <div class="container">
    <div class="navbar-brand">
      <a class="navbar-item" href="#">
        <span class="icon"> <i class="fas fa-store"></i></span><span><strong>Fleamarket</strong> </span>
      </a>
    </div>
    <div id="navbarMenu" class="navbar-menu">
      <div class="navbar-end">
        <a class="navbar-item" href="/addmarket"> Add Market </a>
        <a class="navbar-item" href="/report"> Report </a>
        <a class="navbar-item" href="/logout"> Logout [{$currentSession.name}]</a>
      </div>
      <div></div>
    </div>
  </div>
</nav>
