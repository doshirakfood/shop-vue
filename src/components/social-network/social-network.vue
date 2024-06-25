<template>
	<nav class="social-network" aria-label="Social network" v-once>
		<v-row type="grid" :gap="8" :cols="4">
			<v-col
				v-for="(social, index) in socialList"
				:key="`social-${index}`"
			>
				<a
					:href="social.link"
					:title="`Subscribe to ${social.label}`"
					:aria-label="`Subscribe to ${social.label}`"
					class="social-network__link"
				>
					<svg-icon
						class="social-network__icon"
						:name="social.icon"
					/>
				</a>
			</v-col>
		</v-row>
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

<style lang="scss">
	@import 'social-network';
</style>
