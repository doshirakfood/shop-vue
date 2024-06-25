<template>
	<div v-if="items.length > 0" class="dropdown__list" @click="onSelect">
		<div
			v-for="(item, index) in items"
			:key="`dropdown-${id}-item-${index}`"
			:data-dropdown-index="index"
			:data-dropdown-value="JSON.stringify(item)"
			:class="[
				'dropdown__item',
				{
					'dropdown__item--selected': index === currentSelected.index,
				},
				{
					'dropdown__item--disabled': item.disabled === true,
				},
			]"
			v-html="item.label || item"
		></div>
	</div>
</template>

<script>
	export default {
		name: 'DropdownList',
		props: {
			id: {
				type: [String, Number],
				default: 'SelectList',
			},

			items: {
				type: Array,
				default: () => [],
			},
		},

		emits: ['select'],

		data() {
			return {
				currentSelected: {},
			}
		},

		methods: {
			onSelect(event) {
				const { target } = event
				const dropdownItem = target.closest('.dropdown__item')

				if (dropdownItem) {
					const { dropdownIndex, dropdownValue } =
						dropdownItem.dataset

					this.currentSelected = Object.assign(
						{
							index: parseInt(dropdownIndex),
							label: dropdownItem.innerHTML,
						},
						JSON.parse(dropdownValue),
					)

					this.$emit('select', this.currentSelected)
				}
			},
		},
	}
</script>
