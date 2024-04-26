<template>
	<header class="header">
		<div class="header__main">
			<div class="container">
				<v-row justify="between" items="center">
					<v-col cols="3">
						<logotype />
					</v-col>

					<v-col cols="6">
						<v-search class="header__search" />
					</v-col>

					<v-col cols="3">
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
					</v-col>
				</v-row>
			</div>
		</div>

		<div class="header__footer">
			<div class="container">
				<v-row justify="between" items="center">
					<v-col cols="auto">
						<main-menu />
					</v-col>

					<v-col cols="auto">
						<a class="header__phone" :href="`tel:${phoneList[0]}`">
							<svg-icon name="icon-phone" />
							{{ phoneList[0] }}
						</a>
					</v-col>
				</v-row>
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
