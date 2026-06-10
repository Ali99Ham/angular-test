import { computed, Injectable, signal } from '@angular/core';
import { Todo } from '../model/todo.model';

type Filter = 'all' | 'active' | 'completed';
interface State {
  total: number;
  active: number;
  completed: number;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly todos = signal<Todo[]>([]);
  private readonly filter = signal<Filter>('all');
  readonly filteredTodo = computed(() => {
    const f = this.filter();
    if (f === 'active') return this.todos().filter((item) => !item.completed);
    if (f === 'completed') return this.todos().filter((item) => item.completed);
    return this.todos();
  });

  readonly state = computed(() => {
    return {
      total: this.todos().length,
      active: this.todos().filter((i) => !i.completed).length,
      completed: this.todos().filter((i) => i.completed).length,
    };
  });

  addTodo(title: string) {
    const todos = this.todos();
    const lastId = todos.length ? todos[todos.length - 1].id : 0;
    const newTodo = {
      id: lastId + 1,
      title,
      createdAt: new Date(),
      completed: false,
    };
    this.todos.update((todos) => [...todos, newTodo]);
  }

  deleteTodo(id: number) {
    this.todos.update((todos) => {
      return todos.filter((i) => i.id != id);
    });
  }
}
