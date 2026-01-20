import { useState, useActionState, startTransition } from 'react';
import './App.css';
import { updateData } from './api';

const actionFn = async (preState, name) => {
  console.log('actionFn第一个参数 上一次返回的值(第一次是useActionState中传入的初始值)', preState);
  console.log('actionFn第二个参数 传给formAction的参数', name);
  try {
    const res = await updateData(name);
    return res.data.id; //返回的值会自动存到useActionState的state里面
  } catch (error) {
    return error.message; //返回的值会自动存到useActionState的state里面
  }
};

// useActionState 是一个可以根据某个表单动作的结果更新 state 的 Hook。
const FormContainer = () => {
  const [name, setName] = useState('');
  const [state, formAction, isPending] = useActionState(actionFn, 8888888888888);

  // const handleSubmit = async () => {
  //   // react19的startTransition支持异步函数,isPending不用我们手动管理了
  //   // 使用一部过渡的函数被称为actions，如下
  //   // 总结好处：1. 不需要手动管理isPending，即加载状态了 2. startTransition本身使用就不会阻塞UI渲染
  //   startTransition(async () => {
  //     try {
  //       const res = await updateData(name);
  //       setId(res.data.id);
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //   });
  //   // setIsPending(true);
  //   // try {
  //   //   const res = await updateData(name);
  //   //   setId(res.data.id);
  //   // } catch (error) {
  //   //   setError(error.message);
  //   // } finally {
  //   //   setIsPending(false);
  //   // }
  // };

  return (
    <div>
      <h1>react 19</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} style={{ marginRight: '10px' }} />
      <button onClick={() => startTransition(() => formAction(name))} disabled={isPending}>
        提交
      </button>
      <h2>名字: {name}</h2>
      {state && <h2>id: {state}</h2>}
      {/* {error && <p>{error}</p>} */}
    </div>
  );
};

export default FormContainer;
