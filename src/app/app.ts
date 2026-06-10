import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoService } from './todo/services/todo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(public todoService: TodoService) {}

  addTodo(title: string) {
    this.todoService.addTodo(title);
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }
}
