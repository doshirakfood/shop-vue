<template>
	<div>
		<div v-if="search" class="select__search">
			<input
				v-model="searchResult"
				class="select__search-field"
				type="search"
				:placeholder="search['placeholder']"
				@input="$emit('search', searchResult)"
			/>
		</div>

		<div role="listbox" class="select__listbox" @click="onSelect">
			<div
				v-for="(item, index) in optionsList"
				:key="`select-${id}-option-${index}`"
				role="option"
				:aria-selected="item.value === currentSelected.value"
				:aria-label="item.value"
				:title="item.value"
				:data-option-index="index"
				:data-option-value="JSON.stringify(item)"
				:class="[
					'select__item',
					{
						'select__item--selected':
							index === currentSelected.index,
					},
					{
						'select__item--disabled': item.disabled === true,
					},
				]"
				v-html="item.label || item.value"
			></div>
		</div>

		<div
			v-if="search && optionsList.length === 0"
			class="select__note select__note--notfound"
		>
			{{ search['notFound'] }}
		</div>
	</div>
</template>

<script>
	export default {
		name: 'SelectList',
		attrs: true,
		props: {
			id: {
				type: [String, Number],
				default: 'SelectList',
			},

			search: {
				type: [Boolean, Object],
				default: () => {
					return {
						placeholder: 'Search',
						notFound: 'Nothing found',
					}
				},
			},

			items: {
				type: Array,
				default: () => [],
			},

			selected: {
				type: Object,
				default: () => {
					return {
						label: null,
						value: null,
					}
				},
			},
		},

		emits: ['search', 'select'],

		data() {
			return {
				itemsList: this.items,
				searchResult: '',
				currentSelected: this.selected,
			}
		},

		computed: {
			optionsList() {
				return this.itemsList.filter((option) => {
					return option.value
						.toLowerCase()
						.includes(this.searchResult.toLowerCase())
				})
			},
		},

		methods: {
			onSelect(event) {
				const { target } = event
				const selectItem = target.closest('.select__item')

				if (selectItem) {
					const { optionIndex, optionValue } = selectItem.dataset

					this.currentSelected = Object.assign(
						{
							index: parseInt(optionIndex),
							label: selectItem.innerHTML,
						},
						JSON.parse(optionValue),
					)

					this.$emit('select', this.currentSelected)
				}
			},
		},
	}
</script>
