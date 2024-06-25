import tippy from 'tippy.js/headless'
import {
	ref,
	onMounted,
	isRef,
	isReactive,
	isVNode,
	render,
	watch,
	h,
	onUnmounted,
	getCurrentInstance,
} from 'vue'

tippy.setDefaultProps({
	onShow: (instance) => {
		if (!instance.props.content) return false
	},
})

export function HelpersTippy(
	el,
	opts = {},
	classNames = { popper: 'tippy-popper', box: 'tippy-box' },
	settings = { mount: true },
) {
	const vm = getCurrentInstance()
	const instance = ref()
	const state = ref({
		isEnabled: false,
		isVisible: false,
		isDestroyed: false,
		isMounted: false,
		isShown: false,
	})
	const optsDefault = {
		render: (instance) => renderContent(instance),
	}

	let container = null

	opts = Object.assign(opts, {
		role: 'list',
		allowHTML: true,
		offset: [0, 8],
		interactive: true,
		appendTo: () => document.body,
	})

	const getContainer = () => {
		if (container) return container
		container = document.createDocumentFragment()
		return container
	}

	const getContent = (content) => {
		let newContent

		let unwrappedContent = isRef(content) ? content.value : content

		if (isVNode(unwrappedContent)) {
			if (vm) {
				unwrappedContent.appContext = vm.appContext
			}

			render(unwrappedContent, getContainer())
			newContent = () => getContainer()
		} else if (typeof unwrappedContent === 'object') {
			let comp = h(unwrappedContent)

			if (vm) {
				comp.appContext = vm.appContext
			}

			render(comp, getContainer())

			newContent = () => getContainer()
		} else {
			newContent = unwrappedContent
		}

		return newContent
	}

	const getProps = (opts) => {
		let options = {}

		if (isRef(opts)) {
			options = opts.value || {}
		} else if (isReactive(opts)) {
			options = { ...opts }
		} else {
			options = { ...opts }
		}

		if (options.content) {
			options.content = getContent(options.content)
		}

		if (options.triggerTarget) {
			options.triggerTarget = isRef(options.triggerTarget)
				? options.triggerTarget.value
				: options.triggerTarget
		}

		if (!options.plugins || !Array.isArray(options.plugins)) {
			options.plugins = []
		}

		options.plugins = options.plugins.filter(
			(plugin) => plugin.name !== 'vueTippyReactiveState',
		)

		options.plugins.push({
			name: 'vueTippyReactiveState',
			fn: () => {
				return {
					onCreate() {
						state.value.isEnabled = true
					},
					onMount() {
						state.value.isMounted = true
					},
					onShow() {
						state.value.isMounted = true
						state.value.isVisible = true
					},
					onShown() {
						state.value.isShown = true
					},
					onHide() {
						state.value.isMounted = false
						state.value.isVisible = false
					},
					onHidden() {
						state.value.isShown = false
					},
					onUnmounted() {
						state.value.isMounted = false
					},
					onDestroy() {
						state.value.isDestroyed = true
					},
				}
			},
		})

		return options
	}

	const renderContent = (instance) => {
		// The recommended structure is to use the popper as an outer wrapper
		// element, with an inner `box` element
		let popper = document.createElement('div')
		let box = document.createElement('div')

		popper.classList.add(classNames.popper)
		popper.appendChild(box)

		box.id = `tippy-${instance.id}-box`
		box.className = classNames.box

		if (isVNode(instance.props.content)) {
			render(instance.props.content, box)
		} else {
			box.appendChild(instance.props.content)
		}

		function onUpdate(prevProps, nextProps) {
			if (nextProps.content) {
				box.appendChild(nextProps.content)
			}
		}

		// Return an object with two properties:
		// - `popper` (the root popper element)
		// - `onUpdate` callback whenever .setProps() or .setContent() is called
		return {
			popper,
			onUpdate,
		}
	}

	const refresh = () => {
		if (!instance.value) return

		instance.value.setProps(getProps(opts))
	}

	const refreshContent = () => {
		if (!instance.value || !opts.content) return

		instance.value.setContent(getContent(opts.content))
	}

	const setContent = (value) => {
		instance.value?.setContent(getContent(value))
	}

	const setProps = (value) => {
		instance.value?.setProps(getProps(value))
	}

	const destroy = () => {
		if (instance.value) {
			try {
				// delete instance.value.reference.$tippy
			} catch (error) {}

			instance.value.destroy()
			instance.value = undefined
		}
		container = null
	}

	const show = () => {
		instance.value?.show()
	}

	const hide = () => {
		instance.value?.hide()
	}

	const disable = () => {
		instance.value?.disable()
		state.value.isEnabled = false
	}

	const enable = () => {
		instance.value?.enable()
		state.value.isEnabled = true
	}

	const unmount = () => {
		instance.value?.unmount()
	}

	const mount = () => {
		if (!el) return

		let target = isRef(el) ? el.value : el
		let options = Object.assign(getProps(opts), optsDefault)

		if (typeof target === 'function') target = target()

		if (target) {
			instance.value = tippy(target, options)
			target.$tippy = response
		}
	}

	const response = {
		tippy: instance,
		refresh,
		refreshContent,
		setContent,
		setProps,
		destroy,
		hide,
		show,
		disable,
		enable,
		unmount,
		mount,
		state,
	}

	if (settings.mount) {
		if (vm) {
			if (vm.isMounted) {
				mount()
			} else {
				onMounted(mount)
			}

			onUnmounted(() => {
				destroy()
			})
		} else {
			mount()
		}
	}

	if (isRef(opts) || isReactive(opts)) {
		watch(opts, refresh, { immediate: false })
	} else if (isRef(opts.content)) {
		watch(opts.content, refreshContent, { immediate: false })
	}

	return response
}
