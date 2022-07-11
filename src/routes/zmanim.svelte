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
		parsha,
		fridayZmanimObj,
		fridayZmanim,
		shabbosZmanim,
		candleLighting,
		fridayMincha,
		shabbosLateMincha,
		havdala,
		shabbosMaariv,
		zmanim,
		fridayZmanDisplay,
		shabbosZmanDisplay,
		jcal;

	let date = dayjs().format('YYYY-MM-DD');

	const zmanimCalendar = new KosherZmanim.ZmanimCalendar();
	const geolocation = new KosherZmanim.GeoLocation(null, latitude, longitude, 0, timezone);
	zmanimCalendar.setGeoLocation(geolocation);

	$: {
		intDate = date ? dayjs(date) : dayjs();
		fridayDate = intDate.weekday(5);
		shabbosDate = intDate.weekday(6);
		/** @type {KosherZmanim.JewishCalendar} */
		jcal = new KosherZmanim.JewishCalendar(shabbosDate.toDate());
		parsha = hdf.formatParsha(jcal);

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

		fridayMincha = {
			value: dayjs(fridayZmanim.CandleLighting).add(5, 'minute'),
			label: 'Friday mincha'
		};

		shabbosLateMincha = {
			value: dayjs(shabbosZmanim.Shkia).subtract(40, 'minute'),
			label: 'Shabbos Late Mincha'
		};

		havdala = {
			value: dayjs(shabbosZmanim.Shkia).add(51, 'minute'),
			label: 'Havdala'
		};
		shabbosMaariv = {
			value: dayjs(shabbosZmanim.Shkia).add(40, 'minute'),
			label: 'Shabbos maariv'
		};

		zmanim = [
			candleLighting,
			fridayMincha,
			// earlyMincha,
			shabbosLateMincha,
			shabbosMaariv,
			havdala
		];

		fridayZmanDisplay = [candleLighting,
			fridayMincha,];
		shabbosZmanDisplay = [shabbosLateMincha,
			shabbosMaariv,
			havdala];
	}
</script>

<svelte:head>
	<title>Shenk Shabbos Zmanim calculator</title>
</svelte:head>

<h1>Shenk Shabbos Zmanim calculator</h1>

<h2>
Choose a date; the table will show the Shabbos zmanim for that week.
</h2>

<div id="content">
	<div id="editSection">
		<label for="">
			Week of:
			<input type="date" bind:value={date} />
		</label>
	</div>

	<div id="displaySection">
		<h2>{fridayDate.format('MMMM D')} - {shabbosDate.format('D, YYYY')}, {parsha}</h2>
			<table class="zmanTable">
				{#each zmanim as item}
					<tr>
						<th>{item.label}:</th>
						{item?.value.format('h:mm A')}
					</tr>
				{/each}
			</table>
	</div>
</div>

<h3>Calculations</h3>
<ol>
	<li>Friday Mincha is 5 minutes after candle lighting</li>
	<li>Shabbos Late Mincha is 40 minutes before Shkia (sunset)</li>
	<li>Shabbos Maariv is 40 minutes after Shkia (sunset)</li>
	<li>Havdala is 51 minutes after Shkia (sunset)</li>
</ol>

<style>
	#content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1em;
		place-content: center;
		place-items: center;
	}

	#editSection {
		/* float: right; */
		display: flex;
		flex-direction: column;
		align-items: flex-end;
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
