<script lang="ts" setup>
import {useDaisyTheme} from '~/lib/hooks/useDaisyTheme'
import { useMobileFullHeight } from './lib/hooks/useMobileFullHeight'

useDaisyTheme({isRoot: true})
useMobileFullHeight()
</script>

<template>
	<router-view />
</template>
