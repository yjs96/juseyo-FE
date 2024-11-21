import { atom } from 'recoil';

export interface UserInfoType {
  id: string;
  name: string;
  password: string;
  accountNum: string;
  type: string;
}

export interface PointType {
  totalPoints: number;
}

export const userInfoState = atom<UserInfoType>({
  key: 'userInfoState',
  default: {
    id: '',
    name: '',
    password: '',
    accountNum: '',
    type: '',
  },
});

export const pointState = atom<PointType>({
  key: 'pointState',
  default: {
    totalPoints: 0,
  },
});
