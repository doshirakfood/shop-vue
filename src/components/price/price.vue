<template>
	<div v-if="value" :class="['price', size ? `price--${size}` : '']">
		<strong class="price__item price__item--actual">
			<abbr :title="currency.value">{{ currency.symbol }}</abbr
			>{{ value }}
		</strong>

		<s
			v-if="old"
			class="price__item price__item--old"
			style="text-decoration: line-through"
		>
			<abbr :title="currency.value">{{ currency.symbol }}</abbr
			>{{ old }}
		</s>
	</div>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		name: 'Price',
		props: {
			value: {
				type: [String, Number],
				default: null,
			},

			old: {
				type: [String, Number],
				default: null,
			},

			size: {
				type: String,
				default: null,
			},
		},

		computed: {
			...mapState('main', ['currency']),
		},
	}
</script>

<style lang="scss" src="./price.scss" />
