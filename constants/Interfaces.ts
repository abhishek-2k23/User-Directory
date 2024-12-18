export interface address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: {
    lat: string
    lng: string
  }
}
export interface User {
  id: number | string
  name: string
  email: string
  address: address
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export interface userShortData {
  id: number | string
  name: string
  email: string
}

export interface userInitialState {
  users: User[]
  usersShortInfo: userShortData[]
  loader: boolean
  userDetailsScreenData: User | null
  infiniteLoader: boolean
  searchResult: userShortData[] | null
  sortedResult: userShortData[]
  theme: string
}
