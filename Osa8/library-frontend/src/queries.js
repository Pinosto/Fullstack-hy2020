import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query{
  allAuthors{
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query AllBooks(
  $filterByGenre: String
  $filterByAuthor: String){
  allBooks(
    genre:$filterByGenre
    author:$filterByAuthor){
    title
    author{name}
    published
    genres
    id
  }
}
`

export const ADD_BOOK = gql`
mutation addBook(
  $title: String!
  $published: Int!
  $author: String!
  $genres: [String]!){
    addBook(
    title: $title
    author: $author
    published: $published
    genres: $genres
    ) {
      title
      author{name}
    }
  }
`

export const ADD_YEAR_OF_BORN = gql`
mutation editAuthor(
  $name: String!
  $setBornTo: Int!){
    editAuthor(
    name: $name
    setBornTo: $setBornTo
    ) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query{
    me{
      username, favoriteGenre
    }
  }
`


export const BOOK_ADDED = gql`
  subscription {
    bookAdded {      
      title
      author{
        name}
      published
      genres  
      id
    }
  }
`