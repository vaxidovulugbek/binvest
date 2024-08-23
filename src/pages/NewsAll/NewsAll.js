import React, { useEffect } from 'react'
import Footer from '../../components/Footer/Footer'
import HeaderAll from '../../components/HeaderAll/HeaderAll'
import HeaderSub from '../../components/HeaderSub/HeaderSub'
import News from '../../components/News/News'

function NewsAll() {
  return (
    <div>
      <div className='all__header'>
        <HeaderAll />
      </div>
      <div className='all__responsheader'>
        <HeaderSub />
      </div>
      <div className='containers'>
        <News />
        {/* <Footer /> */}
      </div>
    </div>
  )
}

export default NewsAll