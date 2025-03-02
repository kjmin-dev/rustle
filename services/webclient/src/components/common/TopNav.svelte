<script lang="ts">
import { Button, DarkMode, Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';
import { ArrowLeftToBracketOutline } from 'flowbite-svelte-icons';
</script>

<Navbar fluid class="border-b border-gray-200 mb-2">
    <NavBrand href="/">
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Rustle</span>
    </NavBrand>

    <div class="flex md:order-2 gap-2">
        <Button color="alternative" size="xs" href="/login">
            <ArrowLeftToBracketOutline size="md" />
            <p class="ml-1">Signin</p>
        </Button>
        <DarkMode />
        <NavHamburger />
    </div>

    <NavUl slideParams={{ duration: 500 }}>
        <NavLi href="/">Home</NavLi>
    </NavUl>
</Navbar>
