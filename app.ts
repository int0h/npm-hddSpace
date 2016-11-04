var hddSpace = require('hdd-space');
hddSpace({
    format: (s: number) => s.toLocaleString()
}, function(info: any){
    console.log(info);
});