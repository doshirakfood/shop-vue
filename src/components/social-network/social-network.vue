<template>
	<nav class="social-network" aria-label="Social network" v-once>
		<div class="social-network__row">
			<a
				v-for="(social, index) in socialList"
				:key="`social-${index}`"
				:href="social.link"
				:title="`Subscribe to ${social.label}`"
				:aria-label="`Subscribe to ${social.label}`"
				class="social-network__col"
			>
				<svg-icon class="social-network__icon" :name="social.icon" />
			</a>
		</div>
	</nav>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		name: 'SocialNetwork',
		computed: {
			...mapState('contacts', ['socialList']),
		},
	}
</script>

<style lang="scss" src="./social-network.scss" />
