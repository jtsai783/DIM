# DIM

![check out these guns](https://flsyqa-sn3301.files.1drv.com/y3mLGSbIFYAiy0u-F8oYYDtv4uvSLfSd7cA7XsQRWA8gv2hSD2yVoMo7ICDNMuBrtDSf8Fvw557UMNpDxGmilk80Z0FPiVXj-foGK3Z32z27KO5gjCCG-JnUHGkqNio5Zmmqu-_3jB188O16iBmACyLeeGTf0_7ZbBN2CUNUHDn81o?width=2560&height=1600&cropmode=none)

![dropdown menu](https://fluxhw-sn3301.files.1drv.com/y3mNfyayP0pASXAUxenf5GS32u92uhty4hY7-MZ8HaJVRoYvjsXSaIT-6Db13sL5ntILyrmMv4wwqzUbbqDky0XBVrFcS8Q19bl9wzmrYrfn4hP_gTmZQH6d4d2JAe9b69sZlwssSQwen3fFKCMb-VqARKEywlPnJGrwb0gYaD3UZ4?width=2560&height=1600&cropmode=none)

A destiny inventory manager written as both a tool for personal use an learning exercise. This is written as a chrome extension using Google's Polymer to sidestep the issue of user authentication.

Challnenges:

1. Bungie doesn't have an authentication protocol for 3rd party to use to consume its api.
2. Bungie changes its data fairly often, this thing breaks for every update essentially.
3. Extensions have some restrictions.

For #1, its conveniently sidestepped using the cookies bungie.net stores on the browser. This prevents the need for people to put in their username and password manually.

For #2, since the bulk of the data comes from a considerablly large manifest file from bungie that changes every time there's an update, it unfortunately has to be downloaded and updated manually within the extension. Since the use-case for this was as an extention, auto-updating would be taken care of by Google. Still, a solution far from perfect and a lesson in consuming finicky 3rd party API.

And lastly a build tool had to be used because extensions doesn't like in-line javascript, and some other misc. permissions needs to be set such as cookies.
