!function (name, definition) {
	if (typeof module != 'undefined') module.exports = definition()
	else if (typeof define == 'function' && define.amd) define(name, definition)
	else this[name] = definition()
}('eq', function() {
	var toArr = Array.prototype.slice

	function zipWith(){var a=Array.prototype.slice.call(arguments),l=_.initial(a),f=_.last(a);return _.map(_.zip.apply(this,l),function(x){return f.apply(this,x)});}

	function checkArgs(l,fn) {
		var as_ = toArr.call(l)
		as = _.filter(as_, function(e){if (_[fn](e)) return e})

		if ((as_.length > as.length) || (as.length == 1)) return null
		else return as
	}


	baseEq_ = function (a,b) {
		if (_.isArray(a) && _.isArray(b))	return arrayEq_(a,b)

		if ((_.isFunction(a) && _.isFunction(b)) || (_.isDate(a) && _.isDate(b)) || (_.isRegExp(a) && _.isRegExp(b)))
			return a.toString() == b.toString()

		if (_.isObject(a) && _.isObject(b))	return objectEq([a,b])

		else return a == b
	}
	function baseEq () {
		var a = toArr.call(arguments)
			, i = 0
			, f
		if (a.length>2 && _.isFunction(_.last(a))) {
			f = _.last(a)
			a = _.initial(a)
		}
		else f = baseEq_
		if (a.length == 1) a = a[0]

		while (i<a.length-1 && f.call(eq,a[i], a[i+1])) i++
		return i == a.length-1
	}

	function arrayEq_ (a,b) {
		return _.reduce(zipWith(a,b,function(x,y) { return baseEq(x,y) }), function(b,a){return b == a}, true)
	}
	function arrayEq (l) {
		if (l.length == 2) return arrayEq_(l[0],l[1])

		if (!arrayEq_(l[0],l[1])) return false
			
		return arrayEq(_.rest(l))
	}

	function objectEq_ (ks,as) {
		if (_.isEmpty(ks)) return true
		return baseEq(_.map(as, function(a) {return a[_.first(ks)]})) ? objectEq_(_.rest(ks),as) : false
	}
	function objectEq (as) {
		var ks = _.map(as, function(l) {
			return _.sortBy(_.keys(l),function(e){return e})
		})

		if (!arrayEq(ks)) return false	// If the keys are already not matching returns false

		return objectEq_(_.first(ks), as)
	}



	function eq () {
		var as = toArr.call(arguments)
		if (_.isEmpty(as)) return true

		if (_.isArray(_.first(as))) return eq.arr.apply(this,as)
		if (_.isObject(_.first(as))) return eq.obj.apply(this,as)
		return baseEq(as)
	}

	eq.constructor.prototype.arr = function() {
		var as = checkArgs(arguments, 'isArray')
		if (as == null) return false

		return arrayEq(as)
	}

	eq.constructor.prototype.obj = function() {
		var as = checkArgs(arguments, 'isObject')
		if (as == null) return false

		return objectEq(as)
	}

	eq.constructor.prototype.add = function(n,f) {
		eq.constructor.prototype[n] = function() {
			var as = toArr.call(arguments)
			if (_.isEmpty(as)) return true

			var i = 0
			as.push(f)
			
			while (i<as.length-1 && baseEq.apply(null,as)) i++
			return i == as.length-1
		}
	}

	return eq
})