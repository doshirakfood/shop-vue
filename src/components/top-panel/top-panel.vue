<template>
	<div class="top-panel">
		<div class="top-panel__row container">
			<div class="top-panel__col">
				<location />
			</div>

			<div class="top-panel__col">
				<div class="top-panel-actions">
					<div class="top-panel-actions__col">
						<list-lang class="top-panel-actions__item" />
						<list-currency class="top-panel-actions__item" />
					</div>

					<div class="top-panel-actions__col">
						<auth />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Location from '@components/location/location.vue'
	import ListLang from '@components/list-lang/list-lang.vue'
	import ListCurrency from '@components/list-currency/list-currency.vue'
	import Auth from '@components/auth/auth.vue'

	export default {
		name: 'LTopPanel',
		components: {
			Location,
			ListLang,
			ListCurrency,
			Auth,
		},
	}
</script>

<style lang="scss" src="./top-panel.scss" />
