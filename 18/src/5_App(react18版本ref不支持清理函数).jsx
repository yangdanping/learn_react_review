import { useState, useRef, useEffect } from 'react';
import './App.css';
// 下面是一个给元素动态绑定事件的案例
const App = () => {
  const [isShow, setIsShow] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      const handleClick = () => console.log('点击了div');

      divRef.current.addEventListener('click', handleClick);
      return () => {
        // 清理事件
        console.log('清理事件');
        divRef.current?.removeEventListener('click', handleClick);
      };
    }
  }, [isShow]);
  return (
    <div>
      <h1>react 18</h1>
      <button onClick={() => setIsShow(!isShow)}>点击</button>
      {isShow && <div ref={divRef}>123</div>}
    </div>
  );
};

export default App;
1;
