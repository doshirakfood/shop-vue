<template>
	<layout-default class="develop">
		<develop-section title="Typography">
			<develop-box title="Heading">
				<h2 class="heading heading--display">.heading-display</h2>
				<h2
					v-for="index in 5"
					:key="index"
					:class="`heading heading--${index}`"
				>
					{{ `.heading-${index}` }}
				</h2>
			</develop-box>
		</develop-section>

		<develop-section title="Button">
			<develop-box title="Sizes">
				<h2 class="heading heading--6 subtitle">Large</h2>
				<div class="develop__row" style="--grid-columns: 4">
					<v-button
						size="large"
						color="ghost"
						label="Large Ghost"
						class="develop__col"
					/>

					<v-button
						size="large"
						species="border"
						label="Large Border"
						class="develop__col"
					/>

					<v-button
						size="large"
						color="brand"
						label="Large Fill"
						class="develop__col"
					/>
				</div>

				<br />
				<br />

				<h2 class="heading heading--6 subtitle">Medium</h2>
				<div class="develop__row" style="--grid-columns: 4">
					<v-button
						size="medium"
						color="ghost"
						label="Medium Ghost"
						class="develop__col"
					/>

					<v-button
						size="medium"
						species="border"
						label="Medium Border"
						class="develop__col"
					/>

					<v-button
						size="medium"
						color="brand"
						label="Medium Fill"
						class="develop__col"
					/>
				</div>

				<br />
				<br />

				<h2 class="heading heading--6 subtitle">Small</h2>
				<div class="develop__row" style="--grid-columns: 4">
					<v-button
						size="small"
						color="ghost"
						label="Small Ghost"
						class="develop__col"
					/>

					<v-button
						size="small"
						species="border"
						label="Small Border"
						class="develop__col"
					/>

					<v-button
						size="small"
						color="brand"
						label="Small Fill"
						class="develop__col"
					/>
				</div>
			</develop-box>

			<develop-box title="Icons">
				<h2 class="heading heading--6 subtitle">
					Icon and Text Buttons
				</h2>

				<div class="develop__row" style="--grid-columns: 1">
					<div class="develop__col">
						<v-button
							size="small"
							color="brand"
							:icon="{
								name: 'icon-arrow',
								position: 'right',
							}"
							label="Small Fill"
						/>
					</div>

					<div class="develop__col">
						<v-button
							size="medium"
							color="brand"
							:icon="{
								name: 'icon-arrow',
								position: 'right',
							}"
							label="Medium Fill"
						/>
					</div>

					<div class="develop__col">
						<v-button
							size="large"
							color="brand"
							:icon="{
								name: 'icon-arrow',
								position: 'right',
							}"
							label="Large Fill"
						/>
					</div>
				</div>

				<br />
				<br />

				<h2 class="heading heading--6 subtitle">Icon Buttons</h2>
				<div class="develop__row">
					<div class="develop__col">
						<v-button color="ghost" :icon="{ name: 'icon-eye' }" />
					</div>

					<div class="develop__col">
						<v-button
							species="border"
							:icon="{ name: 'icon-heart' }"
							class="text-brand"
						/>
					</div>

					<div class="develop__col">
						<v-button color="brand" :icon="{ name: 'icon-bag' }" />
					</div>
				</div>
			</develop-box>
		</develop-section>

		<develop-section title="Forms">
			<develop-box title="Fields">
				<div class="develop__row" style="--grid-columns: 1fr">
					<v-field
						type="Email"
						placeholder="Email"
						class="develop__col"
					/>

					<v-field
						placeholder="Your first name"
						class="develop__col"
					/>
				</div>
			</develop-box>
		</develop-section>
	</layout-default>
</template>

<script>
	import LayoutDefault from '@layouts/default.vue'
	import DevelopSection from '@components/develop/section/section.vue'
	import DevelopBox from '@components/develop/box/box.vue'

	export default {
		name: 'PageDevelop',
		components: {
			LayoutDefault,
			DevelopSection,
			DevelopBox,
		},

		data() {
			return {}
		},
	}
</script>

<style scoped lang="scss">
	.develop {
		&__row {
			@include grid-system;
		}
	}

	.subtitle {
		margin: 0 0 20px;
	}

	.block {
		min-height: 50px;
		padding: 20px;
	}
</style>
