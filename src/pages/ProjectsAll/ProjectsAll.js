import React, { useEffect } from 'react'
import HeaderAll from '../../components/HeaderAll/HeaderAll'
import Projects from '../../components/Projects/Projects';
import '../../components/Header/Header.css'
import HeaderSub from '../../components/HeaderSub/HeaderSub';
import Footer from '../../components/Footer/Footer';

function ProjectsAll() {
  return (
    <div>
       <div className='subheaderall'>
        <HeaderAll />
       </div>
       <div className='headerall'>
         <HeaderSub />
       </div>
       <div className='containers'>
         <Projects />
         {/* <Footer /> */}
       </div>
    </div>
  )
}

export default ProjectsAll