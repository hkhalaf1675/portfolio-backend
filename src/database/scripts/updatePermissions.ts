import { Permission } from "src/modules/permissions/entities/permission.entity";
import dataSource from "../data-source";
import { User } from "src/modules/users/entities/user.entity";
import * as dotenv from 'dotenv';
dotenv.config();
import * as bcrypt from "bcrypt";

const entitiesCrud = [
    { name: 'Permission', token: 'permission' },
    { name: 'User', token: 'user' },
    { name: 'PersonalInfo', token: 'personal-info' },
    { name: 'Skill', token: 'skill' },
    { name: 'Experience', token: 'experience' },
    { name: 'Project', token: 'project' },
    { name: 'Certification', token: 'certification' },
];

const permissions = [
];

const permissionsToBeSpreaded = entitiesCrud.map((entity) => [
    {
        token: `permission-${entity.token}-create`,
        name: `Create ${entity.name}`,
        description: `Allow user to create ${entity.name}`,
        category: entity.name
    },
    {
        token: `permission-${entity.token}-view`,
        name: `View ${entity.name}`,
        description: `Allow user to view ${entity.name}`,
        category: entity.name
    },
    {
        token: `permission-${entity.token}-edit`,
        name: `Edit ${entity.name}`,
        description: `Allow user to edit ${entity.name}`,
        category: entity.name
    },
    {
        token: `permission-${entity.token}-delete`,
        name: `Delete ${entity.name}`,
        description: `Allow user to delete ${entity.name}`,
        category: entity.name
    },
]);

const update = async() => {
    try {
        const allPermissions = permissions.concat(...permissionsToBeSpreaded);

        const myDataSource = dataSource;
        if(!myDataSource.isInitialized){
            await myDataSource.initialize();
        }

        for (const permission of allPermissions) {
            const existingPermission = await myDataSource.manager.findOneBy(Permission, {token: permission.token});
            if (!existingPermission) {
                await myDataSource.createQueryBuilder()
                    .insert()
                    .into(Permission)
                    .values({
                        token: permission.token,
                        name: permission.name,
                        description: permission.description,
                        category: permission.category
                    })
                    .orIgnore()
                    .execute();
            }
        }

        const superAdminEmail = process.env.SUPER_ADMIN_EMAIL ?? 'admin@gmail.com';
        let superAdmin = await myDataSource.manager.findOneBy(User, { email: superAdminEmail  });
        if(!superAdmin){
            superAdmin = new User();
            
            const slat = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD ?? '123', slat);

            superAdmin.email = superAdminEmail;
            superAdmin.password = hashedPassword;
            superAdmin.name = 'Super Admin';

            await myDataSource.manager.save(User, superAdmin);
        }

        const allPermissionsFromDB = await myDataSource.getRepository(Permission).find();
        superAdmin.permissions = allPermissionsFromDB;
        await myDataSource.manager.save(User, superAdmin);

    } catch (error) {
        console.log(error);
    }

    console.log('Permissions added successfully');
    process.exit();
}

update()
.catch(error => { console.log(error) });