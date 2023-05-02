import { WorkflowService } from 'src/app/authorization/workflow/workflow.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class WorkflowCompleteGuard implements CanActivate {
  constructor(private workflowService: WorkflowService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.workflowService.isWorkflowComplete) {
      this.router.navigate([this.workflowService.selectedURL || '']);
      return false;
    } else {
      return true;
    }
  }
}
