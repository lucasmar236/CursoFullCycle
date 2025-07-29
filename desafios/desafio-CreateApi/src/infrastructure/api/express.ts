import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import {productAdmRoute} from "../../modules/product-adm/api/product-adm.route";
import {ProductModel as ProductAdmModel}  from "../../modules/product-adm/repository/product.model";
import {ProductModel as ProductCatalogModel} from "../../modules/store-catalog/repository/product.model"
import {clientAdmRoute} from "../../modules/client-adm/api/client-adm.route";
import {ClientModel} from "../../modules/client-adm/repository/client.model";
import {checkoutRoute} from "../../modules/checkout/api/checkout.route";
import TransactionModel from "../../modules/payment/repository/transaction.model";
import InvoiceModel from "../../modules/invoice/repository/invoice.model";
import InvoiceItemModel from "../../modules/invoice/repository/invoice-item.model";
import {invoiceRoute} from "../../modules/invoice/api/invoice.route";


export const app: Express = express();
app.use(express.json());
app.use("/products",productAdmRoute)
app.use("/clients",clientAdmRoute)
app.use("/checkout",checkoutRoute)
app.use("/invoice",invoiceRoute)


export let sequelize: Sequelize;


async function setupDb() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false
    })

    await sequelize.addModels([ProductAdmModel,ProductCatalogModel,ClientModel,
        TransactionModel,InvoiceModel,InvoiceItemModel])
    await sequelize.sync({force: true})
}


setupDb()