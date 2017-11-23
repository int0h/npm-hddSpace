"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("../helpers");
exports.win32Fixtures = [
    {
        name: 'windows 7',
        output: helpers_1.prepareFixture("\n\t\t\tCaption  FreeSpace\tSize\n\t\t\tC:\t   1286164480   34359734272\n\t\t\tD:\t   1864638464   50925137920\n\t\t\tE:\n\t\t\tF:\t   77553082368  990202818560\n\t\t\tG:\n\t\t\tL:\n\t\t", '\t\t\t'),
        result: {
            parts: [
                {
                    place: 'C:',
                    letter: 'C:',
                    free: 1286164480,
                    size: 34359734272
                },
                {
                    place: 'D:',
                    letter: 'D:',
                    free: 1864638464,
                    size: 50925137920
                },
                {
                    place: 'F:',
                    letter: 'F:',
                    free: 77553082368,
                    size: 990202818560
                }
            ],
            total: {
                size: 1075487690752,
                free: 80703885312
            }
        }
    },
    {
        name: 'windows xp',
        output: helpers_1.prepareFixture("\n\t\t\tCaption  FreeSpace     Size\n\t\t\tC:       627703808     10725732352\n\t\t\tD:       0             699783168\n\t\t\tE:       25851797504   107496861696\n\t\t\tF:       834660716544  2000396742656\n\t\t", '\t\t\t'),
        result: {
            parts: [
                {
                    place: 'C:',
                    letter: 'C:',
                    free: 627703808,
                    size: 10725732352
                },
                {
                    place: 'D:',
                    letter: 'D:',
                    free: 0,
                    size: 699783168
                },
                {
                    place: 'E:',
                    letter: 'E:',
                    free: 25851797504,
                    size: 107496861696
                },
                {
                    place: 'F:',
                    letter: 'F:',
                    free: 834660716544,
                    size: 2000396742656
                }
            ],
            total: {
                size: 2119319119872,
                free: 861140217856
            }
        }
    },
    {
        name: 'windows server 2008',
        output: helpers_1.prepareFixture("\n\t\t\tCaption  FreeSpace    Size\n\t\t\tC:       22377099264  53580132352\n\t\t\tD:       0            58601472\n\t\t", '\t\t\t'),
        result: {
            parts: [
                {
                    place: 'C:',
                    letter: 'C:',
                    free: 22377099264,
                    size: 53580132352
                },
                {
                    place: 'D:',
                    letter: 'D:',
                    free: 0,
                    size: 58601472
                }
            ],
            total: {
                size: 58601472 + 53580132352,
                free: 22377099264
            }
        }
    },
    {
        name: 'windows 8',
        output: helpers_1.prepareFixture("\n\t\t\tCaption  FreeSpace     Size\n\t\t\tC:       498562174976  539028877312\n\t\t\tD:       0             59494400\n\t\t", '\t\t\t'),
        result: {
            parts: [
                {
                    place: 'C:',
                    letter: 'C:',
                    free: 498562174976,
                    size: 539028877312
                },
                {
                    place: 'D:',
                    letter: 'D:',
                    free: 0,
                    size: 59494400
                }
            ],
            total: {
                size: 59494400 + 539028877312,
                free: 498562174976
            }
        }
    },
    {
        name: 'windows 10',
        output: helpers_1.prepareFixture("\n\t\t\tCaption  FreeSpace     Size\n\t\t\tC:       159345410048  171204145152\n\t\t\tD:       0             4001759232\n\t\t", '\t\t\t'),
        result: {
            parts: [
                {
                    place: 'C:',
                    letter: 'C:',
                    free: 159345410048,
                    size: 171204145152
                },
                {
                    place: 'D:',
                    letter: 'D:',
                    free: 0,
                    size: 4001759232
                }
            ],
            total: {
                size: 171204145152 + 4001759232,
                free: 159345410048
            }
        }
    },
    {
        name: 'labels',
        output: helpers_1.prepareFixture("\n\t\t\tCaption  FreeSpace     Size          VolumeName\n\t\t\tC:       497654161408  539028877312  System\n\t\t", '\t\t\t'),
        result: {
            parts: [
                {
                    place: 'C:',
                    letter: 'C:',
                    free: 497654161408,
                    size: 539028877312,
                    label: 'System'
                }
            ],
            total: {
                size: 539028877312,
                free: 497654161408
            }
        }
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luMzIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdHMvZml4dHVyZXMvd2luMzIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzQ0FBMEM7QUFFN0IsUUFBQSxhQUFhLEdBQWM7SUFDdkM7UUFDQyxJQUFJLEVBQUUsV0FBVztRQUNqQixNQUFNLEVBQUUsd0JBQWMsQ0FBQyw0TEFRdEIsRUFBRSxRQUFRLENBQUM7UUFDWixNQUFNLEVBQUU7WUFDUCxLQUFLLEVBQUU7Z0JBQ047b0JBQ0MsS0FBSyxFQUFFLElBQUk7b0JBQ1gsTUFBTSxFQUFFLElBQUk7b0JBQ1osSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLElBQUksRUFBRSxXQUFXO2lCQUNqQjtnQkFDRDtvQkFDQyxLQUFLLEVBQUUsSUFBSTtvQkFDWCxNQUFNLEVBQUUsSUFBSTtvQkFDWixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLFdBQVc7aUJBQ2pCO2dCQUNEO29CQUNDLEtBQUssRUFBRSxJQUFJO29CQUNYLE1BQU0sRUFBRSxJQUFJO29CQUNaLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsWUFBWTtpQkFDbEI7YUFDRDtZQUNELEtBQUssRUFBRTtnQkFDTixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsSUFBSSxFQUFFLFdBQVc7YUFDakI7U0FDRDtLQUNEO0lBRUQ7UUFDQyxJQUFJLEVBQUUsWUFBWTtRQUNsQixNQUFNLEVBQUUsd0JBQWMsQ0FBQyxvTkFNdEIsRUFBRSxRQUFRLENBQUM7UUFDWixNQUFNLEVBQUU7WUFDUCxLQUFLLEVBQUU7Z0JBQ047b0JBQ0MsS0FBSyxFQUFFLElBQUk7b0JBQ1gsTUFBTSxFQUFFLElBQUk7b0JBQ1osSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLFdBQVc7aUJBQ2pCO2dCQUNEO29CQUNDLEtBQUssRUFBRSxJQUFJO29CQUNYLE1BQU0sRUFBRSxJQUFJO29CQUNaLElBQUksRUFBRSxD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