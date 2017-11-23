"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("../helpers");
exports.unixFixtures = [
    {
        name: 'bananian',
        output: helpers_1.prepareFixture("\n\t\t\tFilesystem     1K-blocks    Used Available Use% Mounted on\n\t\t\trootfs          15506408 1149728  13708188   8% /\n\t\t\t/dev/root       15506408 1149728  13708188   8% /\n\t\t\tdevtmpfs          447624       0    447624   0% /dev\n\t\t\ttmpfs              89548     208     89340   1% /run\n\t\t\ttmpfs               5120       0      5120   0% /run/lock\n\t\t\ttmpfs             179080       0    179080   0% /run/shm\n\t\t", '\t\t\t'),
        result: {
            parts: [
                {
                    size: 15878561792,
                    free: 14037184512,
                    place: '/',
                    mountOn: '/'
                },
                {
                    size: 15878561792,
                    free: 14037184512,
                    place: '/',
                    mountOn: '/'
                },
                {
                    size: 458366976,
                    free: 458366976,
                    place: '/dev',
                    mountOn: '/dev'
                },
                {
                    size: 91697152,
                    free: 91484160,
                    place: '/run',
                    mountOn: '/run'
                },
                {
                    size: 5242880,
                    free: 5242880,
                    place: '/run/lock',
                    mountOn: '/run/lock'
                },
                {
                    size: 183377920,
                    free: 183377920,
                    place: '/run/shm',
                    mountOn: '/run/shm'
                }
            ],
            total: {
                size: 15878561792,
                free: 14037184512
            }
        }
    },
    {
        name: 'ubuntu: russian locale',
        output: helpers_1.prepareFixture("\n\t\t\t\u0424\u0430\u0439\u043B.\u0441\u0438\u0441\u0442\u0435\u043C\u0430   1024-\u0431\u043B\u043E\u043A\u043E\u0432 \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u043E \u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u0412\u043C\u0435\u0441\u0442\u0438\u043C\u043E\u0441\u0442\u044C C\u043C\u043E\u043D\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u0432\n\t\t\tudev               2485944            0  2485944          0% /dev\n\t\t\ttmpfs               507804        60492   447312         12% /run\n\t\t\t/dev/sda1         71631200     48091380 19878048         71% /\n\t\t\ttmpfs              2539016         1616  2537400          1% /dev/shm\n\t\t\ttmpfs                 5120            4     5116          1% /run/lock\n\t\t\ttmpfs              2539016            0  2539016          0% /sys/fs/cgroup\n\t\t\t/dev/sdc         240234168    188729228 39278628         83% /media/Downloads\n\t\t\t/dev/sdb         307535312    227899592 63990776         79% /media/Video\n\t\t\tcgmfs                  100            0      100          0% /run/cgmanager/fs\n\t\t\ttmpfs               507804            0   507804          0% /run/user/1000\n\t\t\ttmpfs               507804           40   507764          1% /run/user/1001\n\t\t", '\t\t\t'),
        result: {
            parts: [
                {
                    size: 2545606656,
                    free: 2545606656,
                    place: '/dev',
                    mountOn: '/dev'
                },
                {
                    size: 519991296,
                    free: 458047488,
                    place: '/run',
                    mountOn: '/run'
                },
                {
                    size: 73350348800,
                    free: 20355121152,
                    place: '/',
                    mountOn: '/'
                },
                {
                    size: 2599952384,
                    free: 2598297600,
                    place: '/dev/shm',
                    mountOn: '/dev/shm'
                },
                {
                    size: 5242880,
                    free: 5238784,
                    place: '/run/lock',
                    mountOn: '/run/lock'
                },
                {
                    size: 2599952384,
                    free: 2599952384,
                    place: '/sys/fs/cgroup',
                    mountOn: '/sys/fs/cgroup'
                },
                {
                    size: 245999788032,
                    free: 40221315072,
                    place: '/media/Downloads',
                    mountOn: '/media/Downloads'
                },
                {
                    size: 314916159488,
                    free: 65526554624,
                    place: '/media/Video',
                    mountOn: '/media/Video'
                },
                {
                    size: 102400,
                    free: 102400,
                    place: '/run/cgmanager/fs',
                    mountOn: '/run/cgmanager/fs'
                },
                {
                    size: 519991296,
                    free: 519991296,
                    place: '/run/user/1000',
                    mountOn: '/run/user/1000'
                },
                {
                    size: 519991296,
                    free: 519950336,
                    place: '/run/user/1001',
                    mountOn: '/run/user/1001'
                }
            ],
            total: {
                size: 73350348800,
                free: 20355121152
            }
        }
    },
    {
        name: 'macos',
        output: helpers_1.prepareFixture("\n\t\t\tFilesystem    1024-blocks     Used Available Capacity  Mounted on\n\t\t\t/dev/disk0s2    145961032 20678788 125026244    15%    /\n\t\t\tdevfs                 178      178         0   100%    /dev\n\t\t\tmap -hosts              0        0         0   100%    /net\n\t\t\tmap auto_home           0        0         0   100%    /home\n\t\t", '\t\t\t'),
        result: {
            parts: [
                {
                    size: 149464096768,
                    free: 128026873856,
                    place: '/',
                    mountOn: '/'
                },
                {
                    size: 182272,
                    free: 0,
                    place: '/dev',
                    mountOn: '/dev'
                },
                {
                    size: 0,
                    free: 0,
                    place: '/net',
                    mountOn: '/net'
                },
                {
                    size: 0,
                    free: 0,
                    place: '/home',
                    mountOn: '/home'
                }
            ],
            total: {
                size: 149464096768,
                free: 128026873856
            }
        }
    },
    {
        name: 'ubuntu',
        output: helpers_1.prepareFixture("\n\t\t\tFilesystem     1024-blocks    Used Available Capacity Mounted on\n\t\t\tudev                446816       0    446816       0% /dev\n\t\t\ttmpfs                89884   10756     79128      12% /run\n\t\t\t/dev/mmcblk0p1    15379328 2843308  12350496      19% /\n\t\t\ttmpfs               449408      88    449320       1% /dev/shm\n\t\t\ttmpfs                 5120       4      5116       1% /run/lock\n\t\t\ttmpfs               449408       0    449408       0% /sys/fs/cgroup\n\t\t\ttmpfs               449408       8    449400       1% /tmp\n\t\t\tlog2ram              51200    6324     44876      13% /var/log\n\t\t\ttmpfs                89884       8     89876       1% /run/user/1000\n\t\t", '\t\t\t'),
        result: {
            parts: [
                {
                    size: 457539584,
                    free: 457539584,
                    place: '/dev',
                    mountOn: '/dev'
                },
                {
                    size: 92041216,
                    free: 81027072,
                    place: '/run',
                    mountOn: '/run'
                },
                {
                    size: 15748431872,
                    free: 12646907904,
                    place: '/',
                    mountOn: '/'
                },
                {
                    size: 460193792,
                    free: 460103680,
                    place: '/dev/shm',
                    mountOn: '/dev/shm'
                },
                {
                    size: 5242880,
                    free: 5238784,
                    place: '/run/lock',
                    mountOn: '/run/lock'
                },
                {
                    size: 460193792,
                    free: 460193792,
                    place: '/sys/fs/cgroup',
                    mountOn: '/sys/fs/cgroup'
                },
                {
                    size: 460193792,
                    free: 460185600,
                    place: '/tmp',
                    mountOn: '/tmp'
                },
                {
                    size: 52428800,
                    free: 45953024,
                    place: '/var/log',
                    mountOn: '/var/log'
                },
                {
                    size: 92041216,
                    free: 92033024,
                    place: '/run/user/1000',
                    mountOn: '/run/user/1000'
                }
            ],
            total: {
                size: 15748431872,
                free: 12646907904
            }
        }
    },
    {
        name: 'ubuntu',
        output: helpers_1.prepareFixture("\n\t\t\tFilesystem     1024-blocks       Used Available Capacity Mounted on\n\t\t\tudev               1013224          0   1013224       0% /dev\n\t\t\ttmpfs               204872       5036    199836       3% /run\n\t\t\t/dev/sda1        139967416   20720196 112114244      16% /\n\t\t\ttmpfs              1024356         80   1024276       1% /dev/shm\n\t\t\ttmpfs                 5120          4      5116       1% /run/lock\n\t\t\ttmpfs              1024356          0   1024356       0% /sys/fs/cgroup\n\t\t\tcgmfs                  100          0       100       0% /run/cgmanager/fs\n\t\t\tnone            1953512444 1138175980 815336464      59% /media/sf_SharedTB\n\t\t\ttmpfs               204872         48    204824       1% /run/user/1000\n\t\t", '\t\t\t'),
        result: {
            parts: [
                {
                    size: 1037541376,
                    free: 1037541376,
                    place: '/dev',
                    mountOn: '/dev'
                },
                {
                    size: 209788928,
                    free: 204632064,
                    place: '/run',
                    mountOn: '/run'
                },
                {
                    size: 143326633984,
                    free: 114804985856,
                    place: '/',
                    mountOn: '/'
                },
                {
                    size: 1048940544,
                    free: 1048858624,
                    place: '/dev/shm',
                    mountOn: '/dev/shm'
                },
                {
                    size: 5242880,
                    free: 5238784,
                    place: '/run/lock',
                    mountOn: '/run/lock'
                },
                {
                    size: 1048940544,
                    free: 1048940544,
                    place: '/sys/fs/cgroup',
                    mountOn: '/sys/fs/cgroup'
                },
                {
                    size: 102400,
                    free: 102400,
                    place: '/run/cgmanager/fs',
                    mountOn: '/run/cgmanager/fs'
                },
                {
                    size: 2000396742656,
                    free: 834904539136,
                    place: '/media/sf_SharedTB',
                    mountOn: '/media/sf_SharedTB'
                },
                {
                    size: 209788928,
                    free: 209739776,
                    place: '/run/user/1000',
                    mountOn: '/run/user/1000'
                }
            ],
            total: {
                size: 143326633984,
                free: 114804985856
            }
        }
    },
    {
        name: 'debian: russian locale',
        output: helpers_1.prepareFixture("\n\t\t\t\u0424\u0430\u0439\u043B\u043E\u0432\u0430\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430 1024-\u0431\u043B\u043E\u043A\u043E\u0432 \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u043E \u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u0412\u043C\u0435\u0441\u0442\u0438\u043C\u043E\u0441\u0442\u044C C\u043C\u043E\u043D\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u0432\n\t\t\t/dev/sda1          110386008      4867332 99888316          5% /\n\t\t\tudev                   10240            0    10240          0% /dev\n\t\t\ttmpfs                 204876         4908   199968          3% /run\n\t\t\ttmpfs                 512188          160   512028          1% /dev/shm\n\t\t\ttmpfs                   5120            4     5116          1% /run/lock\n\t\t\ttmpfs                 512188            0   512188          0% /sys/fs/cgroup\n\t\t\ttmpfs                 102440            8   102432          1% /run/user/117\n\t\t\ttmpfs                 102440           12   102428          1% /run/user/1000\n\t\t\t/dev/sr0               58100        58100        0        100% /media/cdrom0\n\t\t", '\t\t\t'),
        result: {
            parts: [
                {
                    size: 113035272192,
                    free: 102285635584,
                    place: '/',
                    mountOn: '/'
                },
                {
                    size: 10485760,
                    free: 10485760,
                    place: '/dev',
                    mountOn: '/dev'
                },
                {
                    size: 209793024,
                    free: 204767232,
                    place: '/run',
                    mountOn: '/run'
                },
                {
                    size: 524480512,
                    free: 524316672,
                    place: '/dev/shm',
                    mountOn: '/dev/shm'
                },
                {
                    size: 5242880,
                    free: 5238784,
                    place: '/run/lock',
                    mountOn: '/run/lock'
                },
                {
                    size: 524480512,
                    free: 524480512,
                    place: '/sys/fs/cgroup',
                    mountOn: '/sys/fs/cgroup'
                },
                {
                    size: 104898560,
                    free: 104890368,
                    place: '/run/user/117',
                    mountOn: '/run/user/117'
                },
                {
                    size: 104898560,
                    free: 104886272,
                    place: '/run/user/1000',
                    mountOn: '/run/user/1000'
                },
                {
                    size: 59494400,
                    free: 0,
                    place: '/media/cdrom0',
                    mountOn: '/media/cdrom0'
                }
            ],
            total: {
                size: 113035272192,
                free: 102285635584
            }
        }
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5peC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0cy9maXh0dXJlcy91bml4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0NBQTBDO0FBRTdCLFFBQUEsWUFBWSxHQUFjO0lBQ3RDO1FBQ0MsSUFBSSxFQUFFLFVBQVU7UUFDaEIsTUFBTSxFQUFFLHdCQUFjLENBQUMscWJBUXRCLEVBQUUsUUFBUSxDQUFDO1FBQ1osTUFBTSxFQUFFO1lBQ1AsS0FBSyxFQUFFO2dCQUNOO29CQUNDLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsV0FBVztvQkFDakIsS0FBSyxFQUFFLEdBQUc7b0JBQ1YsT0FBTyxFQUFFLEdBQUc7aUJBQ1o7Z0JBQ0Q7b0JBQ0MsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxXQUFXO29CQUNqQixLQUFLLEVBQUUsR0FBRztvQkFDVixPQUFPLEVBQUUsR0FBRztpQkFDWjtnQkFDRDtvQkFDQyxJQUFJLEVBQUUsU0FBUztvQkFDZixJQUFJLEVBQUUsU0FBUztvQkFDZixLQUFLLEVBQUUsTUFBTTtvQkFDYixPQUFPLEVBQUUsTUFBTTtpQkFDZjtnQkFDRDtvQkFDQyxJQUFJLEVBQUUsUUFBUTtvQkFDZCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxLQUFLLEVBQUUsTUFBTTtvQkFDYixPQUFPLEVBQUUsTUFBTTtpQkFDZjtnQkFDRDtvQkFDQyxJQUFJLEVBQUUsT0FBTztvQkFDYixJQUFJLEVBQUUsT0FBTztvQkFDYixLQUFLLEVBQUUsV0FBVztvQkFDbEIsT0FBTyxFQUFFLFdBQVc7aUJBQ3BCO2dCQUNEO29CQUNDLElBQUksRUFBRSxTQUFTO29CQUNmLElBQUksRUFBRSxTQUFTO29CQUNmLEtBQUssRUFBRSxVQUFVO29CQUNqQixPQUFPLEVBQUUsVUFBVTtpQkFDbkI7YUFDRDtZQUNELEtBQUssRUFBRTtnQkFDTixJQUFJLEVBQUUsV0FBVztnQkFDakIsSUFBSSxFQUFF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