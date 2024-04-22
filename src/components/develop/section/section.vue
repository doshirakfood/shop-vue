<template>
	<section class="section">
		<h2 class="section__title title-display">
			<div class="container">{{ title }}</div>
		</h2>

		<div class="container">
			<slot />
		</div>
	</section>
</template>

<script>
	export default {
		name: 'DevelopSection',
		props: {
			title: {
				type: String,
				default: '',
			},
		},
	}
</script>

<style scoped lang="scss">
	@import 'section';
</style>
