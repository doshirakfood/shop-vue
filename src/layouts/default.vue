<template>
	<div class="wrapper">
		<l-header />
		<main class="main">
			<slot />
		</main>
		<l-footer />
	</div>
</template>

<script>
	import LHeader from '@components/header/header.vue'
	import LFooter from '@components/footer/footer.vue'

	export default {
		name: 'LayoutDefault',
		components: {
			LHeader,
			LFooter,
		},
	}
</script>
