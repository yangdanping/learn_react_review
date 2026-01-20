import axios from 'axios';
import { mockUrl } from '../constant/mockUrl';

export const updateData = (name) => {
  return axios({
    method: 'post',
    url: mockUrl,
    data: { title: name }
  });
};
export const fakeApi = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 模拟请求有50%的成功率
      if (Math.random() > 0.5) {
        resolve('任务添加成功');
      } else {
        reject('任务添加失败');
      }
    }, 1000);
  });
};
