import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface"
import BaseEntity from "../../@shared/domain/entity/base.entity"
import Address from "../../@shared/domain/value-object/address"
import Id from "../../@shared/domain/value-object/id.value-object"

type ClientProps = {
  id?: Id
  name: string
  email: string
  document: string
  address: Address
  createdAt?: Date
  updatedAt?: Date
}

export default class Client extends BaseEntity implements AggregateRoot {

  private _name: string
  private _email: string
  private _document: string
  private _street: string
  private _number: string
  private _complement: string
  private _city: string
  private _state: string
  private _zipCode: string

  constructor(props: ClientProps) {
    super(props.id, props.createdAt, props.updatedAt)
    this._name = props.name
    this._email = props.email
    this._document = props.document
    this._city = props.address.city
    this._state = props.address.state
    this._zipCode = props.address.zipCode
    this._street = props.address.street
    this._number = props.address.number
    this._complement = props.address.complement
  }

  get name(): string {
    return this._name
  }

  get email(): string {
    return this._email
  }

  get document(): string {
    return this._document
  }

  get city(): string {
      return this._city
  }

  get street(): string {
      return this._street
  }

  get number(): string {
      return this._number
  }

  get complement(): string {
      return this._complement
  }

  get state(): string {
      return this._state
  }

  get zipCode(): string {
      return this._zipCode
  }
}