import { useFormStatus } from 'react-dom';
import './App.css';

// useFormStatus是一个提供上次表单提交状态信息的 Hook,专门给form元素用的
// 子组件通过这个hook,可以直接拿到最近form父组件的表单提交状态
const ChildSubmitButton = ({ submitProp }) => {
  const { pending, data, method, action } = useFormStatus();
  console.log('useFormStatus pending', pending);
  console.log('useFormStatus data', data?.get(submitProp));
  // console.log('useFormStatus method', method);
  // console.log('useFormStatus action', action);

  // 通过利用 Hook 返回的诸如 pending 等属性的信息,实现表单提交时子项禁用 <button> 按钮的按压操作
  return (
    <button type="submit" disabled={pending}>
      {pending ? '提交中...' : '提交'}
    </button>
  );
};

const SubmitForm = () => {
  return (
    <form action={FormAction}>
      <input type="text" name="msg" />
      <ChildSubmitButton submitProp={'msg'} />
    </form>
  );
};

// 模拟表单提交的延迟
const FormAction = async () => {
  const delay = Math.floor(Math.random() * (500 - 300 + 1)) + 300;
  console.log(`delay:${delay}ms`);
  await new Promise((resolve) => setTimeout(resolve, delay));
};

export default SubmitForm;
