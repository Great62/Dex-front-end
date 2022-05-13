import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FC, useState } from "react";
import downArrow from '../pictures/expand_more_white_24dp.svg'

interface NavBarProps {
    items:any
    selectToken:any
    setActiveMenuItem:any
    activeMenuItem:any
    user:any
}
 
const NavBar: FC<NavBarProps> = ({items, selectToken, setActiveMenuItem, activeMenuItem, user}) => {

    const [menuOpen, setMenuOpen] = useState(false)

    function selectItem(e:any, item:any) {
        e.preventDefault();
        selectToken(item)
        setActiveMenuItem(item.ticker)
        setMenuOpen(false)
        console.log(item)
        console.log(user.accounts)
    }

    return ( 
      <div className="flex justify-center items-center relative w-full bg-slate-900 h-20">
          <div className="flex justify-between items-center px-2 pl-4 w-32 h-12 bg-gray-800 hover:bg-slate-700 duration-200 absolute left-4 rounded-lg text-white hover:cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
              <div className=" font-bold ">{activeMenuItem ? activeMenuItem : 'Token'}</div>
              <div className="flex items-center w-7 h-fit">
              <Image src={downArrow} />
              </div>
          </div>
            <AnimatePresence>

            {menuOpen && 
            <motion.div 
            className="flex gap-1 absolute top-[-0px] w-[70%] h-12 bg-slate-800 rounded-lg p-1"
            transition={{type: 'ease-in-out'}}
            initial={{top:'-100px'}}
            animate={{top:'1em'}}
            exit={{top:'-100px'}}
            >
                {items ?
                    items.map((item:string, i:number) => (
                        <div key={i} className="flex justify-center items-center w-1/4 rounded-lg bg-slate-700 hover:bg-slate-600 hover:cursor-pointer duration-200 text-white font-bold" onClick={(e) => selectItem(e, item.value)}>{item.label}</div>
                        )) 
                    : <div className="text-white">Configure metamask to continue</div>}
            </motion.div>}
            </AnimatePresence>

      </div>
     );
}
 
export default NavBar;