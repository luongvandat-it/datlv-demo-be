import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDTO } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/owner/entities/owner.entity';
import { Repository } from 'typeorm';
import { CreateOwnerInput } from 'src/owner/dto/create-owner.input';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        @InjectRepository(Owner) private  ownerService: Repository<Owner>
    ) { }

    async register(createOwnerInput: CreateOwnerInput) {
        const hashedPassword = await argon.hash(createOwnerInput.password)
        try {
            const user = await this.ownerService.save({
                ...createOwnerInput,
            })
            return await this.signJwtToken(user.id, user.email)
        } catch (error) {
            if (error.code == 'P2002') {
                throw new ForbiddenException(
                    'User with this email already exists'
                )
            }
        }
    }

    async login(email: string, password: string) {
        const owner = await this.ownerService.findOne({
            where: {
                email
            }
        })

        if (!owner) {
            throw new ForbiddenException(`User is not valid`)
        }

        const passwordMatched = await argon.verify(owner.password, password)

        if (!passwordMatched) {
            throw new ForbiddenException(`Email or password wrong`)
        }

        delete owner.password
        return await this.signJwtToken(owner.id, owner.email)
    }

    async signJwtToken(userId: number, email: string): Promise<{ accessToken: string }> {
        const payload = { sub: userId, email }

        const jwtString = await this.jwtService.signAsync(payload, {
            expiresIn: this.configService.get('JWT_EXPIRE_TIME'),
            secret: this.configService.get('JWT_SECRET')
        })

        return {
            accessToken: jwtString
        }
    }
}