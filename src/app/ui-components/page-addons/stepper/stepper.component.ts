import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { WorkflowService } from 'src/app/authorization/workflow/workflow.service';
import { WORKFLOW } from '../../../../assets/workflow';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  @Input()
  public activeStep: string;

  public pesSteps: any;

  constructor(private workflowService: WorkflowService) {}

  ngOnInit() {
    this.pesSteps = WORKFLOW[this.workflowService.currentServiceOffering.selectedOffering].steps;
  }
}
