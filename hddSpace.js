var cmd = require('child_process').exec;

function getTotal(parts){
	return parts.reduce(function(total, part){			
		total.size += part.size;
		total.free += part.free;
		return total;
	}, {
		"size": 0,
		"free": 0
	});
};

function getLinuxInfo(callback){

	/*
		[df] output example:

		Filesystem     1K-blocks    Used Available Use% Mounted on
		rootfs          15506408 1149728  13708188   8% /
		/dev/root       15506408 1149728  13708188   8% /
		devtmpfs          447624       0    447624   0% /dev
		tmpfs              89548     208     89340   1% /run
		tmpfs               5120       0      5120   0% /run/lock
		tmpfs             179080       0    179080   0% /run/shm

	*/

	cmd('df', function(err, output){
		var resultObj = {};
		var rootPart;
		resultObj.parts = output
			.split('\n')
			.slice(1) // remove header
			.map(function(line){
				var partInfo = {};
				var lineParts = line.split(/[\s]+/g);
				partInfo.mountOn = lineParts[5];				
				partInfo.free = parseInt(lineParts[3]) * 1024; // 1k blocks
				partInfo.size = parseInt(lineParts[1]) * 1024; // 1k blocks
				if (
					Number.isNaN(partInfo.free) || 
					Number.isNaN(partInfo.size) 
				){
					return null;
				};
				if (partInfo.mountOn == '/'){
					rootPart = partInfo;
				};
				return partInfo;
			})
			.filter(function(part){
				return !!part;
			});
		resultObj.total = {
			"size": rootPart.size,
			"free": rootPart.free
		};
		callback(resultObj);
	}); 
};

function getWindowsInfo(callback){

	/*
		[wmic logicaldisk get size,freespace,caption] output example:

		Caption  FreeSpace    Size
		C:       1286164480   34359734272
		D:       1864638464   50925137920
		E:
		F:       77553082368  990202818560
		G:
		L:


	*/

	cmd('wmic logicaldisk get size,freespace,caption', function(err, output){
		var resultObj = {};
		resultObj.parts = output
			.split('\n')
			.slice(1) // remove header
			.map(function(line){
				var partInfo = {};
				var lineParts = line.split(/[\s]+/g);
				partInfo.letter = lineParts[0];
				partInfo.free = parseInt(lineParts[1]);
				partInfo.size = parseInt(lineParts[2]);
				if (
					Number.isNaN(partInfo.free) || 
					Number.isNaN(partInfo.size) ||
					partInfo.letter == ''
				){
					return null;
				};
				return partInfo;
			})
			.filter(function(part){
				return !!part;
			});
		resultObj.total = getTotal(resultObj.parts);		
		callback(resultObj);
	}); 
};

function getCrossPlatformInfo(callback){
	var osFuncTable = {
		"win32": getWindowsInfo,
		"linux": getLinuxInfo
	};
	var func = osFuncTable[process.platform];
	func(callback);
};

exports = module.exports = getCrossPlatformInfo;

