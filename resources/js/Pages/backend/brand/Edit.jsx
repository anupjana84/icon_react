import React from 'react'
import Header from '../../../layout/header'

const Edit = () => {
  return (
    <>
<div className="flex-1 overflow-auto relative z-10 bg-gray-900">
            <Header title={"Home"} />

            <main className="max-w-7xl mx-auto py-1 px-1 lg:px-1">
                <div className="flex-1 overflow-auto relative z-10">
                    <div
                        className="mb-6 
          flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <h3 className=""></h3>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Add
                        </button>
                    </div>
                    {/* <h3 className="bg-red-400">about</h3> */}
                </div>
                {/* <p>content</p> */}
                <h1>Edit</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <h4>page</h4>
                </div>
            </main>
        </div>

    </>
  )
}

export default Edit