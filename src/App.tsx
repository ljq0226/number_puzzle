import { useEffect, useRef, useState } from 'react'
import { shuffleMatrix, compareAdjacentCoordinates, findZeroCoordinates } from './lib'
import './App.css'
function App() {


  const [currentEmpty, setCurrentEmpty] = useState<[number, number]>([0, 0])
  const [arr, setArr] = useState<number[][]>([])
  const emptyRef = useRef(null)


  useEffect(() => {
    const newArr = shuffleMatrix(3)
    const zeroPosition = findZeroCoordinates(newArr)
    setCurrentEmpty(zeroPosition)
    setArr(newArr)
  }, [])

  const isRightPosition = (i: number, j: number, position: number[]) => {
    return !(position[0] == i && position[1] == j)
  }

  const handleClick = (e: MouseEvent) => {

  }

  return (
    <div className='h-screen w-screen flex px-[15vw] justify-center align-center'>

      <div className="flex flex-col items-center justify-center w-full">
        <div className='w-[320px]  my-auto flex flex-col items-center justify-center  h-[320px] border-[3px] drop-shadow-2xl border-solid m-auto '>
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
                          className='relative p-2'
                          style={{ transform: 'translate(0%, 0%)', width: 100 }}

                          data-p={i + '-' + j}
                          data-x={j}
                          data-y={i}
                          onClick={(e) => {
                            const div = e.currentTarget
                            const emptyButton = emptyRef.current as unknown as HTMLButtonElement
                            const emptyDiv = emptyButton.parentNode as HTMLButtonElement

                            const divpreY = Number(div.getAttribute('data-y'))
                            const divpreX = Number(div.getAttribute('data-x'))
                            const emptypreY = Number(emptyDiv.getAttribute('data-y'))
                            const emptypreX = Number(emptyDiv.getAttribute('data-x'))
                            const p1 = [divpreY, divpreX] as [number, number]
                            const p2 = [emptypreY, emptypreX] as [number, number]
                            const res = compareAdjacentCoordinates(p1, p2)
                            const po = div.style.transform.slice(10, -1).split(',')
                            const epo = emptyDiv.style.transform.slice(10, -1).split(',')
                            const x = +(po[0].slice(0, -1))
                            const y = +(po[1].slice(0, -1))
                            const ex = +(epo[0].slice(0, -1))
                            const ey = +(epo[1].slice(0, -1))
                            if (res === 't') {
                              emptyDiv.style.transform = `translate(${ex}%,${ey + 100}%)`
                              div.style.transform = `translate(${x}%,${y - 100}%)`
                              div.setAttribute('data-y', `${divpreY - 1}`)
                              emptyDiv.setAttribute('data-y', `${emptypreY + 1}`)
                            } else if (res === 'l') {
                              emptyDiv.style.transform = `translate(${ex + 100}%,${ey}%)`
                              div.style.transform = `translate(${x - 100}%,${y}%)`
                              div.setAttribute('data-x', `${divpreX - 1}`)
                              emptyDiv.setAttribute('data-x', `${emptypreX + 1}`)
                            } else if (res === 'b') {
                              emptyDiv.style.transform = `translate(${ex}%,${ey - 100}%)`
                              div.style.transform = `translate(${x}%,${y + 100}%)`
                              div.setAttribute('data-y', `${divpreY + 1}`)
                              emptyDiv.setAttribute('data-y', `${emptypreY - 1}`)

                            } else if (res === 'r') {
                              emptyDiv.style.transform = `translate(${ex - 100}%,${ey}%)`
                              div.style.transform = `translate(${x + 100}%,${y}%)`
                              div.setAttribute('data-x', `${divpreX + 1}`)
                              emptyDiv.setAttribute('data-x', `${emptypreX - 1}`)
                            }
                          }
                          }
                        >
                          {
                            isRightPosition(i, j, currentEmpty)
                              ?
                              <button
                                className='w-[72px] h-[72px] z-10 bg-cyan-100 text-[24px] flex-center text-black'
                                onClick={() => handleClick}
                              >
                                <span>
                                  {num}
                                </span>
                              </button>
                              :
                              <button
                                ref={emptyRef}
                                className='w-[72px] p-2 h-[72px] bg-gray-300 text-[24px] flex-center text-black  '>
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
        </div>

      </div>

    </div>
  )
}

export default App
