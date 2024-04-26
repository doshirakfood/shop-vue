<template>
	<input
		v-bind="$attrs"
		:id="elId"
		:type="type"
		:value="modelValue"
		:class="['field', `field--${type}`]"
		@input="$emit('update:modelValue', $event.target.value)"
	/>
</template>

<script>
	export default {
		name: 'VField',
		inheritAttrs: false,
		props: {
			type: {
				type: String,
				default: 'text',
			},

			modelValue: {
				type: [String, Number],
				default: '',
			},
		},

		emits: ['update:modelValue'],

		setup() {},

		data() {
			return {
				elId: this.$attrs.id
					? this.$attrs.id
					: `label-${this.$.uid}-field`,
			}
		},
	}
</script>

<style lang="scss" src="./field.scss" />
