[![NPM version](https://img.shields.io/npm/v/win-guid.svg)](https://npmjs.org/package/win-guid)
[![Node.js CI](https://github.com/Borewit/win-guid/actions/workflows/nodejs-ci.yml/badge.svg)](https://github.com/Borewit/win-guid/actions/workflows/nodejs-ci.yml)
[![npm downloads](http://img.shields.io/npm/dm/win-guid.svg)](https://npmcharts.com/compare/win-guid?start=365)

# win-guid

Small, dependency-free utility for working with **Windows / CFBF GUIDs** in JavaScript and TypeScript.

It parses canonical GUID strings into the **Windows byte layout** used by COM, OLE, and Compound File Binary Format (CFBF), and converts them back to the standard string form when needed.

This is useful when dealing with Microsoft file formats such as `.asf`, `.doc,`, `.xls`, `.ppt`, structured storage,
or other binary formats that store GUIDs in little-endian Windows order.

For RFC9562 compliant UUIDs (network byte order), use [uuid](https://github.com/uuidjs/uuid) instead.

## Installation

```bash
npm install win-guid
```

## Usage

### Parse a GUID string

```js
import { parseWindowsGuid } from "win-guid";

const bytes = parseWindowsGuid("00020906-0000-0000-C000-000000000046");

// Uint8Array(16) in Windows / CFBF byte order
```

### Use the Guid helper class

```js
import { Guid } from "win-guid";

const guid = Guid.fromString("00020906-0000-0000-C000-000000000046");
```

## API

`parseWindowsGuid(guid: string): Uint8Array`

Parses a canonical GUID string:
```js
const bytes = parseWindowsGuid("00020906-0000-0000-C000-000000000046");
```

into a 16-byte Uint8Array using Windows / CFBF byte order.

- Input is validated strictly
- Case-insensitive
- Throws Error on invalid input

`class Guid`

Creates a GUID from a canonical GUID string.

```js
const guid = Guid.fromString("00020906-0000-0000-C000-000000000046");
```

`guid.toString(): string`

Converts the GUID back into the canonical string form.

- Always uppercase
- Round-trips cleanly with fromString

```js
guid.toString();
````
Outputs something like:
```
00020906-0000-0000-C000-000000000046`
```




## Licence

This project is licensed under the [MIT License](LICENSE.txt). Feel free to use, modify, and distribute as needed.
