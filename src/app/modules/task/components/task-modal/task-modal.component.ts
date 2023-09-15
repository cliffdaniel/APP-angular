import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent {
  task: Task;

  constructor(
    private dialogRef: MatDialogRef<TaskModalComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
    this.task = data ? { ...data } : {
      id: '',
      title: '',
      description: '',
      status: 'pending',
    };
  }

  addTask() {
    if (this.task.id) {
      this.taskService.updateTask(this.task).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.taskService.addTask(this.task).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
}
