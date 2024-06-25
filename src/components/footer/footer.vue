<template>
	<footer class="footer">
		<div class="footer__wrapper container">
			<div class="footer-main">
				<div class="footer-main__row">
					<div class="footer-main__col footer-main__col--left">
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
					</div>

					<div class="footer-main__col footer-main__col--center">
						<div class="footer-menu">
							<div class="footer-menu__row">
								<div
									v-for="(menu, index) in menuList"
									:key="`${menu.title}-${index}`"
									class="footer-menu__col"
								>
									<h2 class="footer__title">
										{{ menu.title }}
									</h2>
									<nav
										v-once
										:aria-label="menu.title"
										class="footer-nav"
									>
										<router-link
											v-for="(item, index) in menu.items"
											:key="`${item.label}-${index}`"
											:to="item.path"
											class="footer-nav__item"
										>
											{{ item.label }}
										</router-link>
									</nav>
								</div>
							</div>
						</div>
					</div>

					<div class="footer-main__col footer-main__col--right">
						<h2 class="footer__title">Instagram</h2>
						<instagram />
					</div>
				</div>
			</div>

			<div class="footer-bottom">
				<div class="footer-bottom__row">
					<div class="footer-bottom__col footer-bottom__col--left">
						<social-network />
					</div>

					<div class="footer-bottom__col footer-bottom__col--center">
						<p>
							Shopery eCommerce © {{ currentYear }}. All Rights
							Reserved
						</p>
					</div>

					<div class="footer-bottom__col footer-bottom__col--right">
						<payments />
					</div>
				</div>
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
								path: 'profile',
							},
							{
								label: 'Order History',
								path: 'order-history',
							},
							{
								label: 'Shoping Cart',
								path: 'cart',
							},
							{
								label: 'Wishlist',
								path: 'wishlist',
							},
							{
								label: 'Settings',
								path: 'settings',
							},
						],
					},

					{
						title: 'Helps',
						items: [
							{
								label: 'Contact',
								path: 'contact',
							},
							{
								label: 'Faqs',
								path: 'faq',
							},
							{
								label: 'Terms & Condition',
								path: 'terms-condition',
							},
							{
								label: 'Privacy Policy',
								path: 'privacy-policy',
							},
						],
					},

					{
						title: 'Proxy',
						items: [
							{
								label: 'About',
								path: 'about',
							},
							{
								label: 'Shop',
								path: 'shop',
							},
							{
								label: 'Product',
								path: 'product',
							},
							{
								label: 'Products Details',
								path: 'product-details',
							},
							{
								label: 'Track Order',
								path: 'track-order',
							},
						],
					},
				],
			}
		},
	}
</script>

<style lang="scss" src="./footer.scss" />
