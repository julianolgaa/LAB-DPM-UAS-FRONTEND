import React, { createContext, useContext, useState, ReactNode } from "react";

// Definisi tipe Todo
type Todo = {
  id: string;
  title: string;
  author: string;
  content: string;
  cover: string;
};

// Definisi tipe konteks
type TodoContextType = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
};

// Inisialisasi konteks dengan tipe opsional
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Provider untuk TodoContext
export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Fungsi untuk menambahkan todo
  const addTodo = (todo: Todo) => {
    if (!todos.some((item) => item.id === todo.id)) {
      setTodos((prevTodos) => [...prevTodos, todo]);
    }
  };

  // Fungsi untuk menghapus todo berdasarkan ID
  const removeTodo = (title: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.title !== title));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, removeTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook untuk menggunakan TodoContext
export const useTodos = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};
