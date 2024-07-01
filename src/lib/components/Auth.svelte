<script lang="ts">
  import "$lib/styles/theme.css"
  import { authHandlers } from "$lib/stores/authStore";

  let email = "";
  let password = "";
  let failedLogin = false;

  async function handleSubmit() {
    try {
      failedLogin = false;
      await authHandlers.login(email, password);
    } catch (err) {
      console.log("Login failed!");
      failedLogin = true;
    }
  }
</script>

<div class="form-container">
  <form class="form" on:submit={handleSubmit}>
    <input
      class="email"
      bind:value={email}
      type="email"
      placeholder="Email"
      required
    />
    <input
      class="password"
      bind:value={password}
      type="password"
      placeholder="Password"
      required
    />
    {#if failedLogin}
      <p class="error">Failed to login!</p>
    {/if}
    <input type="submit" value="Login" class="btn" />
  </form>
</div>


<style>

  .form-container {
    width: 100%;
    height:100%;
    background-color: var(--editor-background-color);
  }

  .form {
    font-family: var(--editor-font-family);

    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    width: 305px;
    background-color: var(--tab-active-color);
    padding: 20px 24px;
    border-radius: 8px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
    font-size: 14px;

    display: grid;
    grid-template-columns: max-content 1fr;
    grid-template-rows: 40px 40px 40px;
    row-gap: 10px;
    grid-template-areas:
      "email email"
      "pass pass"
      "error btn";
  }

  .email {
    grid-area: email;
  }
  .password {
    grid-area: pass;
  }
  .error {
    grid-area: error;
    color: red;
    font-size: 12px;
    align-self: center;
    justify-self: left;
    border: 1px solid red;
    border-radius: 4px;
    padding: 5px 6px;
  }

  .password,
  .email {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
  }

  .password:focus,
  .email:focus {
    border: 2px solid var(--tab-background-color);
    padding: 9px;
  }

  .password::placeholder,
  .email::placeholder {
    color: #ccc;
  }

  .btn {
    margin: 2px 0;
    padding: 0 18px;
    background-color: var(--tab-background-color); /* Google blue */
    color: var(--tab-text-color);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    justify-self: right;
    grid-area: btn;
  }

  .btn:hover {
    background-color: var(--tab-hover-color); /* Darker blue for hover */
  }
</style>
