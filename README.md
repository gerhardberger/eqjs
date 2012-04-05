<h1>Eq.js</h1>

Eq.js is a JavaScript module, that let you do simple, deep and custom equalisations.

<h3>Simple</h3>

``` js
	eq(4, 4, 4) // true

	eq('foo', 123, true, 'bar') // false

	eq([1,2,3], [2,3,4], [3,4,5]) // false

	eq({
		force: 'light'
		, name: 'Luke Skywalker'
	}, {
		force: 'light'
		, name: 'Luke Skywalker'
	})
	// true
```

You can use `eq.arr()` and `eq.obj()` too for arrays and objects.

<h3>Deep</h3>

``` js
	eq({
		name: 'Name'
		, friends: ['A', 'B', 'C']
		, school: {
			name: 'School'
			, teachers: ['X', 'Y', 'Z']
		}
	}, {
		name: 'Name'
		, friends: ['A', 'B', 'C']
		, school: {
			name: 'School'
			, teachers: ['X', 'Y', 'Z']
		}
	})
	// true
```

<h3>Custom</h3>

You can create custom equalisation to compare things as you want. `this` contains the `eq` object.

``` js
	eq.add('student', function(a,b) {
		var eq = this
		return eq(a.name, b.name) && eq(a.friends, b.friends)
	})

	eq.student({
		name: 'Name'
		, friends: ['A', 'B', 'C']
		, school: {
			name: 'School'
			, teachers: ['X', 'Y', 'Z']
		}
	}, {
		name: 'Name'
		, friends: ['A', 'B', 'C']
		, school: {
			name: 'School'
			, teachers: ['X', 'Y', 'Z']
		}
	}, {
		name: 'Name'
		, friends: ['D', 'E', 'F']
		, school: {
			name: 'School'
			, teachers: ['X', 'Y', 'Z']
		}
	})
	// false
```