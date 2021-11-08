<script>
	const second = 1000;
	const minute = second * 60;

	/**
	 *  Get a date object from an HTML time input element
	 * @param {string} timeVal - Time in hour:minute:second format, e.g. 13:04:10 for 10 seconds after 1:04 PM
	 */
	function getDateFromTime(timeVal) {
		const [hour, minute, second] = timeVal.split(':');

		const d = new Date();
		d.setHours(hour);
		d.setMinutes(minute);
		d.setSeconds(second);
		return d;
	}

	let candleLightingTime;
	let havdalaTime;
	let shabbosShkia;
	let earlyMinchaTime;

	$: candleLighting = {
		value: candleLightingTime ? getDateFromTime(candleLightingTime) : null,
		label: 'Candle lighting'
	};

	$: fridayMincha = {
		value: candleLighting.value ? new Date(candleLighting?.value?.getTime() + minute * 5) : null,
		label: 'Friday mincha'
	};

	$: lateMincha = {
		value: shabbosShkia ? new Date(getDateFromTime(shabbosShkia).getTime() - 40 * minute) : null,
		label: 'Late mincha (40 minutes before Shkia)'
	};
	$: earlyMincha = {
		value: earlyMinchaTime ? getDateFromTime(earlyMinchaTime) : null,
		label: 'Early mincha'
	};

	$: havdala = {
		value: havdalaTime ? getDateFromTime(havdalaTime) : null,
		label: 'Havdala'
	};
	$: shabbosMaariv = {
		value: havdala?.value ? new Date(havdala?.value?.getTime() - 11 * minute) : null,
		label: 'Shabbos maariv'
	};

	$: zmanim = [candleLighting, fridayMincha, earlyMincha, lateMincha, havdala, shabbosMaariv];
</script>

<div id="content">
	<div id="editSection">
		<label for="">
			Candle Lighting:
			<input type="time" step="1" bind:value={candleLightingTime} />
		</label>
		<label for="">
			Havdala:
			<input type="time" step="1" bind:value={havdalaTime} />
		</label>
		<label for="">
			Shabbos Mincha Gedola:
			<input type="time" step="1" bind:value={earlyMinchaTime} />
		</label>
		<label for="">
			Shabbos Shkia:
			<input type="time" step="1" bind:value={shabbosShkia} />
		</label>
	</div>

	<div id="displaySection">
		<ul>
			{#each zmanim as item}
				<li>
					<strong>{item.label}:</strong>
					{item?.value?.toLocaleTimeString('en', {
						timeStyle: 'short'
					}) ?? ''}
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	#content {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	#editSection {
		/* float: right; */
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	ul {
		margin: 0;
	}
	li {
		list-style: none;
	}
</style>
