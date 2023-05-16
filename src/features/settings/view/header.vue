<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { DICTIONARY_STORE_INJECTION } from '~/features/dictionary'
import { SETTINGS_STORE_INJECTION } from '~/features/settings/settings.store'
import { useHideOnScroll } from '~/lib/hooks/useHideOnScroll'
import {PersonIcon} from '~/lib/view/icons'
import SearchBar from './search_bar.vue'

const dictionaryStore = inject(DICTIONARY_STORE_INJECTION)
const settingsStore = inject(SETTINGS_STORE_INJECTION)
const searchWord = computed(() => dictionaryStore?.filterValues?.value || '')
const user = computed(() => settingsStore?.user)

const elementRef = ref<HTMLDivElement>()
const componentHeight = computed(() => elementRef.value?.offsetHeight || 0)

const {isHidden} = useHideOnScroll({offset: componentHeight})

const handleSearchWord = ({target}: Event) => {
	dictionaryStore?.setFilterValue('value', (target as HTMLInputElement).value)
}
</script>

<template>
	<header
		ref="elementRef"
		class="navbar bg-base-100 rounded-xl z-20 fixed -top-28 gap-x-2 drop-shadow-xl"
		:class="{'top-1': !isHidden}"
	>
		<div class="navbar-start">
			<h1 class="normal-case font-semibold text-xl select-none">
				focu
			</h1>
		</div>
		<div class="navbar-end gap-x-2">
			<SearchBar
				:value="searchWord"
				:on-input="handleSearchWord"
				:on-submit="handleSearchWord"
				:input-class="'hidden mm:block'"
				:dropdown-class="'mm:hidden'"
			/>
			<div class="dropdown dropdown-end">
				<label tabindex="0" class="btn btn-ghost btn-circle avatar">
					<div class="w-6 rounded-full">
						<img v-if="user" :src="user.picture" referrerpolicy="no-referrer" />
						<PersonIcon v-else />
					</div>
				</label>
				<ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
					<li v-if="!user">
						<span @click="settingsStore?.loginWithGoogle">
							Login with Google
						</span>
					</li>
					<li v-if="user">
						<span @click="settingsStore?.logout">
							Logout
						</span>
					</li>
				</ul>
			</div>
		</div>
	</header>
</template>
