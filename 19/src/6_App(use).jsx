import { Suspense, use } from 'react';
import axios from 'axios';
import { mockUrl } from './constant/mockUrl';
const dataPromise = axios.get(mockUrl).then((res) => res.data);

// use 是一个 React API，它可以让你读取类似于 Promise 或 context 的资源的值。
const UseDemo = () => {
  const data = use(dataPromise); //可以读取到promise resolve的值
  return <div>{JSON.stringify(data)}</div>;
};
const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UseDemo />
    </Suspense>
  );
};

export default App;
