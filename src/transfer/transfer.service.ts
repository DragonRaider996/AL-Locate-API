import { Injectable } from '@nestjs/common';
import { Transfer } from './entity/transfer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateTransferDTO } from './dto/createTransfer.dto';
import { HospitalService } from 'src/hospital/hospital.service';
import { CreateTransferInterface } from './interface/createTransfer.interface';
import { TransferHistoryInterface } from './interface/transferHistory.interface';
import { TrackDetailsInterface } from './interface/trackDetails.interface';
import { Track } from './entity/track.entity';
import { UpdateTrackingDTO } from './dto/updateTracking.dto';

@Injectable()
export class TransferService {

  constructor(@InjectRepository(Transfer) private transferRepository: Repository<Transfer>,
    @InjectRepository(Track) private trackRepository: Repository<Track>,
    private hospitalService: HospitalService) { }

  async addTransfer(transfer: CreateTransferDTO, hospitalId: number): Promise<CreateTransferInterface> {
    console.log(transfer);
    if (transfer.toHospital == hospitalId) {
      return null;
    }
    try {
      let toHospital = await this.hospitalService.getHospitalDetials(transfer.toHospital);
      let fromHospital = await this.hospitalService.getHospitalDetials(hospitalId);
      let transferData: Transfer = {
        patientAge: transfer.patientAge,
        patientName: transfer.patientName,
        toHospital: toHospital,
        fromHospital: fromHospital
      };
      let newTransfer: Transfer = await this.transferRepository.save(transferData);
      let transferId: CreateTransferInterface = { trasnferId: newTransfer.transferId };
      let track: Track = {
        transferId: newTransfer
      }
      await this.trackRepository.save(track);
      return transferId;
    } catch (e) {
      return null;
    }

  }

  async getHistory(hospitalId: number): Promise<TransferHistoryInterface[]> {
    //let hospital = await this.hospitalService.getHospitalDetials(hospitalId);
    let transferDetails: Transfer[] = await this.transferRepository.find({
      where: [
        { toHospital: hospitalId },
        { fromHospital: hospitalId }
      ], relations: ["fromHospital", "toHospital"]
    })
    let transferHistory: TransferHistoryInterface[] = [];
    for (let i = 0; i < transferDetails.length; i++) {
      let transfer = transferDetails[i];
      transferHistory.push({
        transferId: transfer.transferId,
        toHospital: transfer.toHospital.name,
        fromHospital: transfer.fromHospital.name,
        patientAge: transfer.patientAge,
        patientName: transfer.patientName
      });
    }
    return transferHistory;
  }

  async getTransferDetails(transferId: number, ambulance_id: number): Promise<TransferHistoryInterface> {
    let transferDetail: Transfer = await this.getTransferFromID(transferId);
    let updatedTrack: UpdateResult = await this.trackRepository.update({ transferId: transferDetail }, { ambulanceId: ambulance_id })
    if (updatedTrack.affected > 0) {
      let transferData = {
        transferId: transferDetail.transferId,
        toHospital: transferDetail.toHospital.name,
        fromHospital: transferDetail.fromHospital.name,
        patientAge: transferDetail.patientAge,
        patientName: transferDetail.patientName
      }
      return transferData;
    } else {
      return null;
    }
  }

  private async getTransferFromID(transferId: number): Promise<Transfer> {
    let transferDetail: Transfer = await this.transferRepository.findOne({
      where: [{
        transferId: transferId
      }], relations: ["fromHospital", "toHospital"]
    })
    return transferDetail;
  }

  async getTrackingDetails(transferId: number, hospitalId: number): Promise<TrackDetailsInterface> {
    let transferDetails: Transfer = await this.getTransferFromID(transferId);
    if (transferDetails.fromHospital.id === hospitalId || transferDetails.toHospital.id === hospitalId) {
      let trackDetail: Track = await this.getTrackingForTransferId(transferId);
      if (trackDetail) {
        let track: TrackDetailsInterface = {
          transferId: transferId,
          ambulanceId: trackDetail.ambulanceId,
          latitude: trackDetail.latitude,
          longitude: trackDetail.longitude
        }
        return track;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async updateTracking(trackingDetails: UpdateTrackingDTO, transferId: number): Promise<boolean> {
    let track: Track = await this.getTrackingForTransferId(transferId);
    try {
      let updatedTrack: UpdateResult = await this.trackRepository.update(track, trackingDetails);
      if (updatedTrack.affected > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }

  }

  async getTrackingForTransferId(transferId: number): Promise<Track> {
    return this.trackRepository.findOne({
      where: [
        { transferId: transferId }
      ], relations: ["transferId"]
    });
  }


}
