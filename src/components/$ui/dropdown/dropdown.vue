<template>
	<div
		:class="[
			'dropdown',
			`dropdown--${type}`,
			isDropdownDisabled ? 'dropdown-disabled' : '',
			isMainShow ? 'dropdown-open' : '',
		]"
	>
		<router-link
			v-if="$attrs.to"
			ref="header"
			tabindex="0"
			class="dropdown__header"
			:to="$attrs.to"
			:id="`dropdown-${elId}-header`"
			:aria-haspopup="true"
			:aria-expanded="isMainShow"
			@[showEvent]="onMainShow"
			@keydown.space="onMainShow"
		>
			<div class="dropdown__label">
				<span v-if="!$slots.header && label">{{ label }}</span>
				<slot v-else name="header" />
			</div>

			<svg-icon
				v-if="arrow"
				class="dropdown__arrow"
				name="icon-arrow-small"
			/>
		</router-link>

		<div
			v-else
			ref="header"
			role="button"
			tabindex="0"
			class="dropdown__header"
			:id="`dropdown-${elId}-header`"
			:aria-haspopup="true"
			:aria-expanded="isMainShow"
			@[showEvent]="onMainShow"
			@keydown.space="onMainShow"
		>
			<div class="dropdown__label">
				<span v-if="!$slots.header && label">{{ label }}</span>
				<slot v-else name="header" />
			</div>

			<svg-icon
				v-if="arrow"
				class="dropdown__arrow"
				name="icon-arrow-small"
			/>
		</div>

		<Teleport to="body">
			<div
				v-show="isMainShow"
				ref="main"
				tabindex="0"
				:id="`dropdown-${elId}-main`"
				:aria-labelledby="`dropdown-${elId}-trigger`"
				:class="[
					'dropdown__main',
					`dropdown--${type}`,
					isMainShow ? 'dropdown-open' : '',
				]"
				:style="floatingStyles"
				@click="onSelected"
				@[hideEvent]="onMainHide"
			>
				<div
					v-if="!$slots.main && items.length > 0"
					v-for="(item, index) in items"
					:key="`dropdown-${elId}-item-${index}`"
					:data-dropdown-value="JSON.stringify(item)"
					class="dropdown__item"
				>
					<router-link
						v-if="item.to"
						:to="item.to"
						class="dropdown__el"
					>
						{{ item.label }}
					</router-link>

					<span v-else class="dropdown__el">
						{{ item.label }}
					</span>
				</div>

				<slot v-else name="main" />
			</div>
		</Teleport>
	</div>
</template>

<script>
	import { ref } from 'vue'
	import { size, offset, flip, shift } from '@floating-ui/dom'
	import { useFloating, autoUpdate } from '@floating-ui/vue'

	export default {
		name: 'VDropdown',
		props: {
			type: {
				type: String,
				default: 'default',
			},

			event: {
				type: String,
				default: 'click',
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
				showEvent: 'click',
				hideEvent: 'click',
				outsideEvent: 'click',
				outsideTimer: null,
				isMainShow: false,
				isDropdownDisabled: this.disabled,
				eventsList: {
					click: {
						show: 'click',
						hide: 'click',
					},

					hover: {
						show: 'mouseenter',
						hide: 'mouseleave',
					},

					focus: {
						show: 'focus',
						hide: 'blur',
					},
				},
			}
		},

		mounted() {
			if (this.eventsList[this.event]) {
				this.showEvent = this.eventsList[this.event].show
				this.hideEvent = this.eventsList[this.event].hide

				this.outsideEvent =
					this.hideEvent === 'mouseleave'
						? 'mouseout'
						: this.hideEvent
			}
		},

		methods: {
			onMainShow() {
				this.isMainShow = !this.isMainShow

				if (this.isMainShow) {
					this.show()
					this.$emit('show', this)
				} else {
					this.hide()
					this.$emit('hide', this)
				}
			},

			onMainHide() {
				this.hide()
				this.$emit('hide', this)
			},

			onSelected(event) {
				const target = event.target
				const itemElem = target.closest('.dropdown__item')

				if (itemElem) {
					const dataValue = itemElem.getAttribute(
						'data-dropdown-value',
					)

					this.$emit('selected', JSON.parse(dataValue))

					this.hide()
					this.$emit('hide', this)
				}
			},

			onOutsideEvent(event) {
				if (this.outsideTimer) {
					clearTimeout(this.outsideTimer)
				}

				this.outsideTimer = setTimeout(() => {
					const target = event.relatedTarget || event.target
					const headerId = `#dropdown-${this.$data.elId}-header`
					const dropdownId = `#dropdown-${this.$data.elId}-main`

					if (
						!target.closest(headerId) &&
						!target.closest(dropdownId)
					) {
						this.hide()
						this.$emit('hide', this)
					}
				}, 33)
			},

			show() {
				this.isMainShow = true
				this.$nextTick(() => {
					if (this.event !== 'hover') {
						this.$refs.main.focus()
					}
				})

				document.body.addEventListener(
					this.outsideEvent,
					this.onOutsideEvent,
					false,
				)
			},

			hide() {
				this.isMainShow = false
				this.$nextTick(() => {
					if (this.event !== 'hover') {
						const header =
							this.$refs.header.$el || this.$refs.header
						header.focus()
					}
				})

				document.body.removeEventListener(
					this.outsideEvent,
					this.onOutsideEvent,
					false,
				)
			},
		},
	}
</script>

<style lang="scss">
	@import 'dropdown';
</style>
