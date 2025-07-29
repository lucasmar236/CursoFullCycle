import Address from "../../../@shared/domain/value-object/address"

export interface FindClientUseCaseInputDto {
  id: string
}

export interface FindClientUseCaseOutputDto {
  id: string
  name: string
  email: string
  document: string
  city: string
  street: string
  complement: string
  number: string
  state: string
  zipCode: string,
  createdAt: Date
  updatedAt: Date
}