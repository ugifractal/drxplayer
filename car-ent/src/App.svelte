<script>	
	import { Router, Route, Link } from "svelte-routing";
	import Settings from "./pages/Settings.svelte";
	import Exit from "./pages/Exit.svelte";
	import MusicPlayer from "./pages/MusicPlayer.svelte";
	export let url = "";
	export let menuOpen = false;
	export let name;

	function toggleMenu(){
		menuOpen = !menuOpen;
	}

	function cls(){
		window.close()
	}
</script>


<Router url="{url}">
	<nav class="flex flex-wrap items-center justify-between p-5 bg-green-700">
		<h1 class="text-yellow-500">Car-ent</h1>
		<div class="flex">
			<button id="hamburger" on:click={toggleMenu}>
				{#if menuOpen}
					<img src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png" width="40" height="40" />
				{:else}
					<img src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png" width="40" height="40" />
				{/if}
			</button>
		</div>
		{#if menuOpen}
			<div class="w-full text-right text-bold mt-5 border-t-2 border-green-900">
				<Link to="/music" class="block text-yellow-300 hover:text-yellow-500 px-3 py-3 border-b-2 border-yellow-900 md:border-none">Music Player</Link>
				<Link to="/" class="block text-yellow-300 hover:text-yellow-500 px-3 py-3 border-b-2 border-yellow-900 md:border-none">Settings.</Link>
				<!--<Link to="/exit" class="block text-yellow-900 hover:text-yellow-500 px-3 py-3 border-b-2 border-yellow-900 md:border-none">Exit</Link>-->
				<a class="block text-yellow-300 hover:text-yellow-500 px-3 py-3 border-b-2 border-yellow-900 md:border-none" on:click={cls}>Exit</a>
			</div>
		{/if}
	</nav>
	<div>
		<Route path="/music" component="{MusicPlayer}"/>
		<Route path="/" component="{Settings}"/>

		<Route path="/exit" component="{Exit}"/>
	</div>
</Router>




