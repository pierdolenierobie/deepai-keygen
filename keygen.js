function generateKey(useragent) {
	f = Math.round(1e11 * Math.random()) + "";
	l = (function() {
		for (var p = [], q = 0; 64 > q;)
			p[q] = 0 | (4294967296 * Math.sin(++q % Math.PI));
		return function(v) {
			var y,
				C,
				E,
				G = [(y = 1732584193), (C = 4023233417), ~y, ~C],
				aa = [],
				z = unescape(encodeURI(v)) + "\u0080",
				x = z.length;
			v = (--x / 4 + 2) | 15;
			for (aa[--v] = 8 * x; ~x;) aa[x >> 2] |= z.charCodeAt(x) << (8 * x--);
			for (q = z = 0; q < v; q += 16) {
				for (
					x = G; 64 > z; x = [
						(E = x[3]),
						y +
						(((E =
									x[0] + [(y & C) | (~y & E), (E & y) | (~E & C), y ^ C ^ E, C ^ (y | ~E)][
										(x = z >> 4)
									] +
									p[z] +
									~~aa[q | ([z, 5 * z + 1, 3 * z + 5, 7 * z][x] & 15)]) <<
								(x = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][
									4 * x + (z++ % 4)
								])) |
							(E >>> -x)),
						y,
						C,
					]
				)
					(y = x[1] | 0), (C = x[2]);
				for (z = 4; z;) G[--z] += x[z];
			}
			for (v = ""; 32 > z;)
				v += ((G[z >> 3] >> (4 * (1 ^ z++))) & 15).toString(16);
			return v.split("").reverse().join("");
		};
	})();
	h =
		"tryit-" +
		f +
		"-" +
		l(
			useragent +
			l(useragent + l(useragent + f + "x"))
		);
	return h;
};