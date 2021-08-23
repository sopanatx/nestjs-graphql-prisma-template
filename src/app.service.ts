import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ObjectId } from 'bson';
@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getHello(): Promise<any> {
    const id = new ObjectId();
    // await this.prisma.user.create({
    //   data: {
    //     username: 'test1',
    //     password: 'test',
    //     passwordSalt: 'test',
    //     firstname: 'test',
    //     lastname: 'test',
    //     email: 'test@test',
    //   },
    // });
    // await this.prisma.server.create({
    //   data: {
    //     servername: 'Jurong',
    //     ip: '192.168.1.1',
    //   },
    // });
    const getUser = await this.prisma.user.findMany({});
    const getServer = await this.prisma.server.findMany({});
    return { getUser, getServer };
    //   return 'Hello World!';
  }
}
