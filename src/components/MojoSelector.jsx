import { useState } from 'react'
import { Mojo, Name, Ring } from './styled'

const MojoSelector = ({ items }) => {
  const rotationUnit = (2 * Math.PI) / items.length
  const mojos = items.map((item, i) => {
    const angle = i * rotationUnit + Math.PI
    const radius = 160
    const coord = {
      x: -radius * Math.sin(angle),
      y: radius * Math.cos(angle),
    }
    return { ...item, ...coord }
  })

  const [rotation, setRotation] = useState(0)
  const [selected, setSelected] = useState(0)

  const handleClick = (i) => {
    setSelected(i)

    const angleInDegs = (rotationUnit * 180) / Math.PI
    const direction = selected - i > 0 ? -1 : 1
    setRotation(
      rotation +
        (Math.abs(selected - i) > items.length / 2
          ? (items.length - Math.abs(selected - i)) * direction
          : selected - i) *
          angleInDegs
    )
  }

  return (
    <Ring animate={{ rotate: rotation }}>
      <Name animate={{ rotate: -rotation }}>{mojos[selected].name}</Name>

      {mojos.map((x, i) => (
        <Mojo
          key={i}
          animate={{
            x: x.x,
            y: x.y,
            scale: i === selected ? 1 : 0.5,
            rotate: -rotation,
          }}
          onClick={() => handleClick(i)}
          src={x.image}
        />
      ))}
    </Ring>
  )
}

export default MojoSelector
