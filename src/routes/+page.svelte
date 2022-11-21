<script>
	import { shuffleArray } from '$lib/utils';

	export let data;
	/* const ads = shuffleArray(data.db); */
	const ads = data.db;
	console.log(ads);

	let isImage = false;
	let isVideo = false;
	let src, fullscreenEl;

	function openFullscreen(elem) {
		if (elem.requestFullscreen) elem.requestFullscreen();
		else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
		else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
	}

	/* function startAds() {
		if (ads.length === 0) return alert('No hay publicidad que proyectar');

		let counter = 0;
		openFullscreen(fullscreenEl);

		if (counter + 1 > ads.length) counter = 0;
		const currentAd = ads[counter];

		if (currentAd.ad_type.includes('image')) {
			isImage = true;
			isVideo = false;
		}
		if (currentAd.ad_type.includes('video')) {
			isVideo = true;
			isImage = false;
		}

		src = currentAd.ad_URL;
		counter++;

		setInterval(() => {
			if (counter + 1 > ads.length) counter = 0;
			const currentAd = ads[counter];

			if (currentAd.ad_type.includes('image')) {
				isImage = true;
				isVideo = false;
			}
			if (currentAd.ad_type.includes('video')) {
				isVideo = true;
				isImage = false;
			}

			src = currentAd.ad_URL;
			counter++;
		}, 7000);
	} */

	function screening(index = 0) {
		if (ads.length === 0) return alert('No hay publicidad que proyectar');

		/* openFullscreen(fullscreenEl); */

		const lastAdIndex = ads.length - 1;
		let currentIndex = index < lastAdIndex ? index : 0;

		isImage = ads[currentIndex].ad_type.includes('image');
		isVideo = ads[currentIndex].ad_type.includes('video');
		src = ads[currentIndex];

		setInterval(screening(currentIndex++), ads[currentIndex].paid_duration);
	}
</script>

<section class="viewport row nowrap">
	<article class="col fcenter fill">
		<h1>Iniciar proyeccion</h1>
		<button class="pri round" on:click={screening}>INICIAR</button>
	</article>
</section>

<div class="fullscreen" bind:this={fullscreenEl}>
	{#if isImage}
		<img {src} alt="ad" />
	{/if}

	{#if isVideo}
		<video {src} playsinline autoplay muted />
	{/if}
</div>

<style lang="scss">
	section {
		background: #333;
		color: #f5f5f5;
	}

	article {
		gap: 30px;

		button {
			min-width: 200px;
			font-weight: bold;
		}
	}

	img,
	video {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center;
		overflow: hidden;
		z-index: 9;
	}
</style>
