<template>
	<div class="section-box">
		<h2 v-if="title" class="section-box__title">{{ title }}</h2>
		<div class="section-box__content">
			<slot />
		</div>
	</div>
</template>

<script>
	export default {
		name: 'DevelopBox',
		props: {
			title: {
				type: String,
				default: '',
			},
		},
	}
</script>

<style scoped lang="scss">
	@import 'box';
</style>
