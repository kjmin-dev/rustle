<script lang="ts">
import { Button, Card, Input } from 'flowbite-svelte';
import { decodeJwt } from 'jose';
import { onMount } from 'svelte';
import Text from '../../components/common/Text.svelte';
import type { GoogleAuth } from '../../types/Auth';
import { OAUTH_CLIENT_ID_GOOGLE } from '../../utils/env';

const handleCredentialResponse: GoogleAuth.IdConfigurationCallback = (response) => {
    const token = response.credential;
    const payload = decodeJwt<GoogleAuth.TokenPayload>(token);
    console.log('Google Login Payload: ', payload);
};
const LOGIN_BUTTON_SIZE = 240;
const LOGIN_BUTTON_WIDTH = `w-[240px]`;

onMount(() => {
    window.google.accounts.id.initialize({
        client_id: OAUTH_CLIENT_ID_GOOGLE,
        callback: handleCredentialResponse,
        ux_mode: 'popup',
        context: 'use',
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
        <Text tag="h2" size="2xl" weight="bold">Login to Rustle</Text>
        <Text tag="h5" size="sm" weight="regular">We're so excited to see you again!</Text>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button class="w-full cursor-pointer" color="primary">Login</Button>
        <div id="login-google" class={[LOGIN_BUTTON_WIDTH, 'mt-4 overflow-hidden']}></div>
        <Text size="sm">
            Don't have an account? <a href="/signup" class="text-blue-500">Sign up</a>
        </Text>
    </Card>
</div>
