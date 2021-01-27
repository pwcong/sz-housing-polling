import dayjs from 'dayjs';
import axios from 'axios';

import config from '@/config';
import { IUser } from '@/store/modules/user';
import { IRank } from '@/store/modules/rank';

export function getKey() {
  return axios
    .request<string>(config.api.getRequest('bzflh/lhmcAction.do?method=getKey'))
    .then((res) => res.data);
}

export function getRank(key: string, user: IUser) {
  return new Promise<IRank>(async (resolve, reject) => {
    try {
      // @ts-ignore
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(key);

      const rank = await axios
        .request<{
          rows: Array<any>;
        }>(
          config.api.postRequest('bzflh/lhmcAction.do?method=queryLhmcInfo1', {
            pageNumber: 1,
            pageSize: 10,
            waitTpye: user.type,
            bahzh: encrypt.encrypt(user.beian),
            xingm: encrypt.encrypt(encodeURIComponent(user.name)),
            sfz: encrypt.encrypt(user.id),
          })
        )
        .then((res) => {
          return ((res.data || {}).rows || [])[0];
        });

      if (!rank) {
        reject();
        return;
      }

      const { PAIX, AREA_PAIX } = rank;

      resolve({
        area: AREA_PAIX,
        city: PAIX,
        beian: user.beian,
        datetime: dayjs().valueOf(),
      });
    } catch (err) {
      reject(err);
    }
  });
}
