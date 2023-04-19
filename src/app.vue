<script lang="ts" setup>
import {useDaisyTheme} from '~/lib/hooks/useDaisyTheme'

useDaisyTheme({isRoot: true})
</script>

<template>
	<router-view />
</template>
