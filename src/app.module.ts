import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonalInfoModule } from './modules/personal-info/personal-info.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import { dataSourceOptions } from './database/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { SkillsModule } from './modules/skills/skills.module';
import { ExperiencesModule } from './modules/experiences/experiences.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { CertificationsModule } from './modules/certifications/certifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig]
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('jwt.secret'),
          signOptions: {
            expiresIn: configService.get<string>('jwt.expiresIn')
          }
        }
      },
      global: true
    }),
    AuthModule,
    UsersModule,
    PermissionsModule,
    PersonalInfoModule,
    SkillsModule,
    ExperiencesModule,
    ProjectsModule,
    CertificationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
