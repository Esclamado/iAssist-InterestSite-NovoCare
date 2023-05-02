
export class GetProviderRequest {
  npi: number ;

  public constructor(npi?: number) {
    this.npi = npi;
  }
}

export class GetProviderRequestByName{
  firstName : string
  lastName : string
  postalCode : number

  public constructor(firstName?: string , lastName?:string , postalCode? : number) {
    this.firstName = firstName
    this.lastName = lastName
    this.postalCode = postalCode
  }
}
