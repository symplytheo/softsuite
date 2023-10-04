import React from 'react'
import s from './footer.module.scss'

const AppFooter = () => {
  return (
    <footer className={s.footer}>
        <p>&copy; {new Date().getFullYear()} SoftSuite. All rights reserved.</p>
        <p>support@softsuite.com</p>
    </footer>
  )
}

export default AppFooter