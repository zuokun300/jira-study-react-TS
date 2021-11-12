// import { stat } from "fs";
import { useState } from "react";
import { stat } from "fs";

// 设定状态类型，四种状态分别是等待，加载中，错误，成功
export interface State<D>  {
  stat: string; // idle loading error success
  data: D | null;
  error: Error | null;
}

// 定义一个默认状态
const defaultState : State<null> = {
  stat: 'idle',
  data: null,
  error: null
}
const defaultConfig = {
  throwOnError: false
}

export const useAsync = <D>(initState?: State<D>, initConfig?: typeof defaultConfig) => {
  const config = {defaultConfig, ...initConfig}
  // 用户传入的状态优先，放在后面展开用于覆盖默认值，此处使用了useState钩子
  const [state, setState] = useState<State<D>>({
    ...defaultState,
    ...initState
  })

  const setData = (data: D) => {
    setState({
      stat: 'success',
      data: data,
      error: null
    })
  }

  const setError = (error: Error) => setState({
    stat: 'error',
    data: null,
    error
  })

  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then){
      throw new Error('请传入Promise类型')
    }
    setState({...state, stat: 'loading'})
    return promise.then(data => {
      setData(data)
      return data
    }).catch(error => {
      setError(error)
      if (config.throwOnError) return Promise.reject(error)
      return error
    })
  }

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    setData,
    setError,
    run,
    ...state
  }

}
