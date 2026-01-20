import { useState, useTransition } from 'react';
import './App.css';
import { updateData } from './api';

const FormContainer = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [isPending, startTransition] = useTransition(); // useTransition主要处理的是计算密集型的工作，延迟的是由状态更新触发的渲染过程，不延迟状态更新本身(比如高亮等轻量型的UI更新)
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    // react19的startTransition支持异步函数,isPending不用我们手动管理了
    // 使用一部过渡的函数被称为actions，如下
    // 总结好处：1. 不需要手动管理isPending，即加载状态了 2. startTransition本身使用就不会阻塞UI渲染
    startTransition(async () => {
      try {
        const res = await updateData(name);
        setId(res.data.id);
      } catch (error) {
        setError(error.message);
      }
    });
    // setIsPending(true);
    // try {
    //   const res = await updateData(name);
    //   setId(res.data.id);
    // } catch (error) {
    //   setError(error.message);
    // } finally {
    //   setIsPending(false);
    // }
  };

  return (
    <div>
      <h1>react 19</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} style={{ marginRight: '10px' }} />
      <button onClick={handleSubmit} disabled={isPending}>
        {isPending ? '提交中...' : '提交'}
      </button>
      <h2>名字: {name}</h2>
      {id && <h2>id: {id}</h2>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default FormContainer;
