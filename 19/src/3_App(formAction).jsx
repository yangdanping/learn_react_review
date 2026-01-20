import { useActionState } from 'react';
import './App.css';
import { updateData } from './api';

// react19的form标签相当于内置了startTransition
const actionFn = async (preState, formData) => {
  console.log('actionFn第一个参数 上一次返回的值(第一次是useActionState中传入的初始值)', preState);
  console.log('actionFn第二个参数(使用react19的form传入时) 表单参数', formData.get('testName'));
  try {
    const name = formData.get('testName');
    const res = await updateData(name);
    return res.data.id; //返回的值会自动存到useActionState的state里面
  } catch (error) {
    return error.message; //返回的值会自动存到useActionState的state里面
  }
};

// useActionState 是一个可以根据某个表单动作的结果更新 state 的 Hook。
const FormContainer = () => {
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
      <form action={formAction}>
        <input name="testName" style={{ marginRight: '10px' }} />
        <button disabled={isPending} type="submit">
          提交
        </button>
      </form>
      {state && <h2>id: {state}</h2>}
      {/* {error && <p>{error}</p>} */}
    </div>
  );
};

export default FormContainer;
