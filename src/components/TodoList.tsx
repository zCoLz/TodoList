import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { addTodo } from '../reducer/todoReducer';
import { ref, child, get, remove, update, push } from 'firebase/database';
import { database } from '../firebase';
import { Card, Input } from 'antd';

const TodoList = () => {
  const todos = useAppSelector((state) => state.todo.todos);

  const [data, setData] = useState(todos);
  const [isValue, setIsValue] = useState(false);

  const name = useRef<string>('');
  const dispatch = useAppDispatch();
  const dbRef = ref(database);

  useEffect(() => {
    get(child(dbRef, `todo`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
          dispatch(addTodo(snapshot.val()));
        } else {
          console.log('No data available');
          setData([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setIsValue(false);
  }, [isValue]);
  // Add Todo
  async function handleAddTodoList(name: string) {
    try {
      if (name.trim() === '') {
        window.alert('Please enter a Value name.');
        return;
      }
      await push(child(dbRef, `todo/`), {
        name: name,
      });

      window.alert('Create Successful!');
      setIsValue(true);
    } catch (error) {
      console.error(error);
      window.alert('Failed to create todo list.');
    }
  }
  // Update todo
  async function handleUpdateTodoList(index: any, name: string) {
    try {
      const key = Object.keys(data)[index];
      const todoRef = child(dbRef, `todo/${key}`);
      if (name.trim() === '') {
        window.alert('Please enter a Value name.');
        return;
      }
      await Promise.all([
        update(todoRef, {
          name: name,
        }),
        setIsValue(true),
      ]);
      window.alert('Update Successful!');
    } catch (error) {
      console.error(error);
      window.alert('Update Failed!');
    }
  }
  // Delele todo
  async function handleDeleteTodoList(index: any) {
    try {
      const key = Object.keys(data)[index];
      const todoRef = child(dbRef, `todo/${key}`);
      await remove(todoRef);
      window.alert('Delete Successful!');
      setIsValue(true);
    } catch (error) {
      console.error(error);
      window.alert('Delete Failed!');
    }
  }

  return (
    <>
      <Card className='bg-slate-200 w-[30rem] h-[40rem] border-none drop-shadow-lg'>
        <h1 className='text-black font-extrabold text-2xl text-center'>
          TodoList
        </h1>

        <div className='my-4 flex'>
          <Input onChange={(e) => (name.current = e.target.value)} />
          <button
            className='bg-blue-500 hover:bg-blue-700 ml-1 w-20 rounded-md hover:text-white font-semibold'
            onClick={() => handleAddTodoList(name.current)}
          >
            Add
          </button>
        </div>

        <table className='w-full'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody className='w-full'>
            {Object.values(data).map((todo, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Input
                    defaultValue={todo.name}
                    onChange={(e) => (name.current = e.target.value)}
                  />
                </td>
                <td className='p-3'>
                  <button
                    className='bg-red-500 hover:bg-red-700 ml-1 w-16 h-7 rounded-md hover:text-white font-semibold'
                    onClick={() => handleDeleteTodoList(index)}
                  >
                    Delete
                  </button>
                  <button
                    className='bg-green-400 hover:bg-green-600 ml-1  w-16 h-7 rounded-md hover:text-white font-semibold'
                    onClick={() => handleUpdateTodoList(index, name.current)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default TodoList;
