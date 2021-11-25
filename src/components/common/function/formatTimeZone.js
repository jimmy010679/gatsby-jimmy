/**
 *  DateTime to TimeZone
 * @param  {String} datetime    原始時間
 * @param  {String} zone        時區 Asia/Taipei
 * @param  {String} format      原始日期格式
 * @return {String}             TimeZone日期字串
 */

import { DateTime } from "luxon"

const FormatTimeZone = (datetime, zone, format = "yyyy-MM-dd HH:mm:ss") => {
  return DateTime.fromFormat(datetime, format, {
    zone: zone,
  }).toString()
}

export default FormatTimeZone
