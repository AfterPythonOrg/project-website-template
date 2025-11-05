<script lang="ts">
	import '../app.css';
	import DropdownMenu from '$components/DropdownMenu.svelte';
	import DropdownMenuItem from '$components/DropdownMenuItem.svelte';

	let { children } = $props();
</script>

<nav class="py-3 text-base font-medium">
	<ul class="flex gap-18 justify-center">
		<li>
			<a href={'/'}>Home</a>
		</li>
		<li>
			<a href={'/playground'}>Playground</a>
		</li>
		<li>
			<DropdownMenu label="Learn">
				<DropdownMenuItem href='/tutorials'>
					Tutorials
				</DropdownMenuItem>
				<DropdownMenuItem href='/examples'>
					Examples
				</DropdownMenuItem>
				<DropdownMenuItem href='/blog'>
					Blog
				</DropdownMenuItem>
				<!-- <DropdownMenuItem href='/posts'>
					Posts
				</DropdownMenuItem> -->
				<!-- <DropdownMenuItem href='/exercises'>
					Exercises
				</DropdownMenuItem> -->
			</DropdownMenu>
		</li>
		<li>
			<a href={'/docs'}>Docs</a>
		</li>
	</ul>
</nav>

{@render children()}
