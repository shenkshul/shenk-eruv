/**
* @typedef {object} BasicZmanim
* @property {string} Date
* @property {string} Alos16point1Degrees
* @property {string} Sunrise
* @property {string} SofZmanShemaMGA
* @property {string} SofZmanShemaGra
* @property {string} SofZmanTefilahGra
* @property {string} SofZmanTefilahMGA
* @property {string} Chatzos
* @property {string} MinchaGedolah
* @property {string} PlagHamincha
* @property {string} Shkia
* @property {string} Tzais
* @property {string} CandleLighting
*/


/**
* @typedef {object} YuzmanimData
* @property {boolean} showSelichos
* @property {boolean} showPurim
* @property {boolean} showPesach
* @property {boolean} showSukkos
* @property {string} date
* @property {string} day_of_week
* @property {string} jewish_date
* @property {boolean} holiday
* @property {days_list[]} days_list
* @property {minyanim[]} minyanim
*/

/**
* @typedef {object} days_list
* @property {string} day_of_week
* @property {string} day
* @property {string} month
* @property {string} date
*/

/**
* @typedef {object} minyanim
* @property {?} name
* @property {tefillos[]} tefillos
*/

/**
* @typedef {object} tefillos
* @property {string} name
* @property {time} time
* @property {boolean} exact
*/

/**
* @typedef {object} time
* @property {string} timezone
* @property {string} date
*/
