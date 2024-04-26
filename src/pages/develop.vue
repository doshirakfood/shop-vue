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
				<v-row>
					<v-col cols="auto">
						<v-button
							size="large"
							color="ghost"
							label="Large Ghost"
						/>
					</v-col>

					<v-col cols="auto">
						<v-button
							size="large"
							species="border"
							label="Large Border"
							class="text-brand"
						/>
					</v-col>

					<v-col cols="auto">
						<v-button
							size="large"
							color="brand"
							label="Large Fill"
						/>
					</v-col>
				</v-row>

				<br />
				<br />

				<h2 class="heading heading--6 subtitle">Medium</h2>
				<v-row>
					<v-col cols="auto">
						<v-button
							size="medium"
							color="ghost"
							label="Medium Ghost"
						/>
					</v-col>

					<v-col cols="auto">
						<v-button
							size="medium"
							species="border"
							label="Medium Border"
							class="text-brand"
						/>
					</v-col>

					<v-col cols="auto">
						<v-button
							size="medium"
							color="brand"
							label="Medium Fill"
						/>
					</v-col>
				</v-row>

				<br />
				<br />

				<h2 class="heading heading--6 subtitle">Small</h2>
				<v-row>
					<v-col cols="auto">
						<v-button
							size="small"
							color="ghost"
							label="Small Ghost"
						/>
					</v-col>

					<v-col cols="auto">
						<v-button
							size="small"
							species="border"
							label="Small Border"
							class="text-brand"
						/>
					</v-col>

					<v-col cols="auto">
						<v-button
							size="small"
							color="brand"
							label="Small Fill"
						/>
					</v-col>
				</v-row>
			</develop-box>

			<develop-box title="Icons">
				<h2 class="heading heading--6 subtitle">
					Icon and Text Buttons
				</h2>
				<v-row items="center">
					<v-col cols="auto">
						<v-button
							size="small"
							color="brand"
							:icon="{
								name: 'icon-arrow',
								position: 'right',
							}"
							label="Small Fill"
						/>
					</v-col>

					<v-col cols="auto">
						<v-button
							size="medium"
							color="brand"
							:icon="{
								name: 'icon-arrow',
								position: 'right',
							}"
							label="Medium Fill"
						/>
					</v-col>

					<v-col cols="auto">
						<v-button
							size="large"
							color="brand"
							:icon="{
								name: 'icon-arrow',
								position: 'right',
							}"
							label="Large Fill"
						/>
					</v-col>
				</v-row>

				<br />
				<br />

				<h2 class="heading heading--6 subtitle">Icon Buttons</h2>
				<v-row>
					<v-col cols="auto">
						<v-button color="ghost" :icon="{ name: 'icon-eye' }" />
					</v-col>

					<v-col cols="auto">
						<v-button
							species="border"
							:icon="{ name: 'icon-heart' }"
							class="text-brand"
						/>
					</v-col>

					<v-col cols="auto">
						<v-button color="brand" :icon="{ name: 'icon-bag' }" />
					</v-col>
				</v-row>
			</develop-box>
		</develop-section>

		<develop-section title="Forms">
			<develop-box title="Fields">
				<v-row>
					<v-col cols="full">
						<v-field type="Email" placeholder="Email" />
					</v-col>

					<v-col cols="full">
						<v-field placeholder="Your first name" />
					</v-col>
				</v-row>
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
			return {
				selectResult: '',
				selectList: ['One', 'Two', 'Three', 'Four', 'Five', 'Six'],
				sizeListArray: [
					'light',
					'normal',
					'medium',
					'semibold',
					'bold',
					'extrabold',
					'black',
				],
			}
		},
	}
</script>

<style scoped lang="scss">
	.subtitle {
		margin: 0 0 20px;
	}

	.block {
		min-height: 50px;
		padding: 20px;
	}
</style>
