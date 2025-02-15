import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit, Trash2, Clock, FileText, Check, Plus, Calendar, ListTodo } from 'lucide-react';
import { useAuth } from './context';
import { mainurl } from './commonfile';

function Showtodo() {
  const { todos } = useAuth();
  const [localTodos, setLocalTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedTime, setUpdatedTime] = useState('');
  const [updatedDueDate, setUpdatedDueDate] = useState('');
  console.log("ef",todos)

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  useEffect(() => {
    if (todos) setLocalTodos(todos);
  }, [todos]);

  const handleUpdate = async (id) => {
    if (!updatedTitle || !updatedTime || !updatedDueDate) {
      alert('Title, Time, and Due Date are required!');
      return;
    }

    try {
      const response = await axios.put(
        `${mainurl}/todosroute/updatetodo/${id}`,
        {
          title: updatedTitle,
          description: updatedDescription,
          time: updatedTime,
          dueDays: updatedDueDate,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const updatedTodos = localTodos.map((todo) =>
          todo._id === id
            ? { ...todo, title: updatedTitle, description: updatedDescription, time: updatedTime, dueDate: updatedDueDate }
            : todo
        );
        setLocalTodos(updatedTodos);
        setEditingTodo(null);
        setUpdatedTitle('');
        setUpdatedDescription('');
        setUpdatedTime('');
        setUpdatedDueDate('');
        alert('Todo updated successfully!');
      }
    } catch (error) {
      console.error('Error updating todo:', error.message);
      alert('Failed to update todo');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${mainurl}/todosroute/deletetodo/${id}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setLocalTodos(localTodos.filter((todo) => todo._id !== id));
        alert('Todo deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting todo:', error.message);
      alert('Failed to delete todo');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 dark:text-white py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-center items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 dark:text-white flex items-center">
            My Todos
          </h1>
        </div>

        {/* Todo List Container */}
        <div className="space-y-4">
          {localTodos.map((todo) => (
            <div 
              key={todo._id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border-l-4 border-blue-500 dark:border-blue-600 flex justify-between items-center"
            >
              <div className="flex-grow pr-4">
                <h2 className="text-xl font-semibold text-blue-900 dark:text-white mb-2">
                  {todo.title}
                </h2>
                {todo.description && (
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {todo.description}
                  </p>
                )}
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {todo.time}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {formatDate(todo.dueDays)}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingTodo(todo._id);
                    setUpdatedTitle(todo.title);
                    setUpdatedDescription(todo.description || '');
                    setUpdatedTime(todo.time);
                    setUpdatedDueDate(todo.dueDays);
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {editingTodo && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 mb-8 border-l-4 border-blue-500 dark:border-blue-600">
            <div className="space-y-4">
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="w-full px-4 py-3 border-2 border-blue-100 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
                placeholder="Todo Title"
              />
              <textarea
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                className="w-full px-4 py-3 border-2 border-blue-100 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
                placeholder="Description (Optional)"
                rows="3"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="time"
                  value={updatedTime}
                  onChange={(e) => setUpdatedTime(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-blue-100 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="date"
                  value={updatedDueDate}
                  onChange={(e) => setUpdatedDueDate(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-blue-100 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Showtodo;