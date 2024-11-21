import { atom } from 'recoil';

export interface MissionType {
  content: string;
  category: string;
  endDate: string;
  point: number;
  doneDate: string;
  failDate: string;
}

//recoil state 생성
export const progressMissionState = atom<MissionType[]>({
  key: 'progressMissionState',
  default: []
});

export const completeMissionState = atom<MissionType[]>({
  key: 'completeMissionState',
  default: []
});

export const failMissionState = atom<MissionType[]>({
  key: 'failMissionState',
  default: []
});

export const requestMissionState = atom<MissionType[]>({
  key: 'requestMissionState',
  default: []
});
