import prompt from 'prompt-sync';
import SaleItem from './models/SaleItem';
import Seller from './models/Saller';

const PROMPT = prompt({ sigint: true });

const SALES: SaleItem[] = [];

const SELLERS: Seller[] = [
  new Seller({ name: 'David', salesAmount: 0 }),
  new Seller({ name: 'Claudia', salesAmount: 0 }),
  new Seller({ name: 'Esteban', salesAmount: 0 }),
  new Seller({ name: 'Mariko', salesAmount: 0 }),
  new Seller({ name: 'Jonah', salesAmount: 0 }),
];

function createSaleItem(): SaleItem {
  let sellerName: string;
  let customerName: string;
  let dateOfSale: Date;
  let name: string;
  let value: number;

  let seller: Seller;

  do {
    sellerName = PROMPT('whats the seller name? ');

    seller = SELLERS.find((tempSeller) => tempSeller.name === sellerName) as Seller;

    if (!seller) {
      console.log('Seller name not found, please inform a valid seller name to continue');
    }
  } while (!seller);

  do {
    customerName = PROMPT('whats the customer name? ');

    if (customerName.length < 3) {
      console.log('Customer name is invalid, please inform a valid customer name to continue');
    }
  } while (customerName.length < 3);

  do {
    const dateString = PROMPT('whats the date of sale? ');

    dateOfSale = new Date(dateString);

    if (isNaN(dateOfSale.getTime())) {
      console.log('Sale date is invalid!, please try this entry format (yyyy-mm-dd)');
    }
  } while (isNaN(dateOfSale.getTime()));

  do {
    name = PROMPT('whats the item name? ');
    if (name.length < 3) {
      console.log('Customer name is invalid, please inform a valid customer name to continue');
    }
  } while (name.length < 3);

  do {
    value = Number(PROMPT('whats the item value? '));

    if (isNaN(value)) {
      console.log('Item value is invalid!, must be a number');
    }
  } while (isNaN(value));

  seller.salesAmount += value;

  return {
    customerName, dateOfSale, name, sellerName, value,
  };
}

function getOrderedList(): SaleItem[] {
  const bySellerObj = SALES.reduce((acumulator: any, saleItem: SaleItem) => {
    if (!acumulator[saleItem.sellerName]) {
      acumulator[saleItem.sellerName] = {
        sales: [],
        total: 0,
      };
    }
    acumulator[saleItem.sellerName].sales.push(saleItem);
    return acumulator;
  }, {});

  SELLERS.sort((a, b) => {
    if (a.salesAmount > b.salesAmount) {
      return -1;
    }
    return 1;
  });

  const responseArr: SaleItem[] = [];

  SELLERS.forEach((seller) => {
    if (seller.salesAmount > 0) {
      responseArr.push(...bySellerObj[seller.name].sales);
    }
  });

  return responseArr;
}

function main() {
  while (true) {
    const saleItem = createSaleItem();

    SALES.push(saleItem);

    const response = getOrderedList();

    console.log(response);

    console.log('------------');
  }
}

main();
