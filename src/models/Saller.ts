export default class Seller {
  name: string

  salesAmount: number

  constructor(args: Seller) {
    this.name = args.name;
    this.salesAmount = args.salesAmount;
  }
}
