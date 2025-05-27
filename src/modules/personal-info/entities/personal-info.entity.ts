import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'PersonalInfo'
})
export class PersonalInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    title: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    type: string;

    @Column({
        type: 'json',
        nullable: false
    })
    value: any;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
