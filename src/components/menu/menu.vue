<template>
	<nav class="menu">
		<div class="menu__col">
			<v-dropdown
				class="menu-categories"
				:items="productCategories"
				@select="onSelect"
			>
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
			v-for="(menu, index) in routerList"
			:key="`menu-${index}-${elId}`"
			class="menu__col"
		>
			<v-dropdown
				v-if="menu.dropdown"
				:items="productCategories"
				:params="{ trigger: 'mouseenter focus' }"
				class="menu__dropdown"
				@select="onSelect"
			>
				<template v-slot:header>
					<router-link class="menu__link" :to="menu.path">
						{{ menu.label }}
					</router-link>
				</template>
			</v-dropdown>

			<router-link v-else class="menu__link" :to="menu.path">
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
				routerList: [
					{
						path: '/',
						label: 'Home',
						dropdown: true,
					},

					{
						path: 'shop',
						label: 'Shop',
						dropdown: true,
					},

					{
						path: 'pages',
						label: 'Pages',
						dropdown: true,
					},

					{
						path: 'blog',
						label: 'Blog',
						dropdown: true,
					},

					{
						path: 'about',
						label: 'About Us',
						dropdown: false,
					},

					{
						path: 'contact',
						label: 'Contact Us',
						dropdown: false,
					},
				],
			}
		},

		methods: {
			onSelect(selected) {
				this.$router.push(selected.path)
			},
		},
	}
</script>

<style lang="scss" src="./menu.scss" />
