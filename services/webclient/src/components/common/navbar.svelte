<script lang="ts">
    import { DarkMode, Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';
</script>

<Navbar fluid>
    <NavBrand href="/">
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite</span>
    </NavBrand>

    <div class="flex md:order-2">
        <DarkMode />
        <NavHamburger />
    </div>

    <NavUl slideParams={{ duration: 500 }}>
        <NavLi href="/">Home</NavLi>
    </NavUl>
</Navbar>
