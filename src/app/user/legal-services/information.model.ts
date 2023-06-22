export class Information {
  public dest: number;
  public serviceName: number;
  public service: number;
  public urgent: number;
  public type: number;
  public price: number;
  public description: string[];
  public howto: string[];
  public include: string[];
  public notInclude: string[];
  public problem?: string;
  public discountId?: string;

  constructor(
    dest: number,
    serviceName: number,
    service: number,
    urgent: number,
    type: number,
    price: number,
    description: string[],
    howto: string[],
    include: string[],
    notInclude: string[],
    problem?: string,
    discountId?: string
  ) {
    this.dest = dest;
    this.serviceName = serviceName;
    this.service = service;
    this.urgent = urgent;
    this.type = type;
    this.price = price;
    this.description = description;
    this.howto = howto;
    this.include = include;
    this.notInclude = notInclude;
    this.problem = problem;
    this.discountId = discountId;
  }
}
