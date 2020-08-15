import * as utils from '@/share/utils'
import { dataKy } from './config'
const ghCDN = require('github-to-cdn')

export const dataURL = ghCDN({
  username: 'd1y',
  repo: 'yoxi_data',
  path: 'results/SoundsSettings.json',
  branch: 'master'
})

export const createURL = (path: string)=> {
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