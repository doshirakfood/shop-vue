<template>
	<div class="auth">
		<router-link class="auth__item" to="sign-in">Sign In</router-link>
		<span class="auth__delim">/</span>
		<router-link class="auth__item" to="sign-up">Sign Up</router-link>
	</div>
</template>

<script>
	export default {
		name: 'Auth',
	}
</script>

<style lang="scss">
	@import 'auth';
</style>
