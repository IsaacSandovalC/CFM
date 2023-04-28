import React from 'react'
import { useRouter } from 'next/router'
import ServiceComponent from '../../components/Home/ServiceComponent'

export default function () {
  const router = useRouter()
  const { query: { id } } = router

  return (
    <ServiceComponent id={parseInt(id)} />
  )
}
