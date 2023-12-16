import { Link } from 'react-router-dom'
import Container from '../Container'
import logoImg from '../../../assets/images/logo.svg'
import MenuDropdown from './MenuDropdown'
import MenuItems from './MenuItems'

const Navbar = () => {
  return (
    <div className='fixed w-full bg-white z-[99999] shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row shadow  items-center justify-between gap-3 md:gap-0'>
            {/* Logo */}
            <Link to='/'>
              <img
                className='hidden md:block'
                src={logoImg}
                alt='logo'
                width='70'
                height='70'
              />
            </Link>
            {/* menu items */}
            <MenuItems/>
            {/* Dropdown Menu */}
            <MenuDropdown />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
