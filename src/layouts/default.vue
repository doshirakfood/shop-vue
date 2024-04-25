<template>
	<div class="wrapper">
		<l-header />
		<main class="main">
			<slot />
		</main>
	</div>
</template>

<script>
	import LHeader from '@components/header/header.vue'

	export default {
		name: 'LayoutDefault',
		components: {
			LHeader,
		},
	}
</script>
