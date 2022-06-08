(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["myLib"] = factory();
	else
		root["myLib"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./utils/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/suncalc/suncalc.js":
/*!*****************************************!*\
  !*** ./node_modules/suncalc/suncalc.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n (c) 2011-2015, Vladimir Agafonkin\n SunCalc is a JavaScript library for calculating sun/moon position and light phases.\n https://github.com/mourner/suncalc\n*/\n\n(function () { 'use strict';\n\n// shortcuts for easier to read formulas\n\nvar PI   = Math.PI,\n    sin  = Math.sin,\n    cos  = Math.cos,\n    tan  = Math.tan,\n    asin = Math.asin,\n    atan = Math.atan2,\n    acos = Math.acos,\n    rad  = PI / 180;\n\n// sun calculations are based on http://aa.quae.nl/en/reken/zonpositie.html formulas\n\n\n// date/time constants and conversions\n\nvar dayMs = 1000 * 60 * 60 * 24,\n    J1970 = 2440588,\n    J2000 = 2451545;\n\nfunction toJulian(date) { return date.valueOf() / dayMs - 0.5 + J1970; }\nfunction fromJulian(j)  { return new Date((j + 0.5 - J1970) * dayMs); }\nfunction toDays(date)   { return toJulian(date) - J2000; }\n\n\n// general calculations for position\n\nvar e = rad * 23.4397; // obliquity of the Earth\n\nfunction rightAscension(l, b) { return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l)); }\nfunction declination(l, b)    { return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l)); }\n\nfunction azimuth(H, phi, dec)  { return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi)); }\nfunction altitude(H, phi, dec) { return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H)); }\n\nfunction siderealTime(d, lw) { return rad * (280.16 + 360.9856235 * d) - lw; }\n\nfunction astroRefraction(h) {\n    if (h < 0) // the following formula works for positive altitudes only.\n        h = 0; // if h = -0.08901179 a div/0 would occur.\n\n    // formula 16.4 of \"Astronomical Algorithms\" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.\n    // 1.02 / tan(h + 10.26 / (h + 5.10)) h in degrees, result in arc minutes -> converted to rad:\n    return 0.0002967 / Math.tan(h + 0.00312536 / (h + 0.08901179));\n}\n\n// general sun calculations\n\nfunction solarMeanAnomaly(d) { return rad * (357.5291 + 0.98560028 * d); }\n\nfunction eclipticLongitude(M) {\n\n    var C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)), // equation of center\n        P = rad * 102.9372; // perihelion of the Earth\n\n    return M + C + P + PI;\n}\n\nfunction sunCoords(d) {\n\n    var M = solarMeanAnomaly(d),\n        L = eclipticLongitude(M);\n\n    return {\n        dec: declination(L, 0),\n        ra: rightAscension(L, 0)\n    };\n}\n\n\nvar SunCalc = {};\n\n\n// calculates sun position for a given date and latitude/longitude\n\nSunCalc.getPosition = function (date, lat, lng) {\n\n    var lw  = rad * -lng,\n        phi = rad * lat,\n        d   = toDays(date),\n\n        c  = sunCoords(d),\n        H  = siderealTime(d, lw) - c.ra;\n\n    return {\n        azimuth: azimuth(H, phi, c.dec),\n        altitude: altitude(H, phi, c.dec)\n    };\n};\n\n\n// sun times configuration (angle, morning name, evening name)\n\nvar times = SunCalc.times = [\n    [-0.833, 'sunrise',       'sunset'      ],\n    [  -0.3, 'sunriseEnd',    'sunsetStart' ],\n    [    -6, 'dawn',          'dusk'        ],\n    [   -12, 'nauticalDawn',  'nauticalDusk'],\n    [   -18, 'nightEnd',      'night'       ],\n    [     6, 'goldenHourEnd', 'goldenHour'  ]\n];\n\n// adds a custom time to the times config\n\nSunCalc.addTime = function (angle, riseName, setName) {\n    times.push([angle, riseName, setName]);\n};\n\n\n// calculations for sun times\n\nvar J0 = 0.0009;\n\nfunction julianCycle(d, lw) { return Math.round(d - J0 - lw / (2 * PI)); }\n\nfunction approxTransit(Ht, lw, n) { return J0 + (Ht + lw) / (2 * PI) + n; }\nfunction solarTransitJ(ds, M, L)  { return J2000 + ds + 0.0053 * sin(M) - 0.0069 * sin(2 * L); }\n\nfunction hourAngle(h, phi, d) { return acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d))); }\n\n// returns set time for the given sun altitude\nfunction getSetJ(h, lw, phi, dec, n, M, L) {\n\n    var w = hourAngle(h, phi, dec),\n        a = approxTransit(w, lw, n);\n    return solarTransitJ(a, M, L);\n}\n\n\n// calculates sun times for a given date and latitude/longitude\n\nSunCalc.getTimes = function (date, lat, lng) {\n\n    var lw = rad * -lng,\n        phi = rad * lat,\n\n        d = toDays(date),\n        n = julianCycle(d, lw),\n        ds = approxTransit(0, lw, n),\n\n        M = solarMeanAnomaly(ds),\n        L = eclipticLongitude(M),\n        dec = declination(L, 0),\n\n        Jnoon = solarTransitJ(ds, M, L),\n\n        i, len, time, Jset, Jrise;\n\n\n    var result = {\n        solarNoon: fromJulian(Jnoon),\n        nadir: fromJulian(Jnoon - 0.5)\n    };\n\n    for (i = 0, len = times.length; i < len; i += 1) {\n        time = times[i];\n\n        Jset = getSetJ(time[0] * rad, lw, phi, dec, n, M, L);\n        Jrise = Jnoon - (Jset - Jnoon);\n\n        result[time[1]] = fromJulian(Jrise);\n        result[time[2]] = fromJulian(Jset);\n    }\n\n    return result;\n};\n\n\n// moon calculations, based on http://aa.quae.nl/en/reken/hemelpositie.html formulas\n\nfunction moonCoords(d) { // geocentric ecliptic coordinates of the moon\n\n    var L = rad * (218.316 + 13.176396 * d), // ecliptic longitude\n        M = rad * (134.963 + 13.064993 * d), // mean anomaly\n        F = rad * (93.272 + 13.229350 * d),  // mean distance\n\n        l  = L + rad * 6.289 * sin(M), // longitude\n        b  = rad * 5.128 * sin(F),     // latitude\n        dt = 385001 - 20905 * cos(M);  // distance to the moon in km\n\n    return {\n        ra: rightAscension(l, b),\n        dec: declination(l, b),\n        dist: dt\n    };\n}\n\nSunCalc.getMoonPosition = function (date, lat, lng) {\n\n    var lw  = rad * -lng,\n        phi = rad * lat,\n        d   = toDays(date),\n\n        c = moonCoords(d),\n        H = siderealTime(d, lw) - c.ra,\n        h = altitude(H, phi, c.dec),\n        // formula 14.1 of \"Astronomical Algorithms\" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.\n        pa = atan(sin(H), tan(phi) * cos(c.dec) - sin(c.dec) * cos(H));\n\n    h = h + astroRefraction(h); // altitude correction for refraction\n\n    return {\n        azimuth: azimuth(H, phi, c.dec),\n        altitude: h,\n        distance: c.dist,\n        parallacticAngle: pa\n    };\n};\n\n\n// calculations for illumination parameters of the moon,\n// based on http://idlastro.gsfc.nasa.gov/ftp/pro/astro/mphase.pro formulas and\n// Chapter 48 of \"Astronomical Algorithms\" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.\n\nSunCalc.getMoonIllumination = function (date) {\n\n    var d = toDays(date || new Date()),\n        s = sunCoords(d),\n        m = moonCoords(d),\n\n        sdist = 149598000, // distance from Earth to Sun in km\n\n        phi = acos(sin(s.dec) * sin(m.dec) + cos(s.dec) * cos(m.dec) * cos(s.ra - m.ra)),\n        inc = atan(sdist * sin(phi), m.dist - sdist * cos(phi)),\n        angle = atan(cos(s.dec) * sin(s.ra - m.ra), sin(s.dec) * cos(m.dec) -\n                cos(s.dec) * sin(m.dec) * cos(s.ra - m.ra));\n\n    return {\n        fraction: (1 + cos(inc)) / 2,\n        phase: 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / Math.PI,\n        angle: angle\n    };\n};\n\n\nfunction hoursLater(date, h) {\n    return new Date(date.valueOf() + h * dayMs / 24);\n}\n\n// calculations for moon rise/set times are based on http://www.stargazing.net/kepler/moonrise.html article\n\nSunCalc.getMoonTimes = function (date, lat, lng, inUTC) {\n    var t = new Date(date);\n    if (inUTC) t.setUTCHours(0, 0, 0, 0);\n    else t.setHours(0, 0, 0, 0);\n\n    var hc = 0.133 * rad,\n        h0 = SunCalc.getMoonPosition(t, lat, lng).altitude - hc,\n        h1, h2, rise, set, a, b, xe, ye, d, roots, x1, x2, dx;\n\n    // go in 2-hour chunks, each time seeing if a 3-point quadratic curve crosses zero (which means rise or set)\n    for (var i = 1; i <= 24; i += 2) {\n        h1 = SunCalc.getMoonPosition(hoursLater(t, i), lat, lng).altitude - hc;\n        h2 = SunCalc.getMoonPosition(hoursLater(t, i + 1), lat, lng).altitude - hc;\n\n        a = (h0 + h2) / 2 - h1;\n        b = (h2 - h0) / 2;\n        xe = -b / (2 * a);\n        ye = (a * xe + b) * xe + h1;\n        d = b * b - 4 * a * h1;\n        roots = 0;\n\n        if (d >= 0) {\n            dx = Math.sqrt(d) / (Math.abs(a) * 2);\n            x1 = xe - dx;\n            x2 = xe + dx;\n            if (Math.abs(x1) <= 1) roots++;\n            if (Math.abs(x2) <= 1) roots++;\n            if (x1 < -1) x1 = x2;\n        }\n\n        if (roots === 1) {\n            if (h0 < 0) rise = i + x1;\n            else set = i + x1;\n\n        } else if (roots === 2) {\n            rise = i + (ye < 0 ? x2 : x1);\n            set = i + (ye < 0 ? x1 : x2);\n        }\n\n        if (rise && set) break;\n\n        h0 = h2;\n    }\n\n    var result = {};\n\n    if (rise) result.rise = hoursLater(t, rise);\n    if (set) result.set = hoursLater(t, set);\n\n    if (!rise && !set) result[ye > 0 ? 'alwaysUp' : 'alwaysDown'] = true;\n\n    return result;\n};\n\n\n// export as Node module / AMD module / browser variable\nif (true) module.exports = SunCalc;\nelse {}\n\n}());\n\n\n//# sourceURL=webpack:///./node_modules/suncalc/suncalc.js?");

/***/ }),

/***/ "./utils/index.ts":
/*!************************!*\
  !*** ./utils/index.ts ***!
  \************************/
/*! exports provided: getJD, getSidereal, formatHourAngle, degreesToHourAngle, hourAngleToDegrees, degreesToRadians, radiansToDegrees, mod, equationOfTime, getNextISSVisualPass, getSunData, getMoonData, getSeasons, suncalc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getJD\", function() { return getJD; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getSidereal\", function() { return getSidereal; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"formatHourAngle\", function() { return formatHourAngle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"degreesToHourAngle\", function() { return degreesToHourAngle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hourAngleToDegrees\", function() { return hourAngleToDegrees; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"degreesToRadians\", function() { return degreesToRadians; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"radiansToDegrees\", function() { return radiansToDegrees; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mod\", function() { return mod; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"equationOfTime\", function() { return equationOfTime; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getNextISSVisualPass\", function() { return getNextISSVisualPass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getSunData\", function() { return getSunData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getMoonData\", function() { return getMoonData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getSeasons\", function() { return getSeasons; });\n/* harmony import */ var suncalc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! suncalc */ \"./node_modules/suncalc/suncalc.js\");\n/* harmony import */ var suncalc__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(suncalc__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, \"suncalc\", function() { return suncalc__WEBPACK_IMPORTED_MODULE_0__; });\n\r\nfunction getJD(date) {\r\n    var month = date.month() + 1;\r\n    var day = date.date();\r\n    var year = date.year();\r\n    var minutes = date.minutes();\r\n    var hours = date.hours();\r\n    var seconds = date.seconds() + date.milliseconds() / 1000;\r\n    var a = Math.floor((14 - month) / 12);\r\n    var y = year + 4800 - a;\r\n    var m = month + 12 * a - 3;\r\n    var JDN = day +\r\n        Math.floor((153 * m + 2) / 5) +\r\n        365 * y +\r\n        Math.floor(y / 4) -\r\n        Math.floor(y / 100) +\r\n        Math.floor(y / 400) -\r\n        32045;\r\n    return JDN + (hours - 12) / 24 + minutes / 1440 + seconds / 86400;\r\n}\r\nfunction getSidereal(date, mean) {\r\n    var jd = getJD(date);\r\n    var D = jd - 2451545;\r\n    var D0 = Math.floor(jd - 0.5) + 0.5 - 2451545;\r\n    var H = (D - D0) * 24;\r\n    var T = D / 36525;\r\n    var GMST = 6.697374558 + 0.06570982441908 * D0 + 1.00273790935 * H + 0.000026 * T * T;\r\n    // let GMST =\r\n    //   280.46061837 +\r\n    //   360.98564736629 * D +\r\n    //   0.000387933 * T * T -\r\n    //   (T * T * T) / 38710000;\r\n    // GMST %= 360;\r\n    // let GMST = 18.697374558 + 24.06570982441908 * D;\r\n    GMST %= 24;\r\n    if (mean)\r\n        return GMST;\r\n    var epsilon = 23.4393 - 0.0000004 * D;\r\n    var L = 280.47 + 0.98565 * D;\r\n    var Omega = 125.04 - 0.052954 * D;\r\n    var Deltapsi = -0.000319 * Math.sin((Omega * Math.PI) / 180) -\r\n        0.000024 * Math.sin((2 * L * Math.PI) / 180);\r\n    var eqeq = Deltapsi * Math.cos((epsilon * Math.PI) / 180);\r\n    var GAST = GMST + eqeq;\r\n    return GAST;\r\n}\r\nfunction formatHourAngle(hour_angle) {\r\n    hour_angle = mod(hour_angle, 24);\r\n    var h = Math.floor(hour_angle);\r\n    var mpart = (hour_angle - h) * 60;\r\n    var m = Math.floor(mpart);\r\n    var spart = (mpart - m) * 60;\r\n    var s = Math.floor(spart);\r\n    var mpad = \"\";\r\n    var spad = \"\";\r\n    if (m < 10)\r\n        mpad = \"0\";\r\n    if (s < 10)\r\n        spad = \"0\";\r\n    return h + \":\" + mpad + m + \":\" + spad + s;\r\n}\r\nfunction degreesToHourAngle(degrees) {\r\n    return (degrees / 360) * 24;\r\n}\r\nfunction hourAngleToDegrees(hour_angle) {\r\n    return (hour_angle / 24) * 360;\r\n}\r\nfunction degreesToRadians(degrees) {\r\n    return mod((degrees * Math.PI) / 180, 2 * Math.PI);\r\n}\r\nfunction radiansToDegrees(radians) {\r\n    return mod((radians * 180) / Math.PI, 360);\r\n}\r\nfunction mod(num, modulus) {\r\n    var n = num % modulus;\r\n    if (n < 0)\r\n        return n + modulus;\r\n    return n;\r\n}\r\nfunction equationOfTime(date) {\r\n    var jd = getJD(date);\r\n    var D = jd - 2451780.5;\r\n    // let Year = date.year();\r\n    // let Month = date.month() + 1;\r\n    // let Day = date.date();\r\n    // let Hour = date.hour();\r\n    // let x1 = 367 * Year - 738567;\r\n    // let x2 = Math.floor((7 * Math.floor(Year + (Month - 9) / 12)) / 4);\r\n    // let x3 = Math.floor(275 * Month) + Day;\r\n    // let Dp = x1 + x2 + x3 + Hour / 24;\r\n    var epsilon_deg = 279.6296;\r\n    var omega_deg = 283.2989;\r\n    var e = 0.0167;\r\n    var y = 365.2422;\r\n    var eta_deg = 23.4364; // in degrees\r\n    var eta_rad = degreesToRadians(eta_deg);\r\n    var M_deg = (360 * D) / y + epsilon_deg - omega_deg;\r\n    M_deg = mod(M_deg, 360);\r\n    var M_rad = degreesToRadians(M_deg);\r\n    var gamma_deg = M_deg + omega_deg;\r\n    gamma_deg = mod(gamma_deg, 360);\r\n    var E_rad = M_rad + (e * Math.sin(M_rad)) / (1 - e * Math.cos(M_rad));\r\n    var nu_rad = 2 * Math.atan(Math.sqrt((1 + e) / (1 - e)) * Math.tan(E_rad / 2));\r\n    var nu_deg = radiansToDegrees(nu_rad);\r\n    var lambda_deg = nu_deg + omega_deg;\r\n    lambda_deg = mod(lambda_deg, 360);\r\n    var lambda_rad = radiansToDegrees(lambda_deg);\r\n    var alpha_rad = Math.atan2(Math.cos(lambda_rad), Math.sin(lambda_rad) * Math.cos(eta_rad));\r\n    var alpha_deg = radiansToDegrees(alpha_rad);\r\n    alpha_deg = mod(alpha_deg, 360);\r\n    var EoT = gamma_deg - alpha_deg;\r\n    return EoT;\r\n}\r\nfunction getNextISSVisualPass(lat, lon, elev) {\r\n    var N2YO = \"WMB8CZ-8WGTN7-NBHTYN-3Z0G\";\r\n    return fetch(\"https://www.n2yo.com/rest/v1/satellite/visualpasses/25544/\" + lat + \"/\" + lon + \"/\" + elev + \"/10/1/&apiKey=\" + N2YO)\r\n        .then(function (res) { return res.json(); })\r\n        .then(function (data) {\r\n        if (data.info.passescount > 0) {\r\n            var pass = data.passes[0];\r\n            return pass;\r\n        }\r\n        else {\r\n            return null;\r\n        }\r\n    });\r\n}\r\nfunction getSunData(date, lat, lon) {\r\n    return suncalc__WEBPACK_IMPORTED_MODULE_0__[\"getTimes\"](date, lat, lon);\r\n}\r\nfunction getMoonData(date, lat, lon) {\r\n    var retobj = {};\r\n    var times = suncalc__WEBPACK_IMPORTED_MODULE_0__[\"getMoonTimes\"](date, lat, lon);\r\n    var illum = suncalc__WEBPACK_IMPORTED_MODULE_0__[\"getMoonIllumination\"](date);\r\n    retobj[\"moonrise\"] = times.rise;\r\n    retobj[\"moonset\"] = times.set;\r\n    retobj[\"illumination\"] = illum.fraction;\r\n    var phase = illum.phase;\r\n    var fudge = 0.05;\r\n    var phaseName = \"\";\r\n    if (phase < 0 + fudge || phase > 1 - fudge) {\r\n        phaseName = \"New Moon\";\r\n    }\r\n    else if (phase > 0 + fudge && phase < 0.25 - fudge) {\r\n        phaseName = \"Waxing Crescent\";\r\n    }\r\n    else if (phase > 0.25 - fudge && phase < 0.25 + fudge) {\r\n        phaseName = \"First Quarter\";\r\n    }\r\n    else if (phase > 0.25 + fudge && phase < 0.5 - fudge) {\r\n        phaseName = \"Waxing Gibbous\";\r\n    }\r\n    else if (phase > 0.5 - fudge && phase < 0.5 + fudge) {\r\n        phaseName = \"Full Moon\";\r\n    }\r\n    else if (phase > 0.5 + fudge && phase < 0.75 - fudge) {\r\n        phaseName = \"Waning Gibbous\";\r\n    }\r\n    else if (phase > 0.75 - fudge && phase < 0.75 + fudge) {\r\n        phaseName = \"Last Quarter\";\r\n    }\r\n    else if (phase > 0.75 + fudge && phase < 1 - fudge) {\r\n        phaseName = \"Waning Crescent\";\r\n    }\r\n    retobj[\"phaseName\"] = phaseName;\r\n    retobj[\"moonAge\"] = phase * 29.530587981;\r\n    return retobj;\r\n}\r\nfunction getSeasons(year, lat) {\r\n    return fetch(\"https://api.usno.navy.mil/seasons?year=\" + year)\r\n        .then(function (res) { return res.json(); })\r\n        .then(function (data) {\r\n        var seasonData = {};\r\n        data.data.forEach(function (obj) {\r\n            var key = obj.phenom;\r\n            var month = parseInt(obj.month);\r\n            if (key === \"Equinox\" || key === \"Solstice\") {\r\n                switch (month) {\r\n                    case 3:\r\n                        if (lat >= 0) {\r\n                            key = \"Spring\";\r\n                        }\r\n                        else {\r\n                            key = \"Autumn\";\r\n                        }\r\n                        break;\r\n                    case 6:\r\n                        if (lat >= 0) {\r\n                            key = \"Summer\";\r\n                        }\r\n                        else {\r\n                            key = \"Winter\";\r\n                        }\r\n                        break;\r\n                    case 9:\r\n                        if (lat >= 0) {\r\n                            key = \"Autumn\";\r\n                        }\r\n                        else {\r\n                            key = \"Spring\";\r\n                        }\r\n                        break;\r\n                    case 12:\r\n                        if (lat >= 0) {\r\n                            key = \"Winter\";\r\n                        }\r\n                        else {\r\n                            key = \"Summer\";\r\n                        }\r\n                        break;\r\n                    default:\r\n                        break;\r\n                }\r\n            }\r\n            seasonData[key] = obj.year + \"-\" + obj.month + \"-\" + obj.day + \"T\" + obj.time;\r\n        });\r\n        return seasonData;\r\n    });\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./utils/index.ts?");

/***/ })

/******/ });
});