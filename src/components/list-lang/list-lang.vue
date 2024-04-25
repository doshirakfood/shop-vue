<template>
	<v-select
		type="small"
		:clear="false"
		:search="false"
		:value="lang.value"
		:options="langList"
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
