import Address from "../../../@shared/domain/value-object/address"


export interface AddClientInputDto {
    id?: string
    name: string
    email: string
    document: string
    city: string
    street: string
    number: string
    complement: string
    state: string
    zipCode: string
}

export interface AddClientOutputDto {
    id: string
    name: string
    email: string
    document: string
    city: string
    street: string
    number: string
    complement: string
    state: string
    zipCode: string
    createdAt: Date
    updatedAt: Date
}