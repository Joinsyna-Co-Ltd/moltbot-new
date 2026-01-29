# @d-fischer/typed-event-emitter

This module provides an alternative API to the well known event emitting
interfaces used in the browser (DOM) or node.js. Instead of accepting arbitrary
strings as the event name, this module forces you to register your events in
your class. Consequently, the style of binding and emitting events differs a
little, ensuring already at binding time that the events actually exist.

## Install

```bash
yarn add @d-fischer/typed-event-emitter
# or
npm install @d-fischer/typed-event-emitter
```

## Usage

```ts
import { EventEmitter } from '@d-fischer/typed-event-emitter';

class MyClass extends EventEmitter {
	// register an event
	onValueChanged = this.registerEvent<[newValue: number]>();

	private _value: number;

	constructor(value: number) {
		// initialize EventEmitter
		super();

		this._value = value;
	}

	get value() {
		return this._value;
	}

	set value(value: number) {
		this._value = value;
		// emit the event to all listeners
		this.emit(this.onValueChanged, this._value);
	}
}

const instance = new MyClass();

// listen to event
instance.onValueChanged(newValue => {
	console.log('Value changed', newValue);
});

// invoke setter
instance.value = 27;
```

First, the `EventEmitter` is loaded from the module. Any class that shall emit
events, must extend that `EventEmitter`. If your class has its own constructor,
make sure to call `super()`.

Any events your class shall be able to emit must be registered in the form:

```ts
onFooBar = this.registerEvent<[...argTypes]>();
```

Where `onFooBar` can be any name (it doesn't need to begin with *on*) and
`argTypes` must be a tuple representing the arguments of the function the
listeners must have. With this, you can see the signature your function must
have when you're about to bind a listener to that event.

To emit an event (only possible from within your event emitter), you have
to call `this.emit(this.onFooBar, ...)`, where `this.onFooBar` is the event to
emit and `...` any number of parameters, that will be passed to the listeners.

### Internal events

You can also declare internal events as well as internal listeners.
The main advantage over just using regular listeners appears when you
write a library for other people to use. If an end user decides to clear
all events using `instance.removeListener()` without any parameter
or with only the event binder to clear out a specific event,
internal listeners will survive that.

```ts
import { EventEmitter } from '@d-fischer/typed-event-emitter';

class MyClass extends EventEmitter {
	// register an event
	onValueChanged = this.registerEvent<[newValue: number]>();

	private _value: number;

	constructor(value: number) {
		// initialize EventEmitter
		super();

		this._value = value;
		
		this.addInternalListener(this.onValueChanged, newValue => {
			console.log('Value changed (internal)', newValue);
		});
	}

	get value() {
		return this._value;
	}

	set value(value: number) {
		this._value = value;
		// emit the event to all listeners
		this.emit(this.onValueChanged, this._value);
	}
}

const instance = new MyClass();

// listen to event
instance.onValueChanged(newValue => {
	console.log('Value changed (external)', newValue);
});

// invoke setter, shows internal & external logs
instance.value = 27;

// clear listeners for event
instance.removeListener(instance.onValueChanged);

// invoke setter, still shows internal log
instance.value = 42;
```

### JavaScript

Your JavaScript host (i.e., your browser, node.js, etc.) should support classes
and inheritance in order to work correctly. The code shown above can also be
written in JavaScript (node.js):

```js
const { EventEmitter } = require('@d-fischer/typed-event-emitter');

class MyClass extends EventEmitter {
	constructor(value) {
		// initialize EventEmitter
		super();

		/* newValue: number */
		this.onValueChanged = this.registerEvent();

		this._value = value;
	}

	get value() {
		return this._value;
	}

	set value(value) {
		this._value = value;
		this.emit(this.onValueChanged, this._value);
	}
}

let instance = new MyClass();
instance.onValueChanged(newValue => {
	console.log(`Value changed: ${newValue}`);
});

instance.value = 27;
```

Node that the events are registered explicitly within the constructor. Make sure
to initialize them *after* calling `super()`.
