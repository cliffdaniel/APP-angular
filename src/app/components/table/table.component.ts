
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/models';
import { addFavorite, removeFavorite } from 'src/app/redux/actions';
import { AppState } from 'src/app/redux/states';
import { TaskService } from 'src/app/services/task.service';
import { MatCardModule } from '@angular/material/card';
import { TaskModalComponent } from 'src/app/modules/task/components/task-modal/task-modal.component';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatIconModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatTableModule, MatSortModule, MatCheckboxModule, MatCardModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'description', 'status'];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>([]);
  selectedRows: { [key: string]: boolean } = {};
  tasksByStatus: { [key: string]: Task[] } = {
    'pending': [],
    'in-progress': [],
    'complete': [],
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private store: Store<AppState>,
    private taskService: TaskService,
    private dialog: MatDialog
  ) {
    this.loadTasks();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.dataSource.data = tasks;
      tasks.forEach(task => {
        this.tasksByStatus[task.status].push(task);
      });
      this.store.select('favorites').subscribe(favorites => {
        this.selectedRows = {};
        favorites.forEach(favorite => {
          this.selectedRows[favorite.id] = true;
        });
      });
    });
  }

  openTaskModal(task: Task) {
    this.dialog.open(TaskModalComponent, {
      width: '400px',
      data: task
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectAll(event: MatCheckboxChange) {
    this.selectedRows = {};
    this.dataSource.data.forEach(row => this.store.dispatch(removeFavorite({ id: row.id })));
    if (event.checked) {
      this.dataSource.data.forEach(row => {
        this.selectedRows[row.id] = true;
        this.store.dispatch(addFavorite({ id: row.id, title: row.title, description: row.description, status: row.status }))
      });
    }
  }

  selectRow(event: MatCheckboxChange, row: Task) {
    this.selectedRows[row.id] = event.checked;
    if (event.checked) {
      this.store.dispatch(addFavorite({ id: row.id, title: row.title, description: row.description, status: row.status }));
    } else {
      this.store.dispatch(removeFavorite({ id: row.id }));
    }
  }
}
