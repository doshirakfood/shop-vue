<template>
	<nav class="menu">
		<div class="menu__col">
			<v-dropdown class="menu-categories" :items="productCategories">
				<template v-slot:header>
					<svg-icon
						class="menu-categories__burger"
						name="icon-burger"
					/>
					All Categories
				</template>
			</v-dropdown>
		</div>

		<div
			v-for="(menu, index) in menuList"
			:key="`menu-${index}-${elId}`"
			class="menu__col"
		>
			<v-dropdown
				v-if="menu.dropdown"
				class="menu__dropdown"
				event="hover"
				:to="menu.to"
				:label="menu.label"
				:items="productCategories"
			/>

			<router-link v-else class="menu__link" :to="menu.to">
				{{ menu.label }}
			</router-link>
		</div>
	</nav>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		name: 'MainMenu',
		computed: {
			...mapState('products', ['productCategories']),
		},
		data() {
			return {
				elId: this.$.uid,
				menuList: [
					{
						to: '/',
						label: 'Home',
						dropdown: true,
					},

					{
						to: 'shop',
						label: 'Shop',
						dropdown: true,
					},

					{
						to: 'pages',
						label: 'Pages',
						dropdown: true,
					},

					{
						to: 'blog',
						label: 'Blog',
						dropdown: true,
					},

					{
						to: 'about',
						label: 'About Us',
						dropdown: false,
					},

					{
						to: 'contact',
						label: 'Contact Us',
						dropdown: false,
					},
				],
			}
		},
	}
</script>

<style lang="scss">
	@import 'menu';
</style>
