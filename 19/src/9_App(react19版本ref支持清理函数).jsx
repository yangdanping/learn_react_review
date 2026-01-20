import { useState, useRef, useEffect } from 'react';
import './App.css';
// 下面是一个给元素动态绑定事件的案例
// react19支持在setRef的返回回调中添加清理事件,不需要之前写繁杂的useEffect了
const App = () => {
  const [isShow, setIsShow] = useState(false);

  const setRef = (ref) => {
    // 注意此时ref本身就是元素对象,不需要.current
    // console.log('setRef', ref);
    if (ref) {
      const handleClick = () => console.log('点击了div');
      ref.addEventListener('click', handleClick);
      // 给ref传入回调也属于react18之前的写法,但react19后支持清理函数,可直接返回一个函数,在组件卸载时执行
      return () => {
        // 清理事件
        console.log('清理事件');
        ref.removeEventListener('click', handleClick);
      };
    }
  };
  return (
    <div>
      <h1>react 19</h1>
      <button onClick={() => setIsShow(!isShow)}>点击{isShow ? '隐藏' : '显示'}元素</button>
      {isShow && <div ref={setRef}>123</div>}
    </div>
  );
};

export default App;
1;
