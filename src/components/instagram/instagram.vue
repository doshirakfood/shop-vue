<template>
	<div class="instagram" v-once>
		<v-row class="instagram__row" type="grid" :gap="`10px 12`" :cols="4">
			<v-col
				v-for="(photo, index) in photosList"
				:key="`instagram-${index}`"
				cols="3"
				class="instagram__col"
			>
				<img
					:src="`./instagram/${photo}`"
					loading="lazy"
					class="instagram__img"
					alt="photo products"
				/>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	export default {
		name: 'Instagram',
		data() {
			return {
				photosList: [
					'Image.jpg',
					'Image-1.jpg',
					'Image-2.jpg',
					'Image-3.jpg',
					'Image-4.jpg',
					'Image-5.jpg',
					'Image-6.jpg',
					'Image-7.jpg',
				],
			}
		},
	}
</script>

<style lang="scss">
	@import 'instagram';
</style>
