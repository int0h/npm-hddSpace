var hddSpace = require('hdd-space');
hddSpace({format: 'auto'}, function(info: any){
    console.log(info);
});