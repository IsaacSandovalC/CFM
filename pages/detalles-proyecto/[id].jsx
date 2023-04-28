import React from 'react'
import { useRouter } from 'next/router'
import ProjectDetail from '../../components/Home/ProjectDetail'

export default function () {
  const router = useRouter()
  const { query: { id } } = router

  return (
    <ProjectDetail id={parseInt(id)} />
  )
}
