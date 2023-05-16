import { useState, useContext } from "react"
import DataContext from "../context/DataContext"
import NavBar from "./NavBar"

export default function CreatePage(){
  let {admin} = useContext(DataContext)
  return(
    <>
      <NavBar/>
      <h1>Hello</h1>
    </>
  )
}