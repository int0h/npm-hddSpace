# hdd-space

This module provides getting information about free space and size of storage devices.
Values represent amount of bytes.

## Update [November 2016]:
- Added support of MacOS (and possibly some other unix-based OSs);
- Added options parameter (see below);
- Slightly changed the output format;
- Formated values (KB, MB, etc.);
- Translated to TypeScript (still fully usable from vanilla JS);


## Installation:

```
npm i hdd-space
```

Example of usage:

```javascript
var hddSpace = require('hdd-space');
hddSpace(function(info){
	console.log(info);
});
```

Output:
```js
//win32
{ parts: 
   [ { free: 1895112704, size: 34359734272, place: 'C:', letter: 'C:' },
     { free: 144044032, size: 50925137920, place: 'D:', letter: 'D:' },
     { free: 109913382912,
       size: 990202818560,
       place: 'F:',
       letter: 'F:' },
     { free: 1714561073152,
       size: 2000396742656,
       place: 'I:',
       letter: 'I:' },
     { free: 1173352448, size: 7819231232, place: 'J:', letter: 'J:' } ],
  total: { free: 1827686965248, size: 3083703664640 } }
```

- **mountOn** - place for unix OSs;
- **letter** - disk letter for win32;
- **place** - either *mountOn* or *letter* for any system;
- **free** - free space in bytes;
- **size** - size of a storage in bytes;

It's possible to pass option object as the first argument.
Now the only supported opion is **format** which can be one of the following (case insesetive):
- bit 
- byte
- kb - 2 ^ 10 bytes
- mb - 2 ^ 20 bytes
- gb - 2 ^ 30 bytes
- tb - 2 ^ 40 bytes
- pb - 2 ^ 50 bytes
- auto - messaure points will be selected automatically
- a **function** that take a number of bytes and return whatever you'd like;
- 
#### Custom format example
```js
var hddSpace = require('hdd-space');
hddSpace({
    format: function (s) { return s.toLocaleString(); }
}, function (info) {
    console.log(info);
});
```
Output:
```js
{ parts: 
   [ { free: '1,895,206,912',
       size: '34,359,734,272',
       place: 'C:',
       letter: 'C:' },
     { free: '144,277,504',
       size: '50,925,137,920',
       place: 'D:',
       letter: 'D:' },
     ...],
  total: { free: '1,827,687,292,928', size: '3,083,703,664,640' } }
```
#### Auto format example
```javascript
var hddSpace = require('hdd-space');
hddSpace({ format: 'auto' }, function (info) {
    console.log(info);
});
```

Output:

```js
//win32:
{ parts: 
   [ { free: '1.76 GB', size: '32.00 GB', place: 'C:', letter: 'C:' },
     { free: '147.07 MB', size: '47.43 GB', place: 'D:', letter: 'D:' },
     { free: '102.37 GB',
       size: '922.20 GB',
       place: 'F:',
       letter: 'F:' },
     { free: '1.56 TB', size: '1.82 TB', place: 'I:', letter: 'I:' },
     { free: '1.09 GB', size: '7.28 GB', place: 'J:', letter: 'J:' } 
	 ...],
  total: { free: '1.66 TB', size: '2.80 TB' } }


//linux:

{ parts: 
   [ { free: '981.19 MB',
       size: '981.19 MB',
       place: '/dev',
       mountOn: '/dev' },
     { free: '196.18 MB',
       size: '200.05 MB',
       place: '/run',
       mountOn: '/run' },
     { free: '44.25 GB', size: '55.76 GB', place: '/', mountOn: '/' },
     ...]
  total: { free: '44.25 GB', size: '55.76 GB' } }

// MacOS:

{ parts: 
   [ { free: '65.31 GB', size: '111.86 GB', place: '/', mountOn: '/' },
     { free: '0 Bytes',
       size: '184.00 KB',
       place: '/dev',
       mountOn: '/dev' },
     ...],
  total: { free: '65.31 GB', size: '111.86 GB' } }

```