import Image from 'next/image'
import Icon_Logo from '../../public/Icon_Logo.svg';
import Link from 'next/link';

function SideNav() {
  return (
    <nav className="flex flex-col h-full justify-between">      
      {/* Logo */}
      <div className="flex flex-col items-center justify-center  pt-3 pb-3 gap-1">
        <Image src={Icon_Logo} alt="Logo"
          width={40}
          height={40}
        />
        <hr 
          className="w-[90%] border-0 h-0.5 bg-slate-400 shadow-2xl"
        />
      </div>

      {/* Navigation */}
      <div className="self-center">
        {/* <Link className="block py-2 text-slate-500 font-mono"href="/">Home</Link> */}
        {/* <Link className="block py-2 text-slate-500 font-mono"href="/issues">Issues</Link> */}
        {/* <Link className="block py-2 text-slate-500 font-mono"href="/insights">Insights</Link> */}
        {/* <Link className="block py-2 text-slate-500 font-mono"href="/alerts">Alerts</Link> */}
        
        {/* <a href="#" className="block py-2 pl-4 text-black">Settings</a> */}
      </div>

      {/* Nav Footer */}
      <div className='pt-2 pb-2 flex flex-col items-center justify-center '>
        <hr 
          className="w-[90%] border-0 h-0.5 bg-slate-400 shadow-2xl"
        />
        <div className="pt-3 pb-3 gap-1 ">
          <p className="text-xs text-slate-600">© 2021 FixMzansi</p>
        </div>
      </div>

    </nav>
  )
}

export default SideNav
