<template>
	<v-select
		type="small"
		:clear="false"
		:search="false"
		:value="currency.value"
		:options="currencyList"
	/>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'

	export default {
		name: 'ListCurrency',
		computed: {
			...mapState('main', ['currency', 'currencyList']),
		},
		methods: {
			...mapMutations('main', ['changeCurrency']),
		},
	}
</script>
