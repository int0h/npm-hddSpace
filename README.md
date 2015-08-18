# hdd-space

This module provides getting information about free space and size of hdds

Instalation:

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
//win32:
{ 
	parts: [ 
        	{ letter: 'C:', free: 1286230016, size: 34359734272 },
     		{ letter: 'D:', free: 1865216000, size: 50925137920 },
     		{ letter: 'F:', free: 77553082368, size: 990202818560 } 
   	],
  	total: { size: 1075487690752, free: 80704528384 } 
}	

//linux:

{
	parts:[
       { mountOn: '/', free: 14037176320, size: 15878561792 },
       { mountOn: '/', free: 14037176320, size: 15878561792 },
       { mountOn: '/dev', free: 458366976, size: 458366976 },
       { mountOn: '/run', free: 91484160, size: 91697152 },
       { mountOn: '/run/lock', free: 5242880, size: 5242880 },
       { mountOn: '/run/shm', free: 183377920, size: 183377920 } 
   	],
    total: { size: 15878561792, free: 14037176320 } 
}


```

This module works via parsing output of console comand in both OS. It may be dirty, but it works :)