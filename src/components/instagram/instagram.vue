<template>
	<div class="instagram" v-once>
		<div class="instagram__row">
			<div
				v-for="(photo, index) in photosList"
				:key="`instagram-${index}`"
				class="instagram__col"
			>
				<img
					:src="`./instagram/${photo}`"
					loading="lazy"
					alt="photo products"
					class="instagram__img"
				/>
			</div>
		</div>
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

<style lang="scss" src="./instagram.scss" />
