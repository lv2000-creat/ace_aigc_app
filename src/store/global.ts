import request from "../request";
import { action, observable, computed, makeObservable } from "mobx";

class GlobalStore {
    constructor() {
        makeObservable(this); //mbox 6后需要添加这个组件才会更新
    }

    @observable localLanguage = localStorage.getItem("language") || '';
    @observable loading = false;
    @observable navigate = null as any;
    // 弹窗
    @observable modalLoading = false;
    @observable modal = {} as any;
    // 抽屉
    @observable drawerLoading = false;
    @observable drawer = {} as any;
    // 自定义侧边栏
    @observable customSidebar = []
    //是否禁用键盘事件
    @observable disableKeyboard = false;

    // @ts-ignore
    @computed get language() {
        let resule = "zh-CN";
        const localLanguage = this.localLanguage && this.localLanguage !== "null" ? this.localLanguage : undefined;
        // @ts-ignore
        const browserLanguage = (navigator.language || navigator.userLanguage).match(/zh/) ? "zh-CN" : "en-US";
        resule = localLanguage || browserLanguage;
        return resule?.indexOf("zh") !== -1 ? "zh-CN" : "en-US";
    }
    // 切换语言
    @action changeLanguage = (value: any) => {
        if (value && value !== "null") {
            this.localLanguage = value;
            localStorage.setItem("language", this.localLanguage);
            this.setLanguage();
        }
    };
    // 设置语言
    @action setLanguage = () => {
        return request({
            api: "putSetLanguage",
            method: "put",
            host: "cms",
        });
    };
    // 打开弹窗禁止页面滚动
    @action disScroll(open: any) {
        const body = document.getElementById("backTop") as HTMLElement;
        if (open) {
            body.style.overflow = "hidden";
        } else {
            body.style.overflowY = "auto";
        }
    }
    // 关闭弹窗
    @action hideModal() {
        this.modalLoading = false;
        this.modal.open = false;
        setTimeout(() => {
            this.modal = {};
        }, 200);
    }
    // 关闭抽屉
    @action hideDrawer() {
        this.drawerLoading = false;
        this.drawer.open = false;
        setTimeout(() => {
            this.drawer = {};
        }, 200);
    }
}

const globalStore = new GlobalStore();
export default globalStore;