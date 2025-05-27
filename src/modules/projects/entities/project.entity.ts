import { Skill } from "src/modules/skills/entities/skill.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'Projects'
})
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: true
    })
    title: string;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    url: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => Skill, (skill) => skill.projects, { onDelete: 'CASCADE' })
    @JoinTable()
    skills: Skill[];
}
