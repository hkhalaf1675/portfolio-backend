import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: "Experiences"
})
export class Experience {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: true
    })
    jobTitle: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    companyName: string;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column({
        type: 'date',
        nullable: true
    })
    startDate: Date;

    @Column({
        type: 'date',
        nullable: true
    })
    endDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
