import { atom } from 'recoil';

export interface MissionType {
  id: number;
  content: string;
  category: string;
  endDate: string;
  doneDate: string;
  point: number;
}

export interface CompleteMissionType {
  id: number;
  content: string;
  category: string;
  endDate: string;
  point: number;
  doneDate: string;
}

export interface FailMissionType {
  id: number;
  content: string;
  category: string;
  endDate: string;
  point: number;
  failDate: string;
}

//recoil state 생성
export const progressMissionState = atom<MissionType[]>({
  key: 'progressMissionState',
  default: [],
});

export const completeMissionState = atom<CompleteMissionType[]>({
  key: 'completeMissionState',
  default: [],
});

export const failMissionState = atom<FailMissionType[]>({
  key: 'failMissionState',
  default: [],
});

export const requestMissionState = atom<MissionType[]>({
  key: 'requestMissionState',
  default: [],
});

export const isMissionRequestedState = atom<boolean>({
  key: 'isMissionRequestState',
  default: false, // 초기값은 false
});

export const requestMissionUpdateTriggerState = atom<string>({
  key: 'requestMissionUpdateTriggerState',
  default: '', // 초기값은 ''
});

export const progressMissionUpdateTriggerState = atom<string>({
  key: 'progressMissionUpdateTriggerState',
  default: '', // 초기값은 ''
});
