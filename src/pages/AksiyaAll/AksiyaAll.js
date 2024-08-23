import React from 'react'
import Aksiya from '../../components/Aksiya/Aksiya'
import Footer from '../../components/Footer/Footer'
import HeaderAll from '../../components/HeaderAll/HeaderAll'
import HeaderSub from '../../components/HeaderSub/HeaderSub'

function AksiyaAll() {
  return (
    <div>
      <div className='all__header'>
        <HeaderAll />
      </div>
      <div className='all__responsheader'>
        <HeaderSub />
      </div>
      <div className='containers'>
        <Aksiya />
        {/* <Footer /> */}
      </div>
    </div>
  )
}

export default AksiyaAll