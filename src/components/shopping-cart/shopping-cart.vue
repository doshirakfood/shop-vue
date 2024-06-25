<template>
	<v-button
		class="shop-cart"
		type="router"
		to="cart"
		:title="help"
		:aria-label="help"
	>
		<div class="shop-cart__item shop-cart__item--cart">
			<svg-icon class="shop-cart__icon" name="icon-bag" />
			<div class="shop-cart__count notification notification-small">
				{{ shoppingCart.count }}
			</div>
		</div>

		<div class="shop-cart__item shop-cart__item--sum">
			<span class="shop-cart__label">Shopping cart:</span>
			<price class="shop-cart__sum" :value="shoppingCart.sum" />
		</div>
	</v-button>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		name: 'ShoppingCart',
		computed: {
			...mapState('main', ['shoppingCart', 'currency']),
		},

		data() {
			return {
				help: '',
			}
		},

		mounted() {
			this.help = `You have ${this.currency.symbol}${this.shoppingCart.sum} worth of items in your cart.`
		},
	}
</script>

<style lang="scss" src="./shopping-cart.scss" />
