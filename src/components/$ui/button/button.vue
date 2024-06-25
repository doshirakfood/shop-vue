<template>
	<button
		v-if="type !== 'link' && type !== 'router'"
		:class="[classBtnMain]"
		:type="type"
		@click="$emit('click', $event.target)"
	>
		<span class="btn__wrapper">
			<svg-icon
				v-if="icon['name']"
				:class="classIconMain"
				:fill="icon['color'] || 'unset'"
				:name="icon['name']"
			/>

			<span v-if="label || $slots" class="btn__label">
				{{ label }}
				<slot />
			</span>
		</span>
	</button>

	<router-link
		v-else-if="type === 'router'"
		:to="link"
		:class="[classBtnMain, 'btn-link']"
	>
		<span class="btn__wrapper">
			<svg-icon
				v-if="icon['name']"
				:class="classIconMain"
				:fill="icon['color'] || 'unset'"
				:name="icon['name']"
			/>

			<span v-if="label || $slots" class="btn__label">
				{{ label }}
				<slot />
			</span>
		</span>
	</router-link>
</template>

<script>
	export default {
		name: 'VButton',

		props: {
			/**
			 * Тип кнопки
			 */
			type: {
				type: String,
				default: 'button',
			},

			/**
			 * Размер кнопки
			 */
			size: {
				type: String,
				default: 'medium',
			},

			/**
			 * Цвет кнопки
			 */
			color: {
				type: String,
				default: '',
			},

			/**
			 * Вид кнопки
			 */
			species: {
				type: [Array, String],
				default: () => [],
			},

			/**
			 * Ссылка
			 */
			link: {
				type: String,
				default: '',
			},

			/**
			 * Основной текст кнопки
			 */
			label: {
				type: String,
				default: '',
			},

			/**
			 * svg-иконка для кнопки
			 * @param {string} name - название икноки;
			 * @param {string} position - расположение иконки в отношение текста;
			 * @param {string} color - цвет иконки.
			 */
			icon: {
				type: Object,
				default: () => {
					return {
						name: null,
						position: null,
						color: 'unset',
					}
				},
			},
		},

		emits: ['click'],

		computed: {
			classBtnMain() {
				const speciesClass =
					typeof this.species === 'object'
						? this.species.map((variable) => `btn--${variable}`)
						: `btn--${this.species}`
				const iconClass =
					!this.label && this.icon.name ? 'btn--icon' : ''
				const colorClass = this.color ? `btn--${this.color}` : ''
				const sizeClass = this.size ? `btn--${this.size}` : ''

				return ['btn', iconClass, colorClass, sizeClass, speciesClass]
			},

			classIconMain() {
				const positionClass = this.icon.position
					? `btn__icon--${this.icon.position}`
					: ''

				return ['btn__icon', 'icon', positionClass]
			},
		},
	}
</script>

<style lang="scss" src="./button.scss" />
