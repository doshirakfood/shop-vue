<template>
	<v-select
		type="small"
		:clear="false"
		:search="false"
		:items="langList"
		:params="{ placement: 'bottom-end' }"
		:model-value="lang.value"
	/>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		name: 'ListLang',
		computed: {
			...mapState('main', ['lang', 'langList']),
		},
	}
</script>

<style scoped lang="scss"></style>
