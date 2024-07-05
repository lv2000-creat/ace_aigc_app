/* 
 * taro toast封装
 */
import Taro from "@tarojs/taro";

class Toast {
    loading(title, mask = true){
        Taro.showLoading({
            title,
            mask,
        })
    }

    hideLoading(){
        Taro.hideLoading()
    }

    //toast错误
    error(errMsg: string){
        Taro.showToast({
            title: errMsg,
            mask: true,
            icon: "none",
            duration: 1500,
        });
    }

    success(msg: string){
        Taro.showToast({
            title: msg,
            mask: true,
            icon: "success",
            duration: 1200,
        });
    }

    show(title, mask = true, icon: 'none' | 'success' | 'loading' = 'none', duration = 1200 ){
        Taro.showToast({
            title,
            mask,
            duration,
            icon
          })
    }

    hide() {
        Taro.hideToast()
    }

}
export default Toast;