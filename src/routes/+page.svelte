<script>
	import { fade } from 'svelte/transition';

	let isImage, isVideo, src, fullscreenEl;
	let adCounter = 0;

	async function requestAd(index) {
		const res = await fetch('http://localhost:5173/db', {
			method: 'POST',
			body: JSON.stringify({ index }),
			headers: {
				'content-type': 'application/json'
			}
		});

		const json = await res.json();
		console.log(json);
		return json;
	}

	function openFullscreen() {
		if (fullscreenEl.requestFullscreen) fullscreenEl.requestFullscreen();
		else if (fullscreenEl.webkitRequestFullscreen) fullscreenEl.webkitRequestFullscreen();
		else if (fullscreenEl.msRequestFullscreen) fullscreenEl.msRequestFullscreen();
	}

	function blackFade() {
		isImage = true;
		isVideo = false;
		src = '/blank.png';

		return new Promise((resolve) => {
			setTimeout(resolve, 2000);
		});
	}

	function promoFade() {
		isImage = false;
		isVideo = true;
		src = '/adpad.mp4';

		return new Promise((resolve) => {
			setTimeout(resolve, 3000);
		});
	}

	function advertiserFade() {
		isImage = true;
		isVideo = false;
		src = '/advertiser.jpg';

		return new Promise((resolve) => {
			setTimeout(resolve, 7000);
		});
	}

	function announcerFade() {
		isImage = true;
		isVideo = false;
		src = '/announcer.jpg';

		return new Promise((resolve) => {
			setTimeout(resolve, 7000);
		});
	}

	async function screening(index = 0) {
		let { ad, newIndex } = await requestAd(index);

		await blackFade();

		if (adCounter % 3 === 0) {
			await promoFade();
			await blackFade();
			adCounter % 2 ? await advertiserFade() : await announcerFade();
			await blackFade();
		}

		isImage = ad.ad_type.includes('image');
		isVideo = ad.ad_type.includes('video');
		src = ad.ad_URL;
		adCounter++;

		setTimeout(() => screening(newIndex), ad.paid_duration);
	}

	function start() {
		openFullscreen();
		screening();
	}
</script>

<section class="viewport row nowrap">
	{#if !src}
		<article class="col fcenter fill">
			<h1>Iniciar proyeccion</h1>
			<button class="pri round" on:click={start}>INICIAR</button>
		</article>
	{/if}
</section>

<div class="fullscreen" bind:this={fullscreenEl}>
	{#key src}
		{#if isImage}
			<img {src} alt="ad" transition:fade={{ duration: 800 }} />
		{/if}

		{#if isVideo}
			<video {src} playsinline autoplay muted transition:fade={{ duration: 800 }} />
		{/if}
	{/key}
</div>

<style lang="scss">
	section {
		background: #000;
	}

	article {
		background: #333;
		color: #f5f5f5;
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

	.fullscreen {
		cursor: none;
	}
</style>
