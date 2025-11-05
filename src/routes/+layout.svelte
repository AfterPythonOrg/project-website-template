<script lang="ts">
	import '../app.css';
	import DropdownMenu from '$components/DropdownMenu.svelte';
	import DropdownMenuItem from '$components/DropdownMenuItem.svelte';
	import ThemeToggle from '$components/ThemeToggle.svelte';

	let { children } = $props();
</script>

<div class="bg-bg50 min-h-screen">
	<nav class="container mx-auto py-3 text-tx50 text-base font-medium">
		<div class="flex items-center">
			<ul class="flex gap-18 justify-center flex-1">
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
			<ThemeToggle />
		</div>
	</nav>

	{@render children()}
</div>