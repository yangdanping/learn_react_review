import { useState, createContext, useContext } from 'react';
import './App.css';
// 一个ThemeContext的示例
// 使用useContext传入Context,来拿到父组件ThemeContext.Provider的value值
// react18必须ThemeContext.Provider,而19可直接用ThemeContext
const ThemeContext = createContext('light');

const Child = () => {
  const theme = useContext(ThemeContext);
  const style = {
    padding: '10px',
    backgroundColor: theme === 'dark' ? '#000' : '#fff',
    color: theme === 'dark' ? '#fff' : '#000'
  };
  return <div style={style}>子组件</div>;
};
const App = () => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={theme}>
      <Child />
    </ThemeContext.Provider>
  );
};

export default App;
