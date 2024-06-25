<template>
	<v-select
		type="small"
		:clear="false"
		:search="false"
		:items="currencyList"
		:params="{ placement: 'bottom-end' }"
		:model-value="currency.value"
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
