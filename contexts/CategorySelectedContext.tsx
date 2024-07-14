import { createContext, useState } from 'react'

interface CategoryFilterContextProviderProps {
  children: React.ReactNode
}

interface CategoryFilterContextValues {
  categoryFilter: string,
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>,
}

export const CategoryFilterContext = createContext<CategoryFilterContextValues | null>(null)

export default function CategoryFilterContextProvider({
  children
}: CategoryFilterContextProviderProps ) {
  const [categoryFilter, setCategoryFilter] = useState("")

  return (
    <CategoryFilterContext.Provider
      value={{
        categoryFilter,
        setCategoryFilter
      }}
    >
      {children}
    </CategoryFilterContext.Provider>
  )
}