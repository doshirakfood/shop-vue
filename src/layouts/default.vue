<template>
	<div class="wrapper">
		<l-top-panel />
		<l-header />
		<main class="main">
			<slot />
		</main>
	</div>
</template>

<script>
	import LHeader from '@components/header/header.vue'
	import LTopPanel from '@components/top-panel/top-panel.vue'

	export default {
		name: 'LayoutDefault',
		components: {
			LTopPanel,
			LHeader,
		},
	}
</script>
