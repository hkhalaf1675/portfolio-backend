import { User } from "src/modules/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'Permissions'
})
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    name: string;

    @Column({
        type: 'varchar',
        nullable: false,
        unique: true
    })
    token: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    description?: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    category?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => User, (user) => user.permissions, { nullable: false, onDelete: 'CASCADE' })
    users: User[];
}
