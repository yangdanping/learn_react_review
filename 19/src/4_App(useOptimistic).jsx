import { useState, useOptimistic, startTransition } from 'react';
import { fakeApi } from './api';

// 使用startTransition来包裹异步代码
// 里面先使用修改乐观预估值的方法(addOptimisticTasks)让我们的界面先更新,再进行请求,请求成功后再更新真实数据(若失败,则回滚乐观预估值),乐观值会和真实值同步
const TaskList = () => {
  const [tasks, setTasks] = useState([]); //待办事项列表
  const [optimisticTasks, addOptimisticTasks] = useOptimistic(tasks, (currentTask, newTask) => [...currentTask, newTask]); // 返回乐观预估的新值

  const addTasks = (newTask) => {
    startTransition(async () => {
      try {
        addOptimisticTasks(newTask); // 先用乐观值占用,再进行请求
        // 调用接口
        const res = await fakeApi(newTask); // 模拟请求,一个50%成功率的api
        console.log('fakeApi res', res);
        setTasks((state) => [...state, newTask]);
      } catch (error) {
        console.log(error);
      }
    });
  };
  return (
    <div>
      <h1>待办事项列表</h1>
      <ul>
        {optimisticTasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
      <button onClick={() => addTasks('新的待办事项')}>添加待办事项</button>
    </div>
  );
};

export default TaskList;
