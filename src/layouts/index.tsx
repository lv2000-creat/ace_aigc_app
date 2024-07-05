import React, { useEffect, useState } from 'react';
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
// store
import { inject, observer } from 'mobx-react';
//组件
import { AtTabs, AtTabsPane } from 'taro-ui';
import { View } from '@tarojs/components'

dayjs.locale("en");

const Layouts = (props: any) => {

    // 初始化
    useEffect(() => {
        getData();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //获取用户信息/字典值
    const getData = async () => {
        // await userStore.getUserInfo();
        // await dictsStore.getDicts();
    }

    const tabList = [{ title: '标签页1' }, { title: '标签页2' }, { title: '标签页3' }]
    return (
        <>
            <AtTabs current={0} tabList={tabList} onClick={() => {}}>
                <AtTabsPane current={0} index={0} >
                123123
                </AtTabsPane>
                <AtTabsPane current={0} index={1}>
                    <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
                </AtTabsPane>
                <AtTabsPane current={0} index={2}>
                    <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
                </AtTabsPane>
            </AtTabs>
        </>
    )

}
export default observer(Layouts);