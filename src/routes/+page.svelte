<script>
	let ads = [
		/* { type: 'video/mp4', src: 'https://www.facturasgratis.ga/no-bills.mp4' } */
	];

	let isImage = false;
	let isVideo = false;
	let src, fullscreenEl;

	function uploadFiles() {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'video/mp4,image/jpeg';
		input.multiple = true;

		input.click();

		input.onchange = () => {
			const files = Array.from(input.files);
			const shuffledFiles = files.sort(() => 0.5 - Math.random());

			shuffledFiles.forEach((file) => {
				const { type } = file;
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => {
					ads = [...ads, { type, src: reader.result }];
				};
			});
		};
	}

	function openFullscreen(elem) {
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.webkitRequestFullscreen) {
			/* Safari */
			elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) {
			/* IE11 */
			elem.msRequestFullscreen();
		}
	}

	function startAds() {
		if (ads.length === 0) return alert('No hay publicidad que proyectar');
		openFullscreen(fullscreenEl);
		let counter = 0;

		if (counter + 1 > ads.length) counter = 0;
		const currentAd = ads[counter];

		if (currentAd.type.includes('image')) {
			isImage = true;
			isVideo = false;
		}
		if (currentAd.type.includes('video')) {
			isVideo = true;
			isImage = false;
		}

		src = currentAd.src;
		counter++;

		setInterval(() => {
			if (counter + 1 > ads.length) counter = 0;
			const currentAd = ads[counter];

			if (currentAd.type.includes('image')) {
				isImage = true;
				isVideo = false;
			}
			if (currentAd.type.includes('video')) {
				isVideo = true;
				isImage = false;
			}

			src = currentAd.src;
			counter++;
		}, 7000);
	}
</script>

<section class="viewport row nowrap">
	<article class="col fcenter grow yfill">
		<h1>Subir publicidad</h1>
		<button class="pri round" on:click={uploadFiles}>SUBIR ARCHIVOS</button>
	</article>

	<article class="col fcenter grow yfill">
		<h1>Iniciar proyeccion</h1>
		<button class="pri round" on:click={startAds}>INICIAR</button>
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
