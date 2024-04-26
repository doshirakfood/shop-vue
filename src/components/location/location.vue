<template>
	<div class="location">
		<span class="location__label">
			<svg-icon class="location__icon" name="icon-location" />
			Store Location:
		</span>

		<router-link class="location__address" to="location" :title="location">
			{{ location }}
		</router-link>
	</div>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		name: 'Location',
		computed: {
			...mapState('main', ['location']),
		},
	}
</script>

<style lang="scss" src="./location.scss" />
