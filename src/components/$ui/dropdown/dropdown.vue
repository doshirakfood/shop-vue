<template>
	<div
		ref="header"
		:class="[
			'dropdown',
			`dropdown--${type}`,
			{ 'dropdown--open': isShow },
			{ 'dropdown--selected': isSelected },
			{ 'dropdown--disabled': isDisabled },
		]"
		tabindex="0"
	>
		<span v-if="!$slots.header && label">{{ label }}</span>
		<slot v-else name="header" />

		<svg-icon
			v-if="arrow"
			class="dropdown__arrow"
			name="icon-arrow-small"
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
	import DropdownList from './list.vue'

	export default defineComponent({
		name: 'VDropdown',

		props: {
			type: {
				type: String,
				default: 'default',
			},

			disabled: {
				type: Boolean,
				default: false,
			},

			label: {
				type: String,
				default: 'Dropdown',
			},

			arrow: {
				type: Boolean,
				default: true,
			},

			items: {
				type: Array,
				default: () => [],
			},

			params: {
				type: Object,
				default() {
					return {}
				},
			},
		},

		emits: ['select', 'show', 'hide'],

		setup(props, context) {
			const { uid } = getCurrentInstance()
			const elId = uid
			const header = ref(null)

			let isShow = ref(false)
			let isSelected = ref(false)
			let isDisabled = props.disabled

			let tippy = ref({})
			let instance = ref({})

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

				options.content = !context.slots.content
					? defineComponent(() => {
							return () =>
								h(DropdownList, {
									id: elId,
									items: props.items,
									onSelect: (selected) =>
										onSelected(selected),
								})
						})
					: defineComponent(() => {
							return () => h('div', {}, context.slots.content())
						})

				return options
			}

			const onSelected = (selected) => {
				instance.value.hide()

				isSelected.value = true
				context.emit('select', selected)
			}

			const onShow = () => {
				isShow.value = true
				context.emit('show', instance)
			}

			const onHide = () => {
				isShow.value = false
				context.emit('hide', instance)
			}

			onMounted(() => {
				tippy.value = HelpersTippy(
					header.value,
					getOptions(props.items),
					{
						popper: ['dropdown__popper', `dropdown--${props.type}`],
						box: 'dropdown__box',
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
				isShow,
				isSelected,
				isDisabled,
			}
		},
	})
</script>

<style src="./dropdown.scss" lang="scss" />
