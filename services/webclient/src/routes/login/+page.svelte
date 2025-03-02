<script lang="ts">
import { Button, Card, Input } from 'flowbite-svelte';
import { onMount } from 'svelte';
import { OAUTH_CLIENT_ID_GOOGLE } from '../../utils/env';
type IdConfigurationCallback = google.accounts.id.IdConfiguration['callback'];
interface TokenPayload {
    name: string;
    email: string;
    picture: string;
}
let user: TokenPayload | null = null;
const handleCredentialResponse: IdConfigurationCallback = (response) => {
    const token = response.credential;
    console.log('Google Login Response: ', response);
    console.log('Google Login Token: ', token);
};
const LOGIN_BUTTON_SIZE = 240;
const LOGIN_BUTTON_WIDTH = `w-[240px]`;

onMount(() => {
    window.google.accounts.id.initialize({
        client_id: OAUTH_CLIENT_ID_GOOGLE,
        callback: handleCredentialResponse,
        ux_mode: 'popup',
    });
    window.google.accounts.id.renderButton(document.getElementById('login-google')!, {
        theme: 'filled_black',
        size: 'large',
        type: 'standard',
        text: 'continue_with',
        width: LOGIN_BUTTON_SIZE,
    });
    window.google.accounts.id.prompt();
});
</script>

<div class="flex flex-col items-center justify-center h-screen w-screen">
    <Card class="items-center justify-center gap-2">
        <h2 class="text-2xl text-gray-200 font-bold">Login to Rustle</h2>
        <h5 class="text-sm text-gray-300 mb-2">We're so excited to see you again!</h5>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button class="w-full cursor-pointer">Login</Button>
        <div id="login-google" class={[LOGIN_BUTTON_WIDTH, 'mt-4 overflow-hidden']}></div>
        <p class="text-sm text-gray-300">
            Don't have an account? <a href="/signup" class="text-blue-500">Sign up</a>
        </p>
    </Card>
</div>
