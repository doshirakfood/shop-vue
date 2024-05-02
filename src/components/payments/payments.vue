<template>
	<div class="payments" v-once>
		<v-row class="payments__row" type="grid" :gap="8" :cols="5">
			<v-col
				v-for="(payment, index) in paymentsList"
				:key="`payment-${index}`"
				:title="`${payment.label}`"
				class="payments__col"
			>
				<svg-icon class="payments__icon" :name="payment.icon" />
			</v-col>
		</v-row>
	</div>
</template>

<script>
	export default {
		name: 'Payments',
		data() {
			return {
				paymentsList: [
					{
						label: 'Apple Pay',
						icon: 'logo-applePay',
					},

					{
						label: 'Visa',
						icon: 'logo-visa',
					},

					{
						label: 'Discover',
						icon: 'logo-discover',
					},

					{
						label: 'Mastercard',
						icon: 'logo-mastercard',
					},

					{
						label: 'Secure Payment',
						icon: 'logo-secure-payment',
					},
				],
			}
		},
	}
</script>

<style lang="scss">
	@import './payments';
</style>
