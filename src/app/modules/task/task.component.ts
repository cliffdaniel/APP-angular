import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models';
import { addFavorite } from 'src/app/redux/actions';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from './components/task-modal/task-modal.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  favorites$!: Observable<any>;

  constructor(
    private store: Store<{ favorites: Task[] }>,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.favorites$ = this.store.select('favorites');
  }

  increment() {
    this.store.dispatch(addFavorite({ id: 'id', title: 'title', description: 'description', status: 'status' }));
  }

  openAddTaskModal() {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Task added successfully
      }
    });
  }
}
