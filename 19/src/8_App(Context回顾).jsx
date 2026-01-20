import { useState, createContext, useContext, use } from 'react';
import './App.css';
// 一个ThemeContext的示例
// 使用useContext传入Context,来拿到父组件ThemeContext.Provider的value值
// react18必须ThemeContext.Provider,而19可直接用ThemeContext

// 也可以直接用use替换useContext,好处是可以加入if等判断逻辑
const ThemeContext = createContext('light');

const Child = () => {
  const [isShowTheme, setIsShowTheme] = useState(false);

  // const theme = isShowTheme ? useContext(ThemeContext) : 'light';
  const theme = isShowTheme ? use(ThemeContext) : '';
  console.log('ThemeContext----', theme);
  const style = {
    padding: '10px',
    backgroundColor: theme === 'dark' ? '#000' : '#fff',
    color: theme === 'dark' ? '#fff' : '#000'
  };
  return <div style={style}>子组件</div>;
};

const App = () => {
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeContext value={theme}>
      <Child />
    </ThemeContext>
  );
  // return (
  //   <div>
  //     <Child />
  //   </div>
  // );
};

export default App;
