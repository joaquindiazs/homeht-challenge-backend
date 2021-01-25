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
    time!: Date;

    @Column()
    isImported!: boolean;

    @Column({nullable: true})
    createdAt!: Date;

    @Column({nullable: true})
    updatedAt!: Date;

    @Column()
    isDeleted!: boolean;
}