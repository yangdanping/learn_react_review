import { useRef, forwardRef, useEffect, useEffectEvent, useState } from 'react';
import './App.css';

// 通常来说,若想在父组件中操作子组件里面的某个元素对象,则用传递ref的方式来操作
const App = () => {
  const inputRef = useRef();
  const [color, setColor] = useState('#ccc');
  const focusInput = () => {
    console.log(inputRef.current);
    inputRef.current.focus();
    setColor('green');
  };

  return (
    <div>
      <h1>react 19</h1>
      <MyInput ref={inputRef} color={color} />
      <button onClick={focusInput}>聚焦输入框</button>
    </div>
  );
};

// react18以及以前,组件props是不能直接传入ref的,而19以后支持了
const MyInput = (props) => {
  const [value, setValue] = useState('');
  // useEffectEvent(() => {
  //   console.log('外界传入props----------', props.color);
  // });
  useEffect(() => {
    value && console.log('用户输入----------', value);
  }, [value]);

  return (
    <div>
      <h1>我是子组件</h1>
      <input ref={props.ref} value={value} onChange={(e) => setValue(e.target.value)} type="text" className="my-input" style={{ color: props.color }} />
    </div>
  );
};

// 要使用forwardRef来传递ref
// const MyInput = forwardRef((props, ref) => {
//   return (
//     <div>
//       <h1>我是子组件</h1>
//       <input type="text" ref={ref} />
//     </div>
//   );
// });
export default App;
