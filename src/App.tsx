import { useEffect, useRef, useState } from 'react'
import { shuffleMatrix, compareAdjacentCoordinates, findZeroCoordinates, areArraysEqual } from './lib'
import './App.css'
function App() {

  const [currentEmpty, setCurrentEmpty] = useState<[number, number]>([0, 0])
  const [matrixArr, setMatrixArr] = useState<number[][]>([])
  const [operateMatrixArr, setOperateMatrixArr] = useState<number[][]>([])
  const [successMatrix, setSuccessMatrix] = useState<number[][]>([])
  const emptyRef = useRef(null)
  const selectRef = useRef(null)
  const [matrix, setMatrix] = useState(3)


  useEffect(() => {
    const { newMatrix, operateMatrix, successMatrix } = shuffleMatrix(matrix)
    const zeroPosition = findZeroCoordinates(newMatrix)
    setSuccessMatrix(successMatrix)
    setOperateMatrixArr(operateMatrix)
    setCurrentEmpty(zeroPosition)
    setMatrixArr(newMatrix)
  }, [matrix])

  const isRightPosition = (i: number, j: number, position: number[]) => {
    return !(position[0] == i && position[1] == j)
  }



  return (
    <div className='h-screen w-screen flex flex-col px-[15vw]'>
      <div className='my-10'>
        游戏设置 <select
          ref={selectRef}
          onChange={() => {
            const select = selectRef.current as unknown as HTMLSelectElement
            setMatrix(+(select.value))
          }} defaultValue={3} name="num" id="">
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <div
          style={{ width: `${matrix * 100 + 20}px`, height: `${matrix * 100 + 20}px` }}
          className='my-auto flex flex-col items-center justify-center  border-[3px] drop-shadow-2xl border-solid m-auto '>
          {
            matrixArr.map((item, i) => {
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
                              const arr = operateMatrixArr
                              const num = arr[divpreY][divpreX]
                              arr[emptypreY][emptypreX] = num
                              arr[divpreY][divpreX] = 0
                              setOperateMatrixArr(arr)
                              console.log('arr', arr)

                            } else if (res === 'l') {
                              emptyDiv.style.transform = `translate(${ex + 100}%,${ey}%)`
                              div.style.transform = `translate(${x - 100}%,${y}%)`
                              div.setAttribute('data-x', `${divpreX - 1}`)
                              emptyDiv.setAttribute('data-x', `${emptypreX + 1}`)
                              const arr = operateMatrixArr
                              const num = arr[divpreY][divpreX]
                              arr[emptypreY][emptypreX] = num
                              arr[divpreY][divpreX] = 0
                              setOperateMatrixArr(arr)
                              console.log('arr', arr)
                            } else if (res === 'b') {
                              emptyDiv.style.transform = `translate(${ex}%,${ey - 100}%)`
                              div.style.transform = `translate(${x}%,${y + 100}%)`
                              div.setAttribute('data-y', `${divpreY + 1}`)
                              emptyDiv.setAttribute('data-y', `${emptypreY - 1}`)
                              const arr = operateMatrixArr
                              const num = arr[divpreY][divpreX]
                              arr[emptypreY][emptypreX] = num
                              arr[divpreY][divpreX] = 0
                              setOperateMatrixArr(arr)
                              console.log('arr', arr)
                            } else if (res === 'r') {
                              emptyDiv.style.transform = `translate(${ex - 100}%,${ey}%)`
                              div.style.transform = `translate(${x + 100}%,${y}%)`
                              div.setAttribute('data-x', `${divpreX + 1}`)
                              emptyDiv.setAttribute('data-x', `${emptypreX - 1}`)
                              const arr = operateMatrixArr
                              const num = arr[divpreY][divpreX]
                              arr[emptypreY][emptypreX] = num
                              arr[divpreY][divpreX] = 0
                              setOperateMatrixArr(arr)
                              console.log('arr', arr)
                            }

                            if (areArraysEqual(operateMatrixArr, successMatrix)) {
                              alert('GameOver!!!!')
                            }
                          }
                          }
                        >
                          {
                            isRightPosition(i, j, currentEmpty)
                              ?
                              <button
                                className='w-[72px] h-[72px] z-10 bg-cyan-100 text-[24px] flex-center text-black'
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
