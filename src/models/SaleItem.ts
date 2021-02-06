export default class SaleItem {
  sellerName: string

  customerName: string

  dateOfSale: Date

  name: string

  value: number

  constructor(args: SaleItem) {
    this.sellerName = args.sellerName;
    this.customerName = args.customerName;
    this.dateOfSale = args.dateOfSale;
    this.name = args.name;
    this.value = args.value;
  }
}
