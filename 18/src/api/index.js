import axios from 'axios';

export const updateData = (name) => {
  return axios({
    method: 'post',
    url: 'http://jsonplaceholder.typicode.com/posts',
    data: { title: name }
  });
};
