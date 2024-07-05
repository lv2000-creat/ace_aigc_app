import axios from 'axios';
import { baseURL } from './apiUrl';
import path from './apiPath';
import { globalStore, userStore } from '../store'
import Toast from '../utils/toast';
import { replaceMatch } from "../utils/tool";


let needMsg = true;

// 创建axios实例
const service = axios.create({})

service.interceptors.response.use((response) => {
    const data = response.data
    if (response.status === 200 || response.status === 201) {
        if (data.ret) {
            return response
        }else{
            const code = response?.data?.code;
            needMsg !== false && code < 10000 && Toast.error(data.msg || "System error");
            return response;
        } 
    }
    return response
}, (error) => Promise.reject(error))

const ajax = (config:any) => {
    const {
        host,
        method = "get",
        loading,
        modalLoading,
        drawerLoading,
        api,
        match,
        params = {},
        data = {},
        callback,
        errorback,
        contentType,
        downLoad,
        msg,
        successmsg,
    } = config; 
    const apiVersion = 'v1'
    const isGet = method==='get' 
    needMsg = msg
    if (api && path.hasOwnProperty(api)) {
        const domains = {
            default: `${baseURL}/api/${apiVersion}`,
        } as any;
        const domain = domains[host] || domains.default 
        let url = `${domain}${path[api]}`;
        
		if (match) {
			url = replaceMatch(url, match);
        }
        
		if (loading) {
			globalStore.loading = loading;
        }

        if (modalLoading){
            globalStore.modalLoading = modalLoading;
        } 

        if (drawerLoading) {
            globalStore.drawerLoading = drawerLoading;
        } 
        const ack = (isGet && `${new Date().getTime()}`) || "";

		return service({
            method: method,
            url: url,
            params: {...params, ...(isGet && {ack})},
            headers: {
                ...((isGet || contentType) && {"Content-Type": contentType || "application/x-www-form-urlencoded; charset=utf-8"}),
                "Accept-Language": globalStore.language,
            },
            withCredentials: true,
            // processData: false,
            data: contentType ? data : {...data},
        })
            .then((res) => {
                const isSuccess = res.data.ret;
                const data = downLoad ? res : (isSuccess && res.data.data) || res.data;
                isSuccess && successmsg && Toast.success(successmsg);
                globalStore.loading = false;
                globalStore.modalLoading = false;
                globalStore.drawerLoading = false;
                if (downLoad || !ack || (ack && ack === res.data.meta.ack)) {
                    return callback(data, res.data.meta);
                }
            })
            .catch((error) => {
                globalStore.loading = false;
                globalStore.modalLoading = false;
                globalStore.drawerLoading = false;
                const status = error?.response?.status;
                // msg && message.error(msg);
                if (status === 401) {
                    // 返回 401 清除token信息并跳转到登录页面
                    userStore.logOut();
                } else if (status === 403) {
                    // You do not have permission to access
                } else if (status === 404) {
                }else{
                    status && Toast.error(`${status}, System error`);
                }
                return errorback && errorback(error);
            });
	}
}

export default ajax;