"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("../helpers");
exports.formatFixtures = [
    {
        name: 'unix',
        output: helpers_1.prepareFixture("\n\t\t\tFilesystem     1K-blocks    Used Available Use% Mounted on\n\t\t\trootfs          15506408 1149728  13708188   8% /\n\t\t\t/dev/root       15506408 1149728  13708188   8% /\n\t\t\tdevtmpfs          447624       0    447624   0% /dev\n\t\t\ttmpfs              89548     208     89340   1% /run\n\t\t\ttmpfs               5120       0      5120   0% /run/lock\n\t\t\ttmpfs             179080       0    179080   0% /run/shm\n\t\t", '\t\t\t'),
        result: {
            parts: [{
                    free: '13.07 GB',
                    size: '14.79 GB',
                    place: '/',
                    mountOn: '/'
                },
                {
                    free: '13.07 GB',
                    size: '14.79 GB',
                    place: '/',
                    mountOn: '/'
                },
                {
                    free: '437.13 MB',
                    size: '437.13 MB',
                    place: '/dev',
                    mountOn: '/dev'
                },
                {
                    free: '87.25 MB',
                    size: '87.45 MB',
                    place: '/run',
                    mountOn: '/run'
                },
                {
                    free: '5.00 MB',
                    size: '5.00 MB',
                    place: '/run/lock',
                    mountOn: '/run/lock'
                },
                {
                    free: '174.88 MB',
                    size: '174.88 MB',
                    place: '/run/shm',
                    mountOn: '/run/shm'
                }
            ],
            total: {
                free: '13.07 GB',
                size: '14.79 GB'
            }
        }
    },
    {
        name: 'win32',
        output: helpers_1.prepareFixture("\n\t\t\tCaption  FreeSpace    Size\n\t\t\tC:       22377099264  53580132352\n\t\t\tD:       0            58601472\n\t\t", '\t\t\t'),
        result: {
            parts: [{
                    free: '20.84 GB',
                    size: '49.90 GB',
                    place: 'C:',
                    letter: 'C:'
                },
                {
                    free: '0.00 Bytes',
                    size: '55.89 MB',
                    place: 'D:',
                    letter: 'D:'
                }
            ],
            total: {
                free: '20.84 GB',
                size: '49.95 GB'
            }
        }
    },
    {
        name: 'win32',
        output: helpers_1.prepareFixture("\n\t\t\tCaption  FreeSpace     Size          VolumeName\n\t\t\tC:       497654161408  539028877312  System\n\t\t", '\t\t\t'),
        result: {
            parts: [{
                    free: '20.84 GB',
                    size: '49.90 GB',
                    place: 'C:',
                    letter: 'C:'
                }
            ],
            total: {
                free: '20.84 GB',
                size: '49.95 GB'
            }
        }
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Rlc3RzL2ZpeHR1cmVzL2Zvcm1hdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHNDQUEwQztBQUU3QixRQUFBLGNBQWMsR0FBYztJQUN4QztRQUNDLElBQUksRUFBRSxNQUFNO1FBQ1osTUFBTSxFQUFFLHdCQUFjLENBQUMscWJBUXRCLEVBQUUsUUFBUSxDQUFDO1FBQ1osTUFBTSxFQUFFO1lBQ1AsS0FBSyxFQUFFLENBQUM7b0JBQ04sSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLElBQUksRUFBRSxVQUFVO29CQUNoQixLQUFLLEVBQUUsR0FBRztvQkFDVixPQUFPLEVBQUUsR0FBRztpQkFDWjtnQkFDRDtvQkFDQyxJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLEtBQUssRUFBRSxHQUFHO29CQUNWLE9BQU8sRUFBRSxHQUFHO2lCQUNaO2dCQUNEO29CQUNDLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsV0FBVztvQkFDakIsS0FBSyxFQUFFLE1BQU07b0JBQ2IsT0FBTyxFQUFFLE1BQU07aUJBQ2Y7Z0JBQ0Q7b0JBQ0MsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLElBQUksRUFBRSxVQUFVO29CQUNoQixLQUFLLEVBQUUsTUFBTTtvQkFDYixPQUFPLEVBQUUsTUFBTTtpQkFDZjtnQkFDRDtvQkFDQyxJQUFJLEVBQUUsU0FBUztvQkFDZixJQUFJLEVBQUUsU0FBUztvQkFDZixLQUFLLEVBQUUsV0FBVztvQkFDbEIsT0FBTyxFQUFFLFdBQVc7aUJBQ3BCO2dCQUNEO29CQUNDLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsV0FBVztvQkFDakIsS0FBSyxFQUFFLFVBQVU7b0JBQ2pCLE9BQU8sRUFBRSxVQUFVO2lCQUNuQjthQUNEO1lBQ0QsS0FBSyxFQUFFO2dCQUNOLElBQUksRUFBRSxVQUFVO2dCQUNoQixJQUFJLEVBQUUsVUFBVTthQUNoQjtTQUNEO0tBQ0Q7SUFFRDtRQUNDLElBQUksRUFBRSxPQUFPO1FBQ2IsTUFBTSxFQUFFLHdCQUFjLENBQUMseUhBSXRCLEVBQUUsUUFBUSxDQUFDO1FBQ1osTUFBTSxFQUFFO1lBQ1AsS0FBSyxFQUFFLENBQUM7b0JBQ04sSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLElBQUksRUFBRSxVQUFVO29CQUNoQixLQUFLLEVBQUUsSUFBSTtvQkFDWCxNQUFNLEVBQUUsSUFBSTtpQkFDWjtnQkFDRDtvQkFDQyxJQUFJLEVBQUUsWUFBWTtvQkFDbEIsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLEtBQUssRUFBRSxJQUFJO29CQUNYLE1BQU0sRUFBRSxJQUFJO2lCQUNaO2FBQ0Q7WUFDRCxLQUFLLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLElBQUksRUFBRSxVQUFVO2FBQ2hCO1NBQ0Q7S0FDRDtJQUVEO1FBQ0MsSUFBSSxFQUFFLE9BQU87UUFDYixNQUFNLEVBQUUsd0JBQWMsQ0FBQyxrSEFHdEIsRUFBRSxRQUFRLENBQUM7UUFDWixNQUFNLEVBQUU7WUFDUCxLQUFLLEVBQUUsQ0FBQztvQkFDTixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLEtBQUssRUFBRSxJQUFJO29CQUNYLE1BQU0sRUFBRSxJQUFJO2lCQUNaO2FBQ0Q7WUFDRCxLQUFLLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLElBQUksRUFBRSxVQUFVO2FBQ2hCO1NBQ0Q7S0FDRDtDQUNELENBQUMifQ==