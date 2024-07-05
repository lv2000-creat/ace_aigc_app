let baseURL = "",
    ca3BaseURL = "",
    baseHostURL = "",
    cmsBaseURL = "",
    HOST =  "testing",
    base = {
        staging: "https://api.ca3staging.com",
        testing: "https://api.ca3test.com",
        canary: "https://api.ca3canary.com",
        prod: "https://api.acecamptech.com",
    } as any,
    ca3Base = {
        staging: "https://www.ca3staging.com",
        testing: "https://www.ca3test.com",
        canary: "https://www.ca3canary.com",
        prod: "https://www.acecamptech.com",
    } as any,
    baseHost = {
        staging: "https://hola.ca3staging.com",
        testing: "https://hola.ca3test.com",
        canary: "https://hola.ca3canary.com",
        prod: "https://hola.acecamptech.com",
    } as any,
    cmsBase = {
        staging: 'https://cms.ca3staging.com',
        testing: 'https://cms.ca3test.com',
        canary: 'https://cms.ca3canary.com',
        prod: 'https://cms.acecamptech.com',
    } as any;
    baseURL = base[HOST];
    ca3BaseURL = ca3Base[HOST];
    baseHostURL = baseHost[HOST];
    cmsBaseURL = cmsBase[HOST];
export {baseURL, ca3BaseURL, baseHostURL, cmsBaseURL, HOST};
