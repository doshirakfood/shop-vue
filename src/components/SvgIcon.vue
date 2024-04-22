<template>
	<svg aria-hidden="true">
		<use :fill="color" :xlink:href="symbolId" />
	</svg>
</template>

<script>
	import { computed } from 'vue'

	export default {
		name: 'SvgIcon',
		props: {
			prefix: {
				type: String,
			},

			name: {
				type: String,
				required: true,
			},

			color: {
				type: String,
			},
		},

		setup(props) {
			const symbolId = computed(() => `#${props.name}`)

			return {
				symbolId,
			}
		},
	}
</script>
