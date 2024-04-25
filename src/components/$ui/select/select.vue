<template>
	<div
		:class="[
			'select',
			`select--${type}`,
			isSelectDisabled ? 'select-disabled' : '',
			isMainShow ? 'select-open' : '',
		]"
	>
		<input
			class="select__value"
			type="text"
			tabindex="-1"
			:name="name"
			:required="required"
			:value="selected.value"
			@reset="() => console.log('Hello world')"
		/>

		<div
			:id="`select-${elId}-header`"
			ref="header"
			class="select__header"
			tabindex="0"
			role="combobox"
			aria-haspopup="listbox"
			:aria-label="placeholder"
			:aria-expanded="isMainShow"
			:aria-controls="`select-${elId}-dropdown`"
			@[event]="onMainShow"
			@keydown.space="onMainShow"
		>
			<div class="select__output">
				{{ selected.label || selected.value }}

				<div v-if="!selected.value" class="select__placeholder">
					{{ placeholder }}
				</div>
			</div>

			<v-button
				v-if="clear && selected.value"
				class="select__clear"
				aria-label="Select Clear"
				title="Select Clear"
				color="danger"
				:icon="{
					name: 'icon-close',
				}"
				@click="onClear"
			/>
		</div>

		<Teleport to="body">
			<div
				v-show="isMainShow"
				ref="main"
				:class="['select__main', `select--${type}`]"
				:style="floatingStyles"
			>
				<div class="select__overlay"></div>
				<div
					:id="`select-${elId}-dropdown`"
					ref="dropdown"
					tabindex="0"
					class="select__dropdown"
				>
					<div v-if="search" class="select__search">
						<input
							v-model="optionSearch"
							class="select__search-field"
							type="search"
							:placeholder="search['placeholder']"
							@input="$emit('search', optionSearch)"
						/>
					</div>

					<div
						ref="listbox"
						class="select__listbox"
						@click="onSelected"
					>
						<div
							v-for="(option, index) in optionsList"
							:key="index"
							role="option"
							aria-selected="false"
							:aria-label="option.value || option"
							:data-option-value="option.value || option"
							:title="option.value || option"
							:class="[
								'select__option',
								option.value === selected.value ||
								option === selected.value
									? 'select__option--selected'
									: '',
							]"
						>
							{{ option.label || option.value || option }}
						</div>
					</div>

					<div
						v-if="search && optionsList.length === 0"
						class="select__note select__note--notfound"
					>
						{{ search.notfoundText }}
					</div>
				</div>
			</div>
		</Teleport>
	</div>
</template>

<script>
	import { ref } from 'vue'
	import { size, offset, flip, shift } from '@floating-ui/dom'
	import { useFloating, autoUpdate } from '@floating-ui/vue'

	export default {
		name: 'VSelect',
		props: {
			type: {
				type: String,
				default: 'default',
			},

			event: {
				type: String,
				default: 'click',
			},

			name: {
				type: String,
				default: 'Select',
			},

			placeholder: {
				type: String,
				default: 'Select',
			},

			required: {
				type: Boolean,
				default: false,
			},

			disabled: {
				type: Boolean,
				default: false,
			},

			value: {
				type: [String, Number],
				default: null,
			},

			options: {
				type: Array,
				default: () => [],
			},

			clear: {
				type: Boolean,
				default: true,
			},

			search: {
				type: [Object, Boolean],
				default: () => {
					return {
						placeholder: 'Search',
						notfoundText: 'Nothing found',
					}
				},
			},

			position: {
				type: String,
				default: 'bottom',
			},
		},

		setup(props) {
			const header = ref(null)
			const main = ref(null)
			const { floatingStyles } = useFloating(header, main, {
				whileElementsMounted: autoUpdate,
				placement: props.position,
				middleware: [
					size({
						apply({ rects, elements }) {
							Object.assign(elements.floating.style, {
								maxWidth: `${rects.reference.width}px`,
							})
						},
					}),
					offset(10),
					flip(),
					shift({
						padding: 20,
					}),
				],
			})

			return { header, main, floatingStyles }
		},

		data() {
			return {
				elId: this.$.uid,
				isMainShow: false,
				isSelectDisabled: this.disabled,
				selected: {
					label: null,
					value: this.value,
				},
				optionSearch: '',
			}
		},

		computed: {
			optionsList() {
				return this.options.filter((option) => {
					const value = option.value || option

					return value
						.toLowerCase()
						.includes(this.optionSearch.toLowerCase())
				})
			},
		},

		methods: {
			onMainShow() {
				this.optionSearch = ''
				this.isMainShow = !this.isMainShow

				if (this.isMainShow) {
					this.show()
					this.$emit('show', this)
				} else {
					this.hide()
					this.$emit('hide', this)
				}
			},

			onSelected(event) {
				const target = event.target
				const option = target.closest('.select__option') || false

				if (option) {
					const value = option.getAttribute('data-option-value')

					this.selected.value = value
					this.selected.label = option.innerHTML

					this.hide()
					this.$emit('selected', this.selected)
				}
			},

			onClickOutside(event) {
				const target = event.target
				const headerId = this.$refs.header.getAttribute('id')
				const dropdownId = this.$refs.dropdown.getAttribute('id')

				if (
					!target.closest(`#${headerId}`) &&
					!target.closest(`#${dropdownId}`)
				) {
					this.hide()
					this.$emit('hide', this)
				}
			},

			onClear() {
				this.reset()
				this.$emit('clear', null)
			},

			show() {
				this.isMainShow = true
				this.$nextTick(() => this.$refs.dropdown.focus())

				document.body.addEventListener(
					'click',
					this.onClickOutside,
					false,
				)
			},

			hide() {
				this.optionSearch = ''
				this.isMainShow = false

				document.body.removeEventListener(
					'click',
					this.onClickOutside,
					false,
				)
			},

			choose(value) {
				const optionChoose = this.options.find((option) => {
					const optionValue = option.value || option

					return optionValue
						.toLowerCase()
						.includes(value.toLowerCase())
				})

				this.hide()
				this.selected.value = optionChoose.value || optionChoose
				this.selected.label = optionChoose.label || optionChoose
			},

			reset() {
				this.selected.value = null
				this.selected.label = null
			},
		},
	}
</script>

<style lang="scss">
	@import 'select';
</style>
