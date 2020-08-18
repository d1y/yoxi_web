import axios from 'axios';
import { dataURL, createURL } from './assets';
import { dataItem } from './face';

/**
 * 获取数据
 */
export const getData = async (): Promise<dataItem[]>=> {
  try {
    const res = await axios.get(dataURL)
    const { data } = res
    return data.map((item: any)=> {
      // 音量
      item['volume'] = 0.42
      item['sound_name'] = createURL(`${ item['sound_name'] }.mp3`)
      item['normal_icon'] = createURL(`${ item['normal_icon'] }@2x.png`)
      item['disabled_icon'] = createURL(`${ item['disabled_icon'] }@2x.png`)
      // 开关
      item['switch'] = false
      return item
    })
  } catch (error) {
    return []
  }
}