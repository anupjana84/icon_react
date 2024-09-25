import React from 'react'
import Header from '../layout/header'

const About = () => {
  return (
    <>
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
                   <Header title={'About'} />

                    <main className="max-w-7xl mx-auto py-6 px-1 lg:px-1">
                        <div className="flex-1 overflow-auto relative z-10">
                        <h3>about</h3> 
                        </div>
                         <h3>content</h3>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            <h4>page</h4>
                        </div>

                    </main>
                </div> 

     
    </>
  )
}

export default About
