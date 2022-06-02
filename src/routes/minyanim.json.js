import * as Sunday from '$lib/minyanim/Sunday.json';
import * as Monday from '$lib/minyanim/Monday.json';
import * as Tuesday from '$lib/minyanim/Tuesday.json';
import * as Wednesday from '$lib/minyanim/Wednesday.json';
import * as Thursday from '$lib/minyanim/Thursday.json';
import * as Friday from '$lib/minyanim/Friday.json';
import * as Shabbos from '$lib/minyanim/Shabbos.json';
import * as Shavuos from '$lib/minyanim/Shavuos.json';
import * as Shavuos_2 from '$lib/minyanim/Shavuos_2.json';
import * as Erev_Purim from '$lib/minyanim/Erev_Purim.json';
import * as Purim from '$lib/minyanim/Purim.json';

const minyanim = {
		Sunday,
		Monday,
		Tuesday,
		Wednesday,
		Thursday,
		Friday,
		Shabbos,
		Shavuos,
		Shavuos_2,
		Erev_Purim,
		Purim,
}

export async function get() {
	return {
		body: {
			minyanim
		}
	};
}

/** @type {import('@sveltejs/kit').Load} */
export async function load() {
	return {
		body: {
			minyanim
		}
	};
}
