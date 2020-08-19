import * as utils from '@/share/utils'
import { dataKy } from './config'
const ghCDN = require('github-to-cdn')

export let dataURL = ghCDN({
  username: 'd1y',
  repo: 'yoxi_data',
  path: 'results/SoundsSettings.json',
  branch: 'master'
})

try {
  if (utils.checkDesktop()) {
    dataURL = `/results/SoundsSettings.json`
  }
} catch (error) {
  throw new Error(error)
}

export const createURL = (path: string)=> {
  const flag = utils.checkDesktop()
  if (flag) return `/results/${ path }`
  return ghCDN({
    username: 'd1y',
    repo: 'yoxi_data',
    path: `results/${ path }`,
    branch: 'master'
  })
}

export const getData = ()=> {
  const data = utils.getData(dataKy)
  return data
}

export const setData = (value: any)=> {
  utils.setData(dataKy, value)
}