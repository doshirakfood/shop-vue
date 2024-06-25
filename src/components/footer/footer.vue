<template>
	<footer class="footer">
		<div class="footer-main">
			<div class="container">
				<v-row justify="between">
					<v-col cols="3">
						<h2 class="footer__title">About Shopery</h2>
						<p>
							Morbi cursus porttitor enim lobortis molestie. Duis
							gravida turpis dui, eget bibendum magna congue nec.
						</p>

						<p class="footer__contacts">
							<a :href="`tel:${phoneList[0]}`">
								{{ phoneList[0] }}
							</a>
							<span>or</span>
							<a :href="`mailto: ${email}`">{{ email }}</a>
						</p>
					</v-col>

					<v-col>
						<v-row justify="around">
							<v-col
								v-for="(menu, index) in menuList"
								:key="`${menu.title}-${index}`"
								cols="auto"
							>
								<h2 class="footer__title">{{ menu.title }}</h2>
								<nav
									v-once
									:aria-label="menu.title"
									class="footer-nav"
								>
									<router-link
										v-for="(item, index) in menu.items"
										:key="`${item.label}-${index}`"
										:to="item.to"
										class="footer-nav__item"
									>
										{{ item.label }}
									</router-link>
								</nav>
							</v-col>
						</v-row>
					</v-col>

					<v-col cols="3">
						<h2 class="footer__title">Instagram</h2>
						<instagram />
					</v-col>
				</v-row>
			</div>
		</div>

		<div class="footer-bottom">
			<div class="container">
				<v-row justify="between" items="center">
					<v-col cols="auto">
						<social-network />
					</v-col>

					<v-col cols="auto">
						<p>
							Shopery eCommerce © {{ currentYear }}. All Rights
							Reserved
						</p>
					</v-col>

					<v-col cols="auto">
						<payments />
					</v-col>
				</v-row>
			</div>
		</div>
	</footer>
</template>

<script>
	import { mapState } from 'vuex'
	import Instagram from '@components/instagram/instagram.vue'
	import SocialNetwork from '@components/social-network/social-network.vue'
	import Payments from '@components/payments/payments.vue'

	export default {
		name: 'LFooter',
		components: { SocialNetwork, Instagram, Payments },
		computed: {
			...mapState('main', ['currentYear']),
			...mapState('contacts', ['phoneList', 'email']),
		},
		data() {
			return {
				menuList: [
					{
						title: 'My Account',
						items: [
							{
								label: 'My Account',
								to: 'profile',
							},
							{
								label: 'Order History',
								to: 'order-history',
							},
							{
								label: 'Shoping Cart',
								to: 'cart',
							},
							{
								label: 'Wishlist',
								to: 'wishlist',
							},
							{
								label: 'Settings',
								to: 'settings',
							},
						],
					},

					{
						title: 'Helps',
						items: [
							{
								label: 'Contact',
								to: 'contact',
							},
							{
								label: 'Faqs',
								to: 'faq',
							},
							{
								label: 'Terms & Condition',
								to: 'terms-condition',
							},
							{
								label: 'Privacy Policy',
								to: 'privacy-policy',
							},
						],
					},

					{
						title: 'Proxy',
						items: [
							{
								label: 'About',
								to: 'about',
							},
							{
								label: 'Shop',
								to: 'shop',
							},
							{
								label: 'Product',
								to: 'product',
							},
							{
								label: 'Products Details',
								to: 'product-details',
							},
							{
								label: 'Track Order',
								to: 'track-order',
							},
						],
					},
				],
			}
		},
	}
</script>

<style lang="scss">
	@import 'footer';
</style>
