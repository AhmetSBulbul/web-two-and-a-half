import {useRouter} from 'next/router'
import DevSlug from './DevSlug';

const Navbar = ({lead, children}) => {
    const router = useRouter();
    console.log(router.pathname);
    const isHome = router.pathname == "/";
    return (
        <header className="navbar">
            <div className="justify-self-start">
                {isHome ? <DevSlug/> : <h3>Web2½</h3>}
            </div>
            <div className='justify-self-center'>
                {isHome ? <h3>Web2½</h3> : <h3>{lead}</h3>}
            </div>
            <div className='justify-self-end'>
            <h3>Menu</h3>
          </div>
            
        </header>
    )
}
export default Navbar