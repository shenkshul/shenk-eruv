<script>
	import dayjs from 'dayjs';
	import weekday from 'dayjs/plugin/weekday.js';
	import customParseFormat from 'dayjs/plugin/customParseFormat.js';
	import { latitude, longitude, timezone } from '$lib/constants.js';

	import * as KosherZmanim from 'kosher-zmanim';

	dayjs.extend(customParseFormat);
	dayjs.extend(weekday);


	let hdf = new KosherZmanim.HebrewDateFormatter();
	hdf.setHebrewFormat(true);

	let fridayDate,
		shabbosDate,
		intDate = dayjs(),
		parsha,
		fridayZmanim,
		shabbosZmanim,
		candleLighting,
		havdala,
		zmanim,
		/** @type {KosherZmanim.JewishCalendar} */
		jcal;

	let date = dayjs().format('YYYY-MM-DD');
	let numberOfWeeks = 52;

	const zmanimCalendar = new KosherZmanim.ZmanimCalendar();
	const geolocation = new KosherZmanim.GeoLocation(null, latitude, longitude, 0, timezone);
	zmanimCalendar.setGeoLocation(geolocation);

	let yearZmanim = [];

	const dateFormat = 'MMM DD, YYYY';
	
	$: {
		intDate = date ? dayjs(date) : dayjs();
		yearZmanim = [];
		intDate = intDate.subtract(1, 'week');
		for (let weeks = 0; weeks < numberOfWeeks; weeks++) {
			intDate = intDate.add(1, 'week');
			fridayDate = intDate.weekday(5);
			shabbosDate = intDate.weekday(6);
			jcal = new KosherZmanim.JewishCalendar(shabbosDate.toDate());

			for (let i = 0; i < 7; i++) {
				let internalDate = intDate.weekday(i);
				let potentialYomTov = new KosherZmanim.JewishCalendar(internalDate.toDate());
				if (potentialYomTov.isErevYomTov() || potentialYomTov.isYomTovAssurBemelacha()) {
					zmanimCalendar.setDate(internalDate.toISOString());
					yearZmanim.push({
						date: dayjs(potentialYomTov.getDate()).format(dateFormat),
						parsha: hdf.formatYomTov(potentialYomTov),
						candleLighting: {
							value: dayjs(zmanimCalendar.getCandleLighting())
						},
						havdala: {
							value:
								potentialYomTov.isErevYomTov() || internalDate.day() === 5 || potentialYomTov.isErevYomTovSheni()
									? null
									: dayjs(zmanimCalendar.getSunset()).add(51, 'minute')
						}
					});
				}
			}

			parsha = hdf.formatParsha(jcal);
			if (parsha.length < 1) {
				parsha = 'שבת ' + hdf.formatYomTov(jcal);
				console.log(hdf.formatYomTov(jcal));
			}

			// Friday Zmanim
			zmanimCalendar.setDate(fridayDate.toDate());
			fridayZmanim = {
				Shkia: zmanimCalendar.getSunset().toISO(),
				CandleLighting: zmanimCalendar.getCandleLighting().toISO()
			};

			// Shabbos Zmanim
			zmanimCalendar.setDate(shabbosDate.toDate());
			shabbosZmanim = {
				Shkia: zmanimCalendar.getSunset().toISO(),
				CandleLighting: zmanimCalendar.getCandleLighting().toISO()
			};

			candleLighting = {
				value: dayjs(fridayZmanim.CandleLighting),
				label: 'Candle lighting'
			};

			havdala = {
				value: dayjs(shabbosZmanim.Shkia).add(51, 'minute'),
				label: 'Havdala'
			};

			zmanim = {
				date: fridayDate.format(dateFormat),
				parsha,
				candleLighting,
				havdala: (jcal.isErevYomTov() || jcal.isErevYomTovSheni()) ? null : havdala
			};

			yearZmanim.push(zmanim);
		}
		yearZmanim = yearZmanim.sort((a,b) => {
			return dayjs(a.date).isBefore(b.date) ? -1 : 1
		});
	}
</script>

<svelte:head>
	<title>Shenk Shabbos Zmanim calculator</title>
</svelte:head>

<h1>Shenk Shabbos Zmanim calculator</h1>

<h2>Choose a date and number of weeks; the table will show the Candle lighting and havdala times for Shabbos and Yom Tov during that span</h2>

<div id="content">
	<div id="editSection">
		<label for="">
			Starting week
			<input type="date" bind:value={date} />
		</label>
		<input type="number" bind:value={numberOfWeeks} />
	</div>

	<div id="displaySection">
		<!-- <h2>{fridayDate.format('MMMM D')} - {shabbosDate.format('D, YYYY')}, {parsha}</h2> -->
		<table class="zmanTable">
			<tr>
				<th>Date</th>
				<th>Shabbat/Holiday</th>
				<th>Candles</th>
				<th>Havdala</th>
			</tr>
			{#each yearZmanim as item}
				<tr>
					<td>{item.date}</td>
					<td lang="he">{item.parsha}</td>

					<td>{item?.candleLighting?.value?.format('h:mm') ?? 'Failed to calculate'}</td>
					<td>{item?.havdala?.value?.format('h:mm') ?? ''}</td>
				</tr>
			{/each}
		</table>
	</div>
</div>

<style>
	/* @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Hebrew&display=swap');
	 */
	 @import url('https://fonts.googleapis.com/css2?family=David+Libre&family=Noto+Serif+Hebrew&display=swap');

	[lang=he] {
		font-family: 'David Libre', serif;
		font-weight: bold;
	}

	#content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1em;
		place-content: center;
	}

	#editSection {
		/* float: inline-end; */
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	#displaySection {
		inline-size: 500px;
	}

	.zmanTable {
		border-collapse: collapse;
		inline-size: 100%;
		border: 1px solid black;
		
	}

	.zmanTable tr {
		border-block-end: 1px solid black;
		text-align: center;
		font-size: large;
	}
</style>
