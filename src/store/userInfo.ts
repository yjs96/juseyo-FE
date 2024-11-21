import { atom } from 'recoil';

export interface UserInfoType {
  id: string;
  name: string;
  password: string;
  accountNum: string;
  type: string;
  parentName: string | 1;
  childNameList: ChildName[];
}

interface ChildName {
  name: string | '';
  point: number | 0;
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
    parentName: '',
    childNameList: [
      {
        name: '',
        point: 0,
      },
      {
        name: '',
        point: 0,
      },
      {
        name: '',
        point: 0,
      },
    ],
  },
});

export const pointState = atom<PointType>({
  key: 'pointState',
  default: {
    totalPoints: 0,
  },
});

export const isUserParentState = atom<boolean>({
  key: 'isUserParentState',
  default: false,
});
