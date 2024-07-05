import { Component, PropsWithChildren } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { AtButton } from 'taro-ui';
import './index.less'


@inject('store')
@observer
class Home extends Component<PropsWithChildren> {
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  render () {
    return (
      <View className='Home'>
        <Text>{'Home'}</Text>
        <AtButton type='primary'>按钮文案</AtButton>
      </View>
    )
  }
}

export default Home;
