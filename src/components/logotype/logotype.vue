<template>
	<router-link class="logotype" to="/" title="Go home page">
		<span class="logotype__wrapper">
			<svg-icon class="logotype__icon" name="logotype" />
			<span v-if="isName" class="logotype__name">{{ companyName }}</span>
		</span>
	</router-link>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		name: 'Logotype',
		computed: {
			...mapState('main', ['companyName']),
		},
		props: {
			isName: {
				type: Boolean,
				default: true,
			},
		},
	}
</script>

<style lang="scss">
	@import 'logotype';
</style>
