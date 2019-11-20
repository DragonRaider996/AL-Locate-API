import { Controller, Post, Body, HttpException, HttpStatus, Get, Param, Query } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { CreateTransferDTO } from './dto/createTransfer.dto';
import { UpdateTrackingDTO } from './dto/updateTracking.dto';
import { CreateTransferInterface } from './interface/createTransfer.interface';
import { TransferHistoryInterface } from './interface/transferHistory.interface';
import { TrackDetailsInterface } from './interface/trackDetails.interface';
import { UserInterface } from '../login/interface/user.interface';
import { User } from '../login/user.decorator';

@Controller('transfer')
export class TransferController {

  constructor(private readonly transferService: TransferService) { }

  @Post()
  async createTransfer(@Body() transfer: CreateTransferDTO, @User() user: UserInterface): Promise<CreateTransferInterface> {
    let transferData = await this.transferService.addTransfer(transfer, user.userId);
    if (transferData) {
      return transferData;
    } else {
      throw new HttpException("Error", HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getTransferDetails(@User() user: UserInterface): Promise<TransferHistoryInterface[]> {
    return this.transferService.getHistory(user.userId);
  }

  @Get(':id')
  async checkTrackingDetails(@Param("id") id: number, @User() user: UserInterface): Promise<TransferHistoryInterface> {
    let transferData = await this.transferService.getTransferDetails(id, user.userId);
    if (transferData) {
      return transferData;
    } else {
      throw new HttpException("Error", HttpStatus.BAD_REQUEST);
    }
  }

  @Get('track/:id')
  async getTrackingDetails(@Param("id") id: number, @User() user: UserInterface): Promise<TrackDetailsInterface> {
    let trackingDetails = await this.transferService.getTrackingDetails(id, user.userId);
    if (trackingDetails) {
      return trackingDetails;
    } else {
      throw new HttpException("Error", HttpStatus.BAD_REQUEST);
    }
  }

  @Post('track/:id')
  async updateTrackingDetails(@Body() trackPosition: UpdateTrackingDTO, @Param("id") id: number) {
    this.transferService.updateTracking(trackPosition, id);
  }

}
