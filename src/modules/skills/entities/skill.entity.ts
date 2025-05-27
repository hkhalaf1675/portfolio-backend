import { Project } from "src/modules/projects/entities/project.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'Skills'
})
export class Skill {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        type: 'varchar',
        nullable: false
    })
    title: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    category?: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    description?: string;

    @Column({
        type: 'integer',
        nullable: true
    })
    proficiencyLevel?: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => Project, (project) => project.skills, { onDelete: 'CASCADE' })
    projects: Project[];
}
