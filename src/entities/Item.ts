import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    contractId!: number;

    @Column()
    description!: string;

    @Column()
    value!: number;

    @Column()
    time!: string;

    @Column()
    isImported!: boolean;

    @Column()
    createdAt!: string;

    @Column()
    updatedAt!: string;

    @Column()
    isDeleted!: false;
}