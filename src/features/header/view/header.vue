<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { DICTIONARY_STORE_INJECTION } from '~/features/dictionary'
import { SETTINGS_STORE_INJECTION } from '~/features/settings/store/settings.store'
import { useHideOnScroll } from '~/lib/hooks/useHideOnScroll'

const dictionaryStore = inject(DICTIONARY_STORE_INJECTION)
const settingsStore = inject(SETTINGS_STORE_INJECTION)
const searchWord = computed(() => dictionaryStore?.filterValues?.value || '')
const userInfo = computed(() => settingsStore?.userInfo)

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
			<div class="form-control">
				<input
					:value="searchWord"
					type="text"
					placeholder="Search"
					class="input input-bordered"
					@input="handleSearchWord"
					@keypress.enter="handleSearchWord"
				/>
			</div>
			<div class="dropdown dropdown-end">
				<label tabindex="0" class="btn btn-ghost btn-circle avatar">
					<div class="w-10 rounded-full">
						<img :src="userInfo ? userInfo.picture : '/img/icons/person.svg'" referrerpolicy="no-referrer" />
					</div>
				</label>
				<ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
					<li v-if="!userInfo">
						<span @click="settingsStore?.promptToLoginWithGoogle">
							Login with Google
						</span>
					</li>
					<li v-if="userInfo">
						<span @click="settingsStore?.logoutFromGoogle">
							Logout from Google
						</span>
					</li>
				</ul>
			</div>
		</div>
	</header>
</template>
