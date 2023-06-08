import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'scoot-test';

  todoItems: any[] = [];

  filterDescription: string = '';
  filterPriority: string = '';
  filterStatus: boolean | null = null;

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.fetchTodoItems();
  }

  fetchTodoItems() {
    this.http.get<any[]>('/assets/todo-items.json').subscribe(
      (response) => {
        this.todoItems = response;
      },
      (error) => {
        console.log('Erro ao obter os dados das tarefas:', error);
      }
    );
  }

  get filteredTodoItems() {
    return this.todoItems.filter(item => {
      const descriptionMatch = item.description.toLowerCase().includes(this.filterDescription.toLowerCase());
      const priorityMatch = this.filterPriority ? item.priority === this.filterPriority : true;
      const statusMatch = this.filterStatus !== null ? item.completed === this.filterStatus : true;
      return descriptionMatch && priorityMatch && statusMatch;
    });
  }
}
