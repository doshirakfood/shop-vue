<template>
	<form class="search" action="">
		<v-field
			class="search__item search__item--field"
			type="search"
			required
			placeholder="Search"
		/>

		<v-button
			class="search__item search__item--submit"
			type="submit"
			color="brand"
			label="Search"
		></v-button>
	</form>
</template>

<script>
	export default {
		name: 'VSearch',
	}
</script>

<style lang="scss" src="./search.scss" />
