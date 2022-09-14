import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { useState } from 'react'

const items = [
  { name: 'Bored', image: 'bored.svg' },
  { name: 'Chill', image: 'chill.svg' },
  { name: 'Anxious', image: 'anxious.svg' },
  { name: 'Overworked', image: 'overworked.svg' },
  { name: 'Tired', image: 'tired.svg' },
  { name: 'Blessed', image: 'blessed.svg' },
  { name: 'Excited', image: 'excited.svg' },
  { name: 'Angry', image: 'angry.svg' },
  { name: 'Productive', image: 'productive.svg' },
]

const App = () => {
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

  return (
    <Container>
      <Header>
        <img src='logo.svg' />
        <img src='info.svg' />
      </Header>
      <Text>Choose your mojo after this meeting</Text>
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
            onClick={() => {
              setSelected(i)
              setRotation(
                rotation +
                  (Math.abs(selected - i) > items.length / 2
                    ? (items.length - Math.abs(selected - i)) *
                      (selected - i > 0 ? -1 : 1)
                    : selected - i) *
                    ((rotationUnit * 180) / Math.PI)
              )
            }}
            src={x.image}
          />
        ))}
      </Ring>

      <Buttons>
        <Return>
          <img src='return.svg' />
        </Return>
        <Check>
          <img src='check.svg' />
        </Check>
      </Buttons>
    </Container>
  )
}

const Container = styled.div`
  padding: 36px;
  max-width: 390px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fcfcfc;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const Text = styled.p`
  font-family: Montserrat;
  font-size: 18px;
  font-weight: 700;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
  color: #400505;
  margin-top: 66px;
  margin-bottom: 41px;
`

const Name = styled(motion.p)`
  font-family: Inter;
  font-size: 36px;
  font-weight: 400;
  line-height: 44px;
  letter-spacing: 0em;
  text-align: left;
  margin: auto;
  color: #9b9b9b;
`

const Ring = styled(motion.div)`
  height: 462px;
  width: 462px;
  border-radius: 50%;
  background-color: #f5f5f5;
  position: relative;
  display: flex;
`

const Mojo = styled(motion.img)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  cursor: pointer;
  user-select: none;
`

const Buttons = styled.div`
  display: flex;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 390px;
  margin: auto;
  background-color: white;
`

const Return = styled.button`
  background-color: white;
  width: 100%;
  border: 0;
`

const Check = styled.button`
  height: 100px;
  width: 100%;
  background: linear-gradient(31.62deg, #299f16 0%, #8bff78 100%);
  border-radius: 10px 0 0 10px;
  border: 0;
`

export default App
