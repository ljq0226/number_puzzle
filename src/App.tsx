import { useEffect, useState } from 'react'
import './App.css'
import { shuffleMatrix } from './lib'
function App() {


  const [currentEmpty, setCurrentEmpty] = useState(0)
  const [arr, setArr] = useState<number[][]>([])

  useEffect(() => {
    setArr(shuffleMatrix(3))
  }, [])

  const handleClick = (e: MouseEvent) => {



  }

  console.log('arr', arr)

  return (
    <div className='h-screen w-screen flex px-[15vw] justify-center align-center'>

      <div className="flex w-full justify-center items-center flex-col">
        <div className='w-[320px]  my-auto flex flex-col items-center justify-center  h-[320px]  border-[3px] drop-shadow-2xl border-solid m-auto '>
          {
            arr.map((item, i) => {
              return (
                <div
                  key={i}
                  className='flex mx-auto'>
                  {
                    item.map((num, j) => {
                      return (
                        <div
                          key={i + '-' + j}
                          className='p-2'
                          data-p={i + '-' + j}
                          onClick={(e) => {
                            const div = e.currentTarget
                            const position = div.getAttribute('data-p')?.split('-')
                          }
                          }
                        // style={{transform:'translateY(100%)'}}
                        >
                          {
                            num
                              ?
                              <button
                                className='w-[72px] h-[72px] bg-cyan-100 text-[24px] flex-center text-black'
                                onClick={() => handleClick}
                              >
                                <span>
                                  {num}
                                </span>
                              </button>
                              :
                              <button
                                className='w-[72px] h-[72px] bg-gray-300 text-[24px] flex-center text-black  '>
                              </button>
                          }

                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }

          {/* 
          <div className='flex mx-auto'>
            <div className='p-2'
            // style={{transform:'translateY(100%)'}}
            >
              <button
                className='w-[72px] h-[72px] bg-cyan-100 text-[24px] flex-center text-black  '>
                <span>
                  4
                </span>
              </button>
            </div>
            <div className='p-2'
            // style={{transform:'translateX(100%)'}}
            >
              <button
                className='w-[72px] h-[72px] bg-cyan-100 text-[24px] flex-center text-black  '>
                <span>
                  5
                </span>
              </button>
            </div>
            <div className='p-2'
              style={{ transform: 'translateY(100%)' }}
            >
              <button
                className='w-[72px] h-[72px] bg-cyan-100 text-[24px] flex-center text-black  '>
                <span>
                  6
                </span>
              </button>
            </div>


          </div>

          <div className='flex mx-auto'>
            <div className='p-2'
            // style={{transform:'translateY(100%)'}}
            >
              <button
                className='w-[72px] h-[72px] bg-cyan-100 text-[24px] flex-center text-black  '>
                <span>
                  4
                </span>
              </button>
            </div>
            <div className='p-2'
            // style={{transform:'translateY(100%)'}}
            >
              <button
                className='w-[72px] h-[72px] bg-cyan-100 text-[24px] flex-center text-black  '>
                <span>
                  4
                </span>
              </button>
            </div>
            <div className='p-2'
            // style={{transform:'translateY(100%)'}}
            >
              <button
                className='w-[72px] h-[72px] bg-cyan-100 text-[24px] flex-center text-black  '>
                <span>
                  4
                </span>
              </button>
            </div> */}

          {/* </div> */}
        </div>

      </div>

    </div>
  )
}

export default App
