import { Permission } from "src/modules/permissions/entities/permission.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'Users'
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: true
    })
    name?: string;

    @Column({
        type: 'varchar',
        nullable: false,
        unique: true
    })
    email: string;

    @Column({
        type: 'varchar',
        nullable: false,
        select: false
    })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => Permission, (permission) => permission.users, { nullable: false, onDelete: 'CASCADE' })
    @JoinTable()
    permissions: Permission[];
}
