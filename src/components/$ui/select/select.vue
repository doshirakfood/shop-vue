<template>
	<div
		:class="[
			'select',
			`select--${type}`,
			{ 'select--open': isShow },
			{ 'select--selected': isSelected },
			{ 'select--disabled': isDisabled },
		]"
	>
		<input
			class="select__value"
			type="text"
			tabindex="-1"
			:name="name"
			:required="required"
			:value="selected.value"
		/>

		<div
			ref="header"
			class="select__output"
			tabindex="0"
			role="combobox"
			aria-haspopup="listbox"
			:aria-label="placeholder"
			:title="selected.label || selected.value || placeholder"
		>
			<!-- eslint-disable vue/no-v-html -->
			<span v-html="selected.label || selected.value"></span>
			<!--eslint-enable-->

			<div v-show="!selected.value" class="select__placeholder">
				{{ placeholder }}
			</div>
		</div>

		<v-button
			v-if="clear && selected.value"
			class="select__clear"
			title="Clear select"
			aria-label="Clear select"
			color="danger"
			:icon="{
				name: 'icon-close',
			}"
			@click="onClear"
		/>
	</div>
</template>

<script>
	import {
		h,
		ref,
		getCurrentInstance,
		onMounted,
		defineComponent,
		watch,
	} from 'vue'
	import { HelpersTippy } from '@helpers/tippy.js'
	import SelectList from './list.vue'

	export default defineComponent({
		name: 'VSelect',
		components: [SelectList],

		props: {
			type: {
				type: String,
				default: 'default',
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

			modelValue: {
				type: [String, Number],
				default: null,
			},

			clear: {
				type: Boolean,
				default: true,
			},

			items: {
				type: Array,
				default: () => [],
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

			params: {
				type: Object,
				default() {
					return {}
				},
			},
		},

		emits: [
			'update:modelValue',
			'select',
			'search',
			'show',
			'hide',
			'clear',
		],

		setup(props, context) {
			const { uid } = getCurrentInstance()
			const elId = uid
			const header = ref(null)

			let isShow = ref(false)
			let isSelected = ref(false)
			let isDisabled = props.disabled

			let tippy = ref({})
			let instance = ref({})
			let selected = ref({
				label: null,
				value: props.modelValue,
			})

			let newItems = props.items.map((item, index) => {
				let opts = Object.assign({}, item)

				if (opts.selected || props.modelValue === opts.value) {
					opts.selected = true
				}

				opts.index = index
				opts.value = opts.value ? opts.value : item
				opts.label = opts.label ? opts.label : opts.value

				return opts
			})

			selected.value =
				newItems.find((item) => item.selected) || selected.value

			const getOptions = () => {
				let paramsPopper = Object.assign(
					{
						placement: 'bottom',
						trigger: 'click',
						popperOptions: {
							modifiers: [
								{
									name: 'sameWidth',
									enabled: true,
									phase: 'beforeWrite',
									requires: ['computeStyles'],
									fn: ({ state }) => {
										state.styles.popper.width = `${state.rects.reference.width}px`
									},
									effect: ({ state }) => {
										state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`
									},
								},
							],
						},
					},
					props.params,
				)

				let options = {
					...paramsPopper,
					onShow,
					onHide,
				}

				options.content = defineComponent(() => {
					return () =>
						h(SelectList, {
							id: elId,
							items: newItems,
							search: props.search,
							selected: selected,
							onSearch: (value) => onSearch(value),
							onSelect: (selected) => onSelected(selected),
						})
				})

				return options
			}

			const onSearch = (value) => {
				context.emit('search', value)
			}

			const onSelected = (variable) => {
				isSelected.value = true

				selected.value = variable
				instance.value.hide()

				context.emit('select', selected.value)
				context.emit('update:modelValue', selected.value['value'])
			}

			const onClear = () => {
				isSelected.value = null

				selected.value = {
					label: null,
					value: null,
				}

				context.emit('clear', true)
				context.emit('select', selected.value)
				context.emit('update:modelValue', selected.value['value'])
			}

			const onShow = () => {
				isShow.value = true

				context.emit('show', instance.value)
			}

			const onHide = () => {
				isShow.value = false

				context.emit('hide', instance.value)
			}

			onMounted(() => {
				tippy.value = HelpersTippy(
					header.value,
					getOptions(props.items),
					{
						popper: ['select__popper', `select--${props.type}`],
						box: 'select__box',
					},
				)

				instance.value = header.value._tippy
			})

			watch(
				() => props,
				() => {
					tippy.value.setProps(getOptions())
				},
				{ deep: true },
			)

			return {
				header,
				tippy,
				instance,
				selected,
				isShow,
				isSelected,
				isDisabled,
				onClear,
			}
		},
	})
</script>

<style src="./select.scss" lang="scss" />
