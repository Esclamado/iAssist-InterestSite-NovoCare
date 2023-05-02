export interface MedicationFormData {
    selectedDrug?: string;
    quantity?: string;
    daysSupply?: string; 
    form?: string;
    drugUrl?: string;
    drugHomePageUrl?: string;
    drugGenericName?: string;
    strength?: number;
    potencyUnitCode?: string;
    quantityQualifierTypeId?: number;
}
