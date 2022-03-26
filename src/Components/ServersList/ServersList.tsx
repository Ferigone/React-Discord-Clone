import React from 'react'

import {SiDiscord} from 'react-icons/si'

function ServersList() {
  return (
    <div className="w-[72px] min-w-[72px] bg-[#202225] flex flex-col items-center py-3">
      <div className="bg-[#40444B] hover:bg-[#5865F2] h-[48px] w-[48px] flex items-center justify-center rounded-3xl hover:rounded-2xl duration-100 cursor-pointer">
        <SiDiscord className="fill-[#DCDDDE] h-7 w-7"/>
      </div>
    </div>
  )
}

export default ServersList