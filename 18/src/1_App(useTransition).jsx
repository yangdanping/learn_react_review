import { useState, memo, useTransition } from 'react';
import './App.css';

// 模拟单个组件（如ArticleContent）渲染，影响整个组件渲染的案例
const TabContainer = () => {
  const [tab, setTab] = useState('home'); // home about article
  // isPending: 是否正在过渡，startTransition: 启动一个过渡函数，认为是低优先级的操作在这个函数里去写
  const [isPending, startTransition] = useTransition(); // useTransition主要处理的是计算密集型的工作，延迟的是由状态更新触发的渲染过程，不延迟状态更新本身(比如高亮等轻量型的UI更新)

  const selectTab = (nextTab) => {
    // 由于用户是在点击切换选项卡时导致卡顿，为了不让切换影响整个页面的卡顿，所以这里将setTab放入startTransition
    startTransition(() => {
      setTab(nextTab); // 标记为低优先级操作
    });
    // setTab(nextTab);
  };

  return (
    <div>
      <div>
        <TabButton isActive={tab === 'home'} onClick={() => selectTab('home')}>
          Home
        </TabButton>
        <TabButton isActive={tab === 'about'} onClick={() => selectTab('about')}>
          About
        </TabButton>
        <TabButton isActive={tab === 'article'} onClick={() => selectTab('article')}>
          {isPending ? 'Loading...' : 'Article'}
        </TabButton>
      </div>
      <div>
        {tab === 'home' && <HomeContent />}
        {tab === 'about' && <AboutContent />}
        {tab === 'article' && <ArticleContent />}
      </div>
    </div>
  );
};

// 按钮组件------------------------------------------------------
const TabButton = ({ children, isActive, onClick }) => {
  const buttonStyle = {
    backgroundColor: isActive ? '#ddd' : '#fff',
    border: isActive ? '2px solid #61c0f7' : 'none',
    padding: '8px 16px',
    margin: '0 4px',
    cursor: 'pointer',
    color: '#000'
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

// 内容组件------------------------------------------------------
const HomeContent = () => {
  return (
    <div>
      <h1>Home内容</h1>
    </div>
  );
};
const AboutContent = () => {
  return (
    <div>
      <h1>About内容</h1>
    </div>
  );
};
// 使用memo，防止ArticleContent组件重复渲染
const ArticleContent = memo(() => {
  const slowItems = Array.from({ length: 100 }, (_, i) => <SlowArt key={i} index={i} />);
  return <ul>{slowItems}</ul>;
});
// const ArticleContent = () => {
//   const slowItems = Array.from({ length: 100 }, (_, i) => <SlowArt key={i} index={i} />);
//   return <ul>{slowItems}</ul>;
// };

// 模拟单个文章内容有10毫秒延迟
const SlowArt = () => {
  let startTime = performance.now();
  while (performance.now() - startTime < 10) {
    // do nothing
  }
  return <li>我是文章内容:</li>;
};

export default TabContainer;
