import { Injectable } from '@angular/core';
import pharmacyArray from '../shared/arrays/pharmacies.array';
import specialtyPharmacyArray from '../shared/arrays/specialty-pharmacies.array';

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {

  public get pharmacies(): Array<{ name: string, value: string }> {
    return pharmacyArray;
  }

  public get specialtyPharmacies(): Array<{ name: string, value: string }> {
    return specialtyPharmacyArray;
  }

  constructor() { }
}
