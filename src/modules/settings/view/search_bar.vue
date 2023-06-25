<script setup lang="ts">
import {SearchIcon} from '~/lib/view/icons'
defineProps<{
	value: unknown
	onInput: (event: Event) => void
	onSubmit: (event: Event) => void
	inputClass?: string
	dropdownClass?: string
}>()
</script>

<template>
	<div class="form-control" :class="inputClass">
		<input
			:value="value"
			type="text"
			placeholder="Search"
			class="input input-sm input-bordered"
			@input="onInput"
			@keypress.enter="onSubmit"
		/>
	</div>
	<div class="dropdown dropdown-end" :class="dropdownClass">
		<label tabindex="0" class="btn btn-ghost btn-circle">
			<div class="w-6 rounded-full">
				<SearchIcon />
			</div>
		</label>
		<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
			<li class="form-control">
				<input
					:value="value"
					type="text"
					placeholder="Search"
					class="input input-sm input-bordered"
					@input="onInput"
					@keypress.enter="onSubmit"
				/>
			</li>
		</ul>
	</div>
</template>
