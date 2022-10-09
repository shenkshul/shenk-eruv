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
import AsarahBeteves from '$lib/minyanim/AsarahBeteves.json';
import TzomGedalyah from '$lib/minyanim/TzomGedalyah.json';
import ErevRoshHashana from '$lib/minyanim/Erev_RoshHashana.json';
import ErevSuccos from '$lib/minyanim/Erev_Succos.json';
import Succos from '$lib/minyanim/Succos.json';
import Succos2 from '$lib/minyanim/Succos2.json';
import CholHamoedSuccos from '$lib/minyanim/CholHamoedSuccos.json';
import HoshanaRabba from '$lib/minyanim/HoshanaRabba.json';
import ShabbosCholHamoedSuccos from '$lib/minyanim/ShabbosCholHamoedSuccos.json';
import RoshHashana from '$lib/minyanim/RoshHashana.json';
import RoshHashana2 from '$lib/minyanim/RoshHashana2.json';
import ErevYomKippur from '$lib/minyanim/ErevYomKippur.json';
import YomKippur from '$lib/minyanim/YomKippur.json';

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
	TzomGedalyah,
	ErevRoshHashana,
	RoshHashana,
	RoshHashana2,
	ErevYomKippur,
	YomKippur,
	AsarahBeteves,
	ErevSuccos,
	Succos,
	Succos2,
	CholHamoedSuccos,
	HoshanaRabba,
	ShabbosCholHamoedSuccos,
};

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
