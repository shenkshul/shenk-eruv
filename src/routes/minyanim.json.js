import Sunday from '$lib/minyanim/Sunday.json';
import Monday from '$lib/minyanim/Monday.json';
import Tuesday from '$lib/minyanim/Tuesday.json';
import Wednesday from '$lib/minyanim/Wednesday.json';
import Thursday from '$lib/minyanim/Thursday.json';
import Friday from '$lib/minyanim/Friday.json';
import Shabbos from '$lib/minyanim/Shabbos.json';
import Shavuos from '$lib/minyanim/Shavuos.json';
import Shavuos_2 from '$lib/minyanim/Shavuos_2.json';
import Erev_Purim from '$lib/minyanim/Erev_Purim.json';
import Purim from '$lib/minyanim/Purim.json';
import TishaBeav from '$lib/minyanim/TishaBeav.json';

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
		TishaBeav,
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
