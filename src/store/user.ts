import request from "../request";
import { ca3BaseURL, baseHostURL } from "../request/apiUrl";
import {action, observable, computed, makeObservable} from "mobx";
import { globalStore } from ".";

class UserStore {
    constructor() {
        makeObservable(this); //mbox 6后需要添加这个组件才会更新
    }
    @observable userInfo = {} as any;
    @observable organizationUser = {} as any;
    // 组织类型
    // @ts-ignore
    @computed get orgTypeId() {
        const {organization} = this.organizationUser;
        const id = organization?.organization_type_id;
        return id;
    }
    
    //vip
    // @ts-ignore
    @computed get isVip() {
        const {has_vip} = this.userInfo;
        return has_vip;
    }
    @action getUserInfo() {
        return request({
            api: "getUserInfo",
            callback: (res:any) => {
                if (!res.code) {
                    this.userInfo = res;
                    this.organizationUser = this.userInfo?.organization_user || {};
                    globalStore.changeLanguage(this.userInfo.default_locale);
                    // const {ai_assistant} = this.organizationUser;
                    // if (!ai_assistant) {
                    //     window.location.replace(ca3BaseURL);
                    // }
                } else {
                    this.userInfo = {};
                    this.organizationUser = {};
                    this.logOut();
                }
            },
        });
    }
    @action postUserSignout = () => {
        request({
            api: "postSignOut",
            method: "post",
            host: "cms",
            callback: (res:any) => {
                if (!res.code) {
                    this.logOut();
                }
            },
        });
    };
    @action logOut = () =>{
        const {pathname, search, hash} = window.location;
        const redirectUri = encodeURIComponent(`${baseHostURL}${pathname}${search}${hash}`);
        this.userInfo = {};
        // 跳到登录页面
        window.location.replace(`${ca3BaseURL}/login?redirectUri=${redirectUri}`);
    }
}

const userStore = new UserStore();
export default userStore;
