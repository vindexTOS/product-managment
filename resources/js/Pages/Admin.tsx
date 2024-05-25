import React from 'react'
import LayoutComp from '@/Layouts/LayOut'
import CreateForm from '@/Components/CreateProduct/CreateForm'
import CreateCategory from '@/Components/CreateCategory/CreateCategory'
export default function Admin() {
  return (
    <LayoutComp>
      <section
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          justifyContent: 'space-around',
        }}
      >
        <CreateForm />
        <CreateCategory />
      </section>
    </LayoutComp>
  )
}
