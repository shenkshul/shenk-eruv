<script>
	import dayjs from 'dayjs';
	import weekday from 'dayjs/plugin/weekday.js';
	import customParseFormat from 'dayjs/plugin/customParseFormat.js';
	import { latitude, longitude, timezone } from '$lib/constants.js';

	import * as KosherZmanim from 'kosher-zmanim';

	dayjs.extend(customParseFormat);
	dayjs.extend(weekday);

	const second = 1000;
	const minute = second * 60;

	/**
	 *  Get a date object from an HTML time input element
	 * @param {string} timeVal - Time in hour:minute:second format or hour:minute:second:AM format, e.g. 13:04:10 for 10 seconds after 1:04 PM
	 */
	function getDateFromTime(timeVal) {
		const date = dayjs(timeVal, ['HH:mm', 'h:mm:ss:A'], true);

		return date.toDate();
	}

	let hdf = new KosherZmanim.HebrewDateFormatter();
	hdf.setHebrewFormat(true);

	let earlyMinchaTime = '14:00';
	let fridayDate,
		shabbosDate,
		intDate = dayjs(),
		zmanim,
		jcal;

	let date = dayjs().format('YYYY-MM-DD');

	const zmanimCalendar = new KosherZmanim.ZmanimCalendar();
	const geolocation = new KosherZmanim.GeoLocation(null, latitude, longitude, 0, timezone);
	zmanimCalendar.setGeoLocation(geolocation);

	$: {
		intDate = date ? dayjs(date) : dayjs();
		/** @type {KosherZmanim.JewishCalendar} */
		jcal = new KosherZmanim.JewishCalendar(intDate.toDate());
		zmanimCalendar.setDate(intDate.toDate());

		zmanim = [
			{ label: 'Netz', value: dayjs(zmanimCalendar.getSunrise()).format('h:mm A') },
			{
				label: 'Sof Zman Krias Shema Magen Avraham',
				value: dayjs(zmanimCalendar.getSofZmanShmaMGA()).format('h:mm A')
			},
			{
				label: 'Sof Zman Krias ShemaGra',
				value: dayjs(zmanimCalendar.getSofZmanShmaGRA()).format('h:mm A')
			},
			{
				label: 'Sof Zman Tfila Magen Avraham',
				value: dayjs(zmanimCalendar.getSofZmanTfilaMGA()).format('h:mm A')
			},
			{
				label: 'Sof Zman Tfila Gra',
				value: dayjs(zmanimCalendar.getSofZmanTfilaGRA()).format('h:mm A')
			},
			{
				label: 'Chatzos',
				value: dayjs(zmanimCalendar.getChatzos()).format('h:mm A')
			},
			{ label: 'Mincha Gedola', value: dayjs(zmanimCalendar.getMinchaGedola()).format('h:mm A') },
			{ label: 'Plag Mincha', value: dayjs(zmanimCalendar.getPlagHamincha()).format('h:mm A') },
			{ label: 'Shkia', value: dayjs(zmanimCalendar.getSunset()).format('h:mm A') },
			{
				label: 'CandleLighting',
				value: dayjs(zmanimCalendar.getCandleLighting()).format('h:mm A')
			},
			{
				label: 'Tzeis',
				value: dayjs(zmanimCalendar.getTzais()).format('h:mm A')
			},
		];
	}
</script>

<svelte:head>
	<title>Shenk Daily Zmanim calculator</title>
</svelte:head>

<h1>Shenk Daily Zmanim calculator</h1>

<h2>Choose a date; the table will show the zmanim for that date.</h2>

<div id="content">
	<div id="editSection">
		<label for="">
			<input type="date" bind:value={date} />
		</label>
	</div>

	<div id="displaySection">
		<h2>{intDate.format('dddd, MMMM D, YYYY')}</h2>
		<table class="zmanTable">
			{#each zmanim as item}
				<tr>
					<th>{item.label}:</th>
					{item?.value}
				</tr>
			{/each}
		</table>
	</div>
</div>

<style>
	#content {
		gap: 1em;
		place-content: center;
		place-items: center;
	}

	#displaySection {
		width: 400px;
	}

	.zmanTable {
		border-collapse: collapse;
		width: 100%;
		border: 1px solid black;
	}

	.zmanTable tr {
		border-bottom: 1px solid black;
	}
</style>
