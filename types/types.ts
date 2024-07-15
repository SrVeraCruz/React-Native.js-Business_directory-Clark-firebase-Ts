export type SliderType = {
  name: string,
  imageUrl: string
}

export type MenuItemType = {
  id: number,
  name: string,
  icon: any,
  path: string
}

export type CategoryType = {
  id: string,
  name: string,
  icon: string
}

export type ReviewType = {
  rating: number,
  comment: string,
  userName: string | null | undefined,
  userImage: string | undefined,
  useEmail: string | undefined
}

export type BusinessType = {
  id: string,
  about: string,
  address: string,
  category: string,
  contact: string,
  imageUrl: string
  name: string,
  reviews: ReviewType[],
  website: string,
  username: string,
  userEmail: string,
  userImage: string,
}
