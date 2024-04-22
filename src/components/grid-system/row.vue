<template>
	<div
		:class="['row', `row-${type}`, items ? `row-items-${items}` : '']"
		:style="`--grid-columns: ${cols}; --grid-gap: ${gap}px;`"
	>
		<slot />
	</div>
</template>

<script>
	export default {
		name: 'VRow',
		props: {
			type: {
				type: String,
				default: 'flexbox',
			},

			items: {
				type: String,
				default: null,
			},

			gap: {
				type: [String, Number],
				default: 24,
			},

			cols: {
				type: [String, Number],
				default: 12,
			},
		},
	}
</script>

<style lang="scss">
	.row {
		&-flexbox {
			display: flex;
			flex-wrap: wrap;
			margin: -12px;
		}

		&-grid {
			display: grid;
			grid-template-columns: repeat(var(--grid-columns), 1fr);
			gap: var(--grid-gap);
		}

		&-items {
			&-center {
				align-items: center;
			}
		}
	}
</style>
