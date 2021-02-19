// https://dev.to/matebek/simplest-way-to-set-up-svelte-with-tailwind-css-41bn

import Dummy from './Dummy.svelte'; // avoid slow compile by separate the files
import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;