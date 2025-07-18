import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import {InputListProductDto,OutputListProductDto} from "./list.product.dto";
import ProductInterface from "../../../domain/product/entity/product.interface";


export default class ListProductUseCase {
    private productRepository: ProductRepository;
    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async execute(input: InputListProductDto): Promise<OutputListProductDto> {
        const products = await this.productRepository.findAll();
        return OutputMapper.toOutput(products);
    }
}


class OutputMapper {
    static toOutput(products: ProductInterface[]):OutputListProductDto {
        return {
            products: products.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
            })),
        }
    }
}