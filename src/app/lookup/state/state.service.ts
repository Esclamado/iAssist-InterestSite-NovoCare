import { Injectable } from '@angular/core';
import stateArray from '../shared/arrays/states.array';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public get states(): Array<{ name: string, value: string }> {
    return stateArray;
  }

  constructor() { }
}
