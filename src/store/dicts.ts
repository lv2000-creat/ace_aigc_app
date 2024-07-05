import request from "../request";
import { delSession } from "../utils/tool";
import { action, computed, makeObservable, observable } from "mobx";

class DictsStore {
    constructor() {
        makeObservable(this); //mbox 6后需要添加这个组件才会更新
    }
    @observable getDictsData = {} as any;
    @observable getRegionsData = [];
    @observable enNumber = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
    @observable version = "1.1.2";
    @observable disabledIds = [] as any;
    @action getDicts() {
        const dictKey = `dicts${this.version}`;
        delSession("dicts", dictKey);
        const sessionDict = sessionStorage.getItem(dictKey);
        if (!sessionDict || sessionDict === "{}") {
            return request({
                api: "getDicts",
                host: "cms",
                callback: (res: any) => {
                    const data = (res.code && {}) || res;
                    this.getDictsData = data;
                    sessionStorage.setItem(dictKey, JSON.stringify(data));
                },
            });
        } else {
            this.getDictsData = JSON.parse(sessionDict) || {};
        }
    }
    @action getRegions() {
        const regionsKey = `regions${this.version}`;
        delSession("regions", regionsKey);
        if (!sessionStorage.getItem(regionsKey)) {
            return request({
                api: "getRegions",
                host: "cms",
                params: {
                    deep_size: 3,
                },
                callback: (res:any) => {
                    const data = (res.code && []) || res;
                    this.getRegionsData = data;
                    sessionStorage.setItem(regionsKey, JSON.stringify(data));
                },
            });
        } else {
            this.getRegionsData = JSON.parse(sessionStorage.getItem(regionsKey) || '') || [];
        }
    }
    @action getVisibleRangeGroup(showIds?: string | any[] | undefined) {
        const data:any[] = [];
        const orgTypes = this.getDictsData?.organization_types || [];
        for (let i = 0; i < orgTypes.length; i++) {
            const item = orgTypes[i];
            const {sc_type_name, tc_type_name, en_type_name} = item;
            const hasGroup = data.find((d, i) => d.label === item.type);
            if (showIds ? showIds?.indexOf(item.id) !== -1 : this.disabledIds?.indexOf(item.id) === -1) {
                if (hasGroup) {
                    hasGroup.value.push(item);
                } else {
                    data.push({label: item.type, sc_type_name, tc_type_name, en_type_name, value: [item]});
                }
            }
        }
        return data;
    }
    @action getStarRate() {
        const dataArr = [] as any;
        for (var i = 1; i < 6; i++) {
            let obj = {
                id: i,
                sc_name: `${i}星`,
                en_name: `${this.enNumber[i - 1]} ${i > 1 ? "stars" : "star"}`,
            };
            dataArr.push(obj);
        }
        return dataArr;
    }
    // @ts-ignore
    @computed get dicts() {
        return {
            ...this.getDictsData,
            regions: this.getRegionsData,
            yes_or_no: [
                {id: true, sc_name: "是", en_name: "Yes"},
                {id: false, sc_name: "否", en_name: "No"},
            ],
            star_rate: this.getStarRate(),
            months: [
                {id: "01", sc_name: "1月", en_name: "Jan"},
                {id: "02", sc_name: "2月", en_name: "Feb"},
                {id: "03", sc_name: "3月", en_name: "Mar"},
                {id: "04", sc_name: "4月", en_name: "Apr"},
                {id: "05", sc_name: "5月", en_name: "May"},
                {id: "06", sc_name: "6月", en_name: "Jun"},
                {id: "07", sc_name: "7月", en_name: "Jul"},
                {id: "08", sc_name: "8月", en_name: "Aug"},
                {id: "09", sc_name: "9月", en_name: "Sept"},
                {id: "10", sc_name: "10月", en_name: "Oct"},
                {id: "11", sc_name: "11月", en_name: "Nov"},
                {id: "12", sc_name: "12月", en_name: "Dec"},
            ],
            transcribes_source_types: [
                {id: "video", sc_name: "视频", en_name: "Video"},
                {id: "audio", sc_name: "音频", en_name: "Audio"},
                {id: "live", sc_name: "音频", en_name: "Audio"},
                {id: "hls", sc_name: "音频", en_name: "Audio"},
                {id: "text", sc_name: "文本", en_name: "Text"},
                {id: "txt", sc_name: "文本", en_name: "Text"},
            ],
            transcribes_text_source_types: [
                // {id: "file", sc_name: "Word文档", en_name: "Word document"},
                {id: "youdao", sc_name: "有道云笔记", en_name: "YoudaoNote"},
                {id: "wechat", sc_name: "微信公众号", en_name: "WeChat Official Account"},
                {id: "qqdoc", sc_name: "腾讯文档", en_name: "Tencent document"},
            ],
            audio_languages: [
                {id: "mix", sc_name: "中英文混合", en_name: "Chinese-English"},
                {id: "en", sc_name: "英文", en_name: "English"},
                {id: "cn_cantonese", sc_name: "粤语", en_name: "Cantonese"},
            ],
            output_type: [
                {id: "audio", sc_name: "MP3音频", en_name: "Audio"},
                {id: "video", sc_name: "MP4视频", en_name: "Video"},
            ],
            output_languages: [
                {id: "auto", sc_name: "自动", en_name: "Auto"},
                {id: "zh-CN", sc_name: "中文", en_name: "Chinese"},
                {id: "en", sc_name: "英文", en_name: "English"},
            ],
            av_translate_status: [
                {id: "pending", sc_name: "排队中", en_name: "Queuing", class: "status-text-gray", badge: "default"},
                {id: "running", sc_name: "转写中", en_name: "Transcribing", class: "status-text-gray", badge: "default"},
                {id: "finished", sc_name: "已转写", en_name: "Finished", class: "status-text-primary", badge: "success"},
                {id: "failed", sc_name: "转写失败", en_name: "Failed", class: "status-text-red", badge: "error"},
            ],
            task_recording_status: [
                {id: "pending", sc_name: "等待", en_name: "Wait", badge: "default"},
                {id: "recording", sc_name: "录制中...", en_name: "Recording...", badge: "processing"},
                {id: "record_stopped", sc_name: "已完成", en_name: "Finished", badge: "success"},
                {id: "record_failed", sc_name: "录制失败", en_name: "Failed", badge: "error"},
            ],
            task_recording_types: [
                {id: "autocall", sc_name: "电话会议", en_name: "Conference call"},
                {id: "manual", sc_name: "网络会议", en_name: "Web meeting"},
                {id: "manual-rtmp", sc_name: "网络会议", en_name: "Web meeting"},
                {id: "roadshow-playback", sc_name: "路演中", en_name: "RoadShow"},
                {id: "roadshow-scheduler", sc_name: "路演中", en_name: "RoadShow"},
                {id: "comin-playback", sc_name: "进门财经", en_name: "Comein"},
                {id: "comin-scheduler", sc_name: "进门财经", en_name: "Comein"},
            ],
            task_search_recording_types: [
                {id: "autocall", sc_name: "电话会议", en_name: "Conference call"},
                {id: "manual", sc_name: "网络会议", en_name: "Web meeting"},
                {id: "roadshow", sc_name: "路演中", en_name: "RoadShow"},
                {id: "comin", sc_name: "进门财经", en_name: "Comein"},
            ],
            account_status: [
                {id: "log_out", sc_name: "未登录", en_name: "Log Out", badge: "default"},
                {id: "log_in", sc_name: "已登录", en_name: "Logged In", badge: "success"},
                {id: "syncing", sc_name: "更新中", en_name: "Sync", badge: "warning"},
            ],
            third_accounts: [
                {id: "comin", sc_name: "进门财经", en_name: "Comein", href: "https://www.comein.cn/home/index"},
                {id: "roadshow", sc_name: "路演中", en_name: "RoadShow", href: "https://www.roadshowchina.cn/"},
            ],
            join_task_status: [
                {id: true, sc_name: "已加入录制任务", en_name: "Added task"},
                {id: false, sc_name: "未加入", en_name: "Not added"},
            ],
            tanslate_status: [
                {id: "pending", sc_name: "等待", en_name: "Wait", badge: "default"},
                {id: "running", sc_name: "翻译中...", en_name: "Translating ...", badge: "processing"},
                {id: "finished", sc_name: "已完成", en_name: "Finished", badge: "success"},
                {id: "failed", sc_name: "翻译失败", en_name: "Failed", class: "status-text-red", badge: "error"},
            ],
            translate_languages: [
                {id: "en", sc_name: "中文→英文", en_name: "Chinese→English"},
                {id: "zh-CN", sc_name: "英文→中文", en_name: "English→Chinese"},
            ],
            translate_types: [
                {id: "TrinityRewriteTranslate", sc_name: "AI翻译并润色", en_name: "AI translation and retouch"},
                {id: "TrinityTranslate", sc_name: "AI翻译", en_name: "AI translation"},
                {id: "GoogleTranslate", sc_name: "Google翻译", en_name: "Google translation"},
            ],
            notes_types: [
                {id: "original", sc_name: "文章", en_name: "Article", class: ""},
                {id: "minute", sc_name: "纪要", en_name: "Meeting Notes", class: "purple"},
            ],
            notes_source_types: [
                {id: false, sc_name: "原创", en_name: "Original", class: "blue"},
                {id: true, sc_name: "转载", en_name: "Repost", class: "dark-blue"},
            ],
            notes_language_types: [
                {id: "chinese", sc_name: "中文", en_name: "Chinese"},
                {id: "english", sc_name: "英文", en_name: "English"},
            ],
            payment_types: [
                {id: true, sc_name: "免费", en_name: "Free"},
                {id: false, sc_name: "收费 (A币)", en_name: "Charge (Points)"},
            ],
            other_prices: ["100", "125", "150", "175", "200", "250", "300"],
            visible_range_group: [
                ...this.getVisibleRangeGroup(),
                {label: "Others", sc_type_name: "其他", tc_type_name: "其他", en_type_name: "Others", value: [{id: 0, sc_name: "游客", en_name: "Visitors"}]},
            ],
            rewrite_show_content: [
                {id: 'original', sc_name: "原文", en_name: "Original"},
                {id: 'rewrite', sc_name: "改写", en_name: "Rewrite"},
                {id: 'both', sc_name: "原文和改写", en_name: "Both"},
            ],
            //通知内容
            announce_content:[
                {sc_name: "语音识别现在可以区分不同讲话人，并支持修改。", en_name: "Our voice recognition now supports distinguishing between different speakers and allows for editing."},
                {sc_name: "新增 AI 改写功能，在保留要点的同时，对语音识别结果进行改写，使内容更专业流畅。", en_name: "We’ve added an AI rewriting feature that refines voice recognition results while retaining key points, making the content more professional and polished."},
            ],
            
        };
    }
}

const dictsStore = new DictsStore()

export default dictsStore;
