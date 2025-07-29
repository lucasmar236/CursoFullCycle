import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import {ClientModel} from "./client.model";
import Address from "../../@shared/domain/value-object/address";

export default class ClientRepository implements ClientGateway {

    async add(entity: Client): Promise<void> {

        await ClientModel.create({
            id: entity.id.id,
            name: entity.name,
            email: entity.email,
            document: entity.document,
            street: entity.street,
            number: entity.number,
            complement: entity.complement,
            city: entity.city,
            state: entity.state,
            zipcode: entity.zipCode,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt
        })
    }

    async find(id: string): Promise<Client> {

        const client = await ClientModel.findOne({where: {id}})

        if (!client) {
            throw new Error("Client not found")
        }

    return new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      document: client.document,
      address: new Address(
        client.street,
        client.number,
        client.complement,
        client.city,
        client.state,
        client.zipcode,
      ),
      createdAt: client.createdAt,
      updatedAt: client.createdAt
    })
  }
}