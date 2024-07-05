
import { globalStore, dictsStore } from "../store";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export const // 接口参数替换
    replaceMatch = (url: string, match: {[x: string]: any; hasOwnProperty: (arg0: string) => any}) => {
        let resultUrl = url;
        for (const key in match) {
            if (match.hasOwnProperty(key)) {
                const item = match[key];
                resultUrl = resultUrl.replace(`:${key}`, item);
            }
        }
        return resultUrl;
    },
    // 根据指定时区和时间 返回时间戳
    formateGetTime = (timeZoneId: any, date: string | number | dayjs.Dayjs | Date | null | undefined) => {
        const timeZoneCode = getDictsStr("timezones", timeZoneId, {
            labelKey: "code",
        });
        return dayjs.tz(date, timeZoneCode).valueOf();
    },
    // 根据指定时区和时间戳 返回相应时区的时间
    formateGetDate = (timeZoneId: never, date: number, type = "ymdhm") => {
        const types = {
            "y-m-d": "YYYY-MM-DD",
            ymd: "YYYY/MM/DD",
            "y-m-dhm": "YYYY-MM-DD HH:mm",
            ymdhm: "YYYY/MM/DD HH:mm",
            hm: "HH:mm",
        } as any;
        if (timeZoneId && date) {
            const timeZoneCode = getDictsStr("timezones", timeZoneId, {
                labelKey: "code",
            });
            const targetDate = dayjs.tz(date * 1000, timeZoneCode);
            return targetDate.locale("en").tz(timeZoneCode).format(types[type]);
        } else {
            return 0;
        }
    },
    // 格式化时间
    formateDate = (value: string | number | Date, type: string, obj?: {} | undefined) => {
        const {days, month, diffDay} = obj || ({} as any);
        if (!value) return undefined;
        const val = new Date(value);
        const types = {
            ms: dayjs(val).valueOf(),
            s: dayjs(val).second(),
            m: dayjs(val, "mm"),
            h: dayjs(val, "HH"),
            d: dayjs(val).date(),
            month: dayjs(val).month() + 1,
            year: dayjs(val).year(),
            ds: dayjs(val).startOf("day"),
            lmds: dayjs(val).add(-1, "month").startOf("day"), //上个月当天的时间
            de: dayjs(val).endOf("day").unix(),
            ym: dayjs(val).format("YYYY/MM"),
            ymd: dayjs(val).format("YYYY/MM/DD"),
            ymdhm: dayjs(val).format("YYYY/MM/DD HH:mm"),
            ymdhms: dayjs(val).format("YYYY/MM/DD HH:mm:ss"),
            hm: dayjs(val).format("HH:mm"),
            monthsymd: dayjs(val).add(month, "month").format("YYYY/MM/DD"),
            monthsymdhm: dayjs(val).add(month, "month").format("YYYY/MM/DD HH:mm"),
            daysymd: dayjs(val).add(days, "days").format("YYYY/MM/DD"),
            days: dayjs(val).add(days, "days").format("YYYY/MM/DD HH:mm"),
            daysms: dayjs(val).add(days, "days"),
            daysNum: dayjs(val).diff(diffDay, "day"),
        } as any;
        return types[type] || types.ms;
    },
    // 本地时区的时间合并，不用传时区
    localDateRange = ({dates = [], type = ""} = {}) => {
        let str: (string | null| undefined) =  null;
        const start = dates[0],
            end = dates[1];
        if (start && end) {
            const startDate = formateDate(start * 1000, "ymd"),
                endDate = formateDate(end * 1000, "ymd"),
                startAt = formateDate(start * 1000, "ymdhm"),
                endAt = formateDate(end * 1000, "ymdhm"),
                endHM = formateDate(end * 1000, "hm"),
                timeZoneCode = dayjs.tz.guess(),
                timeZoneStr = timeZoneCode ? ` (${timeZoneCode})` : "";

            if (type === "ymd") {
                str = `${startDate} - ${endDate}${timeZoneStr}`;
            } else if (startDate === endDate) {
                str = `${startAt}-${endHM}${timeZoneStr}`;
            } else {
                str = `${startAt} ~ ${endAt}${timeZoneStr}`;
            }
        } else {
            str = undefined;
        }
        return str;
    },
    // 特定时区的时间合并，需要传时区
    dateRange = ({dates = [], type = "", timeZoneId = null, hideTimeZone = false} = {}) => {
        let str: any = null;
        const start = dates[0],
            end = dates[1];
        if (start && end && timeZoneId) {
            const startDate = formateGetDate(timeZoneId, start, "ymd"),
                endDate = formateGetDate(timeZoneId, end, "ymd"),
                startAt = formateGetDate(timeZoneId, start),
                endAt = formateGetDate(timeZoneId, end),
                endHM = formateGetDate(timeZoneId, end, "hm"),
                timeZoneCode = getDictsStr("timezones", timeZoneId, {
                    labelKey: "code",
                }),
                timeZoneStr = timeZoneCode && !hideTimeZone ? ` (${timeZoneCode})` : "";
            if (type === "ymd") {
                str = `${startDate} - ${endDate}${timeZoneStr}`;
            } else if (startDate === endDate) {
                str = `${startAt}-${endHM}${timeZoneStr}`;
            } else {
                str = `${startAt} ~ ${endAt}${timeZoneStr}`;
            }
        } else if (start && timeZoneId) {
            const types = {
                ymd: formateGetDate(timeZoneId, start, "ymd"),
                hm: formateGetDate(timeZoneId, start, "hm"),
            } as any;
            str = types[type] || formateGetDate(timeZoneId, start);
        } else {
            str = undefined;
        }
        return str;
    },
    // 特定时区的时间合并，需要传时区
    newDateRange = ({dates = [], type = "", timeZoneId = null, hideTimeZone = false} = {}) => {
        let str: any = null;
        const start = dates[0],
            end = dates[1];
        if (start && end && timeZoneId) {
            const startDate = formateGetDate(timeZoneId, start, "ymd"),
                endDate = formateGetDate(timeZoneId, end, "ymd"),
                startAt = formateGetDate(timeZoneId, start, "y-m-dhm"),
                endAt = formateGetDate(timeZoneId, end),
                endHM = formateGetDate(timeZoneId, end, "hm"),
                timeZoneCode = getDictsStr("timezones", timeZoneId, {
                    labelKey: "code",
                }),
                timeZoneStr = timeZoneCode && !hideTimeZone ? ` (${timeZoneCode})` : "";
                
            if (type === "ymd") {
                str = `${startDate} - ${endDate}${timeZoneStr}`;
            } else if (startDate === endDate) {
                str = `${startAt}-${endHM}`;
            } else {
                str = `${startAt} ~ ${endAt}${timeZoneStr}`;
            }
        } else if (start && timeZoneId) {
            const types = {
                ymd: formateGetDate(timeZoneId, start, "ymd"),
                hm: formateGetDate(timeZoneId, start, "hm"),
            } as any;
            str = types[type] || formateGetDate(timeZoneId, start);
        } else {
            str = undefined;
        }
        return str;
    },
    // 获取路由参数
    getQueryString = (locationSearch: string, name: string) => {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = locationSearch?.substr(1)?.match(reg);
        if (r !== null) return decodeURI(r[2]);
        return undefined;
    },
    getLocationUrl = () => {
        const {origin, href} = window.location;
        const hrefArr = href.split(origin);
        return hrefArr[1];
    },
    getText = (o = {} as any, k: string | number, params: any) => {
        return typeof o[k] === "function" ? o[k](params) : o[k];
    },
    deepGet = (object: any, path: string | any[], defaultValue?: undefined) => {
        return (
            (!Array.isArray(path) ? path.replace(/\[/g, ".").replace(/\]/g, "").split(".") : path).reduce((o, k) => getText(o, k, defaultValue), object) || defaultValue
        );
    },
    isZh = () => {
        return globalStore.language === "zh-CN";
    },
    getLabelName = (item: any, labelKey?: string | undefined) => {
        let str = "";
        if (labelKey) {
            str = (isZh() ? item?.[`sc_${labelKey}`] || item?.[`tc_${labelKey}`] : item?.[`en_${labelKey}`]) || item?.[labelKey];
        } else {
            str = (isZh() ? item?.sc_name || item?.tc_name : item?.en_name) || item?.name || undefined;
        }
        return str;
    },
    getDict = (code: any, obj?: {}) => {
        let {filters, filterKey} = obj || ({} as any);
        filterKey = filterKey || "id";
        const enums = deepGet(dictsStore, code) || deepGet(dictsStore, ["dicts", code]) || [];
        const filterEnums = filters?.map((key: any) => enums.find((item: any) => item[filterKey] === key)).filter((i: any) => i);
        return Array.isArray(filters) ? filterEnums : enums;
    },
    getDictsStr = (code: any, id: any, {labelKey = "", idKey = "", separator = "", dataKey = ""} = {}) => {
        const joinStr = separator || (isZh() ? "，" : ", ");
        const enums = deepGet(dictsStore, ["dicts", code]) || [];
        const ids = (id !== null && id !== undefined && (Array.isArray(id) ? id : [id])) || [];
        let strArr = [] as any;
        for (let n = 0; n < ids.length; n++) {
            const idItem = ids[n];
            let item = enums?.find((item: {[x: string]: any; id: any}) => `${idKey ? item[idKey] : item.id}` === `${idItem}`);
            item = dataKey ? deepGet(item, dataKey) : item;
            strArr.push(getLabelName(item, labelKey));
        }
        return strArr.join(joinStr) || undefined;
    },
    getDictsObj = (code: any, id: any, {idKey = "", dataKey = ""} = {}) => {
        const enums = deepGet(dictsStore, ["dicts", code]) || [];
        const ids = (id !== null && id !== undefined && (Array.isArray(id) ? id : [id])) || [];
        let objArr = [] as any;
        for (let n = 0, len = ids.length; n < len; n++) {
            const idItem = ids[n];
            let item = enums?.find((item: any) => `${idKey ? item[idKey] : item.id}` === `${idItem}`);
            item = dataKey ? deepGet(item, dataKey) : item;
            item && objArr.push(item);
        }
        return objArr || [];
    },
    getAddressStr = (location: {regionsData?: any; address?: any}, last: undefined) => {
        const separator = isZh() ? "-" : ", ";
        const {regionsData = {}, address} = location || {},
            countryName = getLabelName(regionsData),
            stateName = getLabelName(regionsData?.child),
            cityName = getLabelName(regionsData?.child?.child),
            countryStr = countryName ? `${separator}${countryName}` : "",
            sname = stateName ? `${separator}${stateName}` : "",
            cname = cityName ? `${separator}${cityName}` : "",
            addressStr = address ? `${separator}${address}` : "";
        const lastStr = cityName || stateName || countryName;
        const str = isZh() ? `${countryStr}${sname}${cname}${addressStr}` : `${addressStr}${cname}${sname}${countryStr}`;
        return (last && lastStr) || str?.slice(1) || undefined;
    },
    delSession = (name: string, newName: string) => {
        if (name && newName) {
            for (const key in sessionStorage) {
                if (sessionStorage.hasOwnProperty(key)) {
                    if (key?.indexOf(name) !== -1 && key !== newName) {
                        sessionStorage.removeItem(key);
                    }
                }
            }
        }
    },
    //将base64转换为blob
    dataURLtoBlob = (dataurl: string) => {
        var arr = dataurl?.split(",") as any[],
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = window.atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
    },
    //将blob转换为file
    blobToFile = (base64Url: any) => {
        const blob = dataURLtoBlob(base64Url);
        const fileName = new Date().getTime() + ".jpeg"; //随机文件名
        // @ts-ignore
        blob.lastModifiedDate = new Date();
        // @ts-ignore
        blob.name = fileName;
        return blob;
    },
    //blod转文件并下载
    downloadFileByBlob = (blob: Blob | MediaSource, fileName = "file") => {
        let blobUrl = window.URL.createObjectURL(blob);
        let link = document.createElement("a");
        link.download = fileName || "defaultName";
        link.style.display = "none";
        link.href = blobUrl;
        // 触发点击
        document.body.appendChild(link);
        link.click();
        // 移除
        document.body.removeChild(link);
    },
    formatNumber = (num: any) => {
        const number = (num && Number(num)) || 0;
        const unit = 10000;
        return number > unit ? `${(number / unit).toFixed(1)}W+` : number;
    },
    // 判断链接是否完整
    checkFullUrl = (url: string) => {
        const reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&amp;:/~+#]*[\w\-@?^=%&amp;/~+#])?/;
        return reg.test(url);
    },
    // 音视频转写时长
    transTime = (value: number) => {
        if (!value) return "00:00";
        var time = "";
        // @ts-ignore
        var h = parseInt(value / 3600);
        value %= 3600;
        // @ts-ignore
        var m = parseInt(value / 60);
        // @ts-ignore
        var s = parseInt(value % 60);
        if (h > 0) {
            time = formatTime(h + ":" + m + ":" + s);
        } else {
            time = formatTime(m + ":" + s);
        }

        return time;
    },
    // 格式化时间显示，补零对齐 形如 h:m:s 的字符串
    formatTime = (value: string) => {
        var time = "";
        var s = value.split(":");
        var i = 0;
        for (; i < s.length - 1; i++) {
            time += s[i].length === 1 ? "0" + s[i] : s[i];
            time += ":";
        }
        time += s[i].length === 1 ? "0" + s[i] : s[i];

        return time;
    },
    // markdown 转为html
    markdownToHtml = (text: any, style: any) => {
        const showdown = require("showdown")
        //html中添加style
        const bindings = Object.keys(style)?.map(key => ({
            type:'output',
            regex: new RegExp(`<${key}(.*)>`,'g'),
            replace:`<${key} style="${style[key]}" $1>`
        }));
        const conv = new showdown.Converter({
            extensions:[...bindings]
        });
        // The original number of Spaces can be retained
        conv.setOption('disableForced4SpacesIndentedSublists', true);
        const html = conv.makeHtml(text);
        return html;
    };
    // ts 文件中显示html;