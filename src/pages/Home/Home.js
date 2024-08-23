// components
import Aksiya from 'components/Aksiya/Aksiya'
import Filter from 'components/Filter/Filter'
import Footer from 'components/Footer/Footer'
import InfoCompany from 'components/InfoCompany/InfoCompany'
import Map from 'components/Map/Map'
import News from 'components/News/News'
import Projects from 'components/Projects/Projects'
import Subcontact from 'components/SubContact/Contact'
import React from 'react'

function Home() {
  return (
    <>
        <div className='containers'>
          <Filter />
          <Projects />
          <InfoCompany />
          <Aksiya />
          <News />
          <Map />
          <Subcontact />
          {/* <Footer /> */}
        </div>
    </>
  )
}

export default Home