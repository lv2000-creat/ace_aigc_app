import { Component, PropsWithChildren } from 'react'
import { Provider } from 'mobx-react'

import * as Store from "./store";

import './index.less';

import 'taro-ui/dist/style/index.scss' // 需要手动引入ui组件样式,全局引入一次即可

class App extends Component<PropsWithChildren>  {
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  // this.props.children 就是要渲染的页面
  render () {
    return (
      <Provider store={Store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
