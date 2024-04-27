<template>
	<header class="header">
		<div class="header-main">
			<div class="header-main__row container">
				<div class="header-main__col header-main__col--left">
					<logotype />
				</div>

				<div class="header-main__col header-main__col--center">
					<v-search class="header__search" />
				</div>

				<div class="header-main__col header-main__col--right">
					<div class="header-actions">
						<div class="header-actions__col">
							<v-button
								type="router"
								to="favorites"
								class="header-actions__item"
								title="Favorites"
								aria-label="Favorites"
								:icon="{ name: 'icon-heart' }"
							/>
						</div>

						<div class="header-actions__col">
							<shopping-cart />
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="header-footer">
			<div class="header-footer__row container">
				<div class="header-footer__col">
					<main-menu />
				</div>

				<div class="header-footer__col">
					<a class="header__phone" :href="`tel:${phoneList[0]}`">
						<svg-icon name="icon-phone" />
						{{ phoneList[0] }}
					</a>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
	import { mapState } from 'vuex'
	import Logotype from '@components/logotype/logotype.vue'
	import VSearch from '@components/search/search.vue'
	import ShoppingCart from '@components/shopping-cart/shopping-cart.vue'
	import MainMenu from '@components/menu/menu.vue'

	export default {
		name: 'LHeader',
		computed: {
			...mapState('contacts', ['phoneList']),
		},
		components: { MainMenu, Logotype, VSearch, ShoppingCart },
	}
</script>

<style lang="scss" src="./header.scss" />
