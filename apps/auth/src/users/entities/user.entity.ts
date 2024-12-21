import { Exclude } from 'class-transformer';
// import { Order } from 'orders/entities/order.entity';
// import { Property } from 'properties/entities/property.entity';
import {
  Column,
  Entity,
  // OneToMany,
  PrimaryGeneratedColumn,
  // ManyToMany,
  // JoinTable,
} from 'typeorm';
import { Role } from '../../roles/enums/role.enum';
import { RegistryDates } from '@app/common';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  phone: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    enumName: 'role_enum',
    default: Role.ADMIN,
  })
  role: Role;

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;

  // @OneToMany(() => Order, (order) => order.customer, {
  //   cascade: ['soft-remove', 'recover'],
  // })
  // orders: Order[];

  // @ManyToMany(() => Property)
  // @JoinTable()
  // wishlist: Property[];

  // @OneToMany(() => Property, (property) => property.owner)
  // properties: Property[];

  get isDeleted() {
    return !!this.registryDates.deletedAt;
  }
}
