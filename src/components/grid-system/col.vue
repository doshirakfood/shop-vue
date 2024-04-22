<template>
	<div :class="['col', cols ? `col-${cols}` : '']">
		<slot />
	</div>
</template>

<script>
	export default {
		name: 'VCol',
		props: {
			cols: {
				type: String,
				default: null,
			},
		},
	}
</script>

<style lang="scss">
	.col {
		flex-grow: 1;
		margin: 12px;

		&-auto {
			flex-grow: unset;
		}

		&-full {
			flex-basis: calc(100% - 24px);
			flex-grow: 1;
		}

		@for $i from 1 through 12 {
			$result: (calc(100% / 12) * $i);

			&-#{num} {
				flex: 0 0 calc(#{$result} - 24px);
			}
		}
	}
</style>
